/* 'use strict'
 */
let timer;

function startTimer() {
    const hours = document.getElementById("hours").value;
    const minutes = document.getElementById("minutes").value;
    const seconds = document.getElementById("seconds").value;

    let totalTime = (hours * 3600) + (minutes * 60) + (seconds); // sum all seconds

    if (totalTime <= 0) {
        alert('Please set a valid time before starting.');
        return;
    }

    document.getElementById("input-section").style.display = 'none';
    document.getElementById("display-section").style.display = 'flex';
    
    if (timer) {
        clearInterval(timer);
    }
    
    timer = setInterval(
        function() {
            if (totalTime <= 0) {
                clearInterval(timer);
                alert("Time's Up!!");
                return;
            }
            
            const displayHours = Math.floor(totalTime / 3600);
            const displayMinutes = Math.floor((totalTime % 3600) / 60);
            const displaySeconds = totalTime % 60;
            
            document.getElementById("displayHours").textContent = String(displayHours).padStart(2, '0');
            document.getElementById("displayMinutes").textContent = String(displayMinutes).padStart(2, '0');
            document.getElementById("displaySeconds").textContent = String(displaySeconds).padStart(2, '0');
            
            document.title = ('Time To Go ' + timer);
            totalTime--;
        }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
    }
    
    document.getElementById("input-section").style.display = 'flex';
    document.getElementById("display-section").style.display = 'none';
};