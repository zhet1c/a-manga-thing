function load() {
    fetch("/db.json")
    .then(res => res.json())
    .then(function (res) {
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
        document.getElementById("titles").innerHTML = strCatalog;
    });
}

document.onreadystatechange = load();
