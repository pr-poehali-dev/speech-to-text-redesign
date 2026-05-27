import os
import json
import base64
import tempfile
import time
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Транскрибация аудио/видео файла через OpenAI Whisper API."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    file_b64 = body.get('file')
    filename = body.get('filename', 'audio.mp3')
    language = body.get('language', 'ru')

    if not file_b64:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Файл не передан'}),
        }

    api_key = os.environ.get('OPENAI_API_KEY', '')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'API ключ не настроен'}),
        }

    # Декодируем base64 → временный файл
    file_data = base64.b64decode(file_b64)

    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else 'mp3'
    tmp_path = tempfile.mktemp(suffix=f'.{ext}')

    with open(tmp_path, 'wb') as f:
        f.write(file_data)

    start_time = time.time()

    try:
        # Multipart form-data вручную (без requests)
        boundary = 'boundary123456789'

        def encode_field(name, value):
            return (
                f'--{boundary}\r\n'
                f'Content-Disposition: form-data; name="{name}"\r\n\r\n'
                f'{value}\r\n'
            ).encode()

        def encode_file(name, fname, data, content_type='audio/mpeg'):
            header = (
                f'--{boundary}\r\n'
                f'Content-Disposition: form-data; name="{name}"; filename="{fname}"\r\n'
                f'Content-Type: {content_type}\r\n\r\n'
            ).encode()
            return header + data + b'\r\n'

        content_types = {
            'mp3': 'audio/mpeg', 'mp4': 'video/mp4', 'wav': 'audio/wav',
            'ogg': 'audio/ogg', 'm4a': 'audio/mp4', 'webm': 'audio/webm',
            'flac': 'audio/flac', 'mpeg': 'audio/mpeg',
        }
        ct = content_types.get(ext, 'audio/mpeg')

        body_parts = (
            encode_field('model', 'whisper-1') +
            encode_field('language', language) +
            encode_field('response_format', 'verbose_json') +
            encode_file('file', filename, file_data, ct) +
            f'--{boundary}--\r\n'.encode()
        )

        req = urllib.request.Request(
            'https://api.openai.com/v1/audio/transcriptions',
            data=body_parts,
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': f'multipart/form-data; boundary={boundary}',
            },
            method='POST',
        )

        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode())

        elapsed = round(time.time() - start_time, 2)

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'text': result.get('text', ''),
                'language': result.get('language', language),
                'duration': result.get('duration'),
                'elapsed': elapsed,
            }),
        }

    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        return {
            'statusCode': e.code,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'OpenAI error {e.code}: {err_body}'}),
        }
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass
