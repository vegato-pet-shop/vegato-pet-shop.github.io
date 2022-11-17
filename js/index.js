
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
        input.value = quantity[name] 
        let number = document.getElementById(cssID+"-quantity")
        number.innerHTML = quantity[name]
    }
})
