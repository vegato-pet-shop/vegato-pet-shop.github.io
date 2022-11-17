
function addCart(type) {
    let productsCat = {
        "cat-food-small-input" : "catFoodSmall",
        "cat-food-big-input" : "catFoodBig",
    }
    let productsDog = {
        "dog-food-small-input" : "dogFoodSmall",
        "dog-food-big-input" : "dogFoodBig",
    }
    let products
    if (type=="cat") {
        products = productsCat
    }
    else {
        products = productsDog
    }

    for (const [cssID, name] of Object.entries(products)) {
        let input = document.getElementById(cssID)
        quantity[name] += parseInt(input.value)
        input.value = 0
    }
    changeTotal()
}

