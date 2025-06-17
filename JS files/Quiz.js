const question = document.getElementById("Quiz-question");
const choices = Array.from(document.getElementsByClassName('choice-answer'));
const questionnumber= document.getElementById('question-hudText');
const scorevalue = document.getElementById('score-hudValue')
const quizEndDisplay= document.getElementById('quizEndDisplay');
const quizBoxDisplay = document.getElementById('quizStartDisplay');
const quizscore = document.getElementById('quizendScore');  
const username = document.getElementById('username');
const saveScorebtn= document.getElementById('saveScorebtn');
const finalScore = document.getElementById('quizendScore');
const highScores = JSON.parse(localStorage.getItem('highsScores')) || [];
const loader = document.getElementById('loadingBox');
const levelselect= document.getElementById('levelselectBox')
const easylevelbtn= document.getElementById('easylevel');
const mediumlevelbtn= document.getElementById('mediumlevel');
const hardlevelbtn= document.getElementById('hardlevel'); 
finalScore.innerHTML=localStorage.getItem('mostrecentscore');


let currentQuestion = {}
let acceptingAnswers= false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

const correctBonus = 10;
let maxQuestions;


let questions = [];

//get new question
getNewQuestion = ()=>{
  if (avaliableQuestions.length === 0 || questionCounter >= maxQuestions) {
    quizscore.innerText=score;
    quizBoxDisplay.classList.add('notactive');
    quizEndDisplay.classList.remove('notactive');

    localStorage.setItem('mostrecentscore', score);
    return;
  }

  questionCounter++;
  questionnumber.innerText = `${questionCounter}/${maxQuestions}`;

  const questionIndex= Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionIndex];
  question.innerText = currentQuestion.question;  

  choices.forEach(choice =>{
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]; 

    acceptingAnswers=true;
  })

avaliableQuestions.splice(questionIndex, 1);
}

//populate choices
choices.forEach(choice=>{
  choice.addEventListener('click', e =>{
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    //change color of choice depending on click
    let classtoapply= 'incorrectanswer';
      if(selectedAnswer == currentQuestion.answer){ 
        classtoapply= 'correctanswer';
        increment_score(5);
        
      }
      selectedChoice.parentElement.classList.add(classtoapply);
      setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classtoapply);
        getNewQuestion();
      }, 1000)
      


    
  })
});

//increment score
increment_score=(num)=>{
   score += num;
   scorevalue.innerText = `${score}`;
}

//save score button event handler
saveScorebtn.addEventListener('click', function(e){
e.preventDefault();
const HighScore = {
  playerName : username.value,
  playerScore : localStorage.getItem('mostrecentscore')
}
highScores.push(HighScore);
highScores.sort((a,b) => b.score - a.score);
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('./home.html');
})

//check if username field is empty
username.addEventListener('keyup', ()=>{
 saveScorebtn.disabled = !username.value;
})


easylevelbtn.addEventListener('click', function(e){
  maxQuestions=5;
  fetch("Anime_Questions.json")
  .then(res =>{
    return res.json()
  })
  .then(loadedQuestions=>{
    questions= loadedQuestions;
    startQuiz();
  })
  .catch(err=>{
    console.error(err);
  });
})

mediumlevelbtn.addEventListener('click', function(e){
  maxQuestions=10;
  fetch("Anime_Questions.json")
  .then(res =>{
    return res.json()
  })
  .then(loadedQuestions=>{
    questions= loadedQuestions;
    startQuiz();
  })
  .catch(err=>{
    console.error(err);
  });
})

hardlevelbtn.addEventListener('click', function(e){
  maxQuestions=13;
  fetch("Anime_Questions.json")
  .then(res =>{
    return res.json()
  })
  .then(loadedQuestions=>{
    questions= loadedQuestions;
    startQuiz();
  })
  .catch(err=>{
    console.error(err);
  });
})


startQuiz = () =>{
  loader.classList.remove('notactive')
questionCounter = 0;
scorevalue.innerText = `${score}`;

avaliableQuestions=[...questions]
getNewQuestion();
levelselect.classList.add('notactive')
setTimeout(function(){loader.classList.add('notactive');
quizBoxDisplay.classList.remove('notactive');}, 3000 )

};


