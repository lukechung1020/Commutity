function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    let value = null;

    xhr.onload = function () {
        value = this.responseText;
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            value = this.responseText;
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
    console.log("value", value);
}

document.querySelector("#account-setting").addEventListener("click", function (e) {
    ajaxGET("./account.html", function (data) {
        console.log(data);
        // since it's HTML, let's drop it right in
        document.getElementById("user-setting").innerHTML = data;
    });
});