
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
    console.log(activeAncient);
  })
}



for (let i = 0; i < htmlDifficulties.length; i++){
  htmlDifficulties[i].setAttribute('id', difficulties[i].id);
 // htmlAncients.style.backgroundImage = url(`${ancients[Object.keys(ancients)[i]]}`);
  htmlDifficulties[i].appendChild(document.createTextNode(`${difficulties[i].name}`))
  console.log(i);
}

var activeDifficultyNode, activeDifficulty;
for (let i = 0; i < htmlDifficulties.length; i++){
  htmlDifficulties[i].addEventListener('click', function(){
    if (activeDifficultyNode != undefined )
      activeDifficultyNode.classList.remove('active');
    activeDifficulty = difficulties[i];
    activeDifficultyNode = htmlDifficulties[i];
    activeDifficultyNode.classList.add('active');
    console.log(activeDifficulty);
  })
}

const openedCardNode = document.querySelector('.opened-card');
var openedCard = brownCards[Math.floor(Math.random() * brownCards.length)];
openedCardNode.style.backgroundImage = `url(${openedCard.cardFace})`;


console.log(ancientsData, difficulties);
console.log("it's fine");