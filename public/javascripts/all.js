function darkmode() {
    let mode = localStorage.getItem("mode")
    let body = document.getElementById("ui-body");
    let content = document.getElementById("ui-contents");
    let subnavbar = document.getElementById("ui-subnavbar");
    let navitem = document.getElementById("ui-nav-item");
    if (mode == "dark") {
        body.classList.add("darkmode");
        content.classList.add("darkmode");
        subnavbar.classList.add("darkmode");
        navitem.classList.add("darkmode");
    } else {
        body.classList.remove("darkmode");
        content.classList.remove("darkmode");
        subnavbar.classList.remove("darkmode");
        navitem.classList.remove("darkmode");
    }
}

function clicktoelement(id) {
    let top = document.getElementById(id).offsetTop
    document.body.scrollTop = top - 120 //120
    document.documentElement.scrollTop = top - 120 //120
}
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('myBtn').style.display = "block";
    } else {
        document.getElementById('myBtn').style.display = "none";
    }
}
function scrollToTop(duration) {
    document.scrollingElement.scrollTop = 0
}
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();
