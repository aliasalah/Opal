var cookieDays = 0.1;
window.onload = function () {
    var loginSuccess = false;
    var loginBtn = document.querySelector("#loginBtn");
    var mailTxt = document.querySelector("#mailTxt");
    var pwTxt = document.querySelector("#pwTxt");
    var incorrect = document.querySelector("#incorrect");
    if (hasCookie("email") && hasCookie("Password") && hasCookie("userName")) {
        mailTxt.value = getCookie("email");
        pwTxt.value = getCookie("Password");
    }

    loginBtn.addEventListener("click", function () {
        var users = localStorage.getItem("Users")
        users = JSON.parse(users);
        if (users != null) {
            usernamesArr = Object.getOwnPropertyNames(users);
            for (var i = 0; i < Object.keys(users).length; i++) {
                if ((users[usernamesArr[i]]["email"] === mailTxt.value) && (users[usernamesArr[i]]["Password"] === pwTxt.value)) {
                    loginSuccess = true;
                    currentUser = users[usernamesArr[i]];
                }
            }
        }

        if (loginSuccess === true) {
            sessionStorage.clear();
            addCookie("userName", currentUser["userName"], cookieDays);
            addCookie("email", currentUser["email"], cookieDays);
            addCookie("Password", currentUser["Password"], cookieDays);
            window.location.href = "Home.html";
        } 
        else if (loginSuccess === false) {
            alert('INCORRECT email or password');
        }
    });

}; //window load
