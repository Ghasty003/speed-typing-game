"use strict";
const level = document.querySelector('#level');
const time = document.querySelector('.time');
const startgame = document.querySelector(".startgame");
const words = document.querySelector(".words");
const wordsInput = document.querySelector(".words-input");
let timeCheck = document.querySelector(".time-check");
const correct = document.querySelector(".correct");
let score = document.querySelector(".score");
const over = document.querySelector(".over");
const showModal = document.querySelector(".show-modal");
const closeModal = document.querySelector(".close-modal");
const modalContainer = document.querySelector(".container");
startgame.addEventListener("click", startGame);
level.addEventListener("change", checkLevelPicked);
function startGame() {
    startgame.style.opacity = '0';
    setTimeout(() => {
        startgame.style.visibility = 'hidden';
    }, 1000);
    assignWord();
    enableInput();
    disableLevels();
    reduceTime();
    isGameOver();
    autoFocusOnInput();
}
function enableInput() {
    wordsInput.disabled = false;
}
function disableLevels() {
    level.disabled = true;
}
var Levels;
(function (Levels) {
    Levels[Levels["easy"] = 5] = "easy";
    Levels[Levels["medium"] = 3] = "medium";
    Levels[Levels["hard"] = 2] = "hard";
})(Levels || (Levels = {}));
function checkLevelPicked() {
    if (level.value === 'easy') {
        time.innerHTML = String(Levels.easy);
    }
    else if (level.value === 'medium') {
        time.innerHTML = String(Levels.medium);
    }
    else {
        time.innerHTML = String(Levels.hard);
    }
}
const arrayOfWords = ["Javascript", "Boiler", "Milk", "Fresh", "Yoghurt", "Parse", "Conclude", "Kitchen", "Cook", "Home", "Random", "Language", "Find", "Seek", "Saw", "Return"];
function selectWords() {
    const i = Math.floor(Math.random() * 16);
    return arrayOfWords[i];
}
function assignWord() {
    words.innerHTML = selectWords();
}
function reOrderArrayOfwords() {
    arrayOfWords.sort(() => {
        return 0.5 - Math.random();
    });
}
setInterval(reOrderArrayOfwords, 100);
function assign(some) {
    if (typeof some === 'string') {
        return parseInt(some);
    }
    else {
        return some;
    }
}
let scoreCount = 0;
let timeCount;
let checkMate = 0;
function reduceTime() {
    timeCheck.innerHTML = time.innerHTML;
    timeCount = assign(timeCheck.innerHTML);
    const loop = setInterval(() => {
        if (typeof timeCount == 'number') {
            timeCount--;
            if (timeCount == 0) {
                clearInterval(loop);
                checkTimeElapse();
            }
        }
        timeCheck.innerHTML = String(timeCount);
    }, 1000);
}
function checkTimeElapse() {
    startgame.style.opacity = '1';
    startgame.style.visibility = 'visible';
    level.disabled = false;
    wordsInput.value = '';
    wordsInput.disabled = true;
    correct.style.display = 'none';
    score.innerHTML = '0';
    checkMate = 0;
    showGameOver();
}
function isGameOver() {
    over.style.display = 'none';
}
function showGameOver() {
    over.style.display = 'block';
}
wordsInput.addEventListener('keyup', checkValidation);
function checkValidation() {
    if (wordsInput.value == words.innerHTML && level.value == 'easy') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 5;
        increaseScore();
    }
    else if (wordsInput.value == words.innerHTML && level.value == 'medium') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 3;
        increaseScore();
    }
    else if (wordsInput.value == words.innerHTML && level.value == 'hard') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 2;
        increaseScore();
    }
    checkHighscore();
}
function increaseScore() {
    scoreCount = 0;
    scoreCount += checkMate;
    if (typeof scoreCount === 'number') {
        score.innerHTML = String(scoreCount);
    }
}
showModal.addEventListener("click", showHighscoreModal);
closeModal.addEventListener("click", hideHighscoreModal);
function showHighscoreModal() {
    modalContainer.style.display = 'block';
    setHighScore();
}
function hideHighscoreModal() {
    modalContainer.style.display = 'none';
    modalContainer.classList.add('hidemodal');
}
function autoFocusOnInput() {
    wordsInput.focus();
}
let easyHighscore = document.querySelector(".easy-highscore");
let mediumHighscore = document.querySelector(".medium-highscore");
let hardHighscore = document.querySelector(".hard-highscore");
window.addEventListener("load", checkExistence);
console.log(localStorage.getItem('easyUpd'));
function checkExistence() {
    if (level.value === 'easy' && localStorage.getItem('easyUpd') === null) {
        console.log("Hello");
        easyHighscore.innerHTML = '0';
    }
    else if (level.value === 'medium' && localStorage.getItem('mediumUpd') === null) {
        mediumHighscore.innerHTML = '0';
    }
    else if (level.value === 'hard' && localStorage.getItem('hardUpd') === null) {
        hardHighscore.innerHTML = '0';
    }
}
function checkHighscore() {
    if (level.value === 'easy') {
        if (Number(easyHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("easyUpd", score.innerHTML);
            easyHighscore.innerHTML = localStorage.getItem("easyUpd");
        }
    }
    else if (level.value === 'medium') {
        if (Number(mediumHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("mediumUpd", score.innerHTML);
            mediumHighscore.innerHTML = localStorage.getItem("mediumUpd");
        }
    }
    else if (level.value === 'hard') {
        if (Number(hardHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("hardUpd", score.innerHTML);
            hardHighscore.innerHTML = localStorage.getItem("hardUpd");
        }
    }
}
function setHighScore() {
    easyHighscore.innerHTML = localStorage.getItem("easyUpd");
    mediumHighscore.innerHTML = localStorage.getItem("mediumUpd");
    hardHighscore.innerHTML = localStorage.getItem("hardUpd");
}
