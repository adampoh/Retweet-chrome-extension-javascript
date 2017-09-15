var output = document.querySelector('output');
var userAccount = document.getElementById('user_account');
var deleteAccount = document.getElementById('delete_account');
var domStopOper = document.getElementById('stopOper');
var accountList = document.querySelector('#account_list');
var followAccount = document.querySelector('#follow_account');
var domFollowAccount = document.getElementById('follow_account');
var domAccountList = document.getElementById('account_list');
var domOperTimeTo = document.getElementById('operTimeTo');
var domUserTime = document.getElementById('userTime');
var domUnfollowAccount = document.getElementById('unfollow_account');
var listContent = [];
var currentURL = '';
var selFlag = false;
var domAutoBit = document.getElementById('autoBit');
var autoBit = false;
var domOperTime = document.getElementById('operTime');
var domFromTime = document.getElementById('fromTime');
var domToTime = document.getElementById('toTime');
var fromTime = '';
var toTime = '';
var operTime = '';
var operTimeTo = '';
var userTime = '';
var domSaveConf = document.getElementById('saveConf');

//delete all list in selectbox
var initSelectBox = function() {
    for (i = domAccountList.options.length - 1; i >= 0; i--) {
        domAccountList.remove(i);
    }
    return;
};

//check overlap
var checkOverList = function(accountToAdd) {
    var countOfList = domAccountList.options.length;
    if (countOfList > 0) {
        for (i = domAccountList.options.length - 1; i >= 0; i--) {
            if (domAccountList.options[i].text == accountToAdd) {
                output.textContent = "Exist already";
                return false;
            }
        }
    }
    return true;
};

//show in selectbox -- datatype json
var viewList = function(jRes) {
    initSelectBox();
    if (jRes) {
        for (i = 0; i < jRes.length; i++) {
            var y = document.createElement('option');
            var tmpName = jRes[i].name;
            y.text = jRes[i].name + '--User Time:' + jRes[i].userTime + 'min';
            y.value = "https://twitter.com/" + tmpName;
            domAccountList.add(y);
        }
    } else {
        output.textContent = "This is not json file";
        console.log('File content does not exist.');
    }
    return;
};

//add item to account list
var addList = function(accountToAdd) {
    if (checkOverList(accountToAdd)) {
        if ((domUserTime.disabled == false) && (domUserTime.value > 10)) {
            listContent.push({ "name": accountToAdd, "tweet": 0, "follower": 0, "following": 0, "like": 0, "userTime": parseInt(domUserTime.value) });
        } else {
            listContent.push({ "name": accountToAdd, "tweet": 0, "follower": 0, "following": 0, "like": 0, "userTime": 10 });
        }

        viewList(listContent);
    }
    return;
};

var focusOrCreateTab = function(url) {
    chrome.windows.getAll({ "populate": true }, function(windows) {
        var existing_tab = null;
        for (var i in windows) {
            var tabs = windows[i].tabs;
            for (var j in tabs) {
                var tab = tabs[j];
                if (tab.url == url) {
                    existing_tab = tab;
                    break;
                }
            }
        }
        if (existing_tab) {
            chrome.tabs.update(existing_tab.id, { "selected": true });
        } else {
            chrome.tabs.create({ "url": url, "selected": true });
        }
    });
};

var selectTweet = function() {
    chrome.tabs.executeScript(null, {
        file: "trackAccount.js"
    }, function() {
        if (chrome.extension.lastError) {
            output.textContent = 'Inject Script Error';
        }
    });
};

var unfollowTweet = function() {
    chrome.tabs.executeScript(null, {
        file: "unfollowAccount.js"
    }, function() {
        if (chrome.extension.lastError) {
            output.textContent = 'Inject Script Error';
        }
    });
};

var selectURL = function(tab) {
    var accCount = domAccountList.options.length;
    if (accCount > 0) {
        domFollowAccount.disabled = false;
        domUnfollowAccount.disabled = false;
    } else {
        domFollowAccount.disabled = true;
        domUnfollowAccount.disabled = true;
    }
};

document.body.onload = function() {
    domUserTime.disabled = false;

    var data = JSON.parse(localStorage.getItem('data')) || [];
    listContent = data;
    viewList(listContent);

    var auto = localStorage.getItem('autoBit');
    if (auto == '1') {
        autoBit = true;
        domAutoBit.checked = autoBit;
        domOperTime.disabled = false;
        domFromTime.disabled = false;
        domToTime.disabled = false;
        domSaveConf.disabled = false;
        domOperTimeTo.disabled = false;
    } else {
        autoBit = false;
        domOperTime.disabled = true;
        domFromTime.disabled = true;
        domToTime.disabled = true;
        domSaveConf.disabled = true;
        domOperTimeTo.disabled = true;
    }

    operTime = localStorage.getItem('operTime') || '5';
    domOperTime.value = operTime;
    operTimeTo = localStorage.getItem('oeprTimeTo') || '10';
    domOperTimeTo.value = operTimeTo;
    userTime = localStorage.getItem('userTime') || '10';
    domUserTime.value = userTime;
    fromTime = localStorage.getItem('fromTime') || '';
    domFromTime.value = fromTime;
    toTime = localStorage.getItem('toTime') || '';
    domToTime.value = toTime;

    localStorage.setItem('actionMode', '');

    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function(tabs) {
            var tab = tabs[0];
            selectURL(tab);
        }
    );
    output.textContent = 'Powered by TSN';
};

