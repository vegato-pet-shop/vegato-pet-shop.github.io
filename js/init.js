
var quantity = {
    catFoodSmall: 0,
    catFoodBig: 0,
    dogFoodSmall: 0, 
    dogFoodBig: 0
}

var transportation = ["","",-1]
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

let names = {
    catFoodSmall: {est: "VeggieAnimals kassitoit 2.5kg", rus: "VeggieAnimals кошачья еда 2.5kg", eng: "VeggieAnimals cat food 2.5kg"},
    catFoodBig: {est: "VeggieAnimals kassitoit 12.5kg", rus: "VeggieAnimals кошачья еда 12.5kg", eng: "VeggieAnimals cat food 12.5kg"},
    dogFoodSmall: {est: "VeggieAnimals koeratoit 2.5kg", rus: "VeggieAnimals собачья еда 2.5kg", eng: "VeggieAnimals dog food 2.5kg"},
    dogFoodBig: {est: "VeggieAnimals koeratoit 12.5kg", rus: "VeggieAnimals собачья еда 12.5kg", eng: "VeggieAnimals dog food 12.5kg"},
}

let userData = {
    name1:  "",
    name2: "",
    email: "",
    phoneNumber: "",
    address: "",
    time: "",
    order: "",
    orderNumber: "",
    orderSum: "",
    transport: "",
    language: ""
}

if (localStorage.getItem('quantity')!=null && localStorage.getItem('quantity')!=undefined) {
    let quantityTemp = JSON.parse(localStorage.getItem('quantity'))
    if (Object.keys(quantityTemp).toString()==Object.keys(quantity).toString()) {
        quantity = quantityTemp
    }
}
if (localStorage.getItem('transportation')!=null && localStorage.getItem('transportation')!=undefined) {
    transportation = JSON.parse(localStorage.getItem('transportation'))
}
if (localStorage.getItem('userData')!=null && localStorage.getItem('userData')!=undefined) {
    userData = JSON.parse(localStorage.getItem('userData'))
}

let callback = function() {
    let cartCounter = document.getElementById("cart-counter")
    cartCounter.innerHTML = sum(Object.values(quantity))
    let url = window.location.href
    if (url.includes("est")) {
        userData.language = "est"
    }
    else if (url.includes("rus")) {
        userData.language = "rus"
    }
    else {
        userData.language = "eng"
    }
}
window.addEventListener("load", callback)