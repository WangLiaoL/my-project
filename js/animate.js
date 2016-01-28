var animate = (function () {
    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };
    return function (curEle, options, duration, effect, callback) {
        window.clearTimeout(curEle.timer);
        var fnEffect = zhufengEffect.Linear;
        if (typeof effect === "number") {
            var tempAry = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
            for (var i = 0; i < tempAry.length; i++) {
                if (effect === (i + 1)) {
                    var item = tempAry[i], itemAry = item.split("-");
                    fnEffect = itemAry.length === 1 ? zhufengEffect[item] : zhufengEffect[itemAry[0]][itemAry[1]];
                    break;
                }
            }
        } else if (effect instanceof Array) {
            fnEffect = effect.length === 1 ? zhufengEffect[effect] : zhufengEffect[effect[0]][effect[1]];
        } else if (typeof effect === "function") {
            callback = effect;
        }
        var times = null, interval = 15, oBegin = {}, oChange = {};
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                oBegin[key] = utils.getCss(curEle, key);
                oChange[key] = options[key] - oBegin[key];
            }
        }
        var move = function () {
            window.clearTimeout(curEle.timer);
            times += interval;
            if (times >= duration) {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        utils.setCss(curEle, key, options[key]);
                    }
                }
                typeof callback === "function" ? callback.call(curEle) : null;
                return;
            }
            for (var attr in oChange) {
                if (oChange.hasOwnProperty(attr)) {
                    var val = fnEffect(times, oBegin[attr], oChange[attr], duration);
                    utils.setCss(curEle, attr, val);
                }
            }
            curEle.timer = window.setTimeout(move, interval);
        };
        move();
    };
})();






