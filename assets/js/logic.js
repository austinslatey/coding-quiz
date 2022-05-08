var questionsEl = document.getElementById('questions');
timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
// var choicesEl = document.getElementById('choices');
// var choicesEl = document.getElementById('choices');

function promtQuiz() {
    //hide startUp screen
    var startUpEl = document.getElementById('startUp');
    startUpEl.setAttribute('class', 'hide');

    //unhide startUp
    questionsEl.removeAttribute('class');

    //timer 
    timerId = setInterval(countDown, 1000);
    timerEl.textContent = time;


    askQuestion();

}

function askQuestion() {
    //grab question from array
    var question = questions[questionsIndex];

    // render current questions title
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = question.title;

    //clear old choices
    choicesEl.innerHTML = "";

    //loop over choices

    question.choices.forEach(function (choice, i) {
        var currentChoices = document.createElement('button');
        currentChoices.setAttribute('class', 'choice');
        currentChoices.setAttribute('value', choice);

        currentChoices.textContent = i + '. ' + choice;

        //onclick to current choice
        currentChoices.onClick = clickQuestion;
        choicesEl.appendChild(currentChoices);
    });

}

function clickQuestion() {
    if (this.value !== questions[questionsIndex].answer) {
        //penalize time from user 
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        //display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong";
    } else {
        feedbackEl.textContent("you are correct");
    }
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000)

    // move to next question
    questionsIndex++;

    if (questionsIndex === questions.lenth) {
        quizQuestions.End();
    }
    askQuestion();
}

function allDone() {
    clearInterval(timerId);

    //show end 
    var allDoneEl = document.getElementById('all-done');
    allDoneEl.removeAttribute('class');

    //score quiz score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    //hide all questions
    questionsEl.setAttribute('class', 'hide');
}

function countDown(){
    //increment by 1
    time--;
    timerEl.textContent = time

    //end quiz when time is done
    if (time <= 0 ) {
        allDone();
    }
}

