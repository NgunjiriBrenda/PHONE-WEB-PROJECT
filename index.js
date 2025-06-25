function renderPhoneAccessories(phoneAccessory) {
  const card = document.createElement("div");

  //creating a card

  card.classList.add("phoneAccessories");
  //innerHTML takes a new card and gives a short explanation of phone accessories.
  //innerHTML assigns a new name.
  card.innerHTML = `
    <p class= "title">${phoneAccessory.name}</p> 
    <p>${phoneAccessory.brand}</p>
    <p>${phoneAccessory.description}</p>
    <img src=${phoneAccessory.image} style ="width: 100%; height: auto;"/>
    `;
  //creates a new element
  document.getElementById("phoneAccessoriesList").append(card);
}
//get datas as objects
function displayAccessory() {
  fetch("http://localhost:3000/phone-accessory")
    //filtering responses
    .then((res) => res.json())
    .then(phoneAccessories =>
      phoneAccessories.forEach(renderPhoneAccessories)
    );
}
document.addEventListener("DOMContentLoaded", function () {
  displayAccessory();
  addphoneAccessory();
});

function addphoneAccessory(){
   const accessoryform = document.getElementById('add-form')
   accessoryform.addEventListener("submit",function(e){
    e.preventDefault();
    const name = document.getElementById('nameInput').value ;
    const brand = document.getElementById('brandInput').value ;
    const description = document.getElementById('descInput').value ;
    const image = document.getElementById('imageInput').value ;
    const formData = {name, brand, description, image}

    fetch("http://localhost:3000/phone-accessory",{
      method: "POST",
      headers:{"content-type": "application/json"},
      body: JSON.stringify(formData)
    }
  )
 .then(res => res.json())
 .then(addednewAccessory => renderPhoneAccessories(addednewAccessory))


  })
}
  