
var quantity = {
    catFoodSmall: 0,
    catFoodBig: 0,
    dogFoodSmall: 0, 
    dogFoodBig: 0
}

var transportation = ["",""]
var transportationPrice = {
    "self-pickup": 0,
    DPD: 3,
    Omniva: 3.50
}

var price = {
    catFoodSmall: 10,
    catFoodBig: 10,
    dogFoodSmall: 10, 
    dogFoodBig: 10
}

var priceTotal = 0
var order = []
var orderReceipt = []
var orderError = []

var names = {
    catFoodSmall: "VeggieAnimals cat food 2.5kg",
    catFoodBig: "VeggieAnimals cat food 12.5kg",
    dogFoodSmall: "VeggieAnimals dog food 2.5kg", 
    dogFoodBig: "VeggieAnimals dog food 12.5kg"
}

if (localStorage.getItem('quantity')!=null && localStorage.getItem('quantity')!=undefined) {
    let quantityTemp = JSON.parse(localStorage.getItem('quantity'))
    if (Object.keys(quantityTemp).toString()==Object.keys(quantity).toString()) {
        quantity = quantityTemp
    }
    
    transportation = JSON.parse(localStorage.getItem('transportation'))
}

document.addEventListener('DOMContentLoaded', function() {

}, false)

let callback = function() {
    console.log(quantity)
    let cartCounter = document.getElementById("cart-counter")
    cartCounter.innerHTML = sum(Object.values(quantity))
}
window.addEventListener("load", callback)