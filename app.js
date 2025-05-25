const url = "https://jsonplaceholder.typicode.com/users";
const cardContainer = document.querySelector(".container");
let localStorageData = JSON.parse(localStorage.getItem("userList"));
let userArray = [];

async function fetchUsers(url) {
  const response = await fetch(url);
  const data = await response.json();
  userArray = [...data];
  setLocalStorage();
}

async function initializeDataDisplay() {
  await fetchUsers(url);
  userArray.forEach((user) => {
    createCardElement(user);
  });
}

if (localStorageData) {
  userArray = localStorageData;
  localStorageData.forEach((user) => {
    createCardElement(user);
  });
} else {
  initializeDataDisplay();
}

document
  .querySelector(".form")
  .addEventListener("submit", (event) => handleFormSubmit(event));

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.querySelector('input[name="name"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const city = document.querySelector('input[name="city"]').value;
  const website = document.querySelector('input[name="website"]').value;
  e.target.reset();
  newUser = {
    name: name,
    phone: phone,
    address: { city: city },
    website: website,
  };
  updateDataDisplay(newUser);
}

function updateDataDisplay(user) {
  userArray.push(user);
  createCardElement(user);
  setLocalStorage();
}

function createCardElement(user) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerHTML =
    "Name: " +
    user.name +
    "<br>" +
    "Phone Number: " +
    user.phone +
    "<br>" +
    "City: " +
    user.address.city +
    "<br>" +
    "Website: " +
    user.website;

  cardContainer.appendChild(cardElement);
}

function setLocalStorage() {
  localStorage.setItem("userList", JSON.stringify(userArray));
}
