/**
 * ============================================================================
 * JOURNEY CAMP OPERATIONS — GOOGLE APPS SCRIPT BRIDGE (BI-DIRECTIONAL SYNC)
 * ============================================================================
 * How to deploy:
 * 1. Open your Kickoff Camp Operations v14 sheet in Google Sheets.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this ENTIRE script.
 * 4. Click Deploy > New Deployment.
 * 5. Select type: "Web app".
 * 6. Execute as: "Me" | Who has access: "Anyone".
 * 7. Copy the generated Web App URL and paste it into your Web App's Settings modal!
 */

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var name = sheet.getName();
    var data = sheet.getDataRange().getValues();
    result[name] = data;
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    timestamp: new Date().toISOString(),
    data: result
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = contents.action;
    
    if (action === "updateCell") {
      var sheet = ss.getSheetByName(contents.sheetName);
      if (sheet) {
        sheet.getRange(contents.row, contents.col).setValue(contents.value);
        return responseJSON({ status: "success", message: "Cell updated" });
      }
    } else if (action === "updateAttendance") {
      var sheet = ss.getSheetByName("1. Settings & Leaders");
      if (sheet) {
        sheet.getRange("B8").setValue(contents.dads);
        sheet.getRange("B9").setValue(contents.children);
        sheet.getRange("B10").setValue(contents.helpers);
        return responseJSON({ status: "success", message: "Attendance updated" });
      }
    } else if (action === "updateStartTime") {
      var sheet = ss.getSheetByName("3. Detailed Timetable");
      if (sheet) {
        sheet.getRange("C4").setValue(contents.startTime);
        return responseJSON({ status: "success", message: "Start time updated" });
      }
    } else if (action === "updateStatus") {
      var sheet = ss.getSheetByName(contents.sheetName);
      if (sheet) {
        sheet.getRange(contents.row, contents.col).setValue(contents.status);
        return responseJSON({ status: "success", message: "Status updated" });
      }
    } else if (action === "addVolunteer") {
      var sheet = ss.getSheetByName("1. Settings & Leaders");
      if (sheet) {
        sheet.appendRow(["", "", "", sheet.getLastRow(), contents.name, contents.phone, contents.email]);
        return responseJSON({ status: "success", message: "Volunteer added" });
      }
    } else if (action === "deleteVolunteer") {
      var sheet = ss.getSheetByName("1. Settings & Leaders");
      if (sheet) {
        var data = sheet.getRange("E6:E50").getValues();
        for (var r = 0; r < data.length; r++) {
          if (data[r][0] === contents.name) {
            sheet.getRange(r + 6, 5, 1, 3).clearContent();
            break;
          }
        }
        return responseJSON({ status: "success", message: "Volunteer deleted" });
      }
    }
    
    return responseJSON({ status: "error", message: "Unknown action" });
  } catch (err) {
    return responseJSON({ status: "error", message: err.toString() });
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
