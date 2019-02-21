onload = function () {

    var product = document.querySelector("#products");
    var item = localStorage.getItem("Item");

    function displayItem(Item) {
        item = JSON.parse(Item);
        var title = document.getElementById("Title");
        title.innerHTML = item["Title"];
        var img = document.getElementById("img");
        img.src = item["images"][0];
        var disc = document.getElementById("Discr");
        disc.innerHTML = item.description;
        var Price = document.getElementById("price");
        //Price.innerHTML = item.price;
        var text = document.createTextNode(item.price);
        Price.appendChild(text);

        var Warrenty = document.getElementById("warrenty");
        //Price.innerHTML = item.price;
        var text = document.createTextNode(item.warranty);
        Warrenty.appendChild(text);

        var company = document.getElementById("Company");
        //Price.innerHTML = item.price;
        var text = document.createTextNode(item.companyName);
        company.appendChild(text);
    }
    displayItem(item);

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

};