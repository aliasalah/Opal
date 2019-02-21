var products = document.querySelector("#products");
var cartNo = document.querySelector("#cartNo");
var arrOfCartItems = [];
var Catg = [];
var noOfItemsInCart = 0;
if (sessionStorage.getItem("noOfItemsInCart") != null) {
    noOfItemsInCart = sessionStorage.getItem("noOfItemsInCart");
    cartNo.innerText = noOfItemsInCart;
}
if (noOfItemsInCart > 0) {
    var tmpStr = sessionStorage.getItem("arrOfCartItems");
    arrOfCartItems = JSON.parse(tmpStr);
}
window.addEventListener("load", function (event) {
    myList = new XMLHttpRequest();
    myList.open("GET", 'Categroies.json');
    myList.send("");
    myList.addEventListener("readystatechange", function (e) {
        if (myList.readyState == 4 && myList.status == 200) {
            listOfCat = JSON.parse(myList.response);
            var seacrhText = localStorage.getItem('TextSearch');
            for (var i = 0; i < listOfCat["SubCategories"].length; i++) {
                Catg[i] = ReadJson(listOfCat["SubCategories"][i])

                for (var j = 0; j < Catg[i]["Products"].length; j++) {
                    var title = Catg[i]["Products"][j].Title.toLowerCase()
                    seacrhText = seacrhText.toLocaleLowerCase();
                    if (title.includes(seacrhText)) {
                        displayItem(Catg[i]["Products"][j], i, j);

                    }

                }
            }
            var btnsAddArr = document.querySelectorAll("button.AddToCartBtn");
            btnsAddArr.forEach(function (clkdBtn) {
                clkdBtn.addEventListener("click", function () {
                    var SubCatIndex = parseInt(clkdBtn.value.split(' ')[0]);
                    var ItemIndex = parseInt(clkdBtn.value.split(' ')[1]);
                    val = Catg[SubCatIndex];
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
                    val = Catg[SubCatIndex];
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


        }
    })

    //make image when clicked go to Show Item Page  
    document.addEventListener('click', function (e) {
        if (e.target && e.target.parentElement.id == 'Img') {
            var ItemIndex = e.target.parentElement.getAttribute("index");
            var CatIndex = e.target.parentElement.getAttribute("Catindex");
            var itemToBeShown = Catg[CatIndex].Products[ItemIndex];
            localStorage.setItem("Item", JSON.stringify(itemToBeShown))
            window.location.href = "showItem.html";
        }
    });


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
window.addEventListener('unload', function () {
    sessionStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems))
});
document.getElementById("mag").addEventListener('click', function () {
    var text = document.getElementById('autocomplete').value;
    localStorage.setItem('TextSearch', text);
    window.location.href = 'SearchPage.html';
})


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

function FindElement(Arr, Elememt) {
    for (var i = 0; i < Arr.length; i++) {
        if (Arr[i].Title == Elememt.Title)
            return i;
    }
    return -1;
}