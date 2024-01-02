'use strict'

const projectContainer = document.querySelector('#about');

let html = [];

const singleProject = async (projectID) => {

        const response = await fetch('./data.json');
        const data = await response.json();
        const projects = data.projects;

        

        let ID = projectID - 1;
        
        html += `
        <div class="about-img">
        <img src="${projects[ID].thumbnail}" title="${projects[ID].title}" alt="${projects[ID].title}" /><br>
        <div class="tech">`

        for (let j = 0; j < projects[ID].tech.length; j++) {
                html += `<img src="${projects[ID].tech[j]}" title="${projects[ID].tech[j]}" alt="${projects[ID].tech[j]}">`
        }
                        console.log("projectID is:" + projectID);
                        console.log("ID is:" + ID);
                        console.log(projects[ID].title);
        html += `
        </div>
        </div>
        
                <div class="about-content">
                        <h2 class="heading">${projects[ID].title}</h2>
                        <p class="heb">
                        ${projects[ID].shortDescription}
                        </p>
                        <p class="heb">
                        ${projects[ID].longDescription}
                        </p>
                        <p>
                        <a href="${projects[ID].open}" class="btn">Open</a>
                        <a href="${projects[ID].github}" class="btn">GitHub</a>
                        </p>
                        <p class="heb note">
                        ${projects[ID].note}
                        </p>
                </div>
        `
        console.log(projectID);

        document.title = `${projects[ID].title}`;
        
        projectContainer.innerHTML = html;
}

//query string and URL using

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const projectID = urlParams.get('id');

singleProject(projectID);
