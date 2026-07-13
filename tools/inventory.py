#!/usr/bin/env python3
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOTS = [
    "Journey - Boys - Paul",
    "Journey - Paul",
    "Journey - Richard",
    "ROP - who does what.xlsx",
    "TJ26-1 ROP (Weekend Program) _ April 2026.xlsx",
]

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def source_files():
    files = []
    for name in SOURCE_ROOTS:
        p = ROOT / name
        if not p.exists():
            continue
        if p.is_file():
            files.append(p)
        else:
            files.extend(x for x in p.rglob("*") if x.is_file())
    return sorted(files, key=lambda p: str(p.relative_to(ROOT)).lower())

def main():
    inventory = ROOT / "archive-register" / "source-inventory.csv"
    with inventory.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    files = source_files()
    assert len(rows) == len(files), f"inventory rows {len(rows)} != source files {len(files)}"
    checksums = {sha256_file(p) for p in files}
    row_checksums = {r["sha256"] for r in rows}
    assert row_checksums.issubset(checksums)
    print(json.dumps({"source_files": len(files), "inventory_rows": len(rows)}, indent=2))

if __name__ == "__main__":
    main()
