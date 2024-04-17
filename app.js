const questions = [
  {
    question: "What Is The Name Of Highest Mountain In The World?",
    answers: [
      { text: "K2", correct: false },
      { text: "Tirich Mir", correct: false },
      { text: "Broad Peak", correct: false },
      { text: "Mount Everest", correct: true },
    ],
  },
  {
    question: "What Is The Most Common Surname In The United States?",
    answers: [
      { text: "Smith", correct: true },
      { text: "Jones", correct: false },
      { text: "Miller", correct: false },
      { text: "Davis", correct: false },
    ],
  },
  {
    question: "How Many Elements Are In The Periodic Table?",
    answers: [
      { text: "100", correct: false },
      { text: "218", correct: false },
      { text: "118", correct: true },
      { text: "89", correct: false },
    ],
  },
  {
    question: "Which Game Studio Made Grand Theft Auto V?",
    answers: [
      { text: "Rockstar Games", correct: true },
      { text: "Nintendo", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Ubisoft", correct: false },
    ],
  },
  {
    question: "Which Planet In The Milky Way Is The Hottest?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: true },
      { text: "Mars", correct: false },
      { text: "Sun", correct: false },
    ],
  },
  {
    question: "What Is The 4th Letter Of Greek Alphabet?",
    answers: [
      { text: "Gamma", correct: false },
      { text: "Upsilon", correct: false },
      { text: "Alpha", correct: false },
      { text: "Delta", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
