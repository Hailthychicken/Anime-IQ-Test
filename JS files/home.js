const animefacts = document.getElementById('animeFacts');

let currentanimeFact = [];
let AnimeFactsArray = [];

fetch("animefacts.json")
  .then(res =>{
    return res.json()
  })
  .then(loadedFacts=>{
    AnimeFactsArray= loadedFacts;
    getanimeFact();
  })
  .catch(err=>{
    console.error(err);
  });


getanimeFact = () =>{
  
 const factIndex= Math.floor(Math.random() * AnimeFactsArray.length);
 animefacts.innerHTML= AnimeFactsArray[factIndex];
}

displayanimeFact = () =>{
getanimeFact();
}
 let change = setInterval(displayanimeFact, 8000);