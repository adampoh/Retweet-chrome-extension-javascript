! function() {
    function t(t) { this.el = t; for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++) e.call(this, n[i]) }

    function n(t, n, i) { Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i) }
    if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
        var i = Array.prototype,
            e = i.push,
            s = i.splice,
            o = i.join;
        t.prototype = {
            add: function(t) { this.contains(t) || (e.call(this, t), this.el.className = this.toString()) },
            contains: function(t) { return -1 != this.el.className.indexOf(t) },
            item: function(t) { return this[t] || null },
            remove: function(t) {
                if (this.contains(t)) {
                    for (var n = 0; n < this.length && this[n] != t; n++);
                    s.call(this, n, 1), this.el.className = this.toString()
                }
            },
            toString: function() { return o.call(this, " ") },
            toggle: function(t) { return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t) }
        }, window.DOMTokenList = t, n(Element.prototype, "classList", function() { return new t(this) })
    }
}();