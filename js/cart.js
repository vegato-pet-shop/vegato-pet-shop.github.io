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

    let objProducts = document.getElementById("products-table")
    objProducts.innerHTML = ""

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

            let p = document.createElement("p")
            let text = document.createTextNode(productName)
            p.appendChild(text)
            objProducts.appendChild(p)

            let counter = createCounter(item,productQuantity)
            counter.className = counter.className+" "+"products-quantity"
            objProducts.appendChild(counter)

            p = document.createElement("p")
            p.className = "products-price"
            text = document.createTextNode(productPrice.toFixed(2)+" €")
            p.appendChild(text)
            objProducts.appendChild(p)
        }
    }
    userData.order = order
    // Transport
    let transportationCountry = document.getElementById("country-select").value
    if (transportationCountry!="") {
        if (transportationCountry!="Estonia") {
            document.getElementById("dpd-div").style.display = "none"
            document.getElementById("omniva-div").style.display = "none"
        }
        else {
            document.getElementById("dpd-div").style.display = "flex"
            document.getElementById("omniva-div").style.display = "flex"
        }
        let transportationPriceCountry = transportationPrices[transportationCountry]
        if ((quantity.catFoodSmall!=0 || quantity.dogFoodSmall!=0) && quantity.catFoodBig==0 && quantity.dogFoodBig==0) {
            transportationPrice = transportationPriceCountry.small
        }
        else {
            transportationPrice = transportationPriceCountry.big
        }

        let transportationSpans = document.getElementsByClassName("transportation-price")
        for (let span of transportationSpans) {
            span.innerHTML = transportationPrice.DPD
        }
        
        if (transportation[0]!="") {
            let language = userData.language
            let languageText
            let transportationType = transportation[0]
            if (language=="est") {
                languageText = "Transport"
            }
            else if (language=="rus") {
                languageText = "Транспорт"
            }
            else {
                languageText = "Transport"
            }
    
            let p = document.createElement("p");
            let text = document.createTextNode(languageText+" ("+transportationType+")")
            p.appendChild(text)
            objProducts.appendChild(p)
    
            p = document.createElement("p")
    
            text = document.createTextNode("")
            p.appendChild(text)
            objProducts.appendChild(p)
    
            p = document.createElement("p")
            text = document.createTextNode(transportationPrice[transportation[0]].toFixed(2)+" €")
            priceTotal += transportationPrice[transportation[0]]
            p.appendChild(text)
            objProducts.appendChild(p)
        }
    
        let objTotal = document.getElementById("products-price-total")
        objTotal.innerHTML = ""
        objTotal.appendChild(document.createTextNode(priceTotal.toFixed(2)+" €"))
        userData.orderSum = priceTotal.toFixed(2)
    }
}

function selectTransportationType(ind) {
    let transportationCountryRaw = document.getElementById("country-select").value
    let transportationCountry = transportationCountryRaw.toLowerCase()
    for (let provider of ["dpd","omniva","itella"]) {
        for (let country of ["estonia","latvia","lithuania","finland"]) {
            let select = document.getElementById(provider+"-pickup-point-select-"+country)
            if (select!=null) {
                select.style.display = "none"
            }
        }
    }
    /*if (ind==0) {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        document.getElementById("itella-pickup-point-select").style.display = "none"
        transportation = ["self-pickup",document.getElementById("self-pickup-text").innerHTML.slice(0,-8)]
    }*/
    let dpd = document.getElementById("dpd-pickup-point-select-"+transportationCountry)
    let omniva = document.getElementById("omniva-pickup-point-select-"+transportationCountry)
    let itella = document.getElementById("itella-pickup-point-select-"+transportationCountry)
    let types = [["DPD",dpd],["Omniva",omniva],["Itella",itella]]
    let type = types[ind]
    n = type[0]
    select = type[1]
    select.style.display = "inline"
    transportation = [n,transportationCountryRaw,select.options[select.selectedIndex].text,select.selectedIndex]
    localStorage.setItem('transportation',JSON.stringify(transportation))
    updateCart()
}

