const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressiveText");
const scoreText = document.getElementById("score");
// Progress Bar
const progressFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

getNewQuestion = () => {
  // If all the questions have been answered or user has answered all the questions I want them to go to the end page.
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Save Score at the end of the game in LocalStorage
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/end.html");
  }
  // update question counter and corresponding text
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS} `;
  // Update Progress Bar
  progressFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  //   get the question from the available questions array using the question index
  currentQuestion = availableQuestions[questionIndex];
  //   Setting the Question / Inner HTML
  question.innerText = currentQuestion.question;

  //   Get choices
  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });
  // Splice out the question just used and get rid of question just used.
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Increment Score

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
