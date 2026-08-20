"use strict";

const RESULTS_CONFIG = Object.freeze({
  quizId: "hcia-ai-ml-lectures-30",
  quizVersion: "2026-08-20-conceptual-v5",
  endpointParameter: "resultsEndpoint",
  timeoutMs: 25000
});

const studentNameInput = document.getElementById("studentName");
const studentIdInput = document.getElementById("studentId");
const collectionMode = document.getElementById("collectionMode");
const submissionState = document.getElementById("submissionState");
const submissionTitle = document.getElementById("submissionTitle");
const submissionMessage = document.getElementById("submissionMessage");
const retrySubmitBtn = document.getElementById("retrySubmitBtn");
const attemptId = createAttemptId();
let lastPayload = null;
let submissionInProgress = false;
let resultSent = false;

function createAttemptId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function getResultsEndpoint() {
  const currentUrl = new URL(window.location.href);
  const queryValue = currentUrl.searchParams.get(RESULTS_CONFIG.endpointParameter);
  const hashParameters = new URLSearchParams(currentUrl.hash.replace(/^#/, ""));
  const hashValue = hashParameters.get(RESULTS_CONFIG.endpointParameter);
  return String(hashValue || queryValue || "").trim();
}

function isValidAppsScriptEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname);
  } catch (_error) {
    return false;
  }
}

function setCollectionMode() {
  const endpoint = getResultsEndpoint();
  const enabled = isValidAppsScriptEndpoint(endpoint);

  studentNameInput.required = enabled;
  studentIdInput.required = enabled;

  if (enabled) {
    collectionMode.className = "collection-mode enabled";
    collectionMode.textContent = "Instructor collection is enabled. Your result will be submitted automatically after grading.";
    return;
  }

  collectionMode.className = "collection-mode practice";
  collectionMode.textContent = "Practice mode: this link is not connected to an instructor results sheet, so the score will not be uploaded. Identity fields are optional in this mode.";
}

function setSubmissionStatus(kind, title, message, allowRetry = false) {
  submissionState.className = `submission-state ${kind}`;
  submissionTitle.textContent = title;
  submissionMessage.textContent = message;
  retrySubmitBtn.hidden = !allowRetry;
}

function validateIdentity() {
  if (!isValidAppsScriptEndpoint(getResultsEndpoint())) return true;

  const name = studentNameInput.value.trim();
  const studentId = studentIdInput.value.trim();

  studentNameInput.classList.toggle("invalid", !name);
  studentIdInput.classList.toggle("invalid", !studentId);

  if (!name) {
    showNotice("Enter your full name before submitting the quiz.");
    studentNameInput.focus();
    return false;
  }

  if (!studentId) {
    showNotice("Enter your student ID or institutional email before submitting the quiz.");
    studentIdInput.focus();
    return false;
  }

  return true;
}

function buildResultPayload() {
  const selectedIndices = questions.map((_item, index) => getSelected(index));
  const answerLetters = selectedIndices.map(index => index === null ? "" : letters[index]);

  return {
    schemaVersion: 1,
    quizId: RESULTS_CONFIG.quizId,
    quizVersion: RESULTS_CONFIG.quizVersion,
    attemptId,
    studentName: studentNameInput.value.trim(),
    studentId: studentIdInput.value.trim(),
    submittedAtClient: new Date().toISOString(),
    answers: answerLetters.join(",")
  };
}

function postWithHiddenForm(endpoint, payload) {
  return new Promise((resolve, reject) => {
    const frameName = `quiz_result_${attemptId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const frame = document.createElement("iframe");
    const form = document.createElement("form");
    const payloadInput = document.createElement("input");
    let finished = false;

    frame.name = frameName;
    frame.title = "Quiz result submission";
    frame.hidden = true;

    form.method = "POST";
    form.action = endpoint;
    form.target = frameName;
    form.hidden = true;

    payloadInput.type = "hidden";
    payloadInput.name = "payload";
    payloadInput.value = JSON.stringify(payload);
    form.appendChild(payloadInput);

    const cleanup = () => {
      window.removeEventListener("message", receiveMessage);
      window.clearTimeout(timeout);
      window.setTimeout(() => {
        frame.remove();
        form.remove();
      }, 500);
    };

    const finish = (callback, value) => {
      if (finished) return;
      finished = true;
      cleanup();
      callback(value);
    };

    const receiveMessage = event => {
      if (event.source !== frame.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== "hcia-ai-quiz-results") return;
      if (data.attemptId !== payload.attemptId) return;

      if (data.ok) {
        finish(resolve, data);
      } else {
        finish(reject, new Error(data.error || "The results service rejected the submission."));
      }
    };

    const timeout = window.setTimeout(() => {
      finish(reject, new Error("Result submission timed out."));
    }, RESULTS_CONFIG.timeoutMs);

    window.addEventListener("message", receiveMessage);
    document.body.append(frame, form);
    form.submit();
  });
}

async function submitResult(payload = null) {
  const endpoint = getResultsEndpoint();

  if (!isValidAppsScriptEndpoint(endpoint)) {
    setSubmissionStatus(
      "practice",
      "Practice mode",
      "Your score is shown on this page, but it was not sent because this quiz link is not connected to an instructor Google Sheet."
    );
    return;
  }

  if (submissionInProgress || resultSent) return;
  submissionInProgress = true;
  lastPayload = payload || lastPayload || buildResultPayload();
  setSubmissionStatus("sending", "Submitting result...", "Please keep this page open for a few seconds.");

  try {
    const confirmation = await postWithHiddenForm(endpoint, lastPayload);
    resultSent = true;
    const confirmedScore = Number.isInteger(confirmation.score)
      ? ` The recorded score is ${confirmation.score}/${confirmation.total}.`
      : "";
    setSubmissionStatus(
      "success",
      "Result submitted",
      `The instructor's results sheet confirmed your name, ID/email, and score.${confirmedScore}`
    );
  } catch (error) {
    console.error(error);
    setSubmissionStatus(
      "error",
      "Submission could not be confirmed",
      "Your score is still visible. Check your internet connection and use Retry submission.",
      true
    );
  } finally {
    submissionInProgress = false;
  }
}

quiz.addEventListener("submit", event => {
  if (!validateIdentity()) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

quiz.addEventListener("submit", () => {
  const allAnswered = questions.every((_item, index) => getSelected(index) !== null);
  if (!allAnswered) return;
  window.setTimeout(() => {
    if (submitted) submitResult(buildResultPayload());
  }, 0);
});

studentNameInput.addEventListener("input", () => studentNameInput.classList.remove("invalid"));
studentIdInput.addEventListener("input", () => studentIdInput.classList.remove("invalid"));
retrySubmitBtn.addEventListener("click", () => submitResult(lastPayload));

setCollectionMode();
