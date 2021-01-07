const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const titleCard = document.getElementById('titleCard')
const titleCard1 = document.getElementById('titleCard1')

var quizTime = 60;
var timeLeft = document.getElementById('time-left');




let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  titleCard.classList.add('hide')
  titleCard1.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<javascript>', correct: false },
      { text: '<script>', correct: true },
      { text: '<js>', correct: false },
      { text: '<jscall>', correct: false }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World");', correct: true },
      { text: 'msg("Hello World");  ', correct: false },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'Head', correct: false },
      { text: 'Body', correct: false },
      { text: 'header', correct: false },
      { text: 'Body and Head', correct: true },
      { text: 'Body and Header', correct: false }
    ]
  },
  {
    question: ' this if statement is correct:  if(i==5)?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'How do you comment in javacript?',
    answers: [
      { text: '<comment> This is a comment </comment>', correct: false },
      { text: '// This is a comment', correct: true },
      { text: '/ This is a comment', correct: false },
      { text: '||This is a comment||', correct: false }
    ]
  }
]

function countDown() {
    setInterval(function() {
        if (quizTime <= 0 ) {
            clearInterval(quizTime = 0)
            location.reload();
        }
        timeLeft.innerHTML = quizTime;
        quizTime -=1;
    }, 1000)
}


// Button that starts timer and quiz
startButton.addEventListener("click", countDown);