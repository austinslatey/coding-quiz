var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function promptQuiz() {
    // hide startUp screen
    var startUpEl = document.getElementById("startUp");
    startUpEl.setAttribute("class", "hide");

    //unhide startUp
    questionsEl.removeAttribute("class");

    // timer
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    grabQuestion();
}

function grabQuestion() {
    // grab question from array
    var currentQuestion = questions[currentQuestionIndex];

    // render current questions title
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear old choices
    choicesEl.innerHTML = "";

    // loop choices
    currentQuestion.choices.forEach(function (choice, i) {

        // create new button for all choice elements
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // onclick to current choice
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time from user 
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // conditionally display new time
        timerEl.textContent = time;


        feedbackEl.textContent = "Wrong!";
    } else {

        feedbackEl.textContent = "Correct!";
    }

    // dispaly correct or incorrect
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // next question
    currentQuestionIndex++;

    // if no more questions end quiz
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        grabQuestion();
    }
}

function endQuiz() {

    // clear timer
    clearInterval(timerId);

    // render end-screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide all questions
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time incrementing by 1
    time--;
    timerEl.textContent = time;

    // if out of time end quiz
    if (time <= 0) {
        endQuiz();
    }
}

function saveScore() {
    // get value of highscore input
    var initials = initialsEl.value.trim();

    // check if theres a value
    if (initials !== "") {
        // save scores in local storage, otherwise empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to highscore page 
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveScore();
    }
}

// when user clicks submit button for their initials
submitBtn.onclick = saveScore;

// when user clicks start button to initalize quiz
startBtn.onclick = promptQuiz;


initialsEl.onkeyup = checkForEnter;
