#!/usr/bin/env python3
from pathlib import Path
import csv
import json

ROOT = Path(__file__).resolve().parents[1]

def main():
    results = list(csv.DictReader((ROOT / "archive-register/conversion-results.csv").open(encoding="utf-8")))
    missing = [r for r in results if r["extension"] in {".docx",".pptx",".xlsx",".xls",".pdf"} and not r["status"]]
    if missing:
        raise SystemExit(f"missing conversion status for {len(missing)} rows")
    print(json.dumps({"conversion_results": len(results)}, indent=2))

if __name__ == "__main__":
    main()
