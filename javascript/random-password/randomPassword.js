// kind of characters
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerSet = "abcdefghijklmnopqrstuvwxyz"
const numberSet = "1234567890"
const symbolSet = "~!@#$%^&*()_+/"
const hebrewSet = "אבגדהוזחטיכךלמםנןסעפףצץקרשת"

// query Selectors
const passBox = document.querySelector("#pass-box")
const totalChar = document.querySelector("#total-char")
const upperInput = document.querySelector("#upper-case")
const lowerInput = document.querySelector("#lower-case")
const numberInput = document.querySelector("#numbers")
const symbolInput = document.querySelector("#symbols")
const hebrewInput = document.querySelector("#hebrew")


// A function that extracts characters from the given array according to each category

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)] //גולת הכותרת
}

// .checked mean if the checked radio button is clicked
// If clicked added that kind of character to final password

passBox.innerText = "Try New Password";

const generatePassword = (password = "") => {
    if (upperInput.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet)
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet)
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet)
    }
    if (hebrewInput.checked) {
        password += getRandomData(hebrewSet)
    }
    if (password.length < totalChar.value) {
        return generatePassword(password)
    }

    passBox.innerText = truncateString(password, totalChar.value);
}

generatePassword();

document.querySelector("#btn1").addEventListener(
    "click",
    function() {
        generatePassword();
    }

)

document.querySelector("#btn2").addEventListener(
    "click",
    function() {
        passBox.innerText = "Try New Password"
    }

)

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}