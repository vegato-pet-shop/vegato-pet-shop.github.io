
let language
let currentUrl = window.location.href
if (currentUrl.includes("est")) {
    language = "est"
}
else if (currentUrl.includes("rus")) {
    language = "rus"
}
else {
    language = "eng"
}

let orderData = JSON.parse(localStorage.getItem('orderData'))
let orderText = ""
let iframeHeight = 0

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

function item(order) {
    let cost = order[2]
    cost = (typeof cost)=="string" ? cost : cost.toFixed(2)
    return `<tr><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;">${order[0]}</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;">${order[1]}</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;"><span>${cost} <span>€</span></span></td></tr>`
}

function addData(message) {
    countries = {
        Estonia: {
            rus: "Эстония",
            est: "Eesti"
        },
        Latvia: {
            rus: "Латвия",
            est: "Läti"
        },
        Lithuania: {
            rus: "Латвия",
            est: "Leedu"
        },
        Finland: {
            rus: "Финляндия",
            est: "Soome"
        }
    }
    if (language!="eng") {
        orderData["transport"][1] = countries[orderData["transport"][1]][language]
    }
    let transportCost = orderData["transport"][3]
    let transportCostString = transportCost.toFixed(2)
    let provider = orderData["transport"][0]
    if (language=="est") {
        transportItem = ["Transport ("+provider+")","",transportCostString]
    }
    else if (language=="rus") {
        transportItem = ["Транспорт ("+provider+")","",transportCostString]
    }
    else {
        transportItem = ["Transportation ("+provider+")","",transportCostString]
    }
    let keys = ["name1","name2","email","phoneNumber","address","time","orderNumber","orderSum","referralMsg"]
    let pairs = keys.map(x => ["$"+x, orderData[x]])
    let transport = orderData["transport"][0]+" "+orderData["transport"][1]+" "+orderData["transport"][2]
    orderWithTransport = [...orderData["order"],transportItem]
    items = orderWithTransport.map(x => item(x)).join(" ")
    pairs.push(["$transport", transport], ["$items", items])
    pairs.push()
    for (pair of pairs) {
        message = message.replaceAll(...pair)
    }
    return message
}

function setIframeHeight(iframe,zoom) {
    let style = window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size');
    let fontSize = parseFloat(style); 

    // Adjusting the iframe height onload event
    iframe.onload = function()
    // function execute while load the iframe
    {
        // set the height of the iframe as 
        // the height of the iframe content
        let scrollHeight = iframe.contentWindow.document.body.scrollHeight
        let height = zoom*(scrollHeight/fontSize)
        iframe.style.height = height + 'rem';
        iframeHeight = height
    }
}

let changeSize = function() {
    let iframe = document.getElementById("order-wrapper")
    let expr = getComputedStyle(iframe).getPropertyValue('--zoom')
    expr = expr.replace("calc(","")
    expr = expr.replace(")","")
    let splitStr = expr.split("/")
    let zoom = 1/(parseFloat(splitStr[0])/parseFloat(splitStr[1]))
    iframe.style.width = 100*zoom+"%"
    let iframeBody = iframe.contentWindow.document.body
    let iframeBodyHeight = getComputedStyle(iframeBody).getPropertyValue('height')
    iframe.style.height = iframeBodyHeight
}

function downloadOrder() {
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(new Blob([orderText], {type: "text/plain"}))
    a.download = "order.html"
    a.click()
}

let callback = function() {
    let cartCounter = document.getElementById("cart-counter")
    cartCounter.innerHTML = 0
    
    let url = "/assets/order_messages/message"+language.toUpperCase()+".html";
    let xhr = createCORSRequest('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.responseText
            response = addData(response)
            orderText = response
            let iframe = document.getElementById("order-wrapper")
            setIframeHeight(iframe,1)
            iframe.srcdoc = response
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log("error")
        }
    }
    xhr.send()

    changeSize()
}

window.addEventListener("load", callback)

window.addEventListener("resize", (event) => {
    changeSize()
})