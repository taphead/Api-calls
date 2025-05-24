const url = "https://jsonplaceholder.typicode.com/users";
const cardContainer = document.querySelector(".container");
let userArray = [];
async function fetchUsers(url) {
  const response = await fetch(url);
  const data = await response.json();
  userArray = [...data];
  console.log(userArray);
}

async function initializeDataDisplay() {
  await fetchUsers(url);
  userArray.forEach((user) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML =
      user.name + "<br>" + user.phone + "<br>" + user.address.city;

    cardContainer.appendChild(cardElement);
  });
}

initializeDataDisplay();
