
function addCart() {
    let products = {
        "cat-food-small-input" : "catFoodSmall",
        "cat-food-big-input" : "catFoodBig",
        "dog-food-small-input" : "dogFoodSmall",
        "dog-food-big-input" : "dogFoodBig",
    }

    for (const [cssID, name] of Object.entries(products)) {
        let input = document.getElementById(cssID)
        quantity[name] += parseInt(input.value)
        input.value = 0
    }
    changeTotal()
}

