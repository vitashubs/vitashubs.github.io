code = (document.URL.split('?'))
returnUrl = document.getElementById("returnURL");
formUrl = document.getElementById("formURL");

if (code == document.URL) {
    returnUrl.href = "main.html";
    formUrl.href = "rsvp.html";
}

else {
    code = code[1].split("=")[1].split("#")[0];
    returnUrl.href = "main.html?code="+code;
    formUrl.href = "rsvp.html?code="+code;
}