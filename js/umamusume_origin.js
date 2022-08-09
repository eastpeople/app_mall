$(function() {
    var c, i = 0,
        j = 0,
        k = "";
    "ko" == (window.navigator.languages || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage)[0] && $("#alert-ko").css("display", "flex"), $.ajaxSetup({
        async: !1
    }), $.ajaxSetup({
        cache: !1
    }), $.getJSON("./skill_data.json", function(a) {
        c = JSON.parse(JSON.stringify(a))
    }), $.ajaxSetup({
        async: !0
    });
    var l = Object.keys(c);
    for (let a = 1; a < 7; a++) {
        var d = $("<option>").val(a).text(a);
        $("#uniq-skl-lv").append(d)
    }

    function m(a) {
        $.ajax({
            type: "POST",
            url: "https://umsatei.website/cgi-bin/unimatch.py",
            timeout: 3e4,
            processData: !1,
            contentType: !1,
            data: a
        }).done(function(a) {
            console.log(a), void 0 !== a.err ? alert("\u6B63\u5E38\u306B\u8AAD\u307F\u53D6\u308A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u80FD\u529B\u8A73\u7D30\u753B\u9762\u306E\u307F\u8AAD\u307F\u53D6\u308C\u307E\u3059\u3002\u52A0\u5DE5\u306A\u3057\u3001\u9AD8\u753B\u8CEA\u3001\u5927\u304D\u3044\u30B5\u30A4\u30BA\u3067\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002") : ("trained" == a.mode && alert("[\u30A6\u30DE\u5A18\u306E\u2605\u306E\u6570]\u306F\u624B\u52D5\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), w(a))
        }).fail(function(a) {
            alert("\u6B63\u5E38\u306B\u8AAD\u307F\u53D6\u308A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F")
        }).always(function(a) {
            n(), ("mobile" == o() || "tablet" == o()) && $("#mini-display").show()
        })
    }

    function n() {
        $("#loading").remove()
    }

    function o() {
        var a = navigator.userAgent;
        return a.indexOf("iPhone") > 0 || a.indexOf("iPod") > 0 || a.indexOf("Android") > 0 && a.indexOf("Mobile") > 0 ? "mobile" : a.indexOf("iPad") > 0 || a.indexOf("Android") > 0 ? "tablet" : "pc"
    }

    function p(a) {
        var b = 0,
            c = [];
        switch (!0) {
            case a >= 0 && a < 50:
                b = 0;
                for (let d = 0; d <= a; d++) d % 2 == 1 && (b += 1);
                break;
            case a >= 50 && a < 100:
                b = 25, c = [0, 5];
                for (let e = 50; e <= a; e++) c.includes(parseInt(e.toString().slice(-1))) || (b += 1);
                break;
            case a >= 100 && a < 150:
                b = 65;
                for (let z = 100; z <= a; z++) b += 1;
                break;
            case a >= 150 && a < 200:
                b = 115, c = [3, 6, 9];
                for (let f = 150; f <= a; f++) c.includes(parseInt(f.toString().slice(-1))) ? b += 2 : b += 1;
                break;
            case a >= 200 && a < 250:
                b = 180, c = [0, 2, 5, 7];
                for (let g = 200; g <= a; g++) c.includes(parseInt(g.toString().slice(-1))) ? b += 1 : b += 2;
                break;
            case a >= 250 && a < 300:
                b = 260, c = [0, 5];
                for (let h = 250; h <= a; h++) c.includes(parseInt(h.toString().slice(-1))) ? b += 1 : b += 2;
                break;
            case a >= 300 && a < 350:
                b = 350, c = [9];
                for (let i = 300; i <= a; i++) c.includes(parseInt(i.toString().slice(-1))) ? b += 3 : b += 2;
                break;
            case a >= 350 && a < 400:
                b = 455, c = [2, 4, 7, 9];
                for (let j = 350; j <= a; j++) c.includes(parseInt(j.toString().slice(-1))) ? b += 3 : b += 2;
                break;
            case a >= 400 && a < 450:
                b = 575, c = [0, 2, 5, 7];
                for (let k = 400; k <= a; k++) c.includes(parseInt(k.toString().slice(-1))) ? b += 2 : b += 3;
                break;
            case a >= 450 && a < 500:
                b = 705, c = [0, 5];
                for (let l = 450; l <= a; l++) c.includes(parseInt(l.toString().slice(-1))) ? b += 2 : b += 3;
                break;
            case a >= 500 && a < 550:
                b = 845, c = [0];
                for (let m = 500; m <= a; m++) c.includes(parseInt(m.toString().slice(-1))) ? b += 2 : b += 3;
                break;
            case a >= 550 && a < 600:
                b = 990;
                for (let A = 550; A <= a; A++) b += 3;
                break;
            case a >= 600 && a < 650:
                b = 1140, c = [9];
                for (let n = 600; n <= a; n++) c.includes(parseInt(n.toString().slice(-1))) ? b += 4 : b += 3;
                break;
            case a >= 650 && a < 700:
                b = 1295, c = [3, 6, 9];
                for (let o = 650; o <= a; o++) c.includes(parseInt(o.toString().slice(-1))) ? b += 4 : b += 3;
                break;
            case a >= 700 && a < 750:
                b = 1460, c = [2, 4, 7, 9];
                for (let p = 700; p <= a; p++) c.includes(parseInt(p.toString().slice(-1))) ? b += 4 : b += 3;
                break;
            case a >= 750 && a < 800:
                b = 1630, c = [];
                for (let q = 750; q <= a; q++) q % 2 == 1 ? b += 4 : b += 3;
                break;
            case a >= 800 && a < 850:
                b = 1805, c = [0];
                for (let r = 800; r <= a; r++) c.includes(parseInt(r.toString().slice(-1))) ? b += 3 : b += 4;
                break;
            case a >= 850 && a < 900:
                b = 2e3, c = [9];
                for (let s = 850; s <= a; s++) c.includes(parseInt(s.toString().slice(-1))) ? b += 5 : b += 4;
                break;
            case a >= 900 && a < 950:
                b = 2205, c = [4, 9];
                for (let t = 900; t <= a; t++) c.includes(parseInt(t.toString().slice(-1))) ? b += 5 : b += 4;
                break;
            case a >= 950 && a < 1e3:
                b = 2415, c = [3, 6, 9];
                for (let u = 950; u <= a; u++) c.includes(parseInt(u.toString().slice(-1))) ? b += 5 : b += 4;
                break;
            case a >= 1e3 && a < 1050:
                b = 2630, c = [4, 9];
                for (let v = 1e3; v <= a; v++) c.includes(parseInt(v.toString().slice(-1))) ? b += 6 : b += 5;
                break;
            case a >= 1050 && a < 1100:
                b = 2890, c = [4, 9];
                for (let w = 1050; w <= a; w++) w % 2 == 1 ? b += 6 : b += 5;
                break;
            case a >= 1100 && a < 1150:
                b = 3165, c = [0, 2, 5, 7];
                for (let x = 1100; x <= a; x++) c.includes(parseInt(x.toString().slice(-1))) ? b += 6 : b += 7;
                break;
            case a >= 1150 && a < 1200:
                b = 3495, c = [0, 5];
                for (let y = 1150; y <= a; y++) c.includes(parseInt(y.toString().slice(-1))) ? b += 6 : b += 7;
                break;
            case 1200 == a:
                b = 3841
        }
        return b
    }

    function q(a) {
        var c = $("#" + a + "-spinner").val(),
            b = p(parseInt(c));
        $("#" + a + "-pt").text(b + "pt"), $("#" + a + "-pt").data("pt", b)
    }

    function e() {
        var a = 0;
        $("#ura-toggle-btn").prop("checked") ? (a += p(Math.min(parseInt($("#speed-slider").val()) + parseInt($("#ura-add-stats-sum").text()), 1200)), a += p(Math.min(parseInt($("#stamina-slider").val()) + parseInt($("#ura-add-stats-sum").text()) + parseInt($("#ura-add-kashimoto-stats-sum").text()), 1200)), a += p(Math.min(parseInt($("#power-slider").val()) + parseInt($("#ura-add-stats-sum").text()), 1200)), a += p(Math.min(parseInt($("#guts-slider").val()) + parseInt($("#ura-add-stats-sum").text()) + parseInt($("#ura-add-kashimoto-stats-sum").text()), 1200)), a += p(Math.min(parseInt($("#intel-slider").val()) + parseInt($("#ura-add-stats-sum").text()), 1200))) : (a += parseInt($("#speed-pt").data("pt")), a += parseInt($("#stamina-pt").data("pt")), a += parseInt($("#power-pt").data("pt")), a += parseInt($("#guts-pt").data("pt")), a += parseInt($("#intel-pt").data("pt"))), a += parseInt($("#uniq-skl-pt").data("uniq-skl-pt")), $("#skl-tb tr").each(function(c, b) {
            a += parseFloat($(b).find(".tb-skl-pt").val())
        }), a = Math.round(a), $("#table-toggle-btn").prop("checked") && $("#num-skl-tb tr").each(function(c, b) {
            a += parseInt($(b).find(".tb-num-skl-pt").val())
        }), $("#result-skl-pt").text(a), $("#sub-score").text(a);
        let b = u(a);
        $("#result-rank").text(b[0]), $("#result-img").attr("src", "./img/" + b[0] + "_w_trans.png")
    }

    function r() {
        var a = parseInt($("#ura-race-stats option:selected").val()) * parseInt($("#ura-left-race option:selected").val()) + parseInt($("#ura-kisha option:selected").val()) + parseInt($("#ura-rijicho option:selected").val()) + parseInt($("#ura-friend option:selected").val()) + parseInt($("#ura-uma option:selected").val()),
            b = $("#ura-friend-kashimoto option:selected").val();
        $("#ura-add-stats-sum").text(a), $("#ura-add-kashimoto-stats-sum").text(b)
    }

    function s() {
        var a = 0,
            b = parseInt($("#hero-rank option:selected").val()),
            c = parseInt($("#uniq-skl-lv option:selected").val());
        b < 3 ? a = 120 * c : b > 2 && (a = 170 * c), $("#uniq-skl-pt").data("uniq-skl-pt", a), $("#uniq-skl-pt").text(a + "pt"), e()
    }

    function t(a) {
        return $("<option>").prop("disabled", !0).prop("selected", !0).val(0).text(a)
    }

    function u(a) {
        return a < 300 ? ["G", "#676567"] : a < 600 && a >= 300 ? ["G+", "#676567"] : a < 900 && a >= 600 ? ["F", "#ada4ed"] : a < 1300 && a >= 900 ? ["F+", "#ada4ed"] : a < 1800 && a >= 1300 ? ["E", "#e18dfb"] : a < 2300 && a >= 1800 ? ["E+", "#e18dfb"] : a < 2900 && a >= 2300 ? ["D", "#6bc3ff"] : a < 3500 && a >= 2900 ? ["D+", "#6bc3ff"] : a < 4900 && a >= 3500 ? ["C", "#84db6b"] : a < 6500 && a >= 4900 ? ["C+", "#84db6b"] : a < 8200 && a >= 6500 ? ["B", "#f086a9"] : a < 1e4 && a >= 8200 ? ["B+", "#f086a9"] : a < 12100 && a >= 1e4 ? ["A", "#ffa35f"] : a < 14500 && a >= 12100 ? ["A+", "#ffa35f"] : a < 15900 && a >= 14500 ? ["S", "#eccf6c"] : a < 17500 && a >= 15900 ? ["S+", "#eccf6c"] : a < 19200 && a >= 17500 ? ["SS", "#eccf6c"] : a < 19600 && a >= 19200 ? ["SS+", "#eccf6c"] : a < 2e4 && a >= 19600 ? ["UG", "#eccf6c"] : a < 20400 && a >= 2e4 ? ["UG1", "#eccf6c"] : a < 20800 && a >= 20400 ? ["UG2", "#eccf6c"] : a < 21200 && a >= 20800 ? ["UG3", "#eccf6c"] : a < 21600 && a >= 21200 ? ["UG4", "#eccf6c"] : a < 22100 && a >= 21600 ? ["UG5", "#eccf6c"] : a < 22500 && a >= 22100 ? ["UG6", "#eccf6c"] : a < 23e3 && a >= 22500 ? ["UG7", "#eccf6c"] : a < 23400 && a >= 23e3 ? ["UG8", "#eccf6c"] : a < 23900 && a >= 23400 ? ["UG9", "#eccf6c"] : a >= 23900 ? ["UF", "#eccf6c"] : ["", ""]
    }

    function f() {
        var d = i.toString(),
            b = $("<tr>").attr("id", "skl-br-" + d),
            f = $("<select>").attr("id", "skl-cat1-btn-" + d).attr("class", "form-select"),
            o = [];
        f.append(t("\u30B9\u30AD\u30EB\u30BF\u30A4\u30D7")), l.forEach(function(b, d) {
            var a = this[b];
            if (!o.includes(a.cat1)) {
                var c = $("<option>").text(a.cat1).data("cat1", a.cat1).val(a.cat1);
                f.append(c), o.push(a.cat1)
            }
        }, c);
        var g = $("<select>").attr("id", "skl-cat2-btn-" + d).attr("class", "form-select");
        g.append(t("\u9069\u6B63\u8DDD\u96E2\u30FB\u811A\u8CEA"));
        var h = $("<select>").attr("id", "skl-name-btn-" + d).attr("class", "form-select");
        h.append(t("\u30B9\u30AD\u30EB\u540D"));
        var k = $("<span>").attr("id", "skl-pt-" + d).attr("class", "tb-skl-pt").val(0).text("0pt"),
            m = $("<button>").attr("type", "button").attr("class", "btn btn-secondary btn-sm skl-dlt-btn").text("\u2715");

        function p() {
            var a = $("#skl-name-btn-" + d + " option:selected").val(),
                b = parseFloat($("#skl-prop-btn-" + d).val() + " option:selected"),
                c = $("#skl-cat2-btn-" + d + " option:selected").val();
            "\u5171\u901A" === c || ["\u30EC\u30B3\u30E1\u30F3\u30C9", "\u30C1\u30E3\u30FC\u30C8\u6025\u4E0A\u6607\uFF01", "\u524D\u5217\u72D9\u3044", "\u72D9\u3046\u306F\u6700\u524D\u5217\uFF01", "\u7802\u5875\u6163\u308C", "\u7802\u306E\u7384\u4EBA"].includes($("#skl-name-btn-" + d + " option:selected").text()) || (a = Math.round(a * b / 100)), $("#skl-pt-" + d).text(a + "pt"), $("#skl-pt-" + d).val(a), e()
        }
        f.change(function() {
            var a = $("#skl-cat1-btn-" + d + " option:selected").data("cat1");
            g.empty(), g.append(t("\u9069\u6B63\u8DDD\u96E2\u30FB\u811A\u8CEA"));
            var b = [];
            l.forEach(function(d, f) {
                var c = this[d];
                if (a == c.cat1 && !b.includes(c.cat2)) {
                    var e = $("<option>").text(c.cat2).data("cat1", a).data("cat2", c.cat2).val(c.cat2);
                    g.append(e), b.push(c.cat2)
                }
            }, c), h.empty(), h.append(t("\u30B9\u30AD\u30EB\u540D")), g.val("\u5171\u901A"), g.trigger("change"), $("#skl-pt-" + d).text("0pt"), $("#skl-pt-" + d).val(0), v(this), e()
        }), g.change(function() {
            var a = $("#skl-cat1-btn-" + d + " option:selected").data("cat1"),
                b = $("#skl-cat2-btn-" + d + " option:selected").data("cat2");
            h.empty(), h.append(t("\u30B9\u30AD\u30EB\u540D")), l.forEach(function(d, f) {
                var c = this[d];
                if (a == c.cat1 && b == c.cat2) {
                    var e = $("<option>").text(c.sklName).val(c.value3);
                    h.append(e)
                }
            }, c), $("#skl-pt-" + d).text("0pt"), $("#skl-pt-" + d).val(0), e()
        }), h.change(function() {
            p()
        });
        var j = $("<select>").attr("id", "skl-prop-btn-" + d).attr("class", "form-select");
        [
            ["S, A", 110],
            ["B, C", 90],
            ["D, E, F", 80],
            ["G", 70]
        ].forEach(function(a) {
            var b = $("<option>").text(a[0]).val(a[1]);
            j.append(b)
        }), j.change(function() {
            p()
        });
        var n = $("<th>").attr("scope", "row").append(f);
        b.append(n);
        var a = $("<td>").append(g);
        b.append(a);
        var a = $("<td>").append(h);
        b.append(a);
        var a = $("<td>").append(j);
        b.append(a);
        var a = $("<td>").append(k);
        a.attr("class", "text-center"), b.append(a);
        var a = $("<td>").append(m);
        b.append(a), $("#skl-tb").append(b), $(".skl-dlt-btn").on("click", function() {
            var a = $(this).closest("tr").attr("id");
            $("#" + a).remove(), e()
        }), i += 1
    }

    function g() {
        var c = j.toString(),
            a = $("<tr>").attr("id", "num-skl-br-" + c),
            f = $("<input>").attr("id", "num-sld1-" + c).attr("class", "form-control-sm tb-spinner").attr("type", "number").attr("value", "0").attr("min", "0").attr("max", "1000").attr("step", "1").attr("css", "min-width: 100px;"),
            g = $("<input>").attr("id", "num-sld2-" + c).attr("class", "form-control-sm tb-spinner").attr("type", "number").attr("value", "0").attr("min", "0").attr("max", "1000").attr("step", "1"),
            h = $("<input>").attr("type", "text"),
            i = $("<span>").attr("id", "num-pt-sum-" + c).attr("class", "tb-num-skl-pt").val(0).text("0pt"),
            k = $("<button>").attr("type", "button").attr("class", "btn btn-secondary btn-sm num-dlt-btn").text("\u2715");
        f.on("change keydown keyup", function() {
            var a = parseInt($("#num-sld1-" + c).val()) * parseInt($("#num-sld2-" + c).val());
            $("#num-pt-sum-" + c).text(a + "pt"), $("#num-pt-sum-" + c).val(a), e()
        }), g.on("change keydown keyup", function() {
            var a = parseInt($("#num-sld1-" + c).val()) * parseInt($("#num-sld2-" + c).val());
            $("#num-pt-sum-" + c).text(a + "pt"), $("#num-pt-sum-" + c).val(a), e()
        });
        var d = $("<th>").attr("scope", "row").append(h);
        a.append(d);
        var d = $("<td>").append(f);
        a.append(d);
        var b = $("<td>").append(g);
        a.append(b);
        var b = $("<td>").append(i);
        b.attr("class", "text-center"), a.append(b);
        var b = $("<td>").append(k);
        a.append(b), $("#num-skl-tb").append(a), $(".num-dlt-btn").on("click", function() {
            var a = $(this).closest("tr").attr("id");
            $("#" + a).remove(), e()
        }), j += 1
    }
    bsCustomFileInput.init(), $("#inputFile").change(function(c) {
        var a = c.target.files[0],
            b = new FileReader;
        if (0 > a.type.indexOf("image")) return alert("\u753B\u50CF\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u62E1\u5F35\u5B50\u306Fpng, jpg, jpeg\u306E\u307F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002jpg_medium\u306A\u3069\u306E\u62E1\u5F35\u5B50\u306Fjpg\u306B\u30EA\u30CD\u30FC\u30E0\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), $("#upload-btn").prop("disabled", !0), k = "", gtag("event", "click", {
            event_category: "selected not image"
        }), !1;
        b.onload = function(a) {
            $("#previewImg").attr("src", a.target.result), $("#mini-display-img").attr("src", a.target.result), $("#full-display-img").attr("src", a.target.result), k = "select"
        }, b.readAsDataURL(a), $("#upload-btn").prop("disabled", !1)
    }), $("#upload-btn").on("click", function() {
        $("#uploadModal").modal("hide"), c = "\u8AAD\u307F\u53D6\u308A\u4E2D...(5\uFF5E10\u79D2\u304B\u304B\u308A\u307E\u3059)", 0 == $("#loading").length && $("body").append("<div id='loading'>" + ("<div class='loadingMsg'>" + c + "</div>") + "</div>");
        var c, b = new FormData($("#upload-form").get(0));
        if ("select" == k) m(b);
        else {
            if ("paste" != k) return alert("\u753B\u50CF\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093"), !1;
            blobUrl = $("#previewImg").attr("src");
            let a = new XMLHttpRequest;
            a.responseType = "blob", a.open("GET", blobUrl, !0), a.send(), a.addEventListener("load", function() {
                b.append("imagefile", this.response, "pastedImg"), m(b)
            }, !1)
        }
    }), $("#paste-area").on("paste", function(a) {
        return function(e) {
            for (var b = null, c = (e.clipboardData || e.originalEvent.clipboardData).items, a = 0; a < c.length; a++) 0 == c[a].type.indexOf("image") && (b = c[a].getAsFile());
            if (null != b) {
                var d = URL.createObjectURL(b);
                $("#previewImg").attr("src", d), $("#mini-display-img").attr("src", d), $("#full-display-img").attr("src", d), $("#upload-btn").prop("disabled", !1), k = "paste"
            } else $("#upload-btn").prop("disabled", !0), $("#previewImg").attr("src", ""), k = ""
        }(a), !1
    }), $("input[type='number']").inputSpinner();
    let h = ["speed", "stamina", "power", "guts", "intel"];
    h.forEach(function(a) {
        $("#" + a + "-spinner").on("change input", function() {
            $("#" + a + "-slider").val($("#" + a + "-spinner").val()), q(a), e()
        });
        var b = document.getElementById(a + "-slider");
        b.oninput = function() {
            $("#" + a + "-spinner").val(b.value), q(a), e()
        }
    });
    var v = function(c) {
        if (c.length) {
            var b = $(c).val(),
                a = $(c).closest("tr");
            "\u7D99\u627F\u3057\u305F\u56FA\u6709\u30B9\u30AD\u30EB" == b ? a.css("background", "#FFFFEE") : "\u91D1\u30B9\u30AD\u30EB" == b ? a.css("background", "#FFEFD5") : "\u30AA\u30EC\u30F3\u30B8\u30B9\u30AD\u30EB" == b ? a.css("background", "#FFFFEE") : "\u9752\u30B9\u30AD\u30EB" == b ? a.css("background", "#F0F8FF") : "\u7DD1\u30B9\u30AD\u30EB" == b ? a.css("background", "#E6FFE9") : "\u8D64\u30B9\u30AD\u30EB" == b ? a.css("background", "#FFF0F5") : "\u7D2B\u30B9\u30AD\u30EB" == b ? a.css("background", "#E6E6FA") : a.css("background", "white")
        }
    };

    function b() {
        s(), h.forEach(function(a) {
            q(a)
        }), $("#ura-toggle-btn").prop("checked") && (r(), $("#ura-block").show(), e()), $("#table-toggle-btn").prop("checked") && ($("#num-input-table").show(), e()), e()
    }

    function w(d) {
        var p = ["spd", "vit", "str", "gts", "wiz"],
            n = ["speed", "stamina", "power", "guts", "intel"];
        for (let g = 0; g < 5; g++) {
            var j = d[p[g]];
            void 0 !== j && j >= 0 && j <= 1200 && ($("#" + n[g] + "-spinner").val(j), $("#" + n[g] + "-slider").val(j))
        }
        h.forEach(function(a) {
            q(a)
        });
        var l = d.star;
        void 0 !== l && l >= 1 && l <= 5 && $("#hero-rank").val(l);
        var m = d.uniqLv;
        void 0 !== m && m >= 1 && m <= 6 && $("#uniq-skl-lv").val(m), s();
        var o = ["turf", "dirt", "short", "mile", "middle", "long", "nige", "senko", "sashi", "oikomi"],
            k = ["\u829D", "\u30C0\u30FC\u30C8", "\u77ED\u8DDD\u96E2", "\u30DE\u30A4\u30EB", "\u4E2D\u8DDD\u96E2", "\u9577\u8DDD\u96E2", "\u9003\u3052", "\u5148\u884C", "\u5DEE\u3057", "\u8FFD\u8FBC"],
            b = {};
        for (let a = 0; a < o.length; a++)(aptName = d[o[a]]).lenth >= 2 && (aptName = aptName[0]), "S" == aptName || "A" == aptName ? b[k[a]] = 110 : "B" == aptName || "C" == aptName ? b[k[a]] = 90 : "D" == aptName || "E" == aptName || "F" == aptName ? b[k[a]] = 80 : "G" == aptName ? b[k[a]] = 70 : b[k[a]] = 110;
        b["\u5171\u901A"] = 110, $("#skl-tb").empty(), e(), d.skills.forEach(function(e) {
            var d = $.grep(c, function(a, b) {
                    return a.sklName == e
                })[0],
                a = i.toString();
            f(), $("#skl-prop-btn-" + a).val(b[d.cat2]), $("#skl-cat1-btn-" + a).val(d.cat1).trigger("change"), $("#skl-cat2-btn-" + a).val(d.cat2).trigger("change"), $("#skl-name-btn-" + a + " option").filter(function(a) {
                return $(this).text() === d.sklName
            }).prop("selected", !0).trigger("change")
        })
    }
    $("#mini-display-img").on("click", function() {
        $("#full-display").css({
            display: "block",
            "z-index": "2147483647"
        })
    }), $("#full-display").on("click", function() {
        $("#full-display").css({
            display: "none",
            "z-index": -1
        })
    }), $("#close-mini-display").on("click", function() {
        $("#mini-display").css("display", "none")
    }), $(".open-modal-btn").on("click", function() {
        $("#mini-display").css("display", "none")
    }), $("#skl-add-btn").on("click", function() {
        f()
    }), $("#num-skl-add-btn").on("click", function() {
        g()
    }), $("#hero-rank").on("change", function() {
        s()
    }), $("#uniq-skl-lv").on("change", function() {
        s()
    }), $("#table-toggle-btn").change(function() {
        $("#num-input-table").toggle("slow"), e()
    }), $("#ura-toggle-btn").change(function() {
        r(), $("#ura-block").toggle("slow"), e()
    }), $("#ura-race-stats").change(function() {
        r(), e()
    }), $("#ura-left-race").change(function() {
        r(), e()
    }), $("#ura-kisha").change(function() {
        r(), e()
    }), $("#ura-rijicho").change(function() {
        r(), e()
    }), $("#ura-friend").change(function() {
        r(), e()
    }), $("#ura-friend-kashimoto").change(function() {
        r(), e()
    }), $("#ura-uma").change(function() {
        r(), e()
    }), f(), g(), e(), b(), $(window).on("pageshow", b()), $(window).scroll(function() {
        var a = $("#result-skl-pt").offset().top + $("#result-skl-pt").height() - 30 - $(window).height();
        $(window).scrollTop() > a ? $("#sub-score-display").hide() : $("#sub-score-display").show()
    })
})