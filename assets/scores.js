function printHighscores() {
    
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    
    highscores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    for (var i = 0; i < highscores.length; i += 1) {
      
      var liTag = document.createElement('li');
      liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

      if (i === 0) {
        liTag.setAttribute('class', 'top-score');
        liTag.style.color = 'red';
        liTag.style.fontWeight = 'bold';

        var imgTag = document.createElement('img');
        imgTag.setAttribute('src', 'https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E=');
        imgTag.style.width = '50px';

        liTag.appendChild(imgTag);
      }
  
      
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
    }
  }
  
  function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  
  
  printHighscores();
  