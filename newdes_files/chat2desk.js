  !function (e) {
    var t = {};
    function n(c) { if (t[c]) return t[c].exports; var o = t[c] = {i: c, l: !1, exports: {}}; return e[c].call(o.exports, o, o.exports, n), o.l = !0, o.exports }
    n.m = e, n.c = t, n.d = function (e, t, c) { n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: c}) }, n.n = function (e) {
      var t = e && e.__esModule ? function () { return e.default } : function () { return e  };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "/packs/", n(n.s = 0)
  }([function (e, t) {
    window.chat24WidgetCanRun = 1, window.chat24WidgetCanRun && function () {
      window.chat24ID = "9b6e01b02c7957a39e1df09ce6c9dac5", window.chat24io_lang = "ru";
      var e = "https://livechat.chat2desk.com", t = document.createElement("script");
      t.type = "text/javascript", t.async = !0, fetch(e + "/packs/manifest.json").then(function (e) {
        return e.json()
      }).then(function (n) {
        t.src = e + n["widget.js"];
        var c = document.getElementsByTagName("script")[0];
        c ? c.parentNode.insertBefore(t, c) : document.documentElement.firstChild.appendChild(t);
        var o = document.createElement("link");
        o.href = e + n["widget.css"], o.rel = "stylesheet", o.id = "chat-24-io-stylesheet", o.type = "text/css", document.getElementById("chat-24-io-stylesheet") || document.getElementsByTagName("head")[0].appendChild(o)
      })
    }()
  }]);