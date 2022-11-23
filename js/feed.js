
function changePane(ind) {
    let buttons = document.getElementById("buttons-line").children
    let texts = document.getElementById("texts").children
    for (let i=0;i<3;i++) {
        buttons[i].style.backgroundColor = ""
        texts[i].style.display = "none"
    }
    buttons[ind].style.backgroundColor = "#f49957"
    texts[ind].style.display = "initial"
}

window.addEventListener("load", function() {
    changePane(0)
})