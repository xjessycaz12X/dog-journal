var dogFactsEL = document.getElementById('dogFacts');
var dogPicsEl = document.getElementById('dogPics');


//code for the api for random dog photo

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
    var imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Random Dog Image";
    dogPicsEl.appendChild(imgElement);
  });
}


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

