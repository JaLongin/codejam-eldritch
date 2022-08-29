
import ancients from "./assets/Ancients/index.js";
import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js"
import {brownCards, blueCards, greenCards} from "./data/mythicCards/index.js"

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const htmlAncients = document.querySelectorAll(".ancient");
const htmlDifficulties = document.querySelectorAll('.difficulty');
const htmlDifficultiesList = document.querySelector('.difficulties');
const closedCardNode = document.querySelector('.closed-card');
const openedCardNode = document.querySelector('.opened-card');
const tableCellArray = [document.querySelectorAll('.first-row td'), document.querySelectorAll('.second-row td'), document.querySelectorAll('.third-row td')]


var firstStage = [], secondStage = [], thirdStage = [], allCards, greenCardsToChoose, brownCardsToChoose, blueCardsToChoose;


console.log(ancients, htmlAncients);
for (let i = 0; i < htmlAncients.length; i++){
  htmlAncients[i].setAttribute('id', Object.keys(ancients)[i]);
 // htmlAncients.style.backgroundImage = url(`${ancients[Object.keys(ancients)[i]]}`);
  htmlAncients[i].style.backgroundImage = `url(${ancients[Object.keys(ancients)[i]]})`;
  console.log(i);
}
var activeAncientNode, activeAncient;
for (let i = 0; i < htmlAncients.length; i++){
  htmlAncients[i].addEventListener('click', function(){
    if (activeAncientNode != undefined )
      activeAncientNode.classList.remove('active');
    activeAncientNode = htmlAncients[i];
    activeAncient =  ancientsData[i]
    activeAncientNode.classList.add('active');
    //console.log(activeAncient);
    htmlDifficultiesList.style.display = 'flex';
  })
}



for (let i = 0; i < htmlDifficulties.length; i++){
  htmlDifficulties[i].setAttribute('id', difficulties[i].id);
 // htmlAncients.style.backgroundImage = url(`${ancients[Object.keys(ancients)[i]]}`);
  htmlDifficulties[i].appendChild(document.createTextNode(`${difficulties[i].name}`))
 // console.log(i);
}

var activeDifficultyNode, activeDifficulty;
const htmlTable = document.querySelector('.table');

htmlDifficulties.forEach(htmlDifficulty => {
  htmlDifficulty.addEventListener('click', function(){
    if (activeDifficultyNode != undefined )
      activeDifficultyNode.classList.remove('active');
    activeDifficulty = undefined;
    activeDifficulty = difficulties.find(function(element){
      return element.id == htmlDifficulty.id;
    });
    activeDifficultyNode = htmlDifficulty;
    activeDifficultyNode.classList.add('active');
  })

  
})

