#!/usr/bin/env python3
import re
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {"title","document_id","status","owner_role","reviewers","version","last_reviewed","next_review","programme","sensitivity","content_layer","source_references"}
ALLOWED_STATUS = {"draft","review-required","approved","deprecated","historical-example"}
ids = {}
errors = []
def parse_fm(raw):
    data = {}
    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value == "[]":
            parsed = []
        elif value.startswith("[") and value.endswith("]"):
            parsed = [v.strip().strip('"') for v in value[1:-1].split(",") if v.strip()]
        else:
            parsed = value.strip('"')
        data[key.strip()] = parsed
    return data
for base in [ROOT / "docs", ROOT / "templates"]:
    for path in base.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            errors.append(f"{path.relative_to(ROOT)} missing front matter")
            continue
        end = text.find("\n---\n", 4)
        if end == -1:
            errors.append(f"{path.relative_to(ROOT)} malformed front matter")
            continue
        data = parse_fm(text[4:end])
        missing = REQUIRED - set(data)
        if missing:
            errors.append(f"{path.relative_to(ROOT)} missing {sorted(missing)}")
        if data.get("status") not in ALLOWED_STATUS:
            errors.append(f"{path.relative_to(ROOT)} invalid status {data.get('status')}")
        doc_id = data.get("document_id")
        if doc_id:
            if doc_id in ids:
                errors.append(f"duplicate document_id {doc_id}: {path.relative_to(ROOT)} and {ids[doc_id]}")
            ids[doc_id] = path.relative_to(ROOT)
if errors:
    print("\n".join(errors))
    raise SystemExit(1)
print(f"front matter ok: {len(ids)} ids")
