String.prototype.myTrim = function myTrim() {
    return this.replace(/^ +| +$/g, "");
};
var userSubmit = document.getElementById("userSubmit");
var userName = document.getElementById("userName"), userAge = document.getElementById("userAge"), userPhone = document.getElementById("userPhone"), userAddress = document.getElementById("userAddress");

//->棣栧厛鑾峰彇褰撳墠椤甸潰URL鍦板潃鏍忓悗闈㈢殑鍙傛暟鍊� ->鏍规嵁浼犻�掔殑鍙傛暟褰撳墠椤甸潰鏄慨鏀硅繕鏄鍔�
var obj = queryURLParameter(window.location.href);
var flag = "id" in obj ? "update" : "add";

//->濡傛灉鏄慨鏀圭殑璇�,鎴戜滑闇�瑕佹妸鍘熸潵鐨勬暟鎹幏鍙栧嚭鏉�,鏀惧埌瀵瑰簲鐨勬枃鏈涓�
if (flag === "update") {
    ajax("/detailInfo?" + encodeURIComponent("id=" + obj.id), function (data) {
        userName.value = data["name"];
        userAge.value = data["age"];
        userPhone.value = data["tel"];
        userAddress.value = data["address"];
    });
}

userSubmit.onclick = function () {
    var parameter = "name=" + userName.value.myTrim() + "&age=" + userAge.value.myTrim() + "&tel=" + userPhone.value.myTrim() + "&address=" + userAddress.value.myTrim();
    if (flag === "update") {
        parameter += "&id=" + obj.id;
    }
    parameter = encodeURIComponent(parameter);
    
    //->澧炲姞:鎶婇〉闈腑鐨勬瘡涓�涓枃鏈涓殑鍐呭閮借幏鍙栧埌,璋冨彇Ajax浼犻�掔粰鏈嶅姟鍣�,瀹炵幇澧炲姞鍔熻兘
    if (flag === "add") {
        ajax("/addInfo?" + parameter, function (data) {
            if (data && data["code"] == 0) {
                window.location.href = "index.html";//->瀹炵幇椤甸潰鐨勮烦杞�
                return;
            }
            alert("淇℃伅鍒涘缓澶辫触~");
        });
        return;
    }

    //->褰撳墠鐨勬搷浣滄槸淇敼
    ajax("/updateInfo?" + parameter, function (data) {
        if (data && data["code"] == 0) {
            window.location.href = "index.html";
            return;
        }
        alert("淇℃伅淇敼澶辫触~");
    });
};


