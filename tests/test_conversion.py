#!/usr/bin/env python3
import csv
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
inv = list(csv.DictReader((ROOT / "archive-register/source-inventory.csv").open(encoding="utf-8")))
results = list(csv.DictReader((ROOT / "archive-register/conversion-results.csv").open(encoding="utf-8")))
if len(inv) != len(results):
    raise SystemExit("conversion results do not reconcile with inventory")
by_id = {r["inventory_id"]: r for r in results}
for row in inv:
    if row["inventory_id"] not in by_id:
        raise SystemExit(f"missing conversion row {row['inventory_id']}")
tracked = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True).splitlines()
if any(p.startswith(".work/") for p in tracked):
    raise SystemExit(".work content is tracked")
notes = list((ROOT / "docs/00-source-notes").glob("src-*.md"))
convertible = [r for r in inv if r["extension"] in {".docx",".pptx",".xlsx",".xls",".pdf"}]
if len(notes) != len(convertible):
    raise SystemExit(f"note count {len(notes)} != convertible count {len(convertible)}")
print("conversion tests passed")
