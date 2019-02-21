 var bnext, bprev, bslide, bstop, imgid, imgarr;
 var x = 0,
     i = 0;
 var int;
 var cartNo = document.querySelector("#cartNo");
 var noOfItemsInCart;
 if (sessionStorage.getItem("noOfItemsInCart") != null) {
     noOfItemsInCart = sessionStorage.getItem("noOfItemsInCart");
     cartNo.innerText = noOfItemsInCart;
 }
 if (noOfItemsInCart > 0) {
     var tmpStr = localStorage.getItem("arrOfCartItems");
     arrOfCartItems = JSON.parse(tmpStr);
 }
 imgarr = ["slide1.png", "slide2.jpg", "slide3.jpg", "slide4.jpg", ];


 bnext = document.getElementById("right");
 bprev = document.getElementById("left");

 imgid = document.getElementById("im1");
 bnext.onclick = function (e) {
     if (i == imgarr.length - 1)
         i = 0;
     else
         i++;
     imgid.src = imgarr[i];

 }
 bprev.onclick = function (e) {
     if (i == 0)
         i = imgarr.length - 1;
     else
         i--;
     imgid.src = imgarr[i];
 }
 document.getElementById("mag").addEventListener('click', function () {
     var text = document.getElementById('autocomplete').value;
     localStorage.setItem('TextSearch', text);
     window.location.href = 'SearchPage.html';
 })

 /*$('li a').click(function(e) {
 
  localStorage.setItem("lastname", "Smith");

});

$(document).on('click', 'a', function () {
    alert(this.id);
});*/
 $("#nav li a").on("click", function () {
     sessionStorage.setItem("path", $(this).attr("value"));
 });
 /*   
document.querySelector('#nav li a').onclick = function() { 
   sessionStorage.setItem("path",$(this).attr("value"));
}
    
*/


 //show the name of the user loggeg in
 window.addEventListener("load", function (e) {
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
