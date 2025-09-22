console.log("Hello world!");

const cards = document.querySelectorAll(".card");

const tabs = document.querySelectorAll(".btn--tab");
const classSelected = "selected";

let selectedTab = tabs[0].textContent;
initTabs();

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
  console.log(`Updating data: ${selectedTabName}`);
  console.log(cards);

  // use this to populate cards data
  // call it from click listener and once the fetch completes
}

fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong!");

    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
