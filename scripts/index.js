const inputs = document.querySelector(".word");
const hintTag = document.querySelector(".hint span");
const attemps = document.querySelector(".attemps span");
const mistakes = document.querySelector(".wrong span");
const resetBtn = document.querySelector(".reset");
const hintBtn = document.querySelector(".showhint");
const hintElement = document.querySelector(".hint");
const typeInput = document.querySelector(".type-input");

let currentWord,
  incorrectLetters = [],
  correctLetters = [],
  maxAttemps;

function startNewGame() {
  hintElement.style.display = "none";

  currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  if (currentWord.word.length >= 5) {
    maxAttemps = 8;
  } else {
    maxAttemps = 6;
  }

  correctLetters = [];
  incorrectLetters = [];

  hintTag.innerText = currentWord.hint;
  attemps.innerText = maxAttemps;
  mistakes.innerText = incorrectLetters;

  inputs.innerHTML = "";

  for (let i = 0; i < currentWord.word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
}

function handleInput(e) {
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[а-яА-Я]+$/i) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(`${key}`)
  ) {
    if (currentWord.word.includes(key)) {
      for (let i = 0; i < currentWord.word.length; i++) {
        if (currentWord.word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
          correctLetters.push(`${key}`);
        }
      }
    } else {
      maxAttemps--;
      incorrectLetters.push(`${key}`);
      mistakes.innerText = incorrectLetters;
    }
  }

  // Update remain guess and check for win lose conditions
  attemps.innerText = maxAttemps;
  if (correctLetters.length === currentWord.word.length) {
    alert(`Победа! Вы угадали слово: ${currentWord.word.toUpperCase()}`);
    if (localStorage.getItem("words") !== null) {
      localStorage.setItem("words", `${+localStorage.getItem("words") + 1}`);
    } else {
      localStorage.setItem("words", "1");
    }
    startNewGame();
  } else if (maxAttemps < 1) {
    alert(`Увы! Вы проиграли`);
    for (let i = 0; i < currentWord.word.length; i++) {
      inputs.querySelectorAll("input")[i].value = currentWord.word[i];
    }
    correctLetters = [];
  }
  typeInput.value = "";
}

function showHintElement() {
  hintElement.style.display = "block";
}

resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();
