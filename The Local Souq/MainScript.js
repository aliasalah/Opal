function fetchJSONFile(path) {
     var response;
    var xmlFile = new XMLHttpRequest();
    xmlFile.open('GET', path);
    xmlFile.send('');
    xmlFile.addEventListener('readystatechange', function (e) {
    if (xmlFile.readyState == 4 && xmlFile.status == 200) 
      {
        response = JSON.parse(xmlFile.response); 
        return response;
      }
       
})
    

}

/*var response;
$(function () {
         $.ajax({
         method: 'GET',
         url:'rockbands.json',
         statusCode: {
         200: function (e) {
             response=e;
           for(var item in e) {
         $('#Band').append("<option value="+item+">"+item+"</option>");      
          }
        }}
    
    });
        
                
    
       
});*/

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

$( 'li' ).click(function( event ) {
   var val;
  
 val=ReadJson('Tvs.json');//fetchJSONFile('Tvs.json');
   console.log(val);

});