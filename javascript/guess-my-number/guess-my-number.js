'use strict'

// reference html elements:
// ------------------------

const elmGuessInput = document.querySelector('#guessInput');
const elmLastGuess = document.querySelector('.number');
const elmScore = document.querySelector('.score');
const elmHighScore = document.querySelector('.highscore');
const elmEverHighScore = document.querySelector('.everhighscore');
const elmMessage = document.querySelector('.message');
const elmBody = document.querySelector('body');
const elmCheckButton = document.querySelector('#checkButton');


// ---------------------

let score = 100;
let highScore = 0;
let secretNumber = Math.trunc((Math.random()*20) + 1);

/*console.log(`Random number is: ${secretNumber}`);*/

function again() {
  // 1. reset variable (except high-score)
  score = 100;
  elmScore.innerHTML = score;
  
  // 2. reset html texts
  elmGuessInput.value = '';
  elmScore.innerText = 100;
  elmLastGuess.innerText = '?';
  elmMessage.innerText = 'Start guessing...';

  elmCheckButton.innerText = 'Check!';
  elmCheckButton.style.fontSize = '2rem';
  elmCheckButton.disabled = false;

  
  // 3. reset bg-color
  elmBody.style.backgroundColor = '#222';
  
  // 4. generate new secret number
  secretNumber = Math.trunc((Math.random()*20) + 1);
  console.log(`Random number is: ${secretNumber}`);
}

function check() {
  const guess = Number(elmGuessInput.value);
  console.log(guess);

  if(guess < 0 || guess > 20) {
    elmMessage.innerText = 'Enter a number between 1 to 20';
    elmLastGuess.innerText = '?'; //Back to neutral input
    elmBody.style.backgroundColor = '#222'; //Back to a neutral background
    return;
  }
  
  if(guess===secretNumber){ //user guess correct
    elmMessage.innerText = 'You Won!';
    elmLastGuess.innerText = guess;
    elmBody.style.backgroundColor = '#41692d';
    elmCheckButton.innerText = 'press "Again"!';
    elmCheckButton.disabled = true;

    if(highScore===100){
        elmMessage.innerText = 'You amazing!'
        elmCheckButton.innerText = 'press "Again"!';
        elmCheckButton.disabled = true;
      }

    if(score > highScore){
      highScore = score;
      elmHighScore.innerText = highScore;

      const saveHSToLS = () => {
        if(window.localStorage.getItem('GMN-high-score')<highScore){
          window.localStorage.setItem('GMN-high-score',highScore)
        }
      }

      saveHSToLS();
      
    }
    } else {
      elmMessage.innerText = (guess>secretNumber) ? 'Too High' : 'Too Low'; //a ternary  operator that displays the direction of the correct answer
      elmLastGuess.innerText = guess;
      elmBody.style.backgroundColor = '#8a2727';
      score -= 10;
      elmScore.innerText = score;

      if(score===0) {
        elmMessage.innerText = `You Lost!
        try anoter game.`;
        elmCheckButton.innerText = 'press "Again"!';
        elmCheckButton.disabled = true; //The game is over - the button is off
        return;
      }
      
    }


}