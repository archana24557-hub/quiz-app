const questions = [
  {
    question: "Which language is used for web styling?",
    options: ["HTML", "CSS", "PHP", "Python"],
    answer: 1
  },
  {
    question: "What does JS stand for?",
    options: ["JavaScript", "JavaSource", "JumboScript", "None"],
    answer: 0
  },
  {
    question: "Which is used to update UI dynamically?",
    options: ["DOM", "SQL", "Cloud", "Compiler"],
    answer: 0
  }
];

let index = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const timeSpan = document.getElementById("time");

function startTimer() {
  timeLeft = 15;
  timeSpan.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  startTimer();
  
  const q = questions[index];
  questionBox.textContent = `${index + 1}. ${q.question}`;
  optionsBox.innerHTML = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(i);
    optionsBox.appendChild(li);
  });
}

function checkAnswer(selected) {
  if (selected === questions[index].answer) score++;
  nextQuestion();
}

function nextQuestion() {
  index++;
  if (index < questions.length) showQuestion();
  else showResult();
}

function prevQuestion() {
  if (index > 0) index--;
  showQuestion();
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hide");
  document.getElementById("result-box").classList.remove("hide");
  document.getElementById("score").textContent = `${score}/${questions.length}`;
}

document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("prevBtn").onclick = prevQuestion;

// Start
showQuestion();
