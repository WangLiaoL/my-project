(function () {
    var dataAry = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg","img/5.jpg","img/6.jpg"];
    var banner = document.getElementById("banner"),
        bannerImg = document.getElementById("bannerImg"),
        bannerTip = document.getElementById("bannerTip"),
        bannerLeft = document.getElementById("bannerLeft"),
        bannerRight = document.getElementById("bannerRight");
    var divList = bannerImg.getElementsByTagName("div"),
        bannerTipList = bannerTip.getElementsByTagName("li");
    var bannerW = banner.clientWidth, totalW = (dataAry.length + 2) * bannerW, count = dataAry.length + 2;
    utils.setGroupCss(bannerImg, {width: totalW, left: -bannerW});
    var initData = function () {
        var str = "";
        str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<div trueImg='" + dataAry[i] + "'></div>";
        }
        str += "<div trueImg='" + dataAry[0] + "'></div>";
        bannerImg.innerHTML = str;
        str = "";
        for (i = 0; i < dataAry.length; i++) {
            var cName = i === 0 ? "select" : "";
            str += "<li class='" + cName + "'>"+(i+1)+"</li>";
        }
        bannerTip.innerHTML = str;
        bannerTip.style.width=dataAry.length*25+"px";
    };
    initData();
    var initAsyncImg = function () {
        for (var i = 0; i < divList.length; i++) {
            ~function (i) {
                var curDiv = divList[i];
                if (!curDiv.isLoad) {
                    var oImg = new Image;
                    oImg.src = curDiv.getAttribute("trueImg");
                    oImg.onload = function () {
                        curDiv.appendChild(oImg);
                        curDiv.isLoad = true;
                    };
                }
            }(i);
        }
    };
    window.setTimeout(initAsyncImg, 500);
    var setTip = function (index) {
        index < 0 ? index = bannerTipList.length - 1 : null;
        index >= bannerTipList.length ? index = 0 : null;
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].className = i === index ? "select" : null;
        }
    };
    var step = 1;
    var move = function (dir) {
        if (typeof dir === "undefined" || dir === "right") {
            step++;
            if (step >= count) {
                utils.setCss(bannerImg, "left", -1 * bannerW);
                step = 2;
            }
        } else if (dir === "left") {
            step--;
            if (step < 0) {
                utils.setCss(bannerImg, "left", -(count - 2) * bannerW);
                step = 3;
            }
        } else if (dir === "tip") {
            step = this.index + 1;
        }
        animate(bannerImg, {left: -step * bannerW}, 500, 1);
        setTip(step - 1);
    };
    bannerImg.autoTimer = window.setInterval(move, 3000);
    banner.onmouseenter = function () {
        window.clearInterval(bannerImg.autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    };
    banner.onmouseleave = function () {
        bannerImg.autoTimer = window.setInterval(move, 3000);
        bannerLeft.style.display = bannerRight.style.display = "none";
    };
    bannerLeft.onclick = function () {
        move("left");
    };
    bannerRight.onclick = function () {
        move("right");
    };
    for (var i = 0; i < bannerTipList.length; i++) {
        bannerTipList[i].index = i;
        bannerTipList[i].onmouseover = function () {
            move.call(this, "tip");
        };
    }
})();




