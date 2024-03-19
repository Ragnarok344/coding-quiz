
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;


var testEl = document.getElementById('test');
var timeEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
// shuffles the questions around?
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
questions = shuffle(questions);



function startQuiz() {
    
    var testEl = document.getElementById('start');
    testEl.setAttribute('class', 'hide');
    
    timeId = setInterval(clockTick, 1000);
    timeEl.textContent = time;
    getQuestion();

}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById('title');
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';
    var shuffledChoices = shuffle(currentQuestion.choices);
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.textContent = i + 1 + '. ' + choice;
        choiceNode.onclick =  Click;
        choicesEl.appendChild(choiceNode);
    });
}
function Click() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        timeEl.textContent = timerId;
        feedbackEl.textContent = 'Wrong!';
    } else {
        feedbackEl.textContent = 'Correct!';
    }
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
    feedbackEl.setAttribute('class', 'feedback');
feedbackEl.style.transition = 'opacity 1s ease-in-out';
setTimeout(function() {
    feedbackEl.setAttribute('class', 'feedback hide');
}, 1000);
    currentQuestionIndex++;

    var progressBar = document.getElementById('progressBar');
    progressBar.value = (currentQuestionIndex / questions.length) * 100;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
    testEl.setAttribute('class', 'hide');
}
function clockTick() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}
function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
        var highscores =
            JSON.parse(window.localStorage.getItem('highscores')) || [];
        var newScore = {
            score: time,
            initials: initials
        };
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscores.html';
    }
}
function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}
submitBtn.onclick = saveHighscore;  
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;



