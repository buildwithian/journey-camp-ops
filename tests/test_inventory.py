#!/usr/bin/env python3
import csv
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
import inventory

def fail(msg):
    print(msg)
    raise SystemExit(1)

rows = list(csv.DictReader((ROOT / "archive-register/source-inventory.csv").open(encoding="utf-8")))
files = inventory.source_files()
if len(rows) != len(files):
    fail(f"row/file mismatch: {len(rows)} rows, {len(files)} files")
ids = [r["inventory_id"] for r in rows]
if len(ids) != len(set(ids)):
    fail("duplicate inventory ids")
if any(not re.fullmatch(r"[0-9a-f]{64}", r["sha256"]) for r in rows):
    fail("invalid checksum")
sensitive = list(csv.DictReader((ROOT / "archive-register/sensitive-file-register.csv").open(encoding="utf-8")))
if any("Statement" in r["relative_path"] or "Participants" in r["relative_path"] for r in sensitive):
    fail("sensitive register leaked raw path")
private = ROOT / ".work/private-source-inventory.json"
if not private.exists():
    fail("private source map missing")
print("inventory tests passed")
