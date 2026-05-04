#!C:/Users/panfi/AppData/Local/Programs/Python/Python311/python.exe
import os

file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "movies.json")

f = open(file, "rb")
content = f.read()
f.close()

import sys
sys.stdout.buffer.write(b"Content-Type: application/json; charset=utf-8\r\n\r\n")
sys.stdout.buffer.write(content)
sys.stdout.buffer.flush()