"use strict";

const questions = [
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "A machine-learning system predicts tomorrow's temperature as a numerical value. What type of task is this?",
    o: ["Clustering", "Regression", "Classification", "Association-rule learning"],
    a: 1,
    e: "Regression is used when the target is a continuous numerical value."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "Which stage of the machine-learning process includes filling missing values and handling invalid or abnormal records?",
    o: ["Model deployment", "Feature selection", "Data cleansing", "Feedback and iteration"],
    a: 2,
    e: "Data cleansing addresses missing, invalid, inconsistent, noisy, or abnormal values."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "After model selection and hyperparameter tuning are complete, which dataset should be used to estimate the model's generalization performance?",
    o: ["Training set", "Validation set", "Test set", "Unlabeled set"],
    a: 2,
    e: "The untouched test set is used for the final assessment of performance on unseen data."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "Which feature-selection approach scores individual features using measurements such as Pearson correlation, chi-square, or mutual information without training a prediction model for each subset?",
    o: ["Wrapper method", "Filter method", "Embedded method", "Ensemble method"],
    a: 1,
    e: "Filter methods score features using statistical relationships independently of a prediction model."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "Why can a wrapper feature-selection method be computationally expensive?",
    o: [
      "It repeatedly trains and evaluates a predictive model on different feature subsets.",
      "It can process only categorical features.",
      "It never uses the target variable.",
      "It always retains every available feature."
    ],
    a: 0,
    e: "Wrapper methods compare feature subsets by repeatedly training and evaluating a model."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "A classifier produces 70 true positives and 10 false positives. What is its precision?",
    o: ["70.0%", "77.8%", "87.5%", "90.0%"],
    a: 2,
    e: "Precision = TP / (TP + FP) = 70 / (70 + 10) = 0.875, or 87.5%."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "A model has a training error of 2% but an error of 25% on previously unseen data. What is the most likely problem?",
    o: ["Underfitting", "Overfitting", "Perfect generalization", "Incorrect clustering"],
    a: 1,
    e: "Very low training error combined with much higher unseen-data error indicates overfitting."
  },
  {
    s: "Lecture 03 — Machine Learning Fundamentals, Process, and Evaluation",
    q: "A binary classifier has 36 true positives, 12 false positives, 4 false negatives, and 48 true negatives. What is its F1 score?",
    o: ["0.750", "0.800", "0.818", "0.900"],
    a: 2,
    e: "Precision = 36/48 = 0.75 and recall = 36/40 = 0.90, so F1 = 2PR/(P+R) ≈ 0.818."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "Which gradient-descent method uses a selected group of n training samples to calculate each parameter update?",
    o: ["Batch gradient descent", "Stochastic gradient descent", "Mini-batch gradient descent", "Hierarchical gradient descent"],
    a: 2,
    e: "Mini-batch gradient descent uses a subset of samples for each update."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "Which of the following is normally a hyperparameter rather than a learned model parameter?",
    o: [
      "A coefficient learned by linear regression",
      "A weight learned by a neural network",
      "The value of k in k-nearest neighbors",
      "The support vectors identified by an SVM"
    ],
    a: 2,
    e: "The user selects k in k-NN; it is not learned directly from the training data."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "What is the main 'naive' assumption made by a Naive Bayes classifier?",
    o: [
      "Features are conditionally independent given the class.",
      "Every class contains exactly the same number of samples.",
      "The target variable must be continuous.",
      "Prior probabilities must always be ignored."
    ],
    a: 0,
    e: "Naive Bayes assumes conditional independence among the features when the class is known."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "What happens during five-fold cross-validation?",
    o: [
      "One fold is used for training and the other four are used for validation.",
      "Each fold is used once for validation while the other four folds are used for training.",
      "The same fold is used as the validation set in all five rounds.",
      "The test set is repeatedly used to select hyperparameters."
    ],
    a: 1,
    e: "Across five rounds, every fold serves once as validation while the remaining folds are used for training."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "In which situation is random search generally more appropriate than grid search?",
    o: [
      "The model has no hyperparameters.",
      "The hyperparameter search space is large.",
      "Every possible combination must be evaluated.",
      "No validation data are available."
    ],
    a: 1,
    e: "Random search is useful when exhaustive evaluation of a large search space would be too expensive."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "How does the kernel trick help an SVM classify data that are not linearly separable in the original input space?",
    o: [
      "It removes all support vectors.",
      "It enables a maximum-margin hyperplane to be fitted in a transformed feature space.",
      "It predicts the class using the average of neighboring samples.",
      "It trains several trees on bootstrap samples."
    ],
    a: 1,
    e: "A kernel allows a linear separator to be fitted implicitly in a transformed, higher-dimensional feature space."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "Which statement correctly describes the effect of k in k-nearest neighbors?",
    o: [
      "A small k produces a smoother boundary and greater underfitting, while a large k produces overfitting.",
      "Changing k has no effect on the decision boundary.",
      "A small k is more sensitive to noise and may overfit, while a large k produces a smoother boundary and may underfit.",
      "The value of k is automatically learned using backpropagation."
    ],
    a: 2,
    e: "Small k can create an irregular, noise-sensitive boundary; large k smooths the boundary and may underfit."
  },
  {
    s: "Lecture 04 — Optimization and Classical Machine-Learning Algorithms",
    q: "Which statement correctly compares random forest and gradient boosted decision trees?",
    o: [
      "Random forest sequentially fits residuals, while GBDT independently trains bootstrap trees.",
      "Random forest uses one decision tree, while GBDT uses k-nearest neighbors.",
      "Random forest builds multiple CART trees from bootstrap samples and aggregates them, while GBDT trains later learners to fit the remaining residual errors.",
      "Both methods are unsupervised clustering algorithms."
    ],
    a: 2,
    e: "Random forest is a bagging method; GBDT is a boosting method that sequentially reduces residual error."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "In a deep neural network, what does the term depth mainly refer to?",
    o: ["The number of neurons in the output layer", "The number of training samples", "The number of layers in the network", "The value of the learning rate"],
    a: 2,
    e: "Network depth refers primarily to the number of layers through which information passes."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "Which expression defines the ReLU activation function?",
    o: ["1 / (1 + e^(-x))", "max(0, x)", "tanh(x)", "e^(x_j) / sum_k e^(x_k)"],
    a: 1,
    e: "ReLU returns zero for negative inputs and the original value for positive inputs: max(0, x)."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "Why are nonlinear activation functions required between the layers of a deep neural network?",
    o: [
      "They reduce the number of samples in the training set.",
      "Without them, several linear layers together are still equivalent to a linear transformation.",
      "They guarantee that the training loss becomes zero.",
      "They eliminate the need for backpropagation."
    ],
    a: 1,
    e: "Composing linear transformations without nonlinear activations still produces only a linear transformation."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "Which statement about activation-function outputs is correct?",
    o: [
      "Sigmoid outputs values in (-1, 1), while tanh outputs values in (0, 1).",
      "Sigmoid outputs values in (0, 1), tanh outputs values in (-1, 1), and softmax outputs probabilities whose sum is 1.",
      "Sigmoid, tanh, and softmax all produce unbounded outputs.",
      "ReLU always produces a probability distribution whose elements sum to 1."
    ],
    a: 1,
    e: "Sigmoid maps to (0,1), tanh maps to (-1,1), and softmax forms a normalized class-probability distribution."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "Which sequence correctly represents the main neural-network training process?",
    o: [
      "Update parameters → forward propagation → calculate loss → backpropagation",
      "Forward propagation → calculate loss → backpropagation → update parameters",
      "Backpropagation → split the data → forward propagation → deploy the model",
      "Evaluate the test set → modify the test labels → update parameters"
    ],
    a: 1,
    e: "The model first predicts, then measures loss, computes gradients, and finally updates its parameters."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "Why can a multi-layer perceptron with a nonlinear hidden layer solve the XOR problem while a single perceptron cannot?",
    o: [
      "XOR contains too many training samples for a single perceptron.",
      "XOR is a continuous regression problem.",
      "XOR is not linearly separable, but a nonlinear hidden layer can create a representation that permits separation.",
      "A single perceptron can be used only with softmax."
    ],
    a: 2,
    e: "A single linear boundary cannot solve XOR, while nonlinear hidden units can transform the representation."
  },
  {
    s: "Lecture 05 — Perceptrons and Fully Connected Neural Networks",
    q: "In a very deep network, gradients become progressively smaller as they are propagated toward the early layers. Which mechanism most directly explains this?",
    o: [
      "Repeated multiplication by small derivatives through the chain rule",
      "Separation of the data into training and test sets",
      "Application of max pooling",
      "Bootstrap sampling of training records"
    ],
    a: 0,
    e: "The chain rule multiplies derivatives across layers; repeated small factors can make early-layer gradients approach zero."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "What happens when dropout is applied during neural-network training?",
    o: [
      "Selected neurons are permanently deleted from the deployed model.",
      "Some neuron inputs or outputs are randomly discarded for that training pass, and the corresponding parameters are not updated through those discarded paths.",
      "Additional neurons are inserted into every hidden layer.",
      "The class labels are randomly changed."
    ],
    a: 1,
    e: "Dropout temporarily masks selected units or connections during training, creating different subnetworks across passes."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "What does parameter sharing mean in a convolutional neural network?",
    o: [
      "Every image position has its own independent kernel weights.",
      "The same convolution-kernel weights are reused as the kernel scans different image positions.",
      "Every layer in the network must use exactly the same weights.",
      "Convolution kernels contain fixed values that cannot be learned."
    ],
    a: 1,
    e: "A learned filter keeps the same weights while scanning across spatial locations."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "Which description of the Adam optimizer is correct?",
    o: [
      "Adam uses only the current gradient and stores no information from earlier updates.",
      "Adam maintains moving averages of the gradient and squared gradient and applies bias correction during the early iterations.",
      "Adam uses a gradient accumulator that can only increase and has no attenuation mechanism.",
      "Adam optimizes a model by training random decision trees."
    ],
    a: 1,
    e: "Adam estimates the first and second moments of gradients and corrects their initialization bias."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "Which statement correctly describes max pooling?",
    o: [
      "It increases the spatial size of every feature map.",
      "It selects the maximum value in each local region and can reduce the spatial size and computational workload of the following layers.",
      "It selects the minimum value in each region and increases the number of learned parameters.",
      "It must be applied before the first convolutional layer."
    ],
    a: 1,
    e: "Max pooling keeps the strongest response in each local region and commonly downsamples feature maps."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "An LSTM forget gate outputs the values [1, 0, 0.5] for three components of the previous cell state. How should these values be interpreted?",
    o: [
      "Discard the first component, retain the second, and ignore the third.",
      "Discard all three components completely.",
      "Retain the first component, discard the second, and partially retain the third.",
      "Retain all three components completely."
    ],
    a: 2,
    e: "A forget-gate value of 1 retains information, 0 discards it, and an intermediate value retains part of it."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "Which statement correctly describes backpropagation through time in an RNN?",
    o: [
      "The gradient is calculated only at the final time step.",
      "Longer sequences eliminate the possibility of vanishing or exploding gradients.",
      "Weight gradients accumulate information across time steps, and long dependency chains can cause vanishing or exploding gradients.",
      "Recurrent networks perform only forward propagation and require no backward pass."
    ],
    a: 2,
    e: "BPTT accumulates contributions across time, and long chains of derivatives can vanish or explode."
  },
  {
    s: "Lecture 06 — Optimizers, Regularization, CNNs, RNNs, LSTMs, and Seq2Seq",
    q: "Why may a basic RNN-based Seq2Seq model perform poorly on very long input sequences?",
    o: [
      "Its context variable automatically expands without limit, making the model fully parallel.",
      "The encoder compresses the input into a fixed-shape context variable, which may lose information from long sequences, while recurrent dependencies also limit parallel computation.",
      "The decoder cannot use information from its previous outputs.",
      "Seq2Seq models can produce only fixed-length output sequences."
    ],
    a: 1,
    e: "The fixed-size context can become an information bottleneck, and recurrent computation is sequential rather than highly parallel."
  }
];

