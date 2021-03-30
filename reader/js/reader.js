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
    if(pageCurrent <= pageNo && pageCurrent > 0){
        for(let i = 1; i <= pageNo; i++){
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

// Goto next page or previous page. Left is next page by default.
var rightPage = function () {
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

var leftPage = function () {
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

// Inversion between left-to-right and right-to-left
function invertPage() {
    [leftPage, rightPage] = [rightPage, leftPage];
}

function layoutSingle(){
    layoutCurrent = "single";
    fitHeight();
    for (let i = 1; i <= pageNo; i++) {
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
    e = e || window.event;
    switch (e.keyCode) {
        case 39:
        case 76:
            rightPage();
            break;
        case 37:
        case 72:
            leftPage();
            break;
        case 73:
            invertPage();
        default: return;
    }
    e.preventDefault();
});

document.getElementById("pageLeft").addEventListener("click", function (e) {
    leftPage();
});

document.getElementById("pageRight").addEventListener("click", function (e) {
    rightPage();
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

document.getElementById("invertButton").addEventListener("click", function (e) {
    invertPage();
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

fetch("/db.json")
.then(res => res.json())
.then(function (res) {
    pageNo = res[manga].chapters[chapter].pages;
    // "https://ipfs.io/api/v0/ls/"+res[manga][chapter]["cid"];
    title = res[manga].title;
    cid = res[manga].cid;

// --------------------------------------------------------
// Initialize
// --------------------------------------------------------

    document.getElementById("titlebar").style.visibility = "hidden";
    document.getElementById("pageCounter").textContent = `${pageCurrent}/${pageNo}`;
    document.getElementById("titlebarText").textContent = `${title}`;
    document.title = `${title}`;
    document.getElementById("pageView").innerHtml = "";

    var pageView = document.getElementById("pageView");
    for (let i = 1; i <= pageNo; i++) {
        var img = document.createElement("img");
        img.setAttribute("draggable", "false");
        img.setAttribute("src", `https://ipfs.io/ipfs/${cid}/${i}.jpg`);
        img.id = `image${i}`;
        img.style.visibility = "hidden";
        pageView.appendChild(img);
    }

    if(pageNo > 0){
        layoutSingle();
        fitHeight();
        loadPage();
    }
    else{
        document.getElementById("titlebarText").textContent = "Nothing to load";
    }
});



