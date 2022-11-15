
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