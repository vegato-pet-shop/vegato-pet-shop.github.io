function updateIncrementers() {
    /*Price*/
    let ksItems = Object.keys(price)
    for (let i=0; i<ksItems.length; i++) {
        let item = price[ksItems[i]]
        let ksParts = Object.keys(item)
        for (let j=0; j<ksParts.length; j++) {
            let n = ksItems[i]+"-price-"+ksParts[j]
            let obj = document.getElementById(n)
            obj.innerHTML = obj.innerHTML.replace("_", item[ksParts[j]])
        }
    }
    /*Quantity*/
    ksItems = Object.keys(quantity)
    for (let i=0; i<ksItems.length; i++) {
        let n = ksItems[i]+"-incrementer"
        document.getElementById(n).querySelector('input[type=number]').value = quantity[ksItems[i]]
    }
}

function createCounter(name,value) {

    let div = document.createElement("div")
    div.className = "number-input"

    let subButton = document.createElement("button")
    subButton.className = "minus"
    subButton.onclick = () => {
        subtract(subButton)
        quantity[name] -= 1
        changeTotal()
        updateCart()
    }

    let addButton = document.createElement("button")
    addButton.className = "plus"
    addButton.onclick = () => {
        add(addButton)
        quantity[name] += 1
        changeTotal()
        updateCart()
    }

    let input = document.createElement("input")
    input.className = "quantity"
    input.min = 0
    input.value = value
    input.type = "number"

    div.appendChild(subButton)
    div.appendChild(input)
    div.appendChild(addButton)

    return div
}

function updateCart() {
    language = userData.language
    let objName = document.getElementById("products-name")
    let objQuantity = document.getElementById("products-quantity")
    let objPrice = document.getElementById("products-price")
    let objTotal = document.getElementById("products-price-total")

    objName.innerHTML = ""
    objQuantity.innerHTML = ""
    objPrice.innerHTML = ""
    objTotal.innerHTML = ""

    let priceTotal = 0
    let order = []
    let ksItems = Object.keys(price)
    for (let i=0; i<ksItems.length; i++) {
        let item = ksItems[i]
        let productQuantity = quantity[item]
        if (productQuantity!=0) {
            let productName = names[item][language]
            let productPrice = price[item]

            priceTotal += productQuantity*productPrice
            order.push([productName,productQuantity,productPrice])

            let p = document.createElement("p");
            let text = document.createTextNode(productName)
            p.appendChild(text)
            objName.appendChild(p)

            p = document.createElement("p")

            let counter = createCounter(item,productQuantity)
            objQuantity.appendChild(counter)

            p = document.createElement("p")
            text = document.createTextNode(productPrice+" EUR")
            p.appendChild(text)
            objPrice.appendChild(p)
        }
    }
    userData.order = order
    
    // Transport
    if (transportation[0]!="") {
        let p = document.createElement("p");
        let text = document.createTextNode("Transport ("+transportation[0]+")")
        p.appendChild(text)
        objName.appendChild(p)

        p = document.createElement("p")

        text = document.createTextNode("")
        p.appendChild(text)
        objQuantity.appendChild(p)

        p = document.createElement("p")
        text = document.createTextNode(transportationPrice[transportation[0]]+" EUR")
        priceTotal += transportationPrice[transportation[0]]
        p.appendChild(text)
        objPrice.appendChild(p)
    }
    objTotal.appendChild(document.createTextNode(priceTotal+" EUR"))
    userData.orderSum = priceTotal
}

function selectTransportationType(ind) {
    if (ind==0) {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        transportation = ["self-pickup",document.getElementById("self-pickup-text").innerHTML.slice(0,-8)]
    }
    else if (ind==1) {
        document.getElementById("dpd-pickup-point-select").style.display = "inline"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        let select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text,select.selectedIndex]
    }
    else {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "inline"
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text,select.selectedIndex]
    }
    localStorage.setItem('transportation',JSON.stringify(transportation))
    updateCart()
}

