const API = "http://localhost:3000/ramens"
const ramenMnDiv = document.getElementById("ramen-menu");

// Callbacks
// Show all ramen image
const handleClick = (ramen) => {
    const detailImg = document.querySelector(".detail-image");
    const name = document.querySelector(".name");
    const restaurant = document.querySelector(".restaurant");
    const ratingDidplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");

    detailImg.src = ramen.image
    name.textContent = ramen.name
    restaurant.textContent = ramen.restaurant
    ratingDidplay.textContent = ramen.rating
    commentDisplay.textContent = ramen.comment 

};

const displayRamens = () => {
  // requests the data from the server
  fetch(API)
  .then((res) => res.json())
  .then((ramens) => {
    // display the image for each of the ramen using an img tag inside the #ramen-menu div.
    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.addEventListener("click", () => handleClick(ramen));
      ramenMnDiv.appendChild(img);
    })
  })
}

// Attach a submit even listener to the new-ramen form
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
     
    // create a new ramen and add it to the#ramen-menu div
    const newRamen = {
      name: e.target["new-name"].value,
      restaurant: e.target["new-restaurant"].value,
      image: e.target["new-image"].value,
      rating: e.target["new-rating"].value,
      comment: e.target["new-comment"].value,
    };

    const img = document.createElement("img");
    img.src = newRamen.image;
    img.addEventListener("click", () => handleClick(newRamen));

    ramenMnDiv.appendChild(img);
    
    // The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.
    form.reset();
  })
}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens()
  addSubmitListener()
}

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
