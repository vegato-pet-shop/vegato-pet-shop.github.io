
let quantity = {
    catFoodSmall: 0,
    catFoodBig: 0,
    dogFoodSmall: 0, 
    dogFoodBig: 0
}

let transportation = ["","",-1]
let transportationPrice = {
    "self-pickup": 0,
    DPD: 2.50,
    Omniva: 2.50
}

let price = {
    catFoodSmall: 4,
    catFoodBig: 93.75,
    dogFoodSmall: 3.50, 
    dogFoodBig: 83.75
}

let priceTotal = 0
let order = []
let orderReceipt = []
let orderError = []

let names = {
    catFoodSmall: {est: "VeggieAnimals kassitoit 50 g", rus: "VeggieAnimals кошачья еда 50 г", eng: "VeggieAnimals cat food 50 g"},
    catFoodBig: {est: "VeggieAnimals kassitoit 12.5 kg", rus: "VeggieAnimals кошачья еда 12.5 kg", eng: "VeggieAnimals cat food 12.5 kg"},
    dogFoodSmall: {est: "VeggieAnimals koeratoit 50 g", rus: "VeggieAnimals собачья еда 50 г", eng: "VeggieAnimals dog food 50 g"},
    dogFoodBig: {est: "VeggieAnimals koeratoit 12.5 kg", rus: "VeggieAnimals собачья еда 12.5 kg", eng: "VeggieAnimals dog food 12.5 kg"},
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
    orderSum: 0,
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

let callbackInit = function() {
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
window.addEventListener("load", callbackInit)