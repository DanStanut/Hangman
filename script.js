let hangman = ["___ \n|/  | \n|     \n|     \n|     \n|     \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|     \n|     \n|     \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|   | \n|   | \n|     \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|  &#92;| \n|   | \n|     \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|  &#92;|/\n|   | \n|     \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|  &#92;|/\n|   | \n|  /  \n|     \n|_____",
"___ \n|/  | \n|  (_)\n|  &#92;|/\n|   | \n|  / &#92;\n|     \n|_____",
"___ \n|/  | \n|  (_)\n|  /|&#92;\n|   | \n|  | |\n|     \n|_____"]
let words = ["zigzag", "jazz", "sternocleidomastoidian", "ghepard", "lynx", "kinetoterapie", "xenofobie", "fantasmagoric"]
let winnerWord
let displayedWord
let state = 0

function setDisplayedWord(noChars) {
    let dw = ""
    for (let i = 0; i < noChars; ++i) {
        dw += "_ "
    }
    return dw
}

function endGame(message) {
    document.getElementById("infoText").innerHTML = message;
    document.getElementById("checkLeter").className = "btn btn-primary disabled"
}

function displayState(dw, hs) {
    document.getElementById("hangmanFigure").innerHTML = hangman[hs]
    document.getElementById("hiddenWord").innerHTML = dw
}

function isLetter(letter) {
    return letter.toLowerCase() !== letter.toUpperCase() && letter.length === 1;
}

function replaceChar(initialString, replaceCharacter, position) {
    let initialPart = initialString.substr(0, position)
    let lastPart = initialString.substr(position + 1)
    return initialPart + replaceCharacter + lastPart
}

function checkLeter() {
    let letter = document.getElementById("givenLetter").value.toLowerCase()
    if (isLetter(letter)) {
        let wl = winnerWord.length
        let letterExists = false
        document.getElementById("givenLetter").value = ""
        for (let counter = 0; counter < wl; ++counter) {
            if (winnerWord[counter] === letter) {
                displayedWord = replaceChar(displayedWord, letter, counter * 2)
                letterExists = true
            }
        }
        if (letterExists) {
            if (displayedWord.includes("_")) {
                displayState(displayedWord, state)
            } else {
                displayState(displayedWord, state)
                endGame("YOU WIN!!!")
            }
        } else {
            ++state
            displayState(displayedWord, state)
            if (state === 7) {
                endGame("YOU LOST!")
            }
        }
    } else {
        alert("Please give a letter!")
        document.getElementById("givenLetter").value = ""
    }
}

function startGame() {
    let winnerWordPos = Math.round(Math.random() * (words.length - 1))
    winnerWord = words[winnerWordPos]
    console.log(winnerWord)
    displayedWord = setDisplayedWord(winnerWord.length)
    displayState(displayedWord, state)
    document.getElementById("startButton").hidden = true
    document.getElementById("infoArea").hidden = false
}