//by Omar declare some variables that will be used in cart handling
var noOfItemsInCart = 0;
var arrOfCartItems = [];
var cartItem;
///////////////

//by Omar declare some variables to be used in dynamic page
var myxhr;
var allCategoriesJSON;
var allSubCategoriesJSON;
var arrAllSubProducts = [];
var val = null;


    

$( document ).ready(function() {

//by Omar update cart no of items
var products = document.querySelector("#products");
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
//path=sessionStorage.getItem('path');
//sessionStorage.clear();
//val=ReadJson(path);
//$('#P1').attr('src', val["Products"][0].images[0]);
//$('#P2').attr('src', val["Products"][1].images[0]);
//$('#P3').attr('src', val["Products"][2].images[0]);
//$('#P4').attr('src', val["Products"][3].images[0]);
//$('#P5').attr('src', val["Products"][4].images[0]);
//$('#P6').attr('src', val["Products"][5].images[0]);
//$('#P7').attr('src', val["Products"][6].images[0]);
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//adapting the page to be dynamic by Omar
myxhr = new XMLHttpRequest();
myxhr.open("GET", "Categroies.json");
myxhr.send("");
myxhr.addEventListener("readystatechange", function(e){
    if (myxhr.readyState==4 && myxhr.status==200){
        allCategoriesJSON = JSON.parse(myxhr.response);
        allSubCategoriesJSON = allCategoriesJSON["SubCategories"]; //this part has to be modified after JSON file changes to support more categories
        
        for(var i=0; i<allSubCategoriesJSON.length; i++){
            arrAllSubProducts[i] = ReadJson(allSubCategoriesJSON[i]);
        } // looping on each SubCategory
        
        for(var j=0; j<arrAllSubProducts.length;j++){
            var tmpTitleStr = arrAllSubProducts[j]["Title"];
            products.insertAdjacentHTML("beforeend", "<h2 id='"+tmpTitleStr+"'>"+tmpTitleStr+"</h2><hr>");
            for(var k=0; k<arrAllSubProducts[j]["Products"].length; k++){
                curItem = arrAllSubProducts[j]["Products"][k];
                curItemSubCatName = arrAllSubProducts[j]["Title"];
                displayItem(curItem,j,k);
 
            }//looping on eack SubCategory display its products
                
        }//looping on arrAllSubProducts
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//Cart Handling // classes and values added to buttons //values and classes were added in html to each "+" or "-" button // the values represent the item index in the JSON Array  
    
 
var btnsAddArr = document.querySelectorAll("button.AddToCartBtn");
btnsAddArr.forEach(function(clkdBtn){
    clkdBtn.addEventListener("click",function(){
        var SubCatIndex = parseInt(clkdBtn.value.split(' ')[0]);
        var ItemIndex = parseInt(clkdBtn.value.split(' ')[1]);
        val = arrAllSubProducts[SubCatIndex];
        noOfItemsInCart ++;
        cartNo.innerText = noOfItemsInCart;
        sessionStorage.setItem("noOfItemsInCart",noOfItemsInCart);
        cartItem = val["Products"][ItemIndex];
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
        var SubCatIndex = parseInt(clkdBtn.value.split(' ')[0]);
        var ItemIndex = parseInt(clkdBtn.value.split(' ')[1]);
        val = arrAllSubProducts[SubCatIndex]
        cartItem = val["Products"][ItemIndex];
        cartItemIndex = arrOfCartItems.indexOf(cartItem);
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
        
    } // main JSON Categories Success condition
}); //main JSON Categories readystatechange
    
    
    
    
    
    
    
    
    
    



}); //ready (load) function ends here





function displayItem(curItem,j,k){
    let tmpDivItem = document.createElement("div");
    tmpDivItem.classList.add("quarter");
    let tmpTbl = document.createElement("table");
    tmpDivItem.appendChild(tmpTbl);
    let tmpR1 = document.createElement("tr");
    tmpTbl.appendChild(tmpR1);
    let tmpR1C1 = document.createElement("td");
    tmpR1C1.colSpan="3";
    tmpR1.appendChild(tmpR1C1);
    tmpR1C1.innerHTML = curItem["Title"];
    
    let tmpR2 = document.createElement("tr");
    tmpTbl.appendChild(tmpR2);
    let tmpR2C1 = document.createElement("td");
    tmpR2C1.colSpan="3";
    tmpR2.appendChild(tmpR2C1);
    tmpR2C1.innerHTML='<img src="'+curItem["images"][0]+'">';
                
    let tmpR4 = document.createElement("tr");
    tmpTbl.appendChild(tmpR4);
    let tmpR4C1 = document.createElement("td");
    let tmpR4C2 = document.createElement("td");
    let tmpR4C3 = document.createElement("td");
    tmpR4.appendChild(tmpR4C1);
    tmpR4.appendChild(tmpR4C2);
    tmpR4.appendChild(tmpR4C3);
    tmpR4C1.innerHTML='<button class="AddToCartBtn" value="'+j+' '+k+'"><span class="material-icons">add_circle</span></button>';
    tmpR4C2.innerText = curItem["price"]+"EGP";
    tmpR4C3.innerHTML='<button class="RmvFrmCartBtn" value="'+j+' '+k+'"><span class="material-icons">remove_circle</span></button>';
    
    products.appendChild(tmpDivItem);
                   
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//saving the cart items to session storage before leavong the page

window.onunload = function() {
    localStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems))
};





