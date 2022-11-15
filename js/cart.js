function updateIncrementers() {
    /*Price*/
    var ksItems = Object.keys(price)
    for (var i=0; i<ksItems.length; i++) {
        var item = price[ksItems[i]]
        var ksParts = Object.keys(item)
        for (var j=0; j<ksParts.length; j++) {
            var n = ksItems[i]+"-price-"+ksParts[j]
            var obj = document.getElementById(n)
            obj.innerHTML = obj.innerHTML.replace("_", item[ksParts[j]])
        }
    }
    /*Quantity*/
    var ksItems = Object.keys(quantity)
    for (var i=0; i<ksItems.length; i++) {
        var n = ksItems[i]+"-incrementer"
        document.getElementById(n).querySelector('input[type=number]').value = quantity[ksItems[i]]
    }
}

function updateCart() {
    language = userData.language
    var objName = document.getElementById("products-name")
    var objQuantity = document.getElementById("products-quantity")
    var objPrice = document.getElementById("products-price")
    var objTotal = document.getElementById("products-price-total")

    objName.innerHTML = ""
    objQuantity.innerHTML = ""
    objPrice.innerHTML = ""
    objTotal.innerHTML = ""

    let priceTotal = 0
    let order = []
    var ksItems = Object.keys(price)
    for (var i=0; i<ksItems.length; i++) {
        var item = ksItems[i]
        var productsQuantity = quantity[item]
        if (productsQuantity!=0) {
            var productName = names[item][language]
            var productsPrice = price[item]

            priceTotal += productsQuantity*productsPrice
            order.push([productName,productsQuantity,productsPrice])

            var p = document.createElement("p");
            var text = document.createTextNode(productName)
            p.appendChild(text)
            objName.appendChild(p)

            p = document.createElement("p")

            text = document.createTextNode(productsQuantity)
            p.appendChild(text)
            objQuantity.appendChild(p)

            p = document.createElement("p")
            text = document.createTextNode(productsPrice+" EUR")
            p.appendChild(text)
            objPrice.appendChild(p)
        }
    }
    userData.order = order
    
    // Transport
    if (transportation[0]!="") {
        var p = document.createElement("p");
        var text = document.createTextNode("Transport ("+transportation[0]+")")
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
        objTotal.appendChild(document.createTextNode(priceTotal+" EUR"))
    }
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
        var select = document.getElementById("dpd-pickup-point-select")
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
        var select = document.getElementById("dpd-pickup-point-select")
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
    var email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function checkConfirmationCode() {
    var email = document.getElementById("email-for-verification").value
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
    var xhr = new XMLHttpRequest();
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

    var name1 = document.getElementById("personal-data-name1").value 
    var name2 = document.getElementById("personal-data-name2").value
    var email = document.getElementById("personal-data-email").value
    var phoneNumber = document.getElementById("personal-data-phone").value
    var address = document.getElementById("personal-data-address").value
    var currentDate = new Date()
    var time = currentDate.getDate() + "."
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
    userData.transport =  [transportation[1],transportationPrice[transportation[0]]]
    
    var url = 'http://192.168.0.56:8000/send-order';
    var xhr = createCORSRequest('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText
            console.log(response)
            if (response[0]=="success") {
                orderReceipt = response[1]
                localStorage.setItem('orderReceipt',orderReceipt)
                //window.location.replace("../order-done")
            }
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            orderError = response[0]
            localStorage.setItem('orderError',orderError)
        }
	}
    xhr.send(JSON.stringify(userData))
}

function displayReceipt() {
    var receipt = localStorage.getItem('orderReceipt')
    document.getElementById("receipt").innerHTML = receipt
}

function displayError() {
    var error = localStorage.getItem('orderError')
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

