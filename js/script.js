
function sum(ar) {
    return ar.reduce((a, b) => a + b, 0)
}

function add(obj) {
    obj.parentNode.querySelector('input[type=number]').stepUp()
}

function subtract(obj) {
    obj.parentNode.querySelector('input[type=number]').stepDown() 
}

function changeTotal() {
    let navbarCounter = document.getElementById("cart-counter")
    let total = sum(Object.values(quantity))
    navbarCounter.innerHTML = total
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function switchLanguage(newLanguage) {
    let url = window.location.href
    let splitUrl = url.split(userData.language)
    userData.language = newLanguage
    localStorage.setItem('userData',JSON.stringify(userData))
    window.location.href = "/"+newLanguage+splitUrl[1]
}

//---Feed and index------------------*/

function addCart(type) {
    let productsCat = {
        "cat-food-small" : "catFoodSmall",
        "cat-food-big" : "catFoodBig",
    }
    let productsDog = {
        "dog-food-small" : "dogFoodSmall",
        "dog-food-big" : "dogFoodBig",
    }
    let products
    if (type=="cat") {
        products = productsCat
    }
    else {
        products = productsDog
    }

    for (const [cssID, name] of Object.entries(products)) {
        let input = document.getElementById(cssID+"-input")
        quantity[name] = parseInt(input.value)
        let number = document.getElementById(cssID+"-quantity")
        number.innerHTML = quantity[name]
    }
    changeTotal()
}

window.addEventListener("load", function() {
    let products = {
        "cat-food-small" : "catFoodSmall",
        "cat-food-big" : "catFoodBig",
        "dog-food-small" : "dogFoodSmall",
        "dog-food-big" : "dogFoodBig",
    }
    for (const [cssID, name] of Object.entries(products)) {
        let input = document.getElementById(cssID+"-input")
        if (input!=null) {
            input.value = quantity[name] 
            let number = document.getElementById(cssID+"-quantity")
            number.innerHTML = quantity[name]
        }
    }
})