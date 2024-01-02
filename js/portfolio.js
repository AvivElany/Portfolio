'use strict'

const audio = document.getElementById("player");
const jsSection = document.querySelector('#jsSection');
const htmlSection = document.querySelector("#htmlSection");

const contact = () => {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const Message = document.querySelector('#Message').value;

    if (name) {
        alert(`Hello ${name}! Your Message sent.`);
    } else {
        alert('Invalid Input');
    }

    window.localStorage.setItem('email', email)
}

const projects = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();
    const projects = data.projects;

    console.log(projects);

    let htmlJS = [];
    let htmlHTML = [];

    for (let i = 0; i < projects.length; i++){
        console.log(projects);
        if (projects[i].kind === 'js') {
            console.log(projects[i]);

            htmlJS += `
            <div class="portfolio-card">
                <img src="${projects[i].thumbnail}" title="${projects[i].title}" alt="${projects[i].title}">
                <div class="overlay">
                    <h3>${projects[i].title}</h3>
                    <p>${projects[i].shortDescription}</p>
                    <button onclick="openProject(${projects[i].id})">See More -></button>
                </div>
            </div>
            `
        } else if (projects[i].kind === 'html') {

            htmlHTML += `
            <div class="portfolio-card">
                <img src="${projects[i].thumbnail}" title="${projects[i].title}" alt="${projects[i].title}">
                <div class="overlay">
                    <h3>${projects[i].title}</h3>
                    <p>${projects[i].shortDescription}</p>
                    <button onclick="openProject(${projects[i].id})">See More -></button>
                </div>
            </div>
            `
        }
        jsSection.innerHTML = htmlJS;
        htmlSection.innerHTML = htmlHTML;
    }
}

projects();

const openProject = async (productID) => {
    window.open(`singleProject.html?id=${productID}`); //open in new tab and use query string
}
