"use strict";

// Replace the two calculation-based evaluation questions with conceptual questions.
// The lecture still assesses precision and F1, but students do not need to perform arithmetic.
questions[5] = {
  s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
  q: "In which situation is precision especially important when evaluating a classifier?",
  o: [
    "When the target is a continuous numerical value.",
    "When missing positive cases is the main concern, regardless of false alarms.",
    "When false-positive predictions are costly, so predicted positives should be trustworthy.",
    "When the training loss must always reach zero."
  ],
  a: 2,
  e: "Precision describes how trustworthy the model's positive predictions are, so it is especially important when false positives are costly."
};

questions[7] = {
  s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
  q: "What does the F1 score summarize about a classification model?",
  o: [
    "The model's prediction speed and memory usage.",
    "Only the proportion of correctly identified negative cases.",
    "The balance between precision and recall through their harmonic mean.",
    "The amount of variance explained in a regression problem."
  ],
  a: 2,
  e: "F1 is the harmonic mean of precision and recall, so it summarizes how well the model balances false-positive and false-negative concerns."
};

// Reorder the four choices without changing any question, explanation, or correct answer.
// Each array lists the original option positions in their new display order.
const optionOrders = [
  [1, 0, 2, 3],
  [1, 0, 2, 3],
  [3, 0, 1, 2],
  [3, 0, 2, 1],
  [3, 0, 2, 1],
  [0, 1, 3, 2],
  [1, 0, 3, 2],
  [3, 0, 2, 1],
  [3, 0, 2, 1],
  [3, 0, 1, 2],
  [2, 0, 3, 1],
  [3, 0, 2, 1],
  [3, 0, 1, 2],
  [3, 1, 2, 0],
  [1, 3, 2, 0],
  [2, 3, 0, 1],
  [2, 1, 3, 0],
  [0, 1, 3, 2],
  [0, 2, 1, 3],
  [3, 0, 2, 1],
  [0, 2, 3, 1],
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [0, 2, 1, 3],
  [1, 2, 3, 0],
  [1, 0, 2, 3],
  [3, 1, 2, 0],
  [1, 2, 3, 0],
  [2, 3, 1, 0],
  [2, 1, 0, 3]
];

optionOrders.forEach((order, questionIndex) => {
  const item = questions[questionIndex];
  const originalOptions = [...item.o];
  const originalCorrectIndex = item.a;

  item.o = order.map(originalIndex => originalOptions[originalIndex]);
  item.a = order.indexOf(originalCorrectIndex);
});

// The original script has already drawn the quiz once. Draw it again immediately
// using the revised option order; all existing form listeners remain active.
renderQuiz();
updateProgress();
