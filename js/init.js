
let quantity = {
    catFoodSmall: 0,
    catFoodBig: 0,
    dogFoodSmall: 0, 
    dogFoodBig: 0
}

let transportation = ["","","",-1]
let transportationPrice = {}
let transportationCountry = ""

let transportationPrices = {
    Estonia: {
        small: {
            DPD: 2.50,
            Omniva: 2.50,
            Itella: 2.50
        },
        big: {
            DPD: 5,
            Omniva: 5,
            Itella: 5
        }
    },
    Latvia: {
        small: {
            DPD: 5.50,
            Omniva: 5.50,
            Itella: 5.50
        },
        big: {
            DPD: 9,
            Omniva: 9,
            Itella: 9
        }
    },
    Lithuania: {
        small: {
            DPD: 7.50,
            Omniva: 7.50,
            Itella: 7.50
        },
        big: {
            DPD: 10,
            Omniva: 1,
            Itella: 10
        }
    },
    Finland: {
        small: {
            DPD: 10,
            Omniva: 10,
            Itella: 10
        },
        big: {
            DPD: 14,
            Omniva: 14,
            Itella: 14
        }
    }
}

let price = {
    catFoodSmall: 3.60,//4,
    catFoodBig: 84.40,//93.75,
    dogFoodSmall: 3.15,//3.50, 
    dogFoodBig: 75.40,//83.75
}

let priceTotal = 0
let order = []
let orderReceipt = []
let orderError = []

let names = {
    catFoodSmall: {est: "VeggieAnimals kassitoit 100 g", rus: "VeggieAnimals кошачья еда 100 г", eng: "VeggieAnimals cat food 100 g"},
    catFoodBig: {est: "VeggieAnimals kassitoit 12.5 kg", rus: "VeggieAnimals кошачья еда 12.5 kg", eng: "VeggieAnimals cat food 12.5 kg"},
    dogFoodSmall: {est: "VeggieAnimals koeratoit 100 g", rus: "VeggieAnimals собачья еда 100 г", eng: "VeggieAnimals dog food 100 g"},
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

let referral = ""
if (localStorage.getItem('referral')!=null) {
    referral = localStorage.getItem('referral')
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