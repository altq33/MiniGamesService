const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

function getRandomColor() {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex}`;
}

function generateGradient(isRandom) {
  if (isRandom) {
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  localStorage.setItem("gradient", gradient);
  textarea.value = `background: ${gradient};`;
}

function copyCode() {
  navigator.clipboard.writeText(textarea.value);
  copyBtn.innerText = "Скопировано";
  setTimeout(() => (copyBtn.innerText = "Копировать код"), 1500);
}

colorInputs.forEach((input) => {
  input.addEventListener("input", () => generateGradient(false));
});
selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);
