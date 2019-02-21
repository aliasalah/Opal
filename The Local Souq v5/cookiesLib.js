

function addCookie(name,value,days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + ";";
}
function getCookie(name) {
    return getAllCookies()[name];
}
function deleteCookie(name) {   
    document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ;';  
}
function getAllCookies() {
    var arr = [];
    var ca = document.cookie.split(';');
    var cookieName;
    for(var i=0;i < ca.length;i++) {
        cookieName = ca[i].split("=")[0];
        if (cookieName[0]==" ")
            cookieName = cookieName.substring(1,cookieName.length)
        arr [cookieName] = ca[i].split("=")[1];     
    }
    return arr;
}
function hasCookie(name) {
    if (name in getAllCookies())
        return true;
    return false;
}


