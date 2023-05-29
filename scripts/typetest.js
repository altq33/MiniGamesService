const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

const renderNewQuote = () => {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "</span>";
  });
  quoteSection.innerHTML += arr.join("");
};

userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);
  let userInputChars = userInput.value.split("");
  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    } else {
      if (!char.classList.contains("fail")) {
        mistakes++;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }

    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });

    if (check) {
      displayResult();
    }
  });
});

function updateTimer() {
  if (time == 0) {
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

function timeReduce() {
  time = 60;
  timer = setInterval(updateTimer, 1000);
}

function displayResult() {
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  if (isNaN((userInput.value.length / 5 / timeTaken).toFixed(2))) {
    document.getElementById("wpm").innerText = "0wpm";
  } else {
    if (localStorage.getItem("type") !== null) {
      if (
        (userInput.value.length / 5 / timeTaken).toFixed(2) >
        parseFloat(localStorage.getItem("type"))
      ) {
        localStorage.setItem(
          "type",
          `${(userInput.value.length / 5 / timeTaken).toFixed(2)}`
        );
      }
    } else {
      localStorage.setItem("type", "0");
    }
    document.getElementById("wpm").innerText =
      (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
  }
  if (
    isNaN(
      Math.round(
        ((userInput.value.length - mistakes) / userInput.value.length) * 100
      )
    )
  ) {
    document.getElementById("accuracy").innerText = "0%";
  } else {
    document.getElementById("accuracy").innerText =
      Math.round(
        ((userInput.value.length - mistakes) / userInput.value.length) * 100
      ) + "%";
  }
}

//Start test
function startTest() {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
}

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
