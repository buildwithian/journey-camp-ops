# Google Drive Import Manifest

These files are ready to import as native Google Sheets after explicit approval of the destination Google Drive account or tenant. The automated import attempt was rejected by safety review because uploading project-derived local content to an unverified Drive destination is treated as private data export.

## Import-Ready Files

| Intended Google Sheet title | Local workbook | Size bytes | SHA256 |
| --- | --- | ---: | --- |
| Journey Drive Resource Library Index | `templates/operations/Journey-Drive-Resource-Library-Index.xlsx` | 29428 | `39c7ee6cbafd93cf7d33aa662e06e08df7ed91e02a4d02a0e37d0a8faafd143d` |
| Journey Leader Delegation and Readiness Tracker | `templates/operations/Journey-Leader-Delegation-and-Readiness-Tracker.xlsx` | 19865 | `aa5db7d9523bdacdde6945372754ea7c4b28a6dbf7627f8d751a7bda0f963a2c` |

## Required Approval Before Upload

- Confirm the Google Drive account or folder is owned by the intended Journey programme owner or trusted tenant.
- Confirm the files may be uploaded to that account.
- Confirm whether the sheets should be placed in an existing Drive folder or a new `Journey Operating System` folder.
- Confirm sharing defaults after import.

## Import Command Path

Use the Google Drive spreadsheet import connector with `upload_mode: native_google_sheets` for each `.xlsx` file. Do not preserve the source file type unless specifically requested.
