let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, digits = 2) {
  return num.toString().padStart(digits, '0');
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCounter = 1;
  timeDisplay.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCounter++}: ${lapTime}`;

  const previous = lapsList.querySelector('.highlight');
  if (previous) previous.classList.remove('highlight');

  li.classList.add('highlight');
  lapsList.prepend(li);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
