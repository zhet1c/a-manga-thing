$(document).ready(function () {

    var layoutCurrent;
    var pageNo;
    var pageCurrent = 1;
    var title;
    var cid;
    var fitCurrent;

    function loadPage() {
        console.log(layoutCurrent);
        for(let i = 1; i <= pageNo; i++){
            $(`#image${i}`).hide();
        }
        if(layoutCurrent == "double"){
            if(pageCurrent%2==0){
                pageCurrent--;
            }
            let pagePair = pageCurrent+1;
            $(`#image${pagePair}`).show();
        }
        $("#pageCounter").html(`${pageCurrent}/${pageNo}`);
        $(`#image${pageCurrent}`).show();
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
        for (let i = 1; i <= pageNo; i++) {
            $(`#image${i}`).attr("class", "imageView");
        }
        $("#layoutIcon").attr("src", "img/single.png");
        fitHeight();
        loadPage();
    }

    function layoutDouble(){
        layoutCurrent = "double";
        for (let i = 1; i <= pageNo; i++) {
            let side = "Right";
            if(i%2==0){
                side = "Left";
            }
            $(`#image${i}`).attr("class", `image${side}`);
        }
        $("#layoutIcon").attr("src", "img/double.png");
        fitWidth();
        loadPage();
    }

    function fitWidth(){
        if(layoutCurrent == "single"){
            fitCurrent = "width";
            $(".imageView").css("height", "auto");
            $(".imageView").css("width", "100%");
            $("#fitIcon").attr("src", "img/width.png");
            loadPage();
        }
    }

    function fitHeight(){
        if(layoutCurrent == "single"){
            fitCurrent = "height";
            $(".imageView").css("width", "auto");
            $(".imageView").css("height", "100%");
            $("#fitIcon").attr("src", "img/height.png");
            loadPage();
        }
    }

    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let domain = window.location.hostname;
    $.ajax({
        dataType: "json",
        url: "/db.json",
        headers: { "Accept": "application/json"},
        success: function (res) {
            $.ajax({
                dataType: "json",
                url: "https://"+domain+"/db.json",
                headers: { "Accept": "application/json"},
                success: function (res) {
                }
            });
            pageNo = res[id]["pageNo"];
            title = res[id]["title"];
            cid = res[id]["cid"];
            $("#pageCounter").html(`${pageCurrent}/${pageNo}`);
            $("#titlebarText").html(`${title}`);
            $("title").html(`${title}`);
            for (let i = 1; i <= pageNo; i++) {
                $("#pageView").append(`<img draggable="false" class="imageView" id="image${i}" src="https://ipfs.io/ipfs/${cid}/${i}.jpg">`);
                $(`#image${i}`).hide();
            }
            loadPage();
        }
    });

    fitHeight();
    layoutSingle();
    loadPage();

    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 39:
            case 76:
                previousPage();
                break;
            case 37:
            case 72:
                nextPage();
                break;
            default: return;
        }
        e.preventDefault();
    });
    $("#pageLeft").mousedown(function (e) {
        nextPage();
    });
    $("#pageRight").mousedown(function (e) {
        previousPage();
    });
    $("#downloadButton").click(function (e) {
        //$("#downloadButton").css("background-color", "rgb(0, 0, 0, 0.2)");
    });
    $("#layoutButton").click(function (e) {
        if(layoutCurrent == "single"){
            layoutDouble();
        }
        else{
            layoutSingle();
        }
    });
    $("#fitButton").click(function (e) {
        if(fitCurrent == "height"){
            fitWidth();
        }
        else{
            fitHeight();
        }

    });

    $("#titlebar").hide();
    $("#titlebarContainer").mouseenter(function () {
        console.log("mouse enter");
        $("#titlebar").fadeIn();
    });
    $("#titlebarContainer").mouseleave(function () {
        console.log("mouse leave");
        $("#titlebar").fadeOut();
    });
});

