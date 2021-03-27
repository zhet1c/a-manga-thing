function load() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            console.log("loaded");
            console.log(this.responseText);
            var res = JSON.parse(this.responseText);
            var strCatalog = "";
            res.forEach(manga => {
                strCatalog += '<tr>\
                    <td class="cover">\
                        <img class="thumbnail" src="img/covers/'+manga["id"]+'.jpg"/>\
                    </td>\
                        <td class="description">\
                            <p><b>'+manga["title"]+'</b></p>\
                            <p>Scanlation: ?</p>\
                            <p>Status: ?</p>\
                            <p>Chapters: ?</p>\
                            <p>Last update: ?</p>\
                            <p>\
                                Link:\
                                <a href="reader.html?id='+manga["id"]+'">reader</a>\
                            </p>\
                        </td>\
                    </tr>';
            });
            console.log(strCatalog);
            document.getElementById("titles").innerHTML = strCatalog;
        }
    }
    xmlhttp.open("GET", "https://amangathing.ddns.net/db.json", true);
    xmlhttp.send();
}

document.onreadystatechange = load();
