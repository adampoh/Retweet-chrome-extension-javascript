var res = 0;
var alltweetCount = 0;
var alltweetList;
var allBodyContent;
var operTimeVal = 5;
var operTimeToVal = 10;
var t, ta, tb, tc, td, te, tf, tg, th, ti, tj, tk;
var getTweetCount = function(tweetList) {
    return tweetList.childElementCount;
};

var openTweetWin = function(tweetList, num) {
    var tweetContent = tweetList.children[num].children[0];
    tweetContent.click();
    return;
};
var getOperTime = function() {
    // chrome.storage.sync.get("operTime", function(items) {
    //     if (!chrome.runtime.error) {
    //         if (items.operTime) {
    //             operTimeVal = items.operTime;
    //             console.log(operTimeVal);
    //         }
    //     }
    // });
    // chrome.storage.sync.get("operTimeTo", function(items) {
    //     if (!chrome.runtime.error) {
    //         if (items.operTimeTo) {
    //             operTimeToVal = items.operTimeTo;
    //             console.log(operTimeToVal);
    //         }
    //     }
    // });
    operTimeVal = parseInt(operTimeBack);
    operTimeToVal = parseInt(operTimeToBack);
};

var closeTweetWin = function(bodyContent) {
    console.log('++++++' + res);
    var closeBtn = document.getElementsByClassName('PermalinkProfile-dismiss');
    console.log(closeBtn[0]);
    closeBtn[0].children[0].click();
    getOperTime();
    alltweetList = document.querySelector('#stream-items-id');
    alltweetCount = getTweetCount(alltweetList);
    var seTime = (parseInt(operTimeToVal) - parseInt(operTimeVal)) * Math.random() + parseInt(operTimeVal);
    console.log(seTime);
    clearTimeout(t);
    clearTimeout(ta);
    clearTimeout(tb);
    clearTimeout(tc);
    clearTimeout(td);
    clearTimeout(te);
    // clearTimeout(tf);
    clearTimeout(tg);
    // clearTimeout(th);
    clearTimeout(ti);
    clearTimeout(tj);
    // clearTimeout(tk);
    clearTimeout(tl);
    // clearTimeout(tm);
    clearTimeout(tn);
    if (res < alltweetCount - 1) {
        ta = setTimeout(function() {
            res = res + 1;
            followAccount(res, alltweetList, allBodyContent);

        }, seTime);
    } else {
        return;
    }
    // eval(operTimeVal) * 60 * 1000
};

var autoClick = function(num, tweetList, bodyContent) {
    console.log('123123----' + bodyContent);
    t = setTimeout(function() {
        openTweetWin(tweetList, num);
        tb = setTimeout(function() {
            closeTweetWin(bodyContent);
            num = num + 1;
            autoClick(num, tweetList, bodyContent);
        }, 5000);
    }, 3000);
    if (num == bodyContent - 1) {
        return;
    }
    return;
};
var autoClickcal = function(num, tweetList, bodyContent, callback) {
    console.log('autoclickcal' + res);
    if (typeof callback == 'function') {
        // callback(num, tweetList, bodyContent, likebtnClick, retweetbtnClick);
        callback(num, tweetList, bodyContent, likebtnClick, closeTweetWin);
    }
    return;
};

var openTweetWincal = function(num, tweetList, bodyContent, callback1, callback2) {
    console.log('openTweetWincal-----' + res);
    var tweetContent = tweetList.children[num].children[0];
    if (num == 0) {
        window.scrollBy(0, 426);
    } else {
        window.scrollBy(0, tweetList.children[num - 1].offsetHeight);
    }
    console.log(tweetContent);
    var retweetbit = tweetContent.children[0].children[0];
    if ((retweetbit) && (num != 0)) {
        console.log('retweet');
        tweetContent.click();
        tc = setTimeout(function() {
            console.log('opencal');
            // callback2(bodyContent, followbtnClick1, closeTweetWin);
            callback2(bodyContent);
        }, 8000);
    } else {
        tweetContent.click();
        if (typeof callback1 == 'function') {
            td = setTimeout(function() {
                console.log('opencal');
                callback1(bodyContent, followbtnClick, retweetbtnClick);
            }, 4000);
        }
    }
    return;
};

