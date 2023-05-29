const words = document.querySelector(".words span");
const gradient = document.querySelector(".gradient span");
const type = document.querySelector(".type span");

words.innerText = localStorage.getItem("words");
gradient.innerText = localStorage.getItem("gradient");
type.innerText = localStorage.getItem("type");
