function load() {
    $.ajax({
        dataType: "json",
        url: "http://"+window.location.hostname+"/db.json",
        headers: { "Accept": "application/json"},
        success: function (res) {
            let strCatalog = "";
            let strSearch = document.getElementById("search").value;
            res.forEach(manga => {
                if (strSearch != "" && !manga["title"].toLowerCase().includes(strSearch.toLowerCase()))
                    return;
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
            document.getElementById("titles").innerHTML = strCatalog;
        }
    });
}
$(document).ready(function () {
    load();
});
