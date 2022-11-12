
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
    console.log(quantityTemp)
    if (Object.keys(quantityTemp)==Object.keys(quantity)) {
        quantity = quantityTemp
    }
    
    transportation = JSON.parse(localStorage.getItem('transportation'))
}