for (let i = 0; i < htmlDifficulties.length; i++){
  htmlDifficulties[i].addEventListener('click', function(){
    allCards = brownCards.concat(blueCards.concat(greenCards));
    switch(activeDifficulty.id){
      case 'easy': allCards = allCards.filter(card => card.difficulty != 'hard');  shuffle(allCards);  break;
      case 'normal': shuffle(allCards);  break;
      case 'hard': allCards = allCards.filter(card => card.difficulty != 'easy'); shuffle(allCards);  break;
    }
    greenCardsToChoose = allCards.filter(card => card.color == 'green');
    brownCardsToChoose = allCards.filter(card => card.color == 'brown');
    blueCardsToChoose = allCards.filter(card => card.color == 'blue');
    firstStage = new Array();
    secondStage = new Array();
    thirdStage = new Array();
    //first Stage
    for (i = 0; i < activeAncient.firstStage.greenCards; i++)
      firstStage.push(greenCardsToChoose.pop());
    for (i = 0; i < activeAncient.firstStage.brownCards; i++)
      firstStage.push(brownCardsToChoose.pop());
    for (i = 0; i < activeAncient.firstStage.blueCards; i++)
      firstStage.push(blueCardsToChoose.pop());
    shuffle(firstStage);
    //second Stage
    for (i = 0; i < activeAncient.secondStage.greenCards; i++)
      secondStage.push(greenCardsToChoose.pop());
    for (i = 0; i < activeAncient.secondStage.brownCards; i++)
      secondStage.push(brownCardsToChoose.pop());
    for (i = 0; i < activeAncient.secondStage.blueCards; i++)
      secondStage.push(blueCardsToChoose.pop());
    shuffle(secondStage);
    //third Stage
    for (i = 0; i < activeAncient.thirdStage.greenCards; i++)
      thirdStage.push(greenCardsToChoose.pop());
    for (i = 0; i < activeAncient.thirdStage.brownCards; i++)
      thirdStage.push(brownCardsToChoose.pop());
    for (i = 0; i < activeAncient.thirdStage.blueCards; i++)
      thirdStage.push(blueCardsToChoose.pop());
    shuffle(thirdStage);
    
    tableCellArray.forEach(row =>{
      row.forEach(cell =>{
        cell.innerHTML = 0;
      })
    });
    firstStage.forEach(item => {
      switch(item.color){
        case 'green': tableCellArray[0][0].innerHTML++; break;
        case 'brown': tableCellArray[0][1].innerHTML++; break;
        case 'blue': tableCellArray[0][2].innerHTML++; break;
      }
    });
    secondStage.forEach(item => {
      switch(item.color){
        case 'green': tableCellArray[1][0].innerHTML++; break;
        case 'brown': tableCellArray[1][1].innerHTML++; break;
        case 'blue': tableCellArray[1][2].innerHTML++; break;
      }
    });
    thirdStage.forEach(item => {
      switch(item.color){
        case 'green': tableCellArray[2][0].innerHTML++; break;
        case 'brown': tableCellArray[2][1].innerHTML++; break;
        case 'blue': tableCellArray[2][2].innerHTML++; break;
      }
    });

    htmlTable.style.display = 'block';
    closedCardNode.style.visibility = 'visible';
    closedCardNode.addEventListener('click', giveNextCard);

    console.log(activeDifficulty, allCards);
    console.log(firstStage, secondStage, thirdStage);
  })
}


var tempCard;
function giveNextCard(){
  if (thirdStage.length > 0){
    if(firstStage.length > 0){
      openedCard = firstStage.pop();
      switch(openedCard.color){
        case 'green': tableCellArray[0][0].innerHTML--; break;
        case 'brown': tableCellArray[0][1].innerHTML--; break;
        case 'blue': tableCellArray[0][2].innerHTML--; break;
      }
      openedCardNode.style.backgroundImage = `url(${openedCard.cardFace})`;
    }
    else if (secondStage.length > 0){
      openedCard = secondStage.pop();
      switch(openedCard.color){
        case 'green': tableCellArray[1][0].innerHTML--; break;
        case 'brown': tableCellArray[1][1].innerHTML--; break;
        case 'blue': tableCellArray[1][2].innerHTML--; break;
      }
      openedCardNode.style.backgroundImage = `url(${openedCard.cardFace})`;
    }

    else if (thirdStage.length > 0){
      openedCard = thirdStage.pop();
      switch(openedCard.color){
        case 'green': tableCellArray[2][0].innerHTML--; break;
        case 'brown': tableCellArray[2][1].innerHTML--; break;
        case 'blue': tableCellArray[2][2].innerHTML--; break;
      }
      openedCardNode.style.backgroundImage = `url(${openedCard.cardFace})`;
    }

    openedCardNode.style.visibility = 'visible';
  }
  else {
    openedCardNode.style.visibility = 'hidden';
    closedCardNode.style.visibility = 'hidden';
    htmlTable.style.display = 'none';
    activeDifficulty = undefined;
    activeDifficultyNode.classList.remove('active');
    activeDifficultyNode = undefined;
    closedCardNode.removeEventListener('click', giveNextCard);

  }
}



console.log(ancientsData, difficulties);
console.log("it's fine");