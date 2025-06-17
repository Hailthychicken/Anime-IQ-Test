const highscorelist = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores'));

highscorelist.innerHTML=highScores.map(score => {
  return `<li class='high-score'>Name:${score.playerName}| Score: ${score.playerScore} </li> `
}).join('')


