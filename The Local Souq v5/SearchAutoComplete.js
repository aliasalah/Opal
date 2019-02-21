$(document).ready(function(){
    

    
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

var ArrOfOptions=[];
    
 $.getJSON( "Categroies.json", function( data ) {
     $.each( data, function( key, val ) {
         if(key=="SubCategories"){
        //$('#options').attr('id','doption');                
           jQuery.each( val, function( i, valJson ) {
              var tit = ReadJson(valJson)  ;
               
               for(var j=0;j<tit.Products.length;j++)
                   {
                        //$("#options").append("<option value='" + tit.Products[j].Title + "'>")
                       ArrOfOptions.push(tit.Products[j].Title);               
                     }
            })
          }
         }) 
        
      })
 
.done(function() {
$('#autocomplete').autocomplete({
	lookup: ArrOfOptions 
});
     
       })
})