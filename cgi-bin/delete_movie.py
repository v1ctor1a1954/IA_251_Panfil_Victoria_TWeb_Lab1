#!C:/Users/panfi/AppData/Local/Programs/Python/Python311/python.exe
import os
import sys
import json
import cgi
import cgitb

cgitb.enable()

form = cgi.FieldStorage(
    fp=sys.stdin.buffer,
    environ=os.environ,
    keep_blank_values=True
)

index = form.getvalue("index")

file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "movies.json")

if index is None:
    result = json.dumps({"success": False, "error": "no index"})
else:
    f = open(file, "r", encoding="utf-8")
    movies = json.load(f)
    f.close()
    movies.pop(int(index))
    f = open(file, "w", encoding="utf-8")
    json.dump(movies, f, ensure_ascii=False, indent=4)
    f.close()
    result = json.dumps({"success": True})

sys.stdout.buffer.write(b"Content-Type: application/json; charset=utf-8\r\n\r\n")
sys.stdout.buffer.write(result.encode("utf-8"))
sys.stdout.buffer.flush()