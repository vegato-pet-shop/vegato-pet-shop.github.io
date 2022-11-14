
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

fixMinHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(vh)
    console.log("here")
}

document.addEventListener("load", fixMinHeight)

function switchLanguage(newLanguage) {
    let url = window.location.href
    let splitUrl = url.split(userData.language)
    console.log(newLanguage,splitUrl[1])
    window.location.href = "/"+newLanguage+splitUrl[1]
}