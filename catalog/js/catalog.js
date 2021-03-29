function load() {
    fetch("https://amangathing.ddns.net/db.json")
    .then(res => res.json())
    .then(function (res) {
        console.log(res);
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
                        <a href="reader.html?manga='+manga["id"]+'">reader</a>\
                    </p>\
                </td>\
            </tr>';
        });
        console.log(strCatalog);
        document.getElementById("titles").innerHTML = strCatalog;
    });
}

document.onreadystatechange = load();
