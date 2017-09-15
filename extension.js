! function e(t, n, i) {
    function o(l, r) {
        if (!n[l]) {
            if (!t[l]) { var u = "function" == typeof require && require; if (!r && u) return u(l, !0); if (s) return s(l, !0); var a = new Error("Cannot find module '" + l + "'"); throw a.code = "MODULE_NOT_FOUND", a }
            var c = n[l] = { exports: {} };
            t[l][0].call(c.exports, function(e) { var n = t[l][1][e]; return o(n ? n : e) }, c, c.exports, e, t, n, i)
        }
        return n[l].exports
    }
    for (var s = "function" == typeof require && require, l = 0; l < i.length; l++) o(i[l]);
    return o
}({
    1: [function(e, t, n) {
        "use strict";

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            s = function() {
                function e(t) { i(this, e), this.element = t, this.titleEl = this.element.getElementsByClassName("tmf-btn__title")[0], this.textEl = this.element.getElementsByClassName("tmf-btn__text")[0] }
                return o(e, [{
                    key: "countDown",
                    value: function(e) {
                        var t = this,
                            n = 60 * parseInt(e);
                        return new Promise(function(e, i) { t.countDownInterval = setInterval(function() { 0 === n ? e() : (t.text = "Continuing in " + n + " seconds...", n--) }, 1e3) })
                    }
                }, { key: "reset", value: function() { clearInterval(this.countDownInterval), this.text = "" } }, { key: "title", set: function(e) { this.titleEl.innerHTML = e } }, { key: "text", set: function(e) { this.textEl.innerHTML = e } }]), e
            }();
        n["default"] = s
    }, {}],
    2: [function(e, t, n) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { "default": e } }
        var o = e("./twitter_mass_follow.js"),
            s = i(o),
            l = e("./page_observer.js"),
            r = new s["default"];
        r.load().then(function() { r.showOrHide(), (0, l.observePageAction)(function() { r.showOrHide() }), (0, l.observeFollowLimitsMessage)(function() { r.wait() }) })
    }, { "./page_observer.js": 4, "./twitter_mass_follow.js": 8 }],
    3: [function(e, t, n) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { "default": e } }

        function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            l = e("./storage_record.js"),
            r = i(l),
            u = function() {
                function e(t) { o(this, e), this.storage = new r["default"](t) }
                return s(e, [{ key: "load", value: function() { var e = this; return new Promise(function(t, n) { e.storage.fetch().then(function(n) { e.value = n, t() }, function() { e.value = {}, t() }) }) } }, { key: "includes", value: function(e) { return "number" == typeof this.value[e] } }, {
                    key: "migrate",
                    value: function(e) {
                        if ("string" == typeof this.value) {
                            var t = this.value.split("-").filter(String);
                            this.value = {};
                            for (var n = 0; n < t.length; n++) {
                                this.value[t[n]] = 0;
                                var i = Math.floor(n / t.length * 100);
                                e.call(this, i)
                            }
                            this.storage.save(this.value)
                        }
                    }
                }, { key: "daysFollowed", value: function(e) { if (this.includes(e)) { var t = 864e5; return Math.floor((Date.now() - this.value[e]) / t) } } }, { key: "add", value: function(e) { this.value[e] = Date.now(), this.storage.save(this.value) } }, { key: "remove", value: function(e) { delete this.value[e], this.storage.save(this.value) } }]), e
            }();
        n["default"] = u
    }, { "./storage_record.js": 7 }],
    4: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            var n = new MutationObserver(function(n) { n.forEach(function(n) { t.call(e, n) }) });
            n.observe(e, { subtree: !0, characterData: !0, childList: !0 })
        }

        function o(e) {
            var t = document.getElementById("activity-popup-dialog"),
                n = t.getElementsByClassName("activity-popup-dialog-users")[0],
                o = !0;
            i(t, function(i) { t.getElementsByClassName("account").length && o && (o = !1, e.call()), "block" !== t.style.display && (n.innerHTML = "", o = !0, e.call()) })
        }

        function s(e) { i(document.querySelector("head > title"), e) }

        function l(e) { o(e), s(e) }

        function r(e) {
            var t = document.getElementById("message-drawer");
            i(t, function() { t.innerHTML.includes("66885") && e.call() })
        }
        Object.defineProperty(n, "__esModule", { value: !0 }), n.observePageAction = l, n.observeFollowLimitsMessage = r
    }, {}],
    5: [function(e, t, n) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { "default": e } }

        function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function l(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            u = e("./xhttp_helper.js"),
            a = i(u),
            c = 0,
            f = 0,
            d = function() {
                function e(t) { l(this, e), this.element = t, this.btn = this.element.getElementsByClassName("user-actions-follow-button")[0], this.userId = this.element.dataset.userId }
                return r(e, null, [{ key: "present", value: function() { return c = 0, h.present() || m.present() } }, {
                    key: "next",
                    value: function() {
                        return new Promise(function(e, t) {
                            var n = h.present() ? h : m,
                                i = n.all()[c];
                            if (i) {
                                var o = new n(i);
                                o.isMyProfile() ? (c++, t(f)) : o.isStream() ? o.setIsFollowing().then(function() { e(o), c++, f = 0 }) : (e(o), c++, f = 0)
                            } else f++, t(f)
                        })
                    }
                }, { key: "reset", value: function() { c = 0, f = 0 } }]), r(e, [{ key: "isMyProfile", value: function() { return void 0 === this.btn } }, { key: "isFollowable", value: function() { return this.element.getElementsByClassName("user-actions")[0].classList.contains("not-following") } }, { key: "isFollowed", value: function() { return this.element.getElementsByClassName("user-actions")[0].classList.contains("following") } }, { key: "follow", value: function(e) { return !!this.isFollowable() && (e.blacklisted ? (this.log("warn", "User is blacklisted"), !1) : e.skipFollowed && e.followed ? (this.log("warn", "Already followed once"), !1) : e.profileImageRequired && this.hasNoProfileImage() ? (this.log("warn", "No profile image"), !1) : e.skipProtected && this.isProtected() ? (this.log("warn", "Protected profile"), !1) : e.skipFollower && this.isFollowing() ? (this.log("warn", "Already following"), !1) : e.bioRequired && this.hasNoBio() ? (this.log("warn", "No biography"), !1) : (this.clickBtn(), this.log("success", "Successfully followed"), !0)) } }, { key: "unfollow", value: function(e) { return !!this.isFollowed() && ((!e.skipFollower || !this.isFollowing()) && (e.massFollowedRequired && !e.massFollowed ? (this.log("warn", "User has not been mass followed"), !1) : e.blacklisted ? (this.log("warn", "User is blacklisted"), !1) : e.skipVerified && this.isVerified() ? (this.log("warn", "Account is verified"), !1) : e.daysFollowed < e.minDaysFollowed ? (this.log("warn", e.daysFollowed + " days followed, but " + e.minDaysFollowed + " days minimum required"), !1) : (this.clickBtn(), this.log("success", "Successfully unfollowed"), !0))) } }, { key: "clickBtn", value: function() { this.btn.click() } }, {
                    key: "log",
                    value: function(e, t) {
                        var n = document.createElement("div");
                        n.className = "tmf-log tmf-log--" + e, n.innerHTML = t;
                        var i = this.bioEl;
                        i.parentNode.insertBefore(n, i)
                    }
                }, { key: "hasNoBio", value: function() { return "" == this.bioEl.textContent.trim() } }, { key: "hasNoProfileImage", value: function() { return this.element.getElementsByClassName("js-action-profile-avatar")[0].src.includes("default_profile") } }, { key: "isProtected", value: function() { return this.element.getElementsByClassName("Icon--protected").length > 0 } }, { key: "isVerified", value: function() { return this.element.getElementsByClassName("Icon--verified").length > 0 } }, { key: "toString", value: function() { return this.constructor.name + " " + this.userId + " " + this.username } }]), e
            }(),
            h = function(e) {
                function t() { return l(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
                return s(t, e), r(t, [{ key: "isStream", value: function() { return !1 } }, { key: "isFollowing", value: function() { return this.element.getElementsByClassName("FollowStatus").length > 0 } }, { key: "bioEl", get: function() { return this.element.getElementsByClassName("ProfileCard-bio")[0] } }, { key: "username", get: function() { return this.element.getElementsByClassName("ProfileCard-screennameLink")[0].textContent.trim() } }], [{ key: "all", value: function() { return document.getElementsByClassName("ProfileCard") } }, { key: "present", value: function() { return t.all().length > 8 } }]), t
            }(d),
            m = function(e) {
                function t() { return l(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
                return s(t, e), r(t, [{ key: "isStream", value: function() { return !0 } }, {
                    key: "setIsFollowing",
                    value: function() {
                        var e = this;
                        return new Promise(function(t, n) {
                            (0, a["default"])("https://twitter.com/i/profiles/popup?user_id=" + e.userId + "&wants_hovercard=true").then(function(n) { e._isFollowing = n.includes("FollowStatus"), t() }, function(n) { e._isFollowing = !1, t() })
                        })
                    }
                }, { key: "isFollowing", value: function() { return this._isFollowing } }, { key: "bioEl", get: function() { return this.element.getElementsByClassName("bio")[0] } }, { key: "username", get: function() { return this.element.getElementsByClassName("username")[0].textContent.trim() } }], [{ key: "all", value: function() { var e = "block" === document.getElementById("activity-popup-dialog").style.display; return e ? document.querySelectorAll(".activity-popup-users > .js-stream-item > .account") : document.querySelectorAll("#stream-items-id > .js-stream-item > .account") } }, { key: "present", value: function() { return t.all().length > 5 } }]), t
            }(d);
        n["default"] = d
    }, { "./xhttp_helper.js": 9 }],
    6: [function(e, t, n) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { "default": e } }

        function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function l(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 }), n.TextSetting = n.CheckboxSetting = void 0;
        var r = function m(e, t, n) { null === e && (e = Function.prototype); var i = Object.getOwnPropertyDescriptor(e, t); if (void 0 === i) { var o = Object.getPrototypeOf(e); return null === o ? void 0 : m(o, t, n) } if ("value" in i) return i.value; var s = i.get; if (void 0 !== s) return s.call(n) },
            u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            a = e("./storage_record.js"),
            c = i(a),
            f = function() {
                function e(t, n) {
                    var i = this;
                    l(this, e), this.element = document.getElementById(t), this.storage = new c["default"](t), this.storage.fetch().then(function(e) { i.value = e }, function() { i.value = n })
                }
                return u(e, [{ key: "save", value: function() { return this.successMessage = "saving...", this.storage.save(this._value) } }, { key: "toString", value: function() { return this.constructor.name + " " + this.element.id } }, {
                    key: "successMessage",
                    set: function(e) {
                        var t = this.element.closest(".control-group");
                        t.classList.add("tmf-setting-success"), t.getElementsByClassName("control-label")[0].dataset.successMessage = e, clearTimeout(this.successTimeout), this.successTimeout = setTimeout(function() { t.classList.remove("tmf-setting-success") }, 1e3)
                    }
                }]), e
            }(),
            d = function(e) {
                function t(e, n) { l(this, t); var i = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)); return i.element.addEventListener("change", function() { i._value = i.element.checked, r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "save", i).call(i) }), i }
                return s(t, e), u(t, [{ key: "value", set: function(e) { this.element.checked = e, this._value = e } }]), t
            }(f),
            h = function(e) {
                function t(e, n) { l(this, t); var i = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)); return i.element.addEventListener("input", function() { i._value = i.element.value, r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "save", i).call(i) }), i }
                return s(t, e), u(t, [{ key: "value", set: function(e) { this.element.value = e, this._value = e } }]), t
            }(f);
        n.CheckboxSetting = d, n.TextSetting = h
    }, { "./storage_record.js": 7 }],
    7: [function(e, t, n) {
        "use strict";

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            s = chrome.storage.local,
            l = function() {
                function e(t) { i(this, e), this.key = t }
                return o(e, [{ key: "fetch", value: function() { var e = this; return new Promise(function(t, n) { s.get(e.key, function(i) { i.hasOwnProperty(e.key) ? t(i[e.key]) : n("Record not found!") }) }) } }, {
                    key: "save",
                    value: function(e) {
                        var t = {};
                        t[this.key] = e, s.set(t)
                    }
                }, { key: "toString", value: function() { return "StorageRecord " + this.key } }]), e
            }();
        n["default"] = l
    }, {}],
    8: [function(e, t, n) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { "default": e } }

        function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }(),
            l = e("./button.js"),
            r = i(l),
            u = e("./profile.js"),
            a = i(u),
            c = e("./followed.js"),
            f = i(c),
            d = e("./xhttp_helper.js"),
            h = i(d),
            m = e("./setting.js"),
            g = function() {
                function e() { o(this, e), this.settings = {} }
                return s(e, [{
                    key: "load",
                    value: function() {
                        var e = this;
                        return new Promise(function(t, n) {
                            (0, h["default"])(chrome.extension.getURL("extension.html")).then(function(n) { document.body.insertAdjacentHTML("beforeend", n), e.element = document.getElementById("tmf"), e.settingsEl = document.getElementById("tmf-settings"), e.modalOverlayEl = document.getElementsByClassName("modal-overlay")[0], t() })
                        })
                    }
                }, { key: "showOrHide", value: function() { this._setUserId(), this.userId && a["default"].present() ? this.show() : this.hide() } }, {
                    key: "show",
                    value: function() {
                        var e = this;
                        this._init().then(function() { e.element.classList.remove("tmf--initial"), e.element.classList.remove("tmf--hide"), e.element.classList.remove("tmf--follow"), e.element.classList.remove("tmf--unfollow"), e.element.classList.remove("tmf--message"), e.element.classList.add("tmf--show") }, function(t) { e.message = t })
                    }
                }, { key: "hide", value: function() { this.element.classList.remove("tmf--show"), this.element.classList.add("tmf--hide") } }, { key: "_showSettings", value: function() { this.settingsEl.style.display = "block", this.modalOverlayEl.style.display = "block", this.element.style.zIndex = 3999 } }, { key: "_hideSettings", value: function() { this.settingsEl.style.display = "none", this.modalOverlayEl.style.display = "none", this.element.style.zIndex = 9999 } }, {
                    key: "wait",
                    value: function() {
                        var e = this;
                        this.waiting = !0, this.activeBtn.countDown(this._setting("extensionWait")).then(function() { e.waiting = !1, e.activeBtn.text = "Click to pause", e._run() })
                    }
                }, { key: "_reset", value: function() { return this.activeBtn = void 0, this.mode = void 0, this.followBtn.reset(), this.followBtn.title = "Follow All", this.unfollowBtn.reset(), this.unfollowBtn.title = "Unfollow All", a["default"].reset(), !0 } }, {
                    key: "_init",
                    value: function() {
                        var e = this;
                        return new Promise(function(t, n) {
                            if (e.count = 0, e.paused = !1, e.waiting = !1, e.initialized) e._reset(), t();
                            else try { e._setButtons(), e._initSettings(), e.followed = new f["default"](e.userId), e.followed.load().then(function() { e.followed.migrate(function(t) { e.message = "Migrating (" + t + "%)" }), e.initialized = !0, t() }) } catch (i) { n(i) }
                        })
                    }
                }, {
                    key: "_initSettings",
                    value: function() {
                        var e = this;
                        this._addSetting(m.TextSetting, "followWait", 1e3), this._addSetting(m.TextSetting, "followLimit", 1e3), this._addSetting(m.CheckboxSetting, "followSkipFollowed", !0), this._addSetting(m.CheckboxSetting, "followProfileImageRequired", !1), this._addSetting(m.CheckboxSetting, "followSkipProtected", !1), this._addSetting(m.CheckboxSetting, "followSkipFollower", !1), this._addSetting(m.CheckboxSetting, "followBioRequired", !1), this._addSetting(m.TextSetting, "followBlacklist", "@username1,@username2"), this._addSetting(m.TextSetting, "unfollowWait", 100), this._addSetting(m.TextSetting, "unfollowLimit", ""), this._addSetting(m.CheckboxSetting, "unfollowSkipFollower", !0), this._addSetting(m.CheckboxSetting, "unfollowSkipVerified", !1), this._addSetting(m.CheckboxSetting, "unfollowMassFollowedRequired", !1), this._addSetting(m.TextSetting, "unfollowBlacklist", "@username1,@username2"), this._addSetting(m.TextSetting, "unfollowMinDaysFollowed", 2), this._addSetting(m.TextSetting, "extensionWait", 1);
                        for (var t = document.getElementsByClassName("tmf-show-settings"), n = 0; n < t.length; n++) t[n].addEventListener("click", function() { e._showSettings() });
                        for (var i = document.getElementsByClassName("tmf-hide-settings"), o = 0; o < i.length; o++) i[o].addEventListener("click", function() { e._hideSettings() });
                        document.onkeydown = function(t) { "Escape" === t.key && e._hideSettings() }
                    }
                }, {
                    key: "_setButtons",
                    value: function() {
                        var e = this;
                        ["follow", "unfollow"].forEach(function(t) {
                            var n = e.element.getElementsByClassName("tmf-btn--" + t)[0],
                                i = new r["default"](n);
                            n.addEventListener("click", function() { return !e.waiting && void(e.activeBtn ? e.paused ? (e.paused = !1, e._run(), i.text = "Click to pause") : (e.paused = !0, i.text = "Click to continue") : (e.activeBtn = i, e.mode = t, e.element.classList.add("tmf--" + t), e.blacklist = e._setting(t + "Blacklist").split(",").map(function(e) { return e.trim() }), e.limit = parseInt(e._setting(t + "Limit")), e.activeBtn.title = 0, i.text = "Click to pause", e._run())) }), e[t + "Btn"] = i
                        })
                    }
                }, { key: "_setUserId", value: function() { if (void 0 === this.userId) try { this.userId = document.getElementById("user-dropdown").querySelectorAll("[data-user-id]")[0].dataset.userId.toString() } catch (e) {} } }, {
                    key: "_followProfile",
                    value: function(e) {
                        var t = this,
                            n = { blacklisted: this.blacklist.includes(e.username), skipFollowed: this._setting("followSkipFollowed"), skipProtected: this._setting("followSkipProtected"), skipFollower: this._setting("followSkipFollower"), followed: this.followed.includes(e.userId), profileImageRequired: this._setting("followProfileImageRequired"), bioRequired: this._setting("followBioRequired") };
                        e.follow(n) ? (this.followed.add(e.userId), setTimeout(function() { e.isFollowable() && (t.followed.remove(e.userId), e.log("warn", "Follow was rejected by Twitter")) }, 2e3), this.count++, this.activeBtn.title = this.count, this._sleep(this._setting("followWait"))) : this._run()
                    }
                }, {
                    key: "_unfollowProfile",
                    value: function(e) {
                        var t = { blacklisted: this.blacklist.includes(e.username), daysFollowed: this.followed.daysFollowed(e.userId), massFollowed: this.followed.includes(e.userId), massFollowedRequired: this._setting("unfollowMassFollowedRequired"), minDaysFollowed: parseInt(this._setting("unfollowMinDaysFollowed")), skipFollower: this._setting("unfollowSkipFollower"), skipVerified: this._setting("unfollowSkipVerified") };
                        e.unfollow(t) ? (this.count++, this.activeBtn.title = this.count, this._sleep(this._setting("unfollowWait"))) : this._run()
                    }
                }, {
                    key: "_sleep",
                    value: function(e) {
                        var t = this;
                        setTimeout(function() { t._run() }, parseInt(e))
                    }
                }, { key: "_isLimitReached", value: function() { return this.count === this.limit } }, { key: "_run", value: function() { var e = this; return !this.paused && !this.waiting && (this._isLimitReached() ? (this.activeBtn.text = "Limit reached", this.paused = !0, this.limit = "", !1) : void a["default"].next().then(function(t) { e.currentProfile = t, e["_" + e.mode + "Profile"](t) }, function(t) { t > 10 ? (e.activeBtn.text = "No more profiles found", e.paused = !0) : (window.scrollTo(0, document.body.scrollHeight), e._sleep(1e3)) })) } }, { key: "_addSetting", value: function(e, t, n) { this.settings[t] = new e(t, n) } }, { key: "_setting", value: function(e) { return this.settings[e]._value } }, { key: "message", set: function(e) { this.element.getElementsByClassName("tmf__message")[0].innerHTML = e, this.element.classList.remove("tmf--initial"), this.element.classList.remove("tmf--hide"), this.element.classList.add("tmf--message"), this.element.classList.add("tmf--show") } }]), e
            }();
        n["default"] = g
    }, { "./button.js": 1, "./followed.js": 3, "./profile.js": 5, "./setting.js": 6, "./xhttp_helper.js": 9 }],
    9: [function(e, t, n) {
        "use strict";

        function i(e) { var t = new XMLHttpRequest; return t.open("GET", e, !0), new Promise(function(e, n) { t.onreadystatechange = function() { 4 == t.readyState && (200 == t.status ? e(t.responseText) : n(t.statusText)) }, t.send(null) }) }
        Object.defineProperty(n, "__esModule", { value: !0 }), n["default"] = i
    }, {}]
}, {}, [2]);