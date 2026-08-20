"use strict";

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
