//by Omar declare some variables that will be used in cart handling
var noOfItemsInCart = 0;
var arrOfCartItems = [];
var cartItem;
///////////////

    

$( document ).ready(function() {
    
//by Omar update cart no of items
var cartNo = document.querySelector("#cartNo"); 
if (sessionStorage.getItem("noOfItemsInCart")!=null){
    noOfItemsInCart=sessionStorage.getItem("noOfItemsInCart");
    cartNo.innerText = noOfItemsInCart;
}
if (noOfItemsInCart > 0){
    var tmpStr = localStorage.getItem("arrOfCartItems");
    arrOfCartItems = JSON.parse(tmpStr);
}
///////////////
    
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
$('#P1').attr('src', val["Products"][0].images[0]);
$('#P2').attr('src', val["Products"][1].images[0]);
$('#P3').attr('src', val["Products"][2].images[0]);
$('#P4').attr('src', val["Products"][3].images[0]);
$('#P5').attr('src', val["Products"][4].images[0]);
$('#P6').attr('src', val["Products"][5].images[0]);
$('#P7').attr('src', val["Products"][6].images[0]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//Cart Handling // classes and values added to buttons //values and classes were added in html to each "+" or "-" button // the values represent the item index in the JSON Array  
    
 
var btnsAddArr = document.querySelectorAll("button.AddToCartBtn");
btnsAddArr.forEach(function(clkdBtn){
    clkdBtn.addEventListener("click",function(){
        noOfItemsInCart ++;
        cartNo.innerText = noOfItemsInCart;
        sessionStorage.setItem("noOfItemsInCart",noOfItemsInCart);
        cartItem = val["Products"][parseInt(clkdBtn.value)];
        if (arrOfCartItems.indexOf(cartItem) === -1){ //if that item wan not added before push it in the array
            cartItem["count"]=1; 
            arrOfCartItems.push(cartItem);
            }
        else
            arrOfCartItems[arrOfCartItems.indexOf(cartItem)]["count"] +=1;
    });
});
    
var btnsRmvArr = document.querySelectorAll("button.RmvFrmCartBtn");
btnsRmvArr.forEach(function(clkdBtn){
    clkdBtn.addEventListener("click",function(){
        cartItemIndex = arrOfCartItems.indexOf(cartItem);
        cartItem = val["Products"][parseInt(clkdBtn.value)];
        if (cartItemIndex != -1){            //if that item was added before
            noOfItemsInCart --;
            cartNo.innerText = noOfItemsInCart;
            sessionStorage.setItem("noOfItemsInCart",noOfItemsInCart);
            if(arrOfCartItems[cartItemIndex].count != 1)
                arrOfCartItems[cartItemIndex].count -=1;
            else
                arrOfCartItems.splice(cartItemIndex,1);
        }
        
    });
});

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//saving the cart items to session storage before leavong the page

window.onunload = function() {
    localStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems))
};



