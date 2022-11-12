
function sum(ar) {
    return ar.reduce((a, b) => a + b, 0)
}

function add(obj,name) {
    obj.parentNode.querySelector('input[type=number]').stepUp()
    let navbarCounter = document.getElementById("cart-counter")
    quantity[name] += 1
    let total = sum(Object.values(quantity))
    navbarCounter.innerHTML = total
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function subtract(obj,name) {
    if (quantity[name]>0) {
        obj.parentNode.querySelector('input[type=number]').stepDown()
        let navbarCounter = document.getElementById("cart-counter")
        quantity[name] -= 1
        let total = sum(Object.values(quantity))
        navbarCounter.innerHTML = total
        localStorage.setItem('quantity',JSON.stringify(quantity))    
    }
}