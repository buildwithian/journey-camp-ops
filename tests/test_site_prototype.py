#!/usr/bin/env python3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
required = [
    'Journey Operating Hub',
    'leaderForm',
    'taskForm',
    'driveSteps',
    'localStorage',
    'Journey V3 live',
    'Resource Library',
    'Event Readiness',
    'Website Access Review',
    'gateOpenCount',
    'gateRows',
    'Launch Gate Review',
    'accessRows',
    'accessPendingCount',
    'accessLevelFilter',
    'accessStatusFilter',
    'Do not copy Alpha assets',
]
for name in ('site/index.html', 'site/operating-hub-prototype.html'):
    html = root.joinpath(name).read_text(encoding='utf-8')
    missing = [item for item in required if item not in html]
    if missing:
        raise SystemExit(f'{name} missing prototype markers: {missing}')
    if 'http://' in html or 'https://' in html:
        raise SystemExit(f'{name} should not depend on external URLs')
print('site prototype tests passed')
