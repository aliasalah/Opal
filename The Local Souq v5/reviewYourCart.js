var noOfItemsInCart = 0;
var arrOfCartItems = [];
var btnsAddArr = [];
var checklabel;
onload = function () {
    var cartContent = document.querySelector("#cartContent");
    checklabel = document.getElementById('labcheckprice');
    var chkoutBtn = document.querySelector("#chkoutBtn");
    var cartNo = document.querySelector("#cartNo");
    if (sessionStorage.getItem("noOfItemsInCart") != null) {
        noOfItemsInCart = sessionStorage.getItem("noOfItemsInCart");
        cartNo.innerText = noOfItemsInCart;
    }

    if (noOfItemsInCart == 0) {
        cartContent.innerText = "You have no items in your cart yet!";
    } else if (noOfItemsInCart > 0) {

        var tmpStr = sessionStorage.getItem("arrOfCartItems");
        arrOfCartItems = JSON.parse(tmpStr);
        console.log(arrOfCartItems);
        for (var i = 0; i < arrOfCartItems.length; i++) {
            displayCartItem(arrOfCartItems[i], i);
        }
        chkoutBtn.style.display = "inline";

        btnsAddArr = document.querySelectorAll('[functionality="addItem"]');
        btnsAddArr.forEach(function (clkdItem) {
            clkdItem.addEventListener("click", function () {
                noOfItemsInCart++;
                cartNo.innerText = noOfItemsInCart;

                var itemIndex = parseInt(clkdItem.getAttribute("index"));
                arrOfCartItems[itemIndex]["count"] += 1;
                clkdItem.parentElement.nextSibling.innerText = "Count : " + arrOfCartItems[itemIndex]["count"];
            });
        });

        btnsremoveEachArr = document.querySelectorAll('[functionality="removeEachItem"]');
        btnsremoveEachArr.forEach(function (clkdItem) {
            clkdItem.addEventListener("click", function () {
                var itemIndex = parseInt(clkdItem.getAttribute("index"));
                noOfItemsInCart -= arrOfCartItems[itemIndex]["count"];
                cartNo.innerText = noOfItemsInCart;
                clkdItem.parentElement.parentElement.parentElement.style.display = "none";
                arrOfCartItems.splice(itemIndex, 1, null); //add empty entry to maintain the indexes and will be removed onunload
                if (isArrEmpty(arrOfCartItems))
                    dispEmptyCart();
            });
        });

        btnsremoveOneArr = document.querySelectorAll('[functionality="removeOneItem"]');
        btnsremoveOneArr.forEach(function (clkdItem) {
            clkdItem.addEventListener("click", function () {
                noOfItemsInCart -= 1;
                cartNo.innerText = noOfItemsInCart;
                var itemIndex = parseInt(clkdItem.getAttribute("index"));
                if (arrOfCartItems[itemIndex]["count"] > 1) {
                    arrOfCartItems[itemIndex]["count"] -= 1;
                    clkdItem.parentElement.previousSibling.innerText = "Count : " + arrOfCartItems[itemIndex]["count"];
                } else if (arrOfCartItems[itemIndex]["count"] == 1) {
                    clkdItem.parentElement.parentElement.parentElement.style.display = "none";
                    arrOfCartItems.splice(itemIndex, 1, null);
                }
                if (isArrEmpty(arrOfCartItems))
                    dispEmptyCart();
            });
        });



    }
    //var check=document.getElementById('chkoutBtn');
    chkoutBtn.addEventListener("click", function () {
        var sum = 0;

        for (var i = 0; i < arrOfCartItems.length; i++) {
            if (arrOfCartItems[i] != null)
                sum += parseFloat((arrOfCartItems[i].price) /*.replace(',',''))*/ * arrOfCartItems[i].count);
        }
        //alert(sum.toFixed(3));
        checklabel.style.display = "block";
        checklabel.innerText = 'Your total Cost = ' + sum.toFixed(3);
    });

    document.getElementById("mag").addEventListener('click', function () {
        var text = document.getElementById('autocomplete').value;
        localStorage.setItem('TextSearch', text);
        window.location.href = 'SearchPage.html';
    })




    //make image when clicked go to Show Item Page
    document.addEventListener('click', function (e) {
        if (e.target && e.target.parentElement.id == 'Img') {
            var ItemIndex = e.target.parentElement.getAttribute("index");
            var itemToBeShown = arrOfCartItems[ItemIndex];
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


}; //onload


function displayCartItem(curItem, i) {
    let tmpDivItem = document.createElement("div");
    let tmpTbl = document.createElement("table");
    tmpDivItem.appendChild(tmpTbl);
    let tmpR1 = document.createElement("tr");
    tmpTbl.appendChild(tmpR1);
    let tmpR1C1 = document.createElement("td");
    tmpR1C1.colSpan = "3";
    tmpR1.appendChild(tmpR1C1);
    tmpR1C1.innerHTML = curItem["Title"] + '<span index="' + i + '" functionality="removeEachItem" class="material-icons rightAligned">cancel</span>';

    let tmpR2 = document.createElement("tr");
    tmpTbl.appendChild(tmpR2);
    let tmpR2C1 = document.createElement("td");
    tmpR2C1.colSpan = "3";
    tmpR2.appendChild(tmpR2C1);
    tmpR2C1.innerHTML = '<img src="' + curItem["images"][0] + '">';
    tmpR2C1.setAttribute("id", "Img");
    tmpR2C1.setAttribute("index", i)

    let tmpR3 = document.createElement("tr");
    tmpTbl.appendChild(tmpR3);
    let tmpR3C1 = document.createElement("td");
    tmpR3C1.colSpan = "3";
    tmpR3.appendChild(tmpR3C1);
    tmpR3C1.innerText = curItem["price"] + "EGP";

    let tmpR4 = document.createElement("tr");
    tmpTbl.appendChild(tmpR4);
    let tmpR4C1 = document.createElement("td");
    let tmpR4C2 = document.createElement("td");
    let tmpR4C3 = document.createElement("td");
    tmpR4.appendChild(tmpR4C1);
    tmpR4.appendChild(tmpR4C2);
    tmpR4.appendChild(tmpR4C3);
    tmpR4C1.innerHTML = '<span index="' + i + '" functionality="addItem" class="material-icons">add_circle</span>';
    tmpR4C2.innerText = "Count : " + curItem["count"];
    tmpR4C3.innerHTML = '<span index="' + i + '" functionality="removeOneItem" class="material-icons">remove_circle</span>';

    cartContent.appendChild(tmpDivItem);
};

function isArrEmpty(arr) {
    var empty = true;
    for (var i = 0; i < arr.length; i++)
        if (arr[i] != null)
            empty = false;
    return empty;
}

function dispEmptyCart() {
    cartContent.innerText = "You have no items in your cart!";
    chkoutBtn.style.display = "none";
    checklabel.style.display = "none";

}


window.onunload = function () {
    for (var i = 0; i < arrOfCartItems.length; i++) //remove the empty spaces in the array
        if (arrOfCartItems[i] == null)
            arrOfCartItems.splice(i, 1);
    sessionStorage.setItem("arrOfCartItems", JSON.stringify(arrOfCartItems));
    sessionStorage.setItem("noOfItemsInCart", noOfItemsInCart);
};
