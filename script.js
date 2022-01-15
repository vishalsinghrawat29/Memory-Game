const cards = document.querySelectorAll('.memory-card');
const times = document.getElementById('time');
const textMsg = document.getElementById('win');
const totalscore =  document.getElementById('total');

let hasFlippedCard =  false;
let lockBoard = false;
let firstCard, secondCard;
var left = 4;
var timer = 30;
var s;
var c;
var score =  0;
var countMatch = 0;
var msg;
var ts;
function stopcount(){
    if(countMatch === 8){
        clearInterval(s);
        message();
    }
}
function message(){
    if(timer === 0){
        if(countMatch === 8){
            msg = 'Congratulations!! 💐';
            ts = 'Your Score: ' + score + ' Points in ' + (30 - timer) + ' sec';
        }else {
            msg = 'Try Again!! 👍';
            ts = 'Your Score: ' + score + ' Points in ' + (30 - timer) + ' sec';
        }
    }
    else{
        if(countMatch === 8){
            msg = 'Congratulations!! 💐';
            ts = 'Your Score: ' + score + ' Points in ' + (30 - timer) + ' sec';
        }
    }
    textMsg.innerHTML = msg;
    totalscore.innerHTML = ts;
}
function leftTime(){
    timer--;
    times.innerHTML =  timer + ' sec left to End';
    if(timer == 0){
        clearInterval(s);
        message();
        cards.forEach(card => card.removeEventListener('click', flipCard));
    }
}
function scoreCount(){
    if(timer<=30 && timer>20){
        score+=parseInt(10);
    }else if(timer<=20 && timer>10){
        score+=parseInt(5);
    }else if(timer<=10 && timer>0){
        score+=parseInt(2);
    }
    document.getElementById('score').innerHTML = score + ' Points';
}
function viewTimer(){
    cards.forEach(card => card.classList.add('autoflip'));
    c = setInterval(() => {
        showTimer();
     }, 1000);
}
function showTimer(){
    left--;
    if(left === 0){
        clearInterval(c);
        cards.forEach(card => card.classList.remove('autoflip'));
        cards.forEach(card => card.addEventListener('click', flipCard));
        s = setInterval(() => {
            leftTime();
          }, 1000);
    }
    times.innerHTML = left + " sec left to Start";
}
function flipCard() {
    if(lockBoard) return;
    if(this ===  firstCard) return ;
  this.classList.add('flip');
  if(!hasFlippedCard){
      //first click
      hasFlippedCard =  true;
      firstCard =  this;
  }else{
      //second click
      hasFlippedCard =  false;
      secondCard =  this;
      checkForMatch();
    }
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework ;
    //do card match ?
    if(isMatch){
        //it's match
        scoreCount();
       disableCard();
       countMatch++;
       stopcount();
    }else{
        //not a match
       unFlipCard();    
    }
}
function disableCard(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
function unFlipCard(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },400)
}
function resetBoard(){
    hasFlippedCard = false;
    lockBoard =  false;
    firstCard = null;
    secondCard = null;
}
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  document.getElementById('startButton').style.display='none';
  document.getElementById('score').style.display='block';
  viewTimer(); 
}





