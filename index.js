function renderPhoneAccessories(phoneAccessories){
    const card=document.createElement('div');
    card.classList.add("phoneAccessories");
    card.innerHTML=`
    <p>${phoneAccessories.name}</p>
    <p>${phoneAccessories.brand}</p>
    <p>${phoneAccessories.description}</p>
    <img src=${phoneAccessories.image}/>`;
    document.getElementById("phoneAccessoriesList").append(card);

}
function displayAccessory(){
    fetch( "http://localhost:3000/phone-accessory")
    .then(res =>res.json())
    .then(phoneAccessories =>phoneAccessories.forEach(renderPhoneAccessories))
}
document.addEventListener("DOMContentLoaded",function(){
    displayAccessory();
    
})
