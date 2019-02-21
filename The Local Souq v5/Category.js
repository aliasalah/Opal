var noOfItemsInCart = 0;
var arrOfCartItems = [];
var cartItem;
var myxhr;
var allCategoriesJSON;
var allSubCategoriesJSON;
var arrAllSubProducts = [];
var val = null;


$(document).ready(function () {
    var products = document.querySelector("#products");
    var cartNo = document.querySelector("#cartNo");
    if (sessionStorage.getItem("noOfItemsInCart") != null) {
        noOfItemsInCart = sessionStorage.getItem("noOfItemsInCart");
        cartNo.innerText = noOfItemsInCart;
    }
    if (noOfItemsInCart > 0) {
        var tmpStr = sessionStorage.getItem("arrOfCartItems");
        arrOfCartItems = JSON.parse(tmpStr);
    }
    /**/
    function ReadJson(path) {
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
    $("#nav li a").on("click", function () {
        sessionStorage.setItem("path", $(this).attr("value"));
    });

    var Page = window.location.pathname;
    Page = Page.split("/").pop();
    console.log(Page);
    if (Page == "Category.html") {
        path = sessionStorage.getItem('path');
        //sessionStorage.clear();
        myxhr = new XMLHttpRequest();
        myxhr.open("GET", path);
        myxhr.send("");
        myxhr.addEventListener("readystatechange", function (e) {
            if (myxhr.readyState == 4 && myxhr.status == 200) {
                allCategoriesJSON = JSON.parse(myxhr.response);
                if (path === "Categroies.json") {
                    allSubCategoriesJSON = allCategoriesJSON["SubCategories"]; 
                    
                    for (var i = 0; i < allSubCategoriesJSON.length; i++) {
                        arrAllSubProducts[i] = ReadJson(allSubCategoriesJSON[i]);
                    } // looping on each SubCategory

                    for (var j = 0; j < arrAllSubProducts.length; j++) {
                        var tmpTitleStr = arrAllSubProducts[j]["Title"];
                        products.insertAdjacentHTML("beforeend", "<h2 id='" + tmpTitleStr + "'>" + tmpTitleStr + "</h2><hr>");
                        for (var k = 0; k < arrAllSubProducts[j]["Products"].length; k++) {
                            curItem = arrAllSubProducts[j]["Products"][k];
                            curItemSubCatName = arrAllSubProducts[j]["Title"];
                            displayItem(curItem, j, k);

                        } //looping on eack SubCategory display its products

                    } //looping on arrAllSubProducts

                } //if
                else //single
                {
                    for (var k = 0; k < allCategoriesJSON["Products"].length; k++) {
                        curItem = allCategoriesJSON["Products"][k];
                        curItemSubCatName = allCategoriesJSON["Title"];
                        displayItem(curItem, j, k);

                    }

                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                //Cart Handling // classes and values added to buttons //values and classes were added in html to each "+" or "-" button // the values represent the item index in the JSON Array  

                document.addEventListener('click', function (e) {
                    if (e.target && e.target.parentElement.id == 'Img') {
                        if (path != "Categroies.json") {
                            var BtnValue = document.querySelector("#Add");
                            var ItemIndex = e.target.parentElement.getAttribute("index"); //parseInt(BtnValue.value.split(' ')[1]);
                            var i = allCategoriesJSON.Products[ItemIndex];
                            // alert(i.Title);
                            localStorage.setItem("Item", JSON.stringify(i))
                            window.location.href = "showItem.html";
                        } else {
                            var BtnValue = document.querySelector("#Add");
                            var ItemIndex = e.target.parentElement.getAttribute("index"); //parseInt(BtnValue.value.split(' ')[1]);
                            var CatIndex = e.target.parentElement.getAttribute("Catindex");
                            var i = arrAllSubProducts[CatIndex].Products[ItemIndex];
                            // alert(i.Title);
                            localStorage.setItem("Item", JSON.stringify(i))
                            window.location.href = "showItem.html";
                        }
                    }
                });

                var btnsAddArr = document.querySelectorAll("button.AddToCartBtn");
                btnsAddArr.forEach(function (clkdBtn) {
                    clkdBtn.addEventListener("click", function () {
                        var SubCatIndex = parseInt(clkdBtn.value.split(' ')[0]);
                        var ItemIndex = parseInt(clkdBtn.value.split(' ')[1]);

                        if (path === "Categroies.json") {
                            val = arrAllSubProducts[SubCatIndex];
                        } else {
                            val = allCategoriesJSON;
                        }

                        cartItem = val["Products"][ItemIndex];
                        var ind = FindElement(arrOfCartItems, cartItem);
                        if (ind == -1 || !(arrOfCartItems[ind].count >= val["Products"][ItemIndex].quantity)) {
                            noOfItemsInCart++;
                            cartNo.innerText = noOfItemsInCart;
                            sessionStorage.setItem("noOfItemsInCart", noOfItemsInCart);

                            if (ind == -1) {
                                cartItem["count"] = 1;
                                arrOfCartItems.push(cartItem);
                            } else {

                                arrOfCartItems[ind]["count"] += 1;
                            }
                        } else {
                            alert("This item is no longer avalible");
                        }
                    });
                });

                var btnsRmvArr = document.querySelectorAll("button.RmvFrmCartBtn");
                btnsRmvArr.forEach(function (clkdBtn) {
                    clkdBtn.addEventListener("click", function () {
                        var SubCatIndex = parseInt(clkdBtn.value.split(' ')[0]);
                        var ItemIndex = parseInt(clkdBtn.value.split(' ')[1]);
                        if (path === "Categroies.json") {
                            val = arrAllSubProducts[SubCatIndex]
                        } else {
                            val = allCategoriesJSON;
                        }
                        cartItem = val["Products"][ItemIndex];
                        cartItemIndex = FindElement(arrOfCartItems, cartItem); //arrOfCartItems.indexOf(cartItem);
                        if (cartItemIndex != -1) { //if that item was added before
                            noOfItemsInCart--;
                            cartNo.innerText = noOfItemsInCart;
                            sessionStorage.setItem("noOfItemsInCart", noOfItemsInCart);
                            if (arrOfCartItems[cartItemIndex].count != 1)
                                arrOfCartItems[cartItemIndex].count -= 1;
                            else
                                arrOfCartItems.splice(cartItemIndex, 1);
                        }
                    });
                });
            } // main JSON Categories Success condition
        }); //main JSON Categories readystatechange
    }

    //show the name of the user loggeg in
    dropbtn = document.querySelector(".dropbtn");
    dropdownContent = document.querySelector(".dropdown-content");
    if (hasCookie("userName")) {
        dropbtn.innerText = "Hello " + getCookie("userName");
        var LogoutAnchor = document.createElement("a");
        LogoutAnchor.innerText = "Logout";
        LogoutAnchor.setAttribute("href", "#");
        dropdownContent.innerHTML = '';
        dropdownContent.appendChild(LogoutAnchor);
        LogoutAnchor.onclick = function (e) {
            deleteCookie("email");
            deleteCookie("Password");
            deleteCookie("userName");
            sessionStorage.clear();
            location.reload();
        };
    };
});




function displayItem(curItem, j, k) {
    let tmpDivItem = document.createElement("div");
    tmpDivItem.classList.add("quarter");
    let tmpTbl = document.createElement("table");
    tmpDivItem.appendChild(tmpTbl);
    let tmpR1 = document.createElement("tr");
    tmpTbl.appendChild(tmpR1);
    let tmpR1C1 = document.createElement("td");
    tmpR1C1.colSpan = "3";
    tmpR1.appendChild(tmpR1C1);
    tmpR1C1.innerHTML = curItem["Title"];

    let tmpR2 = document.createElement("tr");
    tmpTbl.appendChild(tmpR2);
    let tmpR2C1 = document.createElement("td");
    tmpR2C1.colSpan = "3";
    tmpR2C1.setAttribute("Catindex", j) //in cats. array
    tmpR2C1.setAttribute("index", k) //in profuct array
    tmpR2.appendChild(tmpR2C1);
    tmpR2C1.innerHTML = '<img src="' + curItem["images"][0] + '">';
    tmpR2C1.setAttribute("id", "Img")
    let tmpR4 = document.createElement("tr");
    tmpTbl.appendChild(tmpR4);
    let tmpR4C1 = document.createElement("td");
    let tmpR4C2 = document.createElement("td");
    let tmpR4C3 = document.createElement("td");
    tmpR4.appendChild(tmpR4C1);
    tmpR4.appendChild(tmpR4C2);
    tmpR4.appendChild(tmpR4C3);
    tmpR4C1.innerHTML = '<button class="AddToCartBtn" value="' + j + ' ' + k + '" id="Add"><span class="material-icons">add_circle</span></button>';
    tmpR4C2.innerText = curItem["price"] + "EGP";
    tmpR4C3.innerHTML = '<button class="RmvFrmCartBtn" value="' + j + ' ' + k + '"><span class="material-icons">remove_circle</span></button>';

    products.appendChild(tmpDivItem);

}

function FindElement(Arr, Elememt) {
    for (var i = 0; i < Arr.length; i++) {
        if (Arr[i].Title == Elememt.Title)
            return i;
    }
    return -1;
}
document.getElementById("mag").addEventListener('click', function () {
    var text = document.getElementById('autocomplete').value;
    localStorage.setItem('TextSearch', text);
    window.location.href = 'SearchPage.html';
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//saving the cart items to session storage before leavong the page

window.onunload = function () {
    sessionStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems))
};
