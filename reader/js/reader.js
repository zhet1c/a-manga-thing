var layoutCurrent;
var pageNo = 0;
var pageCurrent = 1;
var title;
var cid;
var content_url;
var fitCurrent;
var url = new URL(window.location.href);
var manga = 0;
var chapter = 0;

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

function loadPage() {
    console.log("loading page", pageCurrent, "out of", pageNo);
    if(pageCurrent <= pageNo && pageCurrent > 0){
        for(let i = 1; i <= pageNo; i++){
            console.log(i);
            document.getElementById(`image${i}`).style.visibility = "hidden";
        }
        if(layoutCurrent == "double"){
            if(pageCurrent%2==0){
                pageCurrent--;
            }
            let pagePair = pageCurrent+1;
            document.getElementById(`image${pagePair}`).style.visibility = "visible";
        }
        document.getElementById("pageCounter").textContent = `${pageCurrent}/${pageNo}`;
        document.getElementById(`image${pageCurrent}`).style.visibility = "visible";
    }
}

function nextPage() {
    if(layoutCurrent == "double"){
        if(pageCurrent+2 <= pageNo){
            pageCurrent += 2;
        }
    }
    else{
        if(pageCurrent+1 <= pageNo){
            pageCurrent++;
        }
    }
    loadPage();
}

function previousPage() {
    if(layoutCurrent == "double"){
        if(pageCurrent-2 >= 1){
            pageCurrent -= 2;
        }
    }
    else{
        if(pageCurrent-1 >= 1){
            pageCurrent--;
        }
    }
    loadPage();
}

function layoutSingle(){
    layoutCurrent = "single";
    fitHeight();
    for (let i = 1; i <= pageNo; i++) {
        console.log(`image${i}`);
        document.getElementById(`image${i}`).className = "imageView";
    }
    document.getElementById("layoutIcon").src = "img/single.png";
}

function layoutDouble(){
    fitHeight();
    layoutCurrent = "double";
    for (let i = 1; i <= pageNo; i++) {
        let side = "Right";
        if(i%2==0){
            side = "Left";
        }
        document.getElementById(`image${i}`).className = `image${side}`;
    }
    document.getElementById("layoutIcon").src = "img/double.png";
}

function fitWidth(){
    if(layoutCurrent == "single"){
        fitCurrent = "width";
        var items = document.getElementsByClassName("imageView");
        for(var i = 0; i < items.length; i++){
            items.item(i).style.width = "100%";
            items.item(i).style.height = "auto";
        }
        document.getElementById("fitIcon").src =  "img/width.png";
    }
}

function fitHeight(){
    if(layoutCurrent == "single"){
        fitCurrent = "height";
        var items = document.getElementsByClassName("imageView");
        for(var i = 0; i < items.length; i++){
            items.item(i).style.width = "auto";
            items.item(i).style.height = "100%";
        }
        document.getElementById("fitIcon").src = "img/height.png";
    }
}

// ---------------------------------------------------------
// Event handlers
// ---------------------------------------------------------

document.addEventListener("keydown", function (e) {
    console.log("key press");
    e = e || window.event;
    switch (e.keyCode) {
        case 39:
        case 76:
            console.log("right");
            previousPage();
            break;
        case 37:
        case 72:
            console.log("left");
            nextPage();
            break;
        default: return;
    }
    e.preventDefault();
});

document.getElementById("pageLeft").addEventListener("click", function (e) {
    nextPage();
});

document.getElementById("pageRight").addEventListener("click", function (e) {
    previousPage();
});

document.getElementById("downloadButton").addEventListener("click", function (e) {
    //document.getElementById("downloadButton").style.background-color = "rgb(0, 0, 0, 0.2)";
});

document.getElementById("layoutButton").addEventListener("click", function (e) {
    if(layoutCurrent == "single"){
        layoutDouble();
    }
    else{
        layoutSingle();
    }
    loadPage();
});

document.getElementById("fitButton").addEventListener("click", function (e) {
    if(fitCurrent == "height"){
        fitWidth();
    }
    else{
        fitHeight();

    }
    loadPage();
});

document.getElementById("titlebarContainer").addEventListener("mouseenter", function () {
    document.getElementById("titlebar").style.visibility = "visible";
});

document.getElementById("titlebarContainer").addEventListener("mouseleave", function () {
    document.getElementById("titlebar").style.visibility = "hidden";
});

if(url.searchParams.has("manga")){
    manga = url.searchParams.get("manga");
}
if(url.searchParams.has("chapter")){
    chapter = url.searchParams.get("chapter");
}

// ---------------------------------------------------------
// parse json data
// ---------------------------------------------------------

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        console.log("parsing json", this.responseText);
        pageNo = res[manga].chapters[chapter].pages;
        // "https://ipfs.io/api/v0/ls/"+res[manga][chapter]["cid"];
        title = res[manga].title;
        cid = res[manga].cid;
        console.log(pageNo, title, cid);

// ---------------------------------------------------------
// Initialize
// ---------------------------------------------------------

        document.getElementById("titlebar").style.visibility = "hidden";

        document.getElementById("pageCounter").textContent = `${pageCurrent}/${pageNo}`;
        document.getElementById("titlebarText").textContent = `${title}`;
        document.title = `${title}`;
        document.getElementById("pageView").innerHtml = "";

        for (let i = 1; i <= pageNo; i++) {
            var img = document.createElement("img");
            img.setAttribute("draggable", "false");
            img.setAttribute("src", `https://ipfs.io/ipfs/${cid}/${i}.jpg`);
            img.id = `image${i}`;
            img.style.visibility = "hidden";
            document.getElementById("pageView").appendChild(img);
        }

        console.log(document.getElementById("pageView").innerHtml);

        if(pageNo > 0){
            layoutSingle();
            fitHeight();
            loadPage();
        }
        else{
            console.log("no pages to load");
        }
    }
}
xmlhttp.open("GET", "https://amangathing.ddns.net/db.json", true);
xmlhttp.send();