function selectTransportationDestination(ind) {
    let transportationCountryRaw = document.getElementById("country-select").value
    let transportationCountry = transportationCountryRaw.toLowerCase()
    let msg = document.getElementById("finish-form-msg")
    msg.style.display = "none"
    if (ind==0) {
        let select = document.getElementById("dpd-pickup-point-select-"+transportationCountry)
        transportation = ["DPD",transportationCountryRaw,select.options[select.selectedIndex].text,select.selectedIndex]
    }
    else if (ind==1) {
        select = document.getElementById("omniva-pickup-point-select-"+transportationCountry)
        transportation = ["Omniva",transportationCountryRaw,select.options[select.selectedIndex].text,select.selectedIndex]
    }
    else {
        select = document.getElementById("itella-pickup-point-select-"+transportationCountry)
        transportation = ["Itella",transportationCountryRaw,select.options[select.selectedIndex].text,select.selectedIndex]
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

    let msg = document.getElementById("finish-form-msg")
    
    if (sum(Object.values(quantity))==0) {
        msg.style.display = "block"
        if (userData.language=="est") {
            msg.innerHTML = "Ostukorv on tühi."
        }
        else if (userData.language=="rus") {
            msg.innerHTML = "Корзина пуста."
        }
        else {
            msg.innerHTML = "Cart is empty."
        }
        return
    }
    if (transportation[1]=="") {
        msg.style.display = "block"
        if (userData.language=="est") {
            msg.innerHTML = "Vali transpordiviis."
        }
        else if (userData.language=="rus") {
            msg.innerHTML = "Выберите способ доставки."
        }
        else {
            msg.innerHTML = "Select transportation."
        }
        return
    }
    if (name1=="" || name2=="" || email=="" || email=="" || phoneNumber=="" || address=="") {
        msg.style.display = "block"
        msg.style.display = "block"
        if (userData.language=="est") {
            msg.innerHTML = "Mõned vormiväljad on tühjad."
        }
        else if (userData.language=="rus") {
            msg.innerHTML = "Некоторые поля формы пустые."
        }
        else {
            msg.innerHTML = "Some form fields are empty."
        }
        return
    }


    let overlay = document.getElementById("overlay")
    overlay.style.display = "flex"

    userData.name1 = name1
    userData.name2 = name2
    userData.email = email
    userData.phoneNumber = phoneNumber
    userData.address = address
    userData.time = time
    userData.orderNumber = getOrderNumber()
    userData.transport =  [transportation[0],transportation[1],transportation[2],parseFloat(transportationPrice[transportation[0]])]

    localStorage.setItem('orderData',JSON.stringify(userData))
    
    let url = 'https://server.vegato-pet-shop.com/send-order'
    let xhr = createCORSRequest('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.responseText
            window.location.href = "/"+userData.language+"/order-succeeded"
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log(xhr)
            let response = xhr.responseText
            window.location.href = "/"+userData.language+"/order-failed"
        }
	}
    xhr.send(JSON.stringify(userData))
    quantity = {
        catFoodSmall: 0,
        catFoodBig: 0,
        dogFoodSmall: 0, 
        dogFoodBig: 0
    }
    localStorage.setItem('quantity',JSON.stringify(quantity))
    
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
    let msg = document.getElementById("finish-form-msg")
    msg.style.display = "none"
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
    let transportationCountry = document.getElementById("country-select").value.toLowerCase()
    let provider = transportation[0]
    let providers = ["dpd","omniva","itella"]
    if (provider!="") {
        let providerFormatted = provider.toLowerCase()
        let providerInd = providers.indexOf(providerFormatted)
        let button = this.document.getElementById(providerFormatted+"-radio-button")
        button.checked = true
        selectTransportationType(providerInd)
        if (transportation[3]!=-1) {
            let select = document.getElementById(providerFormatted+"-pickup-point-select-"+transportationCountry)
            select.selectedIndex = transportation[3]
        }
    }
    else {
        let buttonDPD = this.document.getElementById("dpd-radio-button")
        let buttonOmniva = this.document.getElementById("omniva-radio-button")
        let buttonItella = this.document.getElementById("itella-radio-button")
        buttonDPD.checked = false
        buttonOmniva.checked = false
        buttonItella.checked = false
    }
})