const letters = ["A", "B", "C", "D"];
const quiz = document.getElementById("quiz");
const bar = document.getElementById("bar");
const progressText = document.getElementById("progressText");
const result = document.getElementById("result");
const review = document.getElementById("review");
const notice = document.getElementById("notice");
const submitBox = document.getElementById("submitBox");
let submitted = false;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderQuiz() {
  let activeSection = "";
  const html = [];

  questions.forEach((item, index) => {
    if (item.s !== activeSection) {
      activeSection = item.s;
      const parts = activeSection.split(" — ");
      html.push(`
        <section class="section" aria-label="${esc(activeSection)}">
          <small>${esc(parts[0])}</small>
          <h2>${esc(parts.slice(1).join(" — "))}</h2>
        </section>`);
    }

    const options = item.o.map((option, optionIndex) => `
      <label class="option" data-option="${optionIndex}">
        <input type="radio" name="q${index}" value="${optionIndex}" aria-label="Question ${index + 1}, option ${letters[optionIndex]}">
        <span><span class="letter">${letters[optionIndex]}.</span> ${esc(option)}</span>
      </label>`).join("");

    html.push(`
      <article class="question" id="question-${index + 1}">
        <fieldset>
          <legend><span class="num">${index + 1}</span>${esc(item.q)}</legend>
          ${options}
        </fieldset>
        <div class="feedback" id="feedback-${index + 1}"></div>
      </article>`);
  });

  quiz.innerHTML = html.join("");
}

