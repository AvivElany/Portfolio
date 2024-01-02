'use strict'

let playerScore = 0;
let coputerScore = 0;
let gameCounter = 0;

const playerScreenScore = document.querySelector('.player-score');
const computerScreenScore = document.querySelector('.computer-score');
const rockId = document.querySelector('#rock');
const paperId = document.querySelector('#paper');
const scissorsId = document.querySelector('#scissors');
const result = document.querySelector('#result');
const computerChoice = document.querySelector('#computer-choice');
const playAgain = document.querySelector('#play-again');

const choiceButtons = document.querySelector('.choices'); //להדפסת תוצאת המחשב

/* const handRock = document.querySelector('#fas fa-hand-rock'); */

playerScreenScore.innerText = ` Player Scores: ${playerScore}`;
computerScreenScore.innerText = ` Computer Scores: ${coputerScore}`;

let computerRandomChoise = 0;

function randComputerChoice() {
    computerRandomChoise = Math.trunc((Math.random() * 3) + 1);
    /* return computerRandomChoise; */
}

/* randComputerChoice(); */

//  בלחיצה על אחת מהאופציות אבן נייר או מספריים האופציה שנבחרה תקלט 
//  במקביל תופיע בחירה רנדומלית של המחשב מתוך 3 מספרים ששווים לסימנים , מתחת למשפט בחר את הנשק שלך ובמקומו יופיע שם המנצח + הבחירה של כל אחד מהם
//  למנצח תתווסף נקודה ללוח הנקודות הפרטי שלו וליוזר יש אופציה ללחוץ על הכפתור שחק שוב כדי להחזיר את הלוח לנק' ההתחלה בכל שלב
//  לאחר לחיצה על "שחק שוב" הבחירה הרנדומלית של המחשב תעלם , המשפט בחר את הנשק יופיע חזרה, והנקודות בלוח הניקוד יתאפסו 
//  במידה ואחד המשתתפים מגיע ל-10 נק' יעלמו אופציות הבחירה ויופיע שם המנצח בגדול
//  לאחר מכן תשאר ליוזר האופציה "שחק שוב" בלבד כדי להמשיך וכל המשתנים יתאפסו לפי הגדרות הכפתור "שחק שוב"

function rock() {
    randComputerChoice()
    /* for (let i = 0; i < 1; i++) {
    let computerRandomChoise = Math.trunc((Math.random() * 3) + 1); 
     */
    {
        if (computerRandomChoise === 1) {
            computerChoice.innerHTML = `<i class="fas fa-hand-rock" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Rock VS Rock - It's a Draw";
        }

        if (computerRandomChoise === 2) {
            computerChoice.innerHTML = `<i class="fas fa-hand-paper" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Rock VS Paper - Computer win";
            coputerScore += 1;
            computerScreenScore.innerText = ` Computer Scores: ${coputerScore}`;
        }

        if (computerRandomChoise === 3) {
            computerChoice.innerHTML = `<i class="fas fa-hand-scissors" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Rock VS Scissors - You win";
            playerScore += 1;
            playerScreenScore.innerText = ` Player Scores: ${playerScore}`;
        }

    }
    gameCounter++;
    counter();
}

function paper() {
    randComputerChoice()
    /*   for (let i = 0; i < 1; i++) {
          let computerRandomChoise = Math.trunc((Math.random() * 3) + 1); 
      */
    {
        if (computerRandomChoise === 1) {
            computerChoice.innerHTML = `<i class="fas fa-hand-rock" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Paper VS Rock - You win";
            playerScore += 1;
            playerScreenScore.innerText = ` Player Scores: ${playerScore}`;
        }

        if (computerRandomChoise === 2) {
            computerChoice.innerHTML = `<i class="fas fa-hand-paper" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Paper VS Paper - It's a Draw";
        }

        if (computerRandomChoise === 3) {
            computerChoice.innerHTML = `<i class="fas fa-hand-scissors" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Paper VS Scissors - Computer win";
            coputerScore += 1;
            computerScreenScore.innerText = ` Computer Scores: ${coputerScore}`;
        }

    }
    gameCounter++;
    counter();
}

function scissors() {
    randComputerChoice()
    /* for (let i = 0; i < 1; i++) {
        let computerRandomChoise = Math.trunc((Math.random() * 3) + 1); 
    */
    {
        if (computerRandomChoise === 1) {
            computerChoice.innerHTML = `<i class="fas fa-hand-rock" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Scissors VS Rock - Computer win";
            coputerScore += 1;
            computerScreenScore.innerText = ` Computer Scores: ${coputerScore}`;
        }

        if (computerRandomChoise === 2) {
            computerChoice.innerHTML = `<i class="fas fa-hand-paper" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Scissors VS Paper - You win";
            playerScore += 1;
            playerScreenScore.innerText = ` Player Scores: ${playerScore}`;
        }

        if (computerRandomChoise === 3) {
            computerChoice.innerHTML = `<i class="fas fa-hand-scissors" style="border: 2px solid var(--main-color); border-radius: 10px; margin: 10px 2rem; padding: 1rem; background-color: #FFFFFF; align-items: center;"></i>`;
            result.innerText = "Scissors VS Scissors - It's a Draw";
        }

    }
    gameCounter++;
    counter();
}

function counter() {
    if (gameCounter === 10 || gameCounter % 10 === 0) {
        /*  choiceButtons.disabled = true; */
        choiceButtons.innerHTML = `<p style="font-size: 45px;" >GAME OVER</p`;
        result.innerText = 'We Finnish';
        if (playerScore > coputerScore) {
            computerChoice.innerText = `The Winner Is: The Player!!!`;
        }
        if (coputerScore > playerScore) {
            computerChoice.innerText = `The Winner Is: The Computer!!!`;
        }
        if (coputerScore === playerScore) {
            computerChoice.innerText = `There is no Winner! It's a Draw - try again.`;
        }

        const saveHSToLS = () => {
        if(window.localStorage.getItem('RPS-high-score')<playerScore){
          window.localStorage.setItem('RPS-high-score',playerScore)
        }
      }

      saveHSToLS();
    }
}

function playagain() {
    playerScore = 0;
    coputerScore = 0;
    playerScreenScore.innerText = ` Player Scores: ${playerScore}`;
    computerScreenScore.innerText = ` Computer Scores: ${coputerScore}`;
    choiceButtons.innerHTML = `<div class="choice" id="rock" onclick="rock()">
    <i class="fas fa-hand-rock"></i>
    </div>
    <div class="choice" id="paper" onclick="paper()">
    <i class="fas fa-hand-paper"></i>
    </div>
    <div class="choice" id="scissors" onclick="scissors()">
    <i class="fas fa-hand-scissors"></i>
    </div>`;
    computerChoice.innerHTML = "";
    result.innerText = "Choose your weapon!";
}