function selectTransportationDestination(ind) {
    if (ind==1) {
        let select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text,select.selectedIndex]
    }
    else {
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text,select.selectedIndex]
    }
    localStorage.setItem('transportation',JSON.stringify(transportation))
    updateCart()
}

function sendConfirmationCode() {
    let email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function checkConfirmationCode() {
    let email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}


function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getOrderNumber() {
    return "" + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9)
}

function l0(t) {
    return ('0'+t).slice(-2)
}

function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    return xhr;
}

function sendConfirmationEmail() {

    let overlay = document.getElementById("overlay")
    overlay.style.display = "flex"

    let name1 = document.getElementById("personal-data-name1").value 
    let name2 = document.getElementById("personal-data-name2").value
    let email = document.getElementById("personal-data-email").value
    let phoneNumber = document.getElementById("personal-data-phone").value
    let address = document.getElementById("personal-data-address").value
    let currentDate = new Date()
    let time = currentDate.getDate() + "."
                    + l0(currentDate.getMonth()+1)  + "." 
                    + currentDate.getFullYear() + " "  
                    + l0(currentDate.getHours()) + ":"  
                    + l0(currentDate.getMinutes())

    if (transportation==null || transportation[0]=="") {
        if (document.getElementById("self-pickup").checked) {
            transportation = ["self-pickup",document.getElementById("self-pickup-text").innerHTML.slice(0,-8)]
        }
    }

    userData.name1 = name1
    userData.name2 = name2
    userData.email = email
    userData.phoneNumber = phoneNumber
    userData.address = address
    userData.time = time
    userData.orderNumber = getOrderNumber()
    userData.transport =  [transportation[0],transportation[1],transportationPrice[transportation[0]]]

    localStorage.setItem('orderData',JSON.stringify(userData))
    
    let url = 'https://server.vegato-pet-shop.com/send-order'
    //let xhr = new XMLHttpRequest()
    //xhr.open('POST', url, true)
    let xhr = createCORSRequest('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.responseText
            console.log("success")
            //window.location.href = "/"+userData.language+"/order-succeeded"
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log(xhr)
            let response = xhr.responseText
            //window.location.href = "/"+userData.language+"/order-failed"
        }
	}
    xhr.send(JSON.stringify(userData))
}

function displayReceipt() {
    let receipt = localStorage.getItem('orderReceipt')
    document.getElementById("receipt").innerHTML = receipt
}

function displayError() {
    let error = localStorage.getItem('orderError')
    document.getElementById("error").innerHTML = error
}

function changePersonalData(name,value) {
    userData[name] = value
    localStorage.setItem('userData',JSON.stringify(userData))
}

window.addEventListener("load", function() {
    updateCart()

    // Load user data
    let ids = ["personal-data-name1","personal-data-name2","personal-data-phone","personal-data-email","personal-data-address"]
    let fields = ["name1","name2","phoneNumber","email","address"]
    for (let i=0;i<ids.length;i++) {
        let input = document.getElementById(ids[i])
        input.value = userData[fields[i]]
    }

    // Select transportation
    let provider = transportation[0]
    if (provider!="") {
        if (provider=="DPD") {
            let button = this.document.getElementById("dpd-radio-button")
            button.checked = true
            if (transportation[2]!=-1) {
                let select = document.getElementById("dpd-pickup-point-select")
                select.style.display = "initial"
                select.selectedIndex = transportation[2]
            }
        }
        else if (provider=="Omniva") {
            let button = this.document.getElementById("omniva-radio-button")
            button.checked = true
            if (transportation[2]!=-1) {
                let select = document.getElementById("omniva-pickup-point-select")
                select.style.display = "initial"
                select.selectedIndex = transportation[2]
            }
        }
    }
    else {
        let buttonDPD = this.document.getElementById("dpd-radio-button")
        let buttonOmniva = this.document.getElementById("omniva-radio-button")
        buttonDPD.checked = false
        buttonOmniva.checked = false
    }
})

