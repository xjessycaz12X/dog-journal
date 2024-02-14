//global variables

//dog jokes/facts pane variables
let dogFactsEL = document.getElementById("dog-facts");
let dogJokesEl = document.getElementById("dogJokes");

//dog journal variables
let save = document.querySelector(".save");
let textArea = document.querySelector(".text-area");
let journalPane = document.querySelector(".journal-pane");
let currentIndex = 0;
let journalLog = JSON.parse(localStorage.getItem("dogJournal")) || [];
let dogJournal = {
  entries: journalLog,
};

//dog joke api
function getDogJokes() {
  fetch("https://icanhazdadjoke.com/search?term=dog", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      makeDogJoke(data.results);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

//adds dog jokes to joke/fact pane
function makeDogJoke(jokes) {
  var randomIndex = Math.floor(Math.random() * jokes.length);
  var randomJoke = jokes[randomIndex].joke;
  const element = document.createElement("p");
  element.textContent = randomJoke;
  dogJokesEl.appendChild(element);

}

//displays dog facts w/in dog facts pane
function displayFacts(facts) {
  const pElement = document.createElement("p");
  pElement.textContent = facts.fact;
  dogFactsEL.appendChild(pElement);
}

//displays images w/in dog image pane
function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Random Dog Image";
    imgElement.style = "height: 200px; width: 80%; max-width: fit-content"
    imgElement.class = "mt-5 mx-auto";
    document.body.appendChild(imgElement);
    let dogImageContainer = document.getElementById("dog-image-container");
    dogImageContainer.appendChild(imgElement);
  });
}

//eventListeners
save.addEventListener("click", function (event) {
  createEntry(event);
  textArea.value = "";
});

//renders journal entries on page via localstorage
function renderJournalEntries() {
  journalLog = JSON.parse(localStorage.getItem("dogJournal")) || [];
  journalPane.innerHTML = "";

  for (let i = 0; i < journalLog.length; i++) {

    const newLI = document.createElement("li");
    newLI.classList = "mt-3 d-flex align-items-center overflow-auto";

    const newSpan = document.createElement("span");
    newSpan.textContent = journalLog[i];

    const deleteButton = document.createElement("button");
    deleteButton.classList = "btn btn-danger btn-sm me-5";
    deleteButton.textContent = "Delete";
    deleteButton.type = "button delete";
    deleteButton.addEventListener("click", function (event) {
      deleteEntry(event);
    })

    deleteButton.addEventListener("mouseover", function () {
      deleteButton.nextElementSibling.classList.add("bg-warning-subtle");
    })
    deleteButton.addEventListener("mouseout", function () {
      deleteButton.nextElementSibling.classList.remove("bg-warning-subtle");
    })

    newLI.appendChild(deleteButton);
    newLI.appendChild(newSpan);
    journalPane.appendChild(newLI);
  }
}

//refreshes page and appends DOM
function createEntry() {

  //creates DOM journal entry
  let entry = textArea.value;

  // creates DOM journal entry
  entry = textArea.value.trim(); // trim() removes leading and trailing white space

  if (textArea.value === "") {
    alert("Please place text");
  }

  else {
    //add to local storage
    journalLog.push(entry);
    localStorage.setItem("dogJournal", JSON.stringify(journalLog));
    renderJournalEntries();
  }
}

//filters array and local storage then refreshes page
function deleteEntry(event) {
  const updatedJournalLog = journalLog.filter(item => item !== event.target.nextElementSibling.textContent);
  localStorage.setItem("dogJournal", JSON.stringify(updatedJournalLog));
  renderJournalEntries();
}

//init
function init() {

  getDogJokes();

  fetch("https://random-dog-facts.p.rapidapi.com/",{
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "24f6ec8298mshf87715c7188e534p1d7672jsn720b0c69221e",
    "X-RapidAPI-Host": "random-dog-facts.p.rapidapi.com"
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    displayFacts(data);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
  });

  //dog photo api fetch and DOM
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayImages([data.message]);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });



  renderJournalEntries();

}

init();

