code = (document.URL.split('?'))
url = document.getElementById("returnURL");

if (code == document.URL) {
    url.href = "main.html";
}

else {
    code = code[1].split("=")[1].split("#")[0];
    url.href = "main.html?code="+code;
}