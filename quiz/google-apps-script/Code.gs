const SHEET_NAME = 'Quiz Results';
const SPREADSHEET_ID_PROPERTY = 'QUIZ_RESULTS_SPREADSHEET_ID';
const EXPECTED_QUIZ_ID = 'hcia-ai-ml-lectures-30';
const ANSWER_KEY = 'ACDDBDACCDBDCBCAABCDDCBCAABBAB'.split('');
const HEADERS = [
  'Server timestamp',
  'Student name',
  'Student ID or email',
  'Score',
  'Total',
  'Percentage',
  'Correct',
  'Incorrect',
  'Quiz version',
  'Attempt ID',
  'Client submission time'
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Quiz Results')
    .addItem('Set up results sheet', 'setupSheet')
    .addToUi();
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Open this script from a Google Sheet using Extensions > Apps Script.');
  }

  PropertiesService.getScriptProperties()
    .setProperty(SPREADSHEET_ID_PROPERTY, spreadsheet.getId());

  const sheet = getResultsSheet_();
  formatSheet_(sheet);
  return `Ready: ${spreadsheet.getName()} / ${sheet.getName()}`;
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'HCIA AI Machine Learning Quiz Results',
    message: 'The results endpoint is active.'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let attemptId = '';

  try {
    lock.waitLock(20000);
    const data = parsePayload_(e);
    attemptId = String(data.attemptId || '');
    validatePayload_(data);

    const sheet = getResultsSheet_();
    const existingRow = findAttemptRow_(sheet, attemptId);
    if (existingRow) {
      return htmlCallback_({
        ok: true,
        duplicate: true,
        attemptId,
        score: Number(sheet.getRange(existingRow, 4).getValue()),
        total: Number(sheet.getRange(existingRow, 5).getValue())
      });
    }

    const answers = String(data.answers).split(',');
    const score = answers.reduce(
      (total, answer, index) => total + (answer === ANSWER_KEY[index] ? 1 : 0),
      0
    );
    const total = ANSWER_KEY.length;
    const percentage = score / total;

    sheet.appendRow([
      new Date(),
      safeText_(data.studentName, 80),
      safeText_(data.studentId, 120),
      score,
      total,
      percentage,
      score,
      total - score,
      safeText_(data.quizVersion, 80),
      safeText_(attemptId, 100),
      safeText_(data.submittedAtClient, 40)
    ]);

    const row = sheet.getLastRow();
    sheet.getRange(row, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(row, 6).setNumberFormat('0.00%');

    return htmlCallback_({ ok: true, duplicate: false, row, score, total, attemptId });
  } catch (error) {
    console.error(error);
    return htmlCallback_({
      ok: false,
      attemptId,
      error: String(error.message || error)
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_error) {
      // The lock may not have been acquired if the request failed very early.
    }
  }
}

function parsePayload_(e) {
  if (!e) throw new Error('Missing request event.');

  const raw = e.parameter && e.parameter.payload
    ? e.parameter.payload
    : e.postData && e.postData.contents
      ? e.postData.contents
      : '';

  if (!raw) throw new Error('Missing payload.');

  try {
    return JSON.parse(raw);
  } catch (_error) {
    throw new Error('The payload is not valid JSON.');
  }
}

function validatePayload_(data) {
  if (!data || data.quizId !== EXPECTED_QUIZ_ID) {
    throw new Error('Unknown quiz identifier.');
  }

  if (!String(data.studentName || '').trim()) {
    throw new Error('Student name is required.');
  }

  if (!String(data.studentId || '').trim()) {
    throw new Error('Student ID or email is required.');
  }

  if (!String(data.attemptId || '').trim()) {
    throw new Error('Attempt ID is required.');
  }

  const answers = String(data.answers || '');
  const expectedPattern = new RegExp(`^[A-D](,[A-D]){${ANSWER_KEY.length - 1}}$`);
  if (!expectedPattern.test(answers)) {
    throw new Error('Invalid answer record.');
  }

  if (String(data.quizVersion || '').length > 80) {
    throw new Error('Invalid quiz version.');
  }
}

function getSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty(SPREADSHEET_ID_PROPERTY);

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) {
    throw new Error('Run setupSheet once before using the web app.');
  }

  properties.setProperty(SPREADSHEET_ID_PROPERTY, activeSpreadsheet.getId());
  return activeSpreadsheet;
}

function getResultsSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    formatSheet_(sheet);
  }

  return sheet;
}

function formatSheet_(sheet) {
  sheet.setFrozenRows(1);
  const header = sheet.getRange(1, 1, 1, HEADERS.length);
  header.setValues([HEADERS]);
  header.setFontWeight('bold');
  header.setBackground('#123c69');
  header.setFontColor('#ffffff');
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('F:F').setNumberFormat('0.00%');
  sheet.autoResizeColumns(1, HEADERS.length);
}

function findAttemptRow_(sheet, attemptId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const match = sheet
    .getRange(2, 10, lastRow - 1, 1)
    .createTextFinder(String(attemptId))
    .matchEntireCell(true)
    .findNext();

  return match ? match.getRow() : 0;
}

function safeText_(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function htmlCallback_(payload) {
  const message = Object.assign({ source: 'hcia-ai-quiz-results' }, payload);
  const serialized = JSON.stringify(message).replace(/</g, '\\u003c');
  const html = `<!doctype html><html><body><script>window.parent.postMessage(${serialized}, '*');<\/script></body></html>`;

  return HtmlService
    .createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
