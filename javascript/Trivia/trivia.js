'use strict'

const questions = [
    {
    question: 'בכמה מדינות גובלת ישראל?',
    answer: ['1','2','3','4'],
    correctAnswer: '4',
    },
    {
    question: 'מי הישראלית שמשחקת בסדרת הסרטים מהיר ועצבני?',
    answer: ['בר רפאלי','גל גדות','שרי גבעתי','נינט טייב'],
    correctAnswer: 'גל גדות',
    },
    {
    question: 'מה שמו המלא של הזמר המכונה סטטיק?',
    answer: ['עידן חביב','אוהד אלימלך','שובל איינשטיין','לירז רוסו'],
    correctAnswer: 'לירז רוסו',
    },
    {
    question: 'איזו ועדה חקרה את מלחמת יום הכיפורים?',
    answer: ['שמגר','אגרנט','וינוגרד','קישוט'],
    correctAnswer: 'אגרנט',
    },
    {
    question: 'באיזה איבר בגוף נמצאת הלחמית?',
    answer: ['עיניים','אוזניים','ידיים','בטן'],
    correctAnswer: 'עיניים',
    },
    {
    question: 'מי היה הספורטאי הראשון שהביא לישראל מדליית זהב אולימפית?',
    answer: ['ארטיום דולגופיאט','אריק זהבי','יעל ארד','גל פרידמן'],
    correctAnswer: 'גל פרידמן',
    },
    {
    question: 'מהו סכום הזוויות במרובע',
    answer: ['180','360','540','720'],
    correctAnswer: '360',
    },
    {
    question: 'כיצד כונה בינימין זאב הרצל',
    answer: ['הראשון לציון','צייד הראשים','חוזה המדינה','הוזה הגבולות'],
    correctAnswer: 'חוזה המדינה',
    },
    {
    question: 'כיצב נקרא הקו הראשון של הרכבת הקלה בישראל',
    answer: ['ירוק','צהוב','סגול','אדום'],
    correctAnswer: 'אדום',
    },
    {
    question: 'באיזה עיר הוקדמה יצרנית הרכב וולוו?',
    answer: ['טורקיה','שוודיה','יפן','גרמניה'],
    correctAnswer: 'שוודיה',
    },
    
];

let score = 0;
let currentQuestionIndex = 0;

const elmProgress = document.querySelector('#questionNum');
const elmScore = document.querySelector('#totalScore');
const elmQuestion = document.querySelector('#question');
const elmAnswers = document.querySelector('#answers');

function userChoose(answerButton) {

  const answer = answerButton.innerText;

  // 1. is the answer correct ? if yes: add 10 points to score
  if (answer === questions[currentQuestionIndex].correctAnswer) {
    score += 10;
  }

  // 2. advance one question (currentQuestionIndex++)
  currentQuestionIndex++;

  // 3. get rid of previous answer elements
  elmAnswers.innerHTML = '';

  // 4. update the UI (html)
  updateDisplay();
}

function updateDisplay() {

  elmScore.innerText = `${score} נקודות`;
  const answerElementsArray = document.querySelectorAll('.answer');

  // is game over ?
  if (questions.length === currentQuestionIndex) {
    elmProgress.innerText = `שאלה ${currentQuestionIndex} מתוך ${questions.length}`;
    elmQuestion.innerHTML = 
    `
      המשחק הסתיים
      </br></br>
      צברת ${score} נקודות
      </br>
      מתוך סך הכל ${questions.length*10} אפשריות
    `;
    for (let i=0; i<answerElementsArray.length; i++) {
      answerElementsArray[i].remove();
    };

    const saveHSToLS = () => {
        if(window.localStorage.getItem('Trivia-high-score')<score){
          window.localStorage.setItem('Trivia-high-score',score)
        }
      }

      saveHSToLS();
    return;
  }

  elmProgress.innerText = `שאלה ${currentQuestionIndex+1} מתוך ${questions.length}`;

  elmQuestion.innerText = questions[currentQuestionIndex].question;

  // create answer elements ...
  const numberOfAnswers = questions[currentQuestionIndex].answer.length

  for (let i=0; i<numberOfAnswers; i++) {
    const answerElement = document.createElement('button');
    answerElement.classList.add('answer');
    answerElement.onclick = function() {userChoose(this)};
    answerElement.innerText = questions[currentQuestionIndex].answer[i]
    elmAnswers.appendChild(answerElement);
  };

}

updateDisplay();