#!/usr/bin/env python3
from pathlib import Path
html = Path(__file__).resolve().parents[1].joinpath('site/operating-hub-prototype.html').read_text(encoding='utf-8')
required = ['Journey Operating Hub','leaderForm','taskForm','driveSteps','localStorage','Approval required','Resource Library','Event Readiness']
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit(f'missing prototype markers: {missing}')
if 'http://' in html or 'https://' in html:
    raise SystemExit('prototype should not depend on external URLs')
print('site prototype tests passed')
