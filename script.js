let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");

async function suraqtar() {
  const apiURL =
    "https://opentdb.com/api.php?amount=7&category=18&type=multiple";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    questions = data.results;
    question();
  } catch (error) {
    questionElement.textContent = "Sth is wrong. Try again :)";
  }
}

function question() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    optionsElement.innerHTML = "";

    const answers = [
      ...currentQuestion.incorrect_answers, // Jauaptardy bir ARRAYge qosu ushin
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5); // ARRAYdegi otvetterdi randomny shygaru ushin

    answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("option");
      button.addEventListener("click", () => tangdalganJauap(answer));
      optionsElement.appendChild(button);
    });
  } else {
    barlyqPointtar();
  }
}

function tangdalganJauap(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correct_answer) {
    score++;
    alert("CORRECT !!!");
  } else {
    alert("INCORRECT, Correct is : " + currentQuestion.correct_answer);
  }
  currentQuestionIndex++;
  question();
}

function barlyqPointtar() {
  questionElement.textContent = "Finish";
  optionsElement.innerHTML = "";
  scoreElement.textContent = "Score: " + score + "/" + questions.length;
  scoreElement.style.display = "block";
  nextButton.style.display = "none";
}

suraqtar();
