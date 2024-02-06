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
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Random Dog Image";
    document.body.appendChild(imgElement);
  });
}
