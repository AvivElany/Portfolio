let heightInput = document.querySelector('.height input');
let weightInput = document.querySelector('.weight input');
let calculateBtn = document.querySelector('.calculate-btn');
let bmiTxt = document.querySelector('.result-box .bmi h3');
let resultBox = document.querySelector('.result-box');
let health_status = document.querySelector('.result-box .result');

calculateBtn.addEventListener('click', () => {
        if (heightInput.value != '' && weightInput.value != '') {
                calculateBmi();
        }
})

let calculateBmi = () => {
        let weightvalue = weightInput.value;
        let heightvalue = heightInput.value;

        let bmi = (weightvalue / Math.pow((heightvalue / 100), 2)).toFixed(1);

        if (bmi < 18.5) {
                health_status.innerHTML = 'You are Underweight!<br> You need to eat!';
                health_status.style.color = '#c3d400';
        }

        else if (bmi >= 18.5 && bmi <= 24.9) {
                health_status.innerHTML = 'You are Normal Weight<br> You neet to keep it!';
                health_status.style.color = '#4AC38D';
        }

        else if (bmi >= 25 && bmi <= 29.9) {
                health_status.innerHTML = 'You are Over Weight<br>You have to work!';
                health_status.style.color = '#e63333';
        }

        else {
                health_status.innerHTML = 'You are in the obese range<br>You must go to the gym! ';
                health_status.style.color = '#b90000';
        }
        bmiTxt.innerHTML = bmi;
        resultBox.style.display = 'block';
}
