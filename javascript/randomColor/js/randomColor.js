const getColor = () => {
    //Make random
    const randomNumber = Math.floor(Math.random() * 16777215);
    const randomCode = "#" + randomNumber.toString(16);

    //Directly change background and button
    document.body.style.backgroundColor = randomCode;
    document.querySelector("#color-code").innerText = randomCode;
}

//Display button
document.querySelector("#btn").addEventListener(
    "click",
    getColor
)

// Generate call
getColor();