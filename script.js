const startButton = document.getElementById("startBtn");
const timer = document.getElementById('time');
const text = document.getElementById('text');
const resetButton = document.getElementById('resetBtn');
const oneSec = 1000, min = 60;

const getRandomText = () => {
    const { words } = textList[Math.floor(Math.random() * textList.length)];
    text.innerHTML = words;
};

let newText = document.getElementById('myText');
let newTextArray = newText.innerHTML.split('');
let testFinished = false;
let seconds = 60;
let index = 0, indexNewText = 0;
let wrongWords = 0;
let result = document.createElement('div');
result.id = 'result';
document.body.appendChild(result);

timer.innerHTML = '01:00';

getRandomText();

startButton.addEventListener('click', startTypingTest);

function startTypingTest() {
    startButton.disabled = true;
    countdown();
    startButton.style.cursor = 'auto';
    document.addEventListener('keypress', checkLetters);
    newText.style.display = 'block';
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.addEventListener('load', () => {
        const input = document.createElement('input');
        input.style.position = 'absolute';
        input.style.opacity = 0;
        input.style.height = 0;
        input.style.width = 0;
        input.style.border = 'none';
        document.body.appendChild(input);
        input.focus();
    });
}
}

function countdown() {
    let minutes = Math.floor(seconds / min);
    let remainingSeconds = seconds % min;
    let time;

    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    timer.innerHTML = `0${minutes}:${remainingSeconds}`;

    if (seconds === 0) {
        clearInterval(countdown);
        timer.innerHTML = 'Time is up!';
        testFinished = true;
        document.removeEventListener('keypress', checkLetters);
        checkingWords();
    } else {
        --seconds;
        time = setTimeout(countdown, oneSec);
    }
    if (testFinished) {
        clearTimeout(time);
        updateWrongWords();
    }
}

function checkLetters(e) {
    let key;
    let textLetters = text.innerHTML.split('');
    if (window.event) {
        key = e.keyCode;
    }
    key = String.fromCharCode(key).toLowerCase();
    if (key === ' ' && textLetters[index] !== ' ') {
        e.preventDefault();
        return;
    }
    if (key === textLetters[index]) {
        newText.innerHTML += `${key}`;
        newTextArray[indexNewText] = `<span style="color: green;">${key}</span>`;
        newText.innerHTML = newTextArray.join('');
        ++index;
    } else {
        newText.innerHTML += `${key}`;
        newTextArray[indexNewText] = `<span style="color: red;">${key}</span>`;
        newText.innerHTML = newTextArray.join('');
    }
    ++indexNewText;
    if (index >= textLetters.length) {
        testFinished = true;
        document.removeEventListener('keypress', checkLetters);
        checkingWords();
        updateWrongWords();
    }
}

function checkingWords() { 
    let textWords = text.innerHTML.split(' ');
    let newTextWords = newText.innerText.split(' ');
    for (let i = 0; i < textWords.length; ++i) {
        if (textWords[i] !== newTextWords[i]) {
            ++wrongWords;
        }
    }
}

function updateWrongWords() {
    if (testFinished) {
        result.innerHTML = `You have ${wrongWords}/${text.innerHTML.split(' ').length} wrong words`;
        document.body.appendChild(result);
        resetButton.style.display = 'flex';
        resetButton.onclick = () => location.reload();
    }
}
