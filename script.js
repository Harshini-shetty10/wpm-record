const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Management Language"
    ],
    answer: 0
  },
  {
    question: "2. Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "3. What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2
  },
  {
    question: "4. What year was JavaScript created?",
    options: ["1996", "1995", "1994", "2000"],
    answer: 1
  },
  {
    question: "5. Which HTML tag is used to include JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: 1
  }
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultEl = document.getElementById('result');

let currentQuestionIndex = 0;
const userAnswers = Array(quizData.length).fill(null);

function loadQuestion(index) {
  const q = quizData[index];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  q.options.forEach((option, i) => {
    const label = document.createElement('label');
    label.classList.remove('correct', 'wrong');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = i;
    if(userAnswers[index] === i) input.checked = true;

    input.addEventListener('change', () => {
      userAnswers[currentQuestionIndex] = i;
      nextBtn.disabled = false;
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + option));
    optionsEl.appendChild(label);
  });

  nextBtn.disabled = (userAnswers[index] === null);

  submitBtn.style.display = (index === quizData.length - 1) ? 'inline-block' : 'none';
  nextBtn.style.display = (index === quizData.length - 1) ? 'none' : 'inline-block';

  resultEl.textContent = '';
}

// Render all questions with answers highlighted after submission
function renderAllQuestionsWithResults() {
  questionEl.textContent = 'Review Your Answers';
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'none';

  quizData.forEach((q, questionIndex) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-review');
    
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    q.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.marginBottom = '8px';
      label.textContent = option;

      // Highlight correct answer green
      if (optionIndex === q.answer) {
        label.classList.add('correct');
      }

      // Highlight wrong selected answers red
      if (userAnswers[questionIndex] !== q.answer && userAnswers[questionIndex] === optionIndex) {
        label.classList.add('wrong');
      }

      questionDiv.appendChild(label);
    });

    optionsEl.appendChild(questionDiv);
  });

  // Calculate score
  let score = 0;
  userAnswers.forEach((answer, i) => {
    if(answer === quizData[i].answer) score++;
  });

  resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

submitBtn.addEventListener('click', () => {
  // Check all questions answered
  for(let i = 0; i < userAnswers.length; i++) {
    if(userAnswers[i] === null) {
      alert(`Please answer question ${i + 1}`);
      currentQuestionIndex = i;
      loadQuestion(i);
      return;
    }
  }

  renderAllQuestionsWithResults();
});

// Initial load
loadQuestion(currentQuestionIndex);