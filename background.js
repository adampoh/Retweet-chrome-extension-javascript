var ta, tb, tc, td;
var siteNo = 0;
chrome.tabs.onCreated.addListener(function(tab) {
    var tabId = tab.id;
    var tabUrl = tab.url;
    var actionMode = localStorage.getItem('actionMode');
    var operTimeBack = parseInt(localStorage.getItem('operTime'));
    var operTimeToBack = parseInt(localStorage.getItem('operTimeToBack'));
    if ((actionMode == 'follow') || (actionMode == 'unfollow')) {
        if (tabUrl.indexOf('https://www.twitter.com') >= 0) {
            setTimeout(function() {
                var test = 5;
                chrome.tabs.executeScript(tabId, { code: "var operTimeBack=" + operTimeBack + ";var operTimeToBack=" + operTimeToBack + ";" }, function() {
                    console.log('hello');
                    if (actionMode == 'follow') {
                        chrome.tabs.executeScript(tabId, { file: "trackAccount.js" }, function() {
                            console.log('follow');
                        });
                    }
                    if (actionMode == 'unfollow') {
                        chrome.tabs.executeScript(tabId, { file: "unfollowAccount.js" }, function() {
                            console.log('unfollow');
                        });
                    }
                });
            }, 5000);
        }
    }
});

function doInCurrentTab(tabCallback) {
    chrome.tabs.query({ currentWindow: true, active: true },
        function(tabArray) { tabCallback(tabArray[0]); }
    );
}

var focusOrCreateTab = function(url, tabIdVal) {
    clearTimeout(ta);
    var activeTabId;
    var websiteList = JSON.parse(localStorage.getItem('data'));
    if (tabIdVal > 0) {
        chrome.tabs.create({ "url": url, "selected": true });
        tb = setTimeout(function() {
            chrome.tabs.getCurrent(function(tab) {
                chrome.tabs.remove(tabIdVal, function() {});
            });
            doInCurrentTab(function(tab) { activeTabId = tab.id });
        }, 3000);
    } else {
        chrome.tabs.create({ "url": url, "selected": true });
        tc = setTimeout(function() {
            doInCurrentTab(function(tab) { activeTabId = tab.id });
        }, 3000);
    }
    var t = parseInt(websiteList[siteNo].userTime) * 60 * 1000;
    siteNo = siteNo + 1;
    siteNo = siteNo % (websiteList.length);
    var t1 = 20000;
    td = setTimeout(function() {
        if ((localStorage.getItem('actionMode') == 'follow') || (localStorage.getItem('actionMode') == 'unfollow')) {
            focusOrCreateTab('https://www.twitter.com/' + websiteList[siteNo].name, activeTabId);
        } else {
            detectMode();
        }
    }, t);
};

var detectMode = function() {
    if (tb) {
        clearTimeout(tb);
    }
    if (tc) {
        clearTimeout(tc);
    }
    if (td) {
        clearTimeout(td);
    }
    var websiteList = JSON.parse(localStorage.getItem('data'));
    var tmp = localStorage.getItem('actionMode');
    ta = setTimeout(function() {
        if ((tmp == 'follow') || (tmp == 'unfollow')) {
            focusOrCreateTab('https://www.twitter.com/' + websiteList[0].name, 0);
        } else {
            detectMode();
        }
    }, 100);
};
detectMode();