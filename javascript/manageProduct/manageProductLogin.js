'use strict'

const userName = document.querySelector('#userName');
const employeeNumber = document.querySelector('#employeeNumber');
const password = document.querySelector('#password');

let counter=0;
function login() {
    if (userName.value === 'hackeru' && employeeNumber.value === '1306' && password.value === 'hack1306') {
        alert('You Alredy GO, Pleasr Wait.')
        window.open('./manageProduct.html');
    } else {
        counter++;
        if (counter === 3) {
            document.querySelector('#button').disabled = true;
            alert('You failed 3 time, open JS code');
        } else {
            alert('Try Again');
        }
    }
}