function getSelected(index) {
  const input = quiz.querySelector(`input[name="q${index}"]:checked`);
  return input ? Number(input.value) : null;
}

function updateProgress() {
  const answered = questions.reduce((count, _item, index) => count + (getSelected(index) !== null ? 1 : 0), 0);
  const percentage = Math.round((answered / questions.length) * 100);
  bar.style.width = `${percentage}%`;
  progressText.textContent = `${answered} of ${questions.length} answered`;
  document.getElementById("submitHint").textContent = answered === questions.length
    ? "All questions are answered. Submit when ready."
    : `Answer ${questions.length - answered} more question${questions.length - answered === 1 ? "" : "s"} before submitting.`;
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("show");
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => notice.classList.remove("show"), 3500);
}

function gradeQuiz() {
  let score = 0;
  review.innerHTML = "";

  questions.forEach((item, index) => {
    const selected = getSelected(index);
    const correct = selected === item.a;
    if (correct) score += 1;

    const card = document.getElementById(`question-${index + 1}`);
    card.classList.remove("missing");
    card.classList.add(correct ? "good" : "bad");

    const optionLabels = [...card.querySelectorAll(".option")];
    optionLabels[item.a].classList.add("correct");
    if (!correct && selected !== null) optionLabels[selected].classList.add("incorrect");

    const feedback = document.getElementById(`feedback-${index + 1}`);
    feedback.className = `feedback show ${correct ? "correct" : "incorrect"}`;
    feedback.innerHTML = correct
      ? `<strong>Correct.</strong> ${esc(item.e)}`
      : `<strong>Incorrect.</strong> Correct answer: ${letters[item.a]}. ${esc(item.o[item.a])}<br>${esc(item.e)}`;

    const details = document.createElement("details");
    details.className = `review-item ${correct ? "ok" : "no"}`;
    const selectedText = selected === null ? "No answer" : `${letters[selected]}. ${item.o[selected]}`;
    details.innerHTML = `
      <summary>
        <span>${index + 1}. ${esc(item.q)}</span>
        <span class="status">${correct ? "Correct" : "Incorrect"}</span>
      </summary>
      <div class="review-body">
        <p><strong>Your answer:</strong> ${esc(selectedText)}</p>
        <p><strong>Correct answer:</strong> ${letters[item.a]}. ${esc(item.o[item.a])}</p>
        <p><strong>Explanation:</strong> ${esc(item.e)}</p>
      </div>`;
    review.appendChild(details);
  });

  return score;
}

