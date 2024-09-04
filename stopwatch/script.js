// script.js
let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');

    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    stopButton.disabled = true;
}

function recordLap() {
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsContainer.appendChild(lapItem);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

updateDisplay(); // Initialize display
stopButton.disabled = true;
