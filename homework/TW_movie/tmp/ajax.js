var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let ajax = new XMLHttpRequest();

ajax.request = function(url, method, callback, content = "") {
    let xhr = this;
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr);
        }
    };
    xhr.open(method.toUpperCase(), url);
    xhr.send(content);
};


function myCallback(xhr) {
    console.log(xhr.responseText);
}
// ajax.request("somefile.txt", "get", myCallback);
// ajax.request("script.php", "post", myCallback, "first=John&last=Smith");

ajax.request('https://api.douban.com/v2/movie/subject/26865690', 'get', myCallback, "apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=&udid=");