function performanceMessage(percent) {
  if (percent >= 90) return ["Excellent work", "You demonstrated strong knowledge and understanding across the machine-learning lectures."];
  if (percent >= 75) return ["Very good result", "You understand most of the material. Review the incorrect answers to strengthen the remaining areas."];
  if (percent >= 60) return ["Good progress", "You have a useful foundation, but several topics would benefit from focused revision."];
  if (percent >= 40) return ["More review is recommended", "Use the explanations below to identify the lecture topics that need more study."];
  return ["Keep studying", "Review the lecture fundamentals first, then retake the quiz to measure your improvement."];
}

function displayResult(score) {
  const percent = Math.round((score / questions.length) * 100);
  const [title, message] = performanceMessage(percent);
  const name = document.getElementById("studentName").value.trim();

  document.getElementById("percent").textContent = `${percent}%`;
  document.getElementById("fraction").textContent = `${score} / ${questions.length}`;
  document.getElementById("correctCount").textContent = score;
  document.getElementById("wrongCount").textContent = questions.length - score;
  document.getElementById("scorePercent").textContent = `${percent}%`;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;
  document.getElementById("studentLine").textContent = name ? `Student: ${name}` : "";
  document.getElementById("ring").style.setProperty("--angle", `${percent * 3.6}deg`);
  result.classList.add("show");
  submitBox.style.display = "none";
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

quiz.addEventListener("change", (event) => {
  if (submitted) return;
  const questionCard = event.target.closest(".question");
  if (questionCard) questionCard.classList.remove("missing");
  updateProgress();
});

quiz.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitted) return;

  const missing = [];
  questions.forEach((_item, index) => {
    const card = document.getElementById(`question-${index + 1}`);
    card.classList.remove("missing");
    if (getSelected(index) === null) {
      missing.push(index);
      card.classList.add("missing");
    }
  });

  if (missing.length) {
    showNotice(`Please answer all questions. ${missing.length} question${missing.length === 1 ? " is" : "s are"} still unanswered.`);
    document.getElementById(`question-${missing[0] + 1}`).scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  submitted = true;
  const score = gradeQuiz();
  quiz.querySelectorAll("input").forEach(input => { input.disabled = true; });
  displayResult(score);
});

document.getElementById("reviewBtn").addEventListener("click", () => {
  document.getElementById("reviewHeading").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

document.getElementById("copyBtn").addEventListener("click", async () => {
  const name = document.getElementById("studentName").value.trim();
  const score = document.getElementById("correctCount").textContent;
  const percent = document.getElementById("scorePercent").textContent;
  const text = `${name ? `${name} — ` : ""}Machine Learning Quiz: ${score}/${questions.length} (${percent})`;

  try {
    await navigator.clipboard.writeText(text);
    showNotice("Result copied to the clipboard.");
  } catch (_error) {
    showNotice(text);
  }
});

document.getElementById("retakeBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => window.location.reload(), 350);
});

renderQuiz();
updateProgress();
