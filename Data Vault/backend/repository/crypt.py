import pyAesCrypt
import os 
from io import BytesIO
import json
import urllib.request
import urllib.error


KEYSERVER_URL = os.environ.get("KEYSERVER_URL", "http://127.0.0.1:8001/keybuffer/")

_cached_values = {"key": None, "buffer": None}


def _fetch_key_and_buffer():
    try:
        with urllib.request.urlopen(KEYSERVER_URL, timeout=2) as resp:
            data = resp.read()
            payload = json.loads(data.decode("utf-8"))
            _cached_values["key"] = payload.get("key")
            _cached_values["buffer"] = payload.get("buffer")
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError):
        pass


def _resolve_key_and_buffer():
    _fetch_key_and_buffer()
    resolved_key = _cached_values["key"] or key
    resolved_buffer = _cached_values["buffer"]
    return resolved_key, resolved_buffer


def encrypt (input):
    resolved_key, resolved_buffer = _resolve_key_and_buffer()
    print(resolved_key, resolved_buffer)
    try:
        buffer_size = int(resolved_buffer) if resolved_buffer is not None else Buffer
    except (TypeError, ValueError):
        buffer_size = Buffer
    inputStream = BytesIO(input)
    outputStream = BytesIO()
    pyAesCrypt.encryptStream(inputStream, outputStream, resolved_key, buffer_size)
    outputStream.seek(0)
    return outputStream.getvalue()


def decrypt (input):
    resolved_key, resolved_buffer = _resolve_key_and_buffer()
    print(resolved_key, resolved_buffer)
    try:
        buffer_size = int(resolved_buffer) if resolved_buffer is not None else Buffer
    except (TypeError, ValueError):
        buffer_size = Buffer
    inputStream = BytesIO(input)
    outputStream = BytesIO()
    pyAesCrypt.decryptStream(inputStream, outputStream, resolved_key, buffer_size, len(input))
    outputStream.seek(0)
    return outputStream.getvalue()