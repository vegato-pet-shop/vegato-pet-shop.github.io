
let userData

if (localStorage.getItem('userData')!=null && localStorage.getItem('userData')!=undefined) {
    userData = JSON.parse(localStorage.getItem('userData'))
    window.location.href = "/"+userData.language
}
else {
    window.location.href = "/est"
}
