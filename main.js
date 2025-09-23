console.log("Hello world!");

let cardsData = [];

const tabs = document.querySelectorAll(".btn--tab");
const classSelected = "selected";
const classSpinnerVisible = "overlay--visible";
const overlaySpinnerEl = document.getElementById("overlaySpinner");

let selectedTab = tabs[0].textContent;
initTabs();

function toggleSpinner() {
  overlaySpinnerEl.classList.toggle(classSpinnerVisible);
}

function initTabs() {
  tabs[0].classList.add(classSelected);

  tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
  });
}

function handleTabClick(event) {
  removeSelectionFromAllTabs();

  event.target.classList.add(classSelected);
  selectedTab = event.target.textContent;

  updateData(selectedTab);
}

function removeSelectionFromAllTabs() {
  tabs.forEach((tab) => {
    tab.classList.remove(classSelected);
  });
}

function updateData(selectedTabName) {
  console.log("Update data called");
  cardsData.forEach((cardData) => {
    updateCardEl(
      cardData.title,
      cardData.timeframes[selectedTabName.toLowerCase()]
    );
  });
}

function updateCardEl(cardName, times) {
  const cardEl = document.querySelector(
    `.card--${cardName.toLowerCase().split(" ").join("-")}`
  );
  const timeCurrentEl = cardEl
    .querySelector(".time-current")
    .querySelector("span");
  const timePreviousEl = cardEl
    .querySelector(".time-previous")
    .querySelector("span");

  timeCurrentEl.textContent = times.current;
  timePreviousEl.textContent = times.previous;
}

toggleSpinner();
fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong!");

    return response.json();
  })
  .then((data) => {
    cardsData = data;
    setTimeout(() => {
      updateData(selectedTab);
      toggleSpinner();
    }, 1000);
  });
