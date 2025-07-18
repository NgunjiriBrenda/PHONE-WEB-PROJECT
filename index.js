document.addEventListener("DOMContentLoaded", () => {
  let phoneAccessories=[];
  function renderPhoneAccessories(phoneAccessory) {
    const card = document.createElement("div");
    card.id = phoneAccessory.id;

    //creating a card

    card.classList.add("phoneAccessories");
    //innerHTML takes a new card and gives a short explanation of phone accessories.
    //innerHTML assigns a new name.
    card.innerHTML = `
    <p class= "title">${phoneAccessory.name}</p>
    <p>${phoneAccessory.brand}</p>
    <p>${phoneAccessory.description}</p>
    <img src=${phoneAccessory.image} style ="width: 100%; height: auto;"/>
    <button class="button">Delete</button>
    `;

    //creates a new element
    document.getElementById("phoneAccessoriesList").append(card);
    const deleteButton = card.querySelector(".button");
    deleteButton.addEventListener("click", (e) => {
      fetch(`https://json-server-it47.onrender.com/phone-accessory/${phoneAccessory.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          const list = document.getElementById("phoneAccessoriesList");
          list.innerHTML = ""; // clear existing cards
          displayAccessory();
        });
    });
  }

  //delete refreshes
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.addEventListener("change",() =>{
    const selectCategory = categoryFilter.value;
    document.getElementById("accessoryContainer").innerHTML = "";
    const filtereredphoneAccessories = selectCategory === "All"
    ?phoneAccessories
    :phoneAccessories.filter(item => item.category === selectedCategory);
    filteredphoneAccessories.forEach(renderPhoneAccessories);
     });


  //get datas as objects
  function displayAccessory(){ 
    fetch("https://json-server-it47.onrender.com/phone-accessory")
      //filtering responses
      .then((res) => res.json())
      .then((phoneAccessories) =>
        phoneAccessories.forEach(renderPhoneAccessories)
      );
  }
  displayAccessory();

  function addphoneAccessory() {
    const accessoryform = document.getElementById("add-form");
    accessoryform.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("nameInput").value;
      const brand = document.getElementById("brandInput").value;
      const description = document.getElementById("descInput").value;
      const image = document.getElementById("imageInput").value;
      const formData = { name, brand, description, image };

      fetch("http://localhost:3000/phone-accessory", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      })

        .then((res) => res.json())
        .then((addednewAccessory) => renderPhoneAccessories(addednewAccessory));
    });
  }
  addphoneAccessory();
});

