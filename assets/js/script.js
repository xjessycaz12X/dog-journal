//dog facts api fetch and DOM
let dogFactsEL = document.getElementById("dog-facts");

fetch("https://dogapi.dog/api/v2/facts?limit=10")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayFacts(data);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
  });
function displayFacts(facts) {
  console.log(facts.data);
  const pElement = document.createElement("p");
  pElement.textContent = facts.data[0].attributes.body;
  dogFactsEL.appendChild(pElement);
}


//dog photo api fetch and DOM
fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayImages([data.message]);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
  });
function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Random Dog Image";
    imgElement.style = "height: 200px; width: 80%;";
    imgElement.class = "mt-5 mx-auto";
    document.body.appendChild(imgElement);
    let dogImageContainer = document.getElementById("dog-image-container");
    dogImageContainer.appendChild(imgElement);
  });
}



//global variables
let save = document.querySelector(".save");
let textArea = document.querySelector(".text-area");
let journalPane = document.querySelector(".journal-pane");

//local storage variables
let currentIndex = 0;
let journalLog = {};
let dogJournal = {
  entries: journalLog,
  index: currentIndex,
};

//eventListeners
save.addEventListener("click", function(event){
  createEntry(event);
});



//functions
function createEntry(event){
  
  //creates DOM journal entry
  let entry = textArea.value;

  const newLI = document.createElement("li");
  newLI.classList = "mt-3";

  const newSpan = document.createElement("span");
  newSpan.textContent = entry;

  const deleteButton = document.createElement("button");
  deleteButton.classList = "btn btn-primary btn-sm me-5";
  deleteButton.textContent = "Delete";
  deleteButton.type = "button delete";
  deleteButton.addEventListener("click", function(event) {
    deleteEntry(event);
  })

  newLI.appendChild(deleteButton);
  newLI.appendChild(newSpan);
  journalPane.appendChild(newLI);

  //resets 
  textArea.value = "";
}

function deleteEntry(event){
  event.target.parentNode.remove(event);
  currentIndex--;
}
