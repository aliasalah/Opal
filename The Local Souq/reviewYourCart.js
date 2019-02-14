var noOfItemsInCart = 0;
var arrOfCartItems = [];

onload=function(){   
var cartContent = document.querySelector("#cartContent");
    
var cartNo = document.querySelector("#cartNo"); 
if (sessionStorage.getItem("noOfItemsInCart")!=null){
    noOfItemsInCart=sessionStorage.getItem("noOfItemsInCart");
    cartNo.innerText = noOfItemsInCart;
}
    
if (noOfItemsInCart == 0){
    cartContent.innerText = "You have no items in your cart yet!";
}
else if (noOfItemsInCart > 0){
    
    var tmpStr = localStorage.getItem("arrOfCartItems");
    arrOfCartItems = JSON.parse(tmpStr);
    console.log(arrOfCartItems);
    for(var i=0; i<arrOfCartItems.length; i++){
        displayCartItem(arrOfCartItems[i]);   
    }
    
}
}; //onload


function displayCartItem(curItem){
    let tmpDivItem = document.createElement("div");
    let tmpTbl = document.createElement("table");
    tmpDivItem.appendChild(tmpTbl);
    let tmpR1 = document.createElement("tr");
    tmpTbl.appendChild(tmpR1);
    let tmpR1C1 = document.createElement("td");
    tmpR1C1.colSpan="3";
    tmpR1.appendChild(tmpR1C1);
    tmpR1C1.innerHTML = curItem["Title"]+'<span class="material-icons rightAligned">cancel</span>';
    
    let tmpR2 = document.createElement("tr");
    tmpTbl.appendChild(tmpR2);
    let tmpR2C1 = document.createElement("td");
    tmpR2C1.colSpan="3";
    tmpR2.appendChild(tmpR2C1);
    tmpR2C1.innerHTML='<img src="'+curItem["images"][0]+'">';
    
    let tmpR3 = document.createElement("tr");
    tmpTbl.appendChild(tmpR3);
    let tmpR3C1 = document.createElement("td");
    tmpR3C1.colSpan="3";
    tmpR3.appendChild(tmpR3C1);
    tmpR3C1.innerText = curItem["price"]+"EGP";
    
    let tmpR4 = document.createElement("tr");
    tmpTbl.appendChild(tmpR4);
    let tmpR4C1 = document.createElement("td");
    let tmpR4C2 = document.createElement("td");
    let tmpR4C3 = document.createElement("td");
    tmpR4.appendChild(tmpR4C1);
    tmpR4.appendChild(tmpR4C2);
    tmpR4.appendChild(tmpR4C3);
    tmpR4C1.innerHTML='<span class="material-icons">add_circle</span>';
    tmpR4C2.innerText = "Count : " + curItem["count"];
    tmpR4C3.innerHTML='<span class="material-icons">remove_circle</span>';
    
    cartContent.appendChild(tmpDivItem);
};



window.onunload = function() {
    localStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems))
};
