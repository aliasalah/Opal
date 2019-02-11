$( document ).ready(function() {
    // Run code

$("#nav li a").on("click", function(){
 sessionStorage.setItem("path",$(this).attr("value"));
});
    
function  ReadJson(path) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': path,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    })
    return json;

}
path=sessionStorage.getItem('path');
sessionStorage.clear();
val=ReadJson(path);
$('#P1').attr('src', val["Products"][7].images[0]);
$('#P2').attr('src', val["Products"][1].images[0]);
$('#P3').attr('src', val["Products"][2].images[0]);
$('#P4').attr('src', val["Products"][3].images[0]);
$('#P5').attr('src', val["Products"][4].images[0]);
$('#P6').attr('src', val["Products"][5].images[0]);
$('#P7').attr('src', val["Products"][6].images[0]);
});