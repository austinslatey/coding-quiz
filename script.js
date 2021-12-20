var timerEl = document.getElementById('countdown');

  // Timer that counts down from 30
function countdown() {
  var timeLeft = 30;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds

  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1

    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds

      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1

      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string

      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer

      clearInterval(timeInterval);
    }
  }, 1000);
}

countdown();

var questions = [
    {
        prompt: "Which of the following functions is a valid type of function that javascript supports? \n(a) Named function\n\(b)  anonymous function\n(c) Both A and B are true.",
        answer: "c"      
    },
    {
        prompt: "Which of the following is not a mouse event?\n(a) onmousescroller\n\(b) onclick\n(c) onmouseevent\n(d) onmousemove",
        answer: "a"

    },
    {
        prompt: "The tag <noscript> will work _______\n(a) only with external scripts\n(b) with internal and external scripts\n(c)  whether there is javascript or not\n(d) only in browsers that don/t know what javascript is ",
        answer: "c"
    }
]

var score = 0;

    
for(var i=0; i < questions.length; i++) {
    var response = window.prompt(questions[i].prompt);
    if(response == questions[i].answer){
        score++;
        alert("correct");
    } else {
        alert("Wrong!!");
        countdown--;
    }
}
alert("you got " + score + "/" + questions.length )


function myFunction() {
  document.getElementById("myForm").submit();
}

