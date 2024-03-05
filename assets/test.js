//keeping track of timer state
var QuestionIndex = 0;
var timer = questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtnEl = document.getElementById('submit');
var startBtnEl = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
  var beginScreenE1 = document.getElementById('begin-screen');
  startScreenE1.setAttribute('class', 'hide');


  questionsEl.removeAttribute('class');
//starts the timer?
  timerId = setInterval(clocktick, 1000);
//shows the starting time
  timerEl.textContent = time;
  getQuestion();
}
//get the current question object from array
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titlEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
//clears out old questions
    choicesEl.innerHTML ='';
      //for loop for the array
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var button = document.createElement('button');
        button.setAttribute('class', 'choice');
        button.setAttribute('value', 'choice');
        
        button.textContent = i + 1 +' . ' + choice;

        choicesEl.appendChild(button);

    }


}

function questionClick(event){
    var buttonEl = event.target;
    if (!buttonEl.matches('.choice')) {
        return;
    }
}

if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
        time= 0;
    }
    timerEl.textContent = time;
    sfxWrong.play();
    feedbackEl.textContent = 'Wrong!';
} else {
    sfxRight.play();
    feedbackEl.textContent = 'Correct!';
}

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestion === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }

    function endQuiz() {
        // clears timer
        clearInterval(timerId);
//shows final score to user
        var endScreenEl = document.getElementById('end-screen');
        finalScoreEl.textContent = time;
//sets the questions back to hidden
        questionsEl.setAttribute('class','hide');
    }

    function clockCount() {
        // updates the timer
        time--;
        timerEl.textContent = time;

        if (time <= 0) {
            //checks for remaining time if time runs out closes quiz.
            quizEnd();
        }
    }
