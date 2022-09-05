//Refrences
const level = document.querySelector('#level') as HTMLSelectElement;
const time = document.querySelector('.time') as HTMLHeadElement;
const startgame = document.querySelector(".startgame") as HTMLButtonElement;
const words = document.querySelector(".words") as HTMLHeadElement;
const wordsInput = document.querySelector(".words-input") as HTMLInputElement;
let timeCheck = document.querySelector(".time-check") as HTMLSpanElement;
const correct = document.querySelector(".correct") as HTMLParagraphElement;
let score = document.querySelector(".score") as HTMLSpanElement;
const over = document.querySelector(".over") as HTMLParagraphElement;
const showModal = document.querySelector(".show-modal") as HTMLButtonElement;
const closeModal = document.querySelector(".close-modal") as HTMLHeadElement;
const modalContainer = document.querySelector(".container") as HTMLDivElement;


//Initialize game.

startgame.addEventListener("click", startGame)
level.addEventListener("click", checkLevelPicked);

function startGame():void {

    startgame.style.opacity = '0';
    
    setTimeout( () => {

        startgame.style.visibility = 'hidden';
    }, 1000);

    assignWord();
    enableInput();
    disableLevels();
    reduceTime();
    isGameOver();
    autoFocusOnInput();

}

//Enable input

function enableInput():void {

    wordsInput.disabled = false;
}

//Disable Levels picking on start Game

function disableLevels():void {

    level.disabled = true;
}

// Levels

enum Levels {
    easy = 5,
    medium = 3,
    hard = 2
}

//Check the level picked and set time based on it.

function checkLevelPicked():void {

    if( level.value === 'easy' ) {

        time.innerHTML = String(Levels.easy);
    }

    else if( level.value === 'medium' ) {

        time.innerHTML = String(Levels.medium);
    }

    else {

        time.innerHTML = String(Levels.hard);
    }
}

//Generated words

const arrayOfWords: string[] = ["Javascript", "Boiler", "Milk", "Fresh", "Yoghurt", "Parse", "Conclude", "Kitchen", "Cook", "Home", "Random", "Language", "Find", "Seek", "Saw", "Return"]


//Select words randomly

function selectWords():string {

    const i = Math.floor( Math.random() * 16 );
    
    return arrayOfWords[i];
}

//put seleted word in the DOM.

function assignWord(): void {

    words.innerHTML = selectWords();
}

//Reorder array elements

function reOrderArrayOfwords(): void {

    arrayOfWords.sort( ():number => {
        
        return 0.5 - Math.random();
    });

    // console.log(arrayOfWords[0]);
}
setInterval(reOrderArrayOfwords, 100);

//reduce time as game starts

function assign( some:string | number  ):string | number {

    if( typeof some === 'string' ) {

        return parseInt(some);
    }

    else {

        return some;
    }
}



let scoreCount: number | string = 0;
let timeCount:number | string;
let checkMate:number = 0;

function reduceTime():void {
    
    timeCheck.innerHTML = time.innerHTML;

    timeCount = assign(timeCheck.innerHTML);
    
    const loop:number = setInterval( () => {

        if( typeof timeCount == 'number' ) {

            timeCount--;

            if( timeCount == 0 ) {
                
                clearInterval(loop);
                checkTimeElapse();
            }
        }
        
        timeCheck.innerHTML = String(timeCount);
    }, 1000)
    
}

//End game when time elapses

function checkTimeElapse():void {
    
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

//display game over 

function isGameOver():void {

    over.style.display = 'none';
}

function showGameOver() {

    over.style.display = 'block'
}

// Increase score when word matches input value

wordsInput.addEventListener('keyup', checkValidation);

function checkValidation():void {
    
    if( wordsInput.value == words.innerHTML && level.value == 'easy' ) {

        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 5;
        increaseScore();

    }

    else if( wordsInput.value == words.innerHTML && level.value == 'medium' ) {

        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 3;
        increaseScore();

    }

    else if( wordsInput.value == words.innerHTML && level.value == 'hard' ) {

        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 2;
        increaseScore();

    }

    checkHighscore();
}


//increment score.

function increaseScore():void {
    
    scoreCount = 0;
    scoreCount += checkMate;
    
    if( typeof scoreCount === 'number' ) {

        score.innerHTML = String(scoreCount)
    }

}


//show highscore modal 

showModal.addEventListener("click", showHighscoreModal);
closeModal.addEventListener("click", hideHighscoreModal);

function showHighscoreModal():void {

    modalContainer.style.display = 'block';
    setHighScore();
   
}


//Hide highscore modal

function hideHighscoreModal():void {


    modalContainer.style.display = 'none';
    modalContainer.classList.add('hidemodal');
}

//Autofocus on input when game starts.

function autoFocusOnInput():void {

    wordsInput.focus();
}


//Local storage

let easyHighscore = document.querySelector(".easy-highscore") as HTMLSpanElement;
let mediumHighscore = document.querySelector(".medium-highscore") as HTMLSpanElement;
let hardHighscore = document.querySelector(".hard-highscore") as HTMLSpanElement;


// Check if value exists in localStorage.

window.addEventListener("load", checkExistence);

console.log(localStorage.getItem('easyUpd'))

function checkExistence():void {

    if( level.value === 'easy' && localStorage.getItem('easyUpd') === null ) {

        console.log("Hello")

        easyHighscore.innerHTML = '0';
    }

    else if( level.value === 'medium' && localStorage.getItem('mediumUpd') === null ) {

        mediumHighscore.innerHTML = '0';
    }

    else if( level.value === 'hard' && localStorage.getItem('hardUpd') === null ) {

        hardHighscore.innerHTML = '0';
    }
}


function checkHighscore():void {

    if( level.value === 'easy' ) {

        if( Number(easyHighscore.innerHTML) < Number(score.innerHTML) ) {

            localStorage.setItem("easyUpd", score.innerHTML );
            easyHighscore.innerHTML = localStorage.getItem("easyUpd") as string;
        }
    }

    else if( level.value === 'medium' ) {

        if( Number(mediumHighscore.innerHTML) < Number(score.innerHTML) ) {

            localStorage.setItem("mediumUpd", score.innerHTML );
            mediumHighscore.innerHTML = localStorage.getItem("mediumUpd") as string;
        }
    }

    else if( level.value === 'hard' ) {

        if( Number(hardHighscore.innerHTML) < Number(score.innerHTML) ) {

            localStorage.setItem("hardUpd", score.innerHTML );
            hardHighscore.innerHTML = localStorage.getItem("hardUpd") as string;
        }
    }
}


//Set the Highscores

function setHighScore():void {

    easyHighscore.innerHTML = localStorage.getItem("easyUpd") as string;
    mediumHighscore.innerHTML = localStorage.getItem("mediumUpd") as string;
    hardHighscore.innerHTML = localStorage.getItem("hardUpd") as string;
}