document.getElementById("add_account").onclick = function() {
    if (userAccount.value == '') {
        output.textContent = 'Do not input account name';
        userAccount.focus();
        return;
    } else {
        addList(userAccount.value);

        localStorage.setItem('data', JSON.stringify(listContent));

        output.textContent = 'Data Added';
        chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
            function(tabs) {
                var tab = tabs[0];
                selectURL(tab);
            }
        );
        userAccount.value = '';
        userAccount.focus();
    }
};

document.getElementById("delete_account").onclick = function() {
    var a = domAccountList.selectedIndex;
    if (a < 0) {
        output.textContent = 'Please select Item.';
        return;
    } else {
        listContent.splice(domAccountList.selectedIndex, 1);
        viewList(listContent);

        localStorage.setItem('data', JSON.stringify(listContent));

        output.textContent = 'Data Deleted';
        chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
            function(tabs) {
                var tab = tabs[0];
                selectURL(tab);
            }
        );
    }
};

document.getElementById("stopOper").onclick = function() {
    localStorage.setItem('actionMode', '');
};

document.getElementById("follow_account").onclick = function() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var curTime = h + ':' + m;
    console.log(curTime);
    console.log(domFromTime.value);
    console.log((curTime < domFromTime.value));
    var tmp = confirm('Did you login twitter.com?\nIf Not, Please do following\n\n1.remove this extension.\n2.open twitter website and login\n3.reinstall this extension.');
    if (domAutoBit.checked == true) {
        if ((curTime < domFromTime.value) || (curTime > domToTime.value)) {
            output.textContent = 'Cannot Start at this time';
            alert('Cannot Start at this time');
            return;
        } else {
            if (tmp) {
                localStorage.setItem('actionMode', 'follow');
            } else {
                localStorage.setItem('actionMode', '');
            }
        }
    } else {
        if (tmp) {
            localStorage.setItem('actionMode', 'follow');
        } else {
            localStorage.setItem('actionMode', '');
        }
    }
};

domUnfollowAccount.onclick = function() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var curTime = h + ':' + m;
    console.log(curTime);
    console.log(domFromTime.value);
    console.log((curTime < domFromTime.value));
    var tmp = confirm('Did you login twitter.com?\nIf Not, Please do following\n\n1.remove this extension.\n2.open twitter website and login\n3.reinstall this extension.');
    if (domAutoBit.checked == true) {
        if ((curTime < domFromTime.value) || (curTime > domToTime.value)) {
            output.textContent = 'Cannot Start at this time';
            alert('Cannot Start at this time');
            return;
        } else {
            if (tmp) {
                localStorage.setItem('actionMode', 'unfollow');
            } else {
                localStorage.setItem('actionMode', '');
            }
        }
    } else {
        if (tmp) {
            localStorage.setItem('actionMode', 'unfollow');
        } else {
            localStorage.setItem('actionMode', '');
        }
    }
};

domAutoBit.onclick = function() {
    autoBit = domAutoBit.checked;
    var autoTemp = 0;
    if (domAutoBit.checked) {
        autoTemp = 1;
    }
    localStorage.setItem('autoBit', autoTemp);
    localStorage.setItem('operTime', 5);
    localStorage.setItem('operTimeTo', 10);
    localStorage.setItem('userTime', 10);
    localStorage.setItem('fromTime', '');
    localStorage.setItem('toTime', '');
    console.log(autoBit);
    if (autoBit) {
        domOperTime.disabled = false;
        domFromTime.disabled = false;
        domToTime.disabled = false;
        domSaveConf.disabled = false;
        domOperTimeTo.disabled = false;
    } else {
        domOperTime.disabled = true;
        domFromTime.disabled = true;
        domToTime.disabled = true;
        domSaveConf.disabled = true;
        domOperTimeTo.disabled = true;
    }
};
domSaveConf.onclick = function() {
    var a = domOperTime.value;
    var b = domOperTimeTo.value;
    var c = domUserTime.value;
    if ((a == '') || (b == '') || (c == '')) {
        output.textContent = 'Please insert correct sleep time';
        domOperTime.value = '5';
        domOperTimeTo.value = '10';
        domUserTime.value = '10';
        return;
    } else {
        a = parseInt(a);
        b = parseInt(b);
        c = parseInt(c);
        if ((a <= 0) || (b <= 0) || (c <= 0)) {
            output.textContent = 'Please insert correct sleep time';
            domOperTime.value = '5';
            domOperTimeTo.value = '10';
            domUserTime.value = '10';
            return;
        } else {
            if (a > 0) {
                if ((b < a) || (!b)) {
                    output.textContent = 'Please insert correct sleep time';
                    domOperTime.value = '5';
                    domOperTimeTo.value = '10';
                    domUserTime.value = '10';
                    return;
                }
            }
            if (a < 5) {
                a = 5;
            }
            if (b < 10) {
                b = 10;
            }
            if (c < 10) {
                c = 10;
            }
            localStorage.setItem('operTime', a);
            localStorage.setItem('operTimeTo', b);
            localStorage.setItem('userTime', c);
            localStorage.setItem('fromTime', domFromTime.value);
            localStorage.setItem('toTime', domToTime.value);
            output.textContent = 'Data Saved';
        }
    }
};