var listHighscores = () => {
    //get scores from local storage or set var to empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    //sort scores
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function (score) {
        var listTag = document.createElement('li');
        listTag.textContent = score.initals + ' - ' + score.score;




        var ulEl = document.getElementById('highscores');
        ulEl.appendChild(listTag)
        console.log(score.initals);
    })
  
}





var clearHighscore = () => {
    if (err) {
        console.log(err);
    } else {
        window.localStorage.removeItem('highscores');
        window.location.reload();
    }
}

document.getElementById('delete').onclick = clearHighscore;

listHighscores();