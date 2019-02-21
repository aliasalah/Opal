var cookieDays = 0.1;
var users;
window.onload = function () {
    var RegBtn = document.querySelector("#Register");

    RegBtn.addEventListener("click", function () {
        var mailTxt = document.querySelector("#mailTxt").value;
        var pwTxt = document.querySelector("#pwTxt").value;
        var fname = document.querySelector("#fname").value;
        var lname = document.querySelector("#lname").value;
        var uname = document.querySelector("#username").value;
        var check = false;
        users = localStorage.getItem("Users");
        users = JSON.parse(users);
        if (users != null) {
            usernamesArr = Object.getOwnPropertyNames(users);
            for (var i = 0; i < Object.keys(users).length; i++) {
                if ((users[usernamesArr[i]]["email"] === mailTxt)) {
                    check = true;
                }
            }
        } else {
            users = {};
        }
        if (check === false) {
            var obj = {
                userName: uname,
                fName: fname,
                lName: lname,
                email: mailTxt,
                Password: pwTxt
            }

            sessionStorage.clear();
            addCookie("userName", uname, cookieDays);
            addCookie("email", mailTxt, cookieDays);
            addCookie("Password", pwTxt, cookieDays);
            users[uname] = obj;
            localStorage.setItem("Users", JSON.stringify(users))

            window.location.href = "Home.html";

        } else {
            alert('Invalid Data');
        }
    });

}; //window load