var likebtnClick = function(bodyContent, callback1, callback2) {
    console.log('likebtnClick');
    var desireLike = document.getElementsByClassName('request-favorited-popup');
    if (desireLike[0]) {
        console.log('test');
        desireLike[0].click();
        te = setTimeout(function() {
            callback1(bodyContent, closeSubWin);
        }, 4000);
    } else {
        te = setTimeout(function() {
            callback2(bodyContent, followbtnClick1, closeTweetWin);
        }, 4000);
    }
};

var followbtnClick = function(bodyContent, callback) {
    var FollowAll = document.getElementsByClassName('tmf-btn tmf-btn--unfollow');
    if (FollowAll[0]) {
        FollowAll[0].click();
        tg = setTimeout(function() {
            callback(bodyContent, retweetbtnClick);
        }, 50000);
    } else {
        tg = setTimeout(function() {
            callback(bodyContent, retweetbtnClick);
        }, 4000);
    }
};

var closeSubWin = function(bodyContent, callback) {
    console.log('asdf');
    var desireItem = document.getElementById('activity-popup-dialog').children[0].children[1].children[1];
    desireItem.click();
    ti = setTimeout(function() {
        callback(bodyContent, followbtnClick1, closeTweetWin);
    }, 4000);
};

var retweetbtnClick = function(bodyContent, callback1, callback2) {
    console.log('retweetBTN');
    var desireRetweet = document.getElementsByClassName('request-retweeted-popup');
    if (desireRetweet[0]) {
        console.log('test');
        desireRetweet[0].click();
        tj = setTimeout(function() {
            callback1(bodyContent, closeSubWin1);
        }, 4000);
    } else {
        tj = setTimeout(function() {
            callback2(bodyContent);
        }, 4000);
    }
};

var followbtnClick1 = function(bodyContent, callback) {
    var FollowAll = document.getElementsByClassName('tmf-btn tmf-btn--unfollow');
    if (FollowAll[0]) {
        FollowAll[0].click();
        tl = setTimeout(function() {
            callback(bodyContent, closeTweetWin);
        }, 50000);
    } else {
        tl = setTimeout(function() {
            callback(bodyContent, closeTweetWin);
        }, 4000);
    }
};

var closeSubWin1 = function(bodyContent, callback) {
    console.log('asdf');
    var desireItem = document.getElementById('activity-popup-dialog').children[0].children[1].children[1];
    // var desireItem = document.getElementsByClassName('PermalinkProfile-dismiss modal-close-fixed').children[0];
    desireItem.click();
    tn = setTimeout(function() {
        callback(bodyContent);
    }, 4000);
};

// var clickRetweetBtn = function(bodyContent, callback) {
//     console.log('clickRetweetBtn');
//     var a = bodyContent.getElementsByClassName('tweet permalink-tweet js-actionable-user js-actionable-tweet js-original-tweet has-cards');
//     var b = a[0].getElementsByClassName('stream-item-footer');
//     var c = b[0].getElementsByClassName('ProfileTweet-actionButton  js-actionButton js-actionRetweet');
//     c[0].click();
//     tj = setTimeout(function() {
//         callback(bodyContent, closeTweetWin);
//     }, 4000);
// };

// var retweet = function(bodyContent, callback) {
//     console.log('retweet');
//     var a = bodyContent.getElementsByClassName('EdgeButton EdgeButton--primary retweet-action');
//     a[0].click();
//     tk = setTimeout(function() {
//         callback(bodyContent);
//     }, 4000);
// };

var followAccount = function(num, tweetList, bodyContent) {
    console.log('followAccount');
    console.log(num);
    autoClickcal(num, tweetList, bodyContent, openTweetWincal);
};

var trackAccount = function(bodyContent) {
    var i = 0;
    var tweetList = document.querySelector('#stream-items-id');
    alltweetCount = getTweetCount(tweetList);
    alltweetList = tweetList;
    allBodyContent = bodyContent;
    console.log('start' + res);
    res = 0;
    console.log('followAccount' + ':0' + ':' + tweetList + ':' + bodyContent);
    followAccount(0, tweetList, bodyContent);
};

chrome.extension.sendMessage({
    action: "trackAccount",
    source: trackAccount(window.document)
});