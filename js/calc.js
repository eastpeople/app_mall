var lstSkill;
$(function() {

    /*$("input[type='number']").on('focus', function () {
        this.select();
    });*/

    $("button[name='stat-plus']").on('click ', function () {
        var _ele = $(this).prevAll('input').first();
        var _temp = $(_ele).val();
        if (!isNaN(_temp)) $(_ele).val(parseInt(_temp) + 1);
        statPrevious();
    });

    $("button[name='stat-minus']").on('click ', function () {
        var _ele = $(this).prevAll('input').first();
        var _temp = $(_ele).val();
        if (!isNaN(_temp) && _temp > 0) $(_ele).val(parseInt(_temp) - 1);
        statPrevious();
    });

    $("input[name='uma-ura-yn']").change(function () {
        if (this.checked) {
            $("#div-ura").slideDown();
        } else {
            $("#div-ura").slideUp();
        }
    });

    $("#btnGo").click(function() {
        cpassword();
    });

    $("#password").keyup(function(e){ 
        if (e.keyCode == 13) {
            cpassword();
        }
    });

    function cpassword() {
        //eaf493e8af54e4fb893988a51b83b390a725e24bbe1575a50625c811c08ecb6f
        if (CryptoJS.SHA256($("#password").val()).toString() === "21cedfef481c0e0cc8aa08897ca0232f065269c8a2ad607f79e9f019f0808fb8") {
            $("#page1").hide();
            $("#page2").show();   
        }
    }

    $("input[name^='uma-stat']").change(function() {
        statPrevious();
    });

    $("select[name='uma-ura-race-pt']").change(function() {
        $("input[name^='uma-ura-race']").val($(this).val());
        uraPoint();
    });

    $("input[name^='uma-ura'], select[name^='uma-ura']").change(function() {
        uraPoint();
    });

    function uraPoint() {
        var tp = 0;
        $("#div-ura").find("input[type='checkbox'], input[type='radio']").each(function(index, ele) {
            if (ele.checked && $(ele).attr("name") != 'uma-ura-race') {
                
                tp += parseInt($(ele).val());
            }
        });
        $("#div-ura").find("b").first().text(tp);
        $("input[name^='uma-stat']").trigger('change');
    }

    function statPrevious() {
        var ura = 0, _temp;
        if ($("input[name='uma-ura-yn']").is(':checked')) {
            _temp = parseInt($("#div-ura").find("b").first().text());
            if (!isNaN(_temp)) ura += _temp;
        }

        $("input[name^='uma-stat'][name$='-1']").each(function (index, ele) {
            var _tt = 0;
            var _name = $(ele).attr('name');
            var _ele = $("input[name^='" + _name.replace(/-[0-9]+/g, "") + "']");
            
            _ele.each(function (index2, ele2) {
                _temp = parseInt($(ele2).val());
                if (!isNaN(_temp)) _tt += _temp;
            });

            $(_ele).nextAll('strong').first().text(statPoint(ura + _tt));
        });


        totalPoint();
    }

    function statPoint(value1) {
        var pt = 0, c = [];
        switch (true) {
            case value1 >= 0 && value1 < 50:
                pt = 0;
                for (let d = 0; d <= value1; d++) d % 2 == 1 && (pt += 1);
                break;
            case value1 >= 50 && value1 < 100:
                pt = 25, c = [0, 5];
                for (let e = 50; e <= value1; e++) c.includes(parseInt(e.toString().slice(-1))) || (pt += 1);
                break;
            case value1 >= 100 && value1 < 150:
                pt = 65;
                for (let z = 100; z <= value1; z++) pt += 1;
                break;
            case value1 >= 150 && value1 < 200:
                pt = 115, c = [3, 6, 9];
                for (let f = 150; f <= value1; f++) c.includes(parseInt(f.toString().slice(-1))) ? pt += 2 : pt += 1;
                break;
            case value1 >= 200 && value1 < 250:
                pt = 180, c = [0, 2, 5, 7];
                for (let g = 200; g <= value1; g++) c.includes(parseInt(g.toString().slice(-1))) ? pt += 1 : pt += 2;
                break;
            case value1 >= 250 && value1 < 300:
                pt = 260, c = [0, 5];
                for (let h = 250; h <= value1; h++) c.includes(parseInt(h.toString().slice(-1))) ? pt += 1 : pt += 2;
                break;
            case value1 >= 300 && value1 < 350:
                pt = 350, c = [9];
                for (let i = 300; i <= value1; i++) c.includes(parseInt(i.toString().slice(-1))) ? pt += 3 : pt += 2;
                break;
            case value1 >= 350 && value1 < 400:
                pt = 455, c = [2, 4, 7, 9];
                for (let j = 350; j <= value1; j++) c.includes(parseInt(j.toString().slice(-1))) ? pt += 3 : pt += 2;
                break;
            case value1 >= 400 && value1 < 450:
                pt = 575, c = [0, 2, 5, 7];
                for (let k = 400; k <= value1; k++) c.includes(parseInt(k.toString().slice(-1))) ? pt += 2 : pt += 3;
                break;
            case value1 >= 450 && value1 < 500:
                pt = 705, c = [0, 5];
                for (let l = 450; l <= value1; l++) c.includes(parseInt(l.toString().slice(-1))) ? pt += 2 : pt += 3;
                break;
            case value1 >= 500 && value1 < 550:
                pt = 845, c = [0];
                for (let m = 500; m <= value1; m++) c.includes(parseInt(m.toString().slice(-1))) ? pt += 2 : pt += 3;
                break;
            case value1 >= 550 && value1 < 600:
                pt = 990;
                for (let az = 550; az <= value1; az++) pt += 3;
                break;
            case value1 >= 600 && value1 < 650:
                pt = 1140, c = [9];
                for (let n = 600; n <= value1; n++) c.includes(parseInt(n.toString().slice(-1))) ? pt += 4 : pt += 3;
                break;
            case value1 >= 650 && value1 < 700:
                pt = 1295, c = [3, 6, 9];
                for (let o = 650; o <= value1; o++) c.includes(parseInt(o.toString().slice(-1))) ? pt += 4 : pt += 3;
                break;
            case value1 >= 700 && value1 < 750:
                pt = 1460, c = [2, 4, 7, 9];
                for (let p = 700; p <= value1; p++) c.includes(parseInt(p.toString().slice(-1))) ? pt += 4 : pt += 3;
                break;
            case value1 >= 750 && value1 < 800:
                pt = 1630, c = [];
                for (let q = 750; q <= value1; q++) q % 2 == 1 ? pt += 4 : pt += 3;
                break;
            case value1 >= 800 && value1 < 850:
                pt = 1805, c = [0];
                for (let r = 800; r <= value1; r++) c.includes(parseInt(r.toString().slice(-1))) ? pt += 3 : pt += 4;
                break;
            case value1 >= 850 && value1 < 900:
                pt = 2e3, c = [9];
                for (let s = 850; s <= value1; s++) c.includes(parseInt(s.toString().slice(-1))) ? pt += 5 : pt += 4;
                break;
            case value1 >= 900 && value1 < 950:
                pt = 2205, c = [4, 9];
                for (let t = 900; t <= value1; t++) c.includes(parseInt(t.toString().slice(-1))) ? pt += 5 : pt += 4;
                break;
            case value1 >= 950 && value1 < 1e3:
                pt = 2415, c = [3, 6, 9];
                for (let u = 950; u <= value1; u++) c.includes(parseInt(u.toString().slice(-1))) ? pt += 5 : pt += 4;
                break;
            case value1 >= 1e3 && value1 < 1050:
                pt = 2630, c = [4, 9];
                for (let v = 1e3; v <= value1; v++) c.includes(parseInt(v.toString().slice(-1))) ? pt += 6 : pt += 5;
                break;
            case value1 >= 1050 && value1 < 1100:
                pt = 2890, c = [4, 9];
                for (let w = 1050; w <= value1; w++) w % 2 == 1 ? pt += 6 : pt += 5;
                break;
            case value1 >= 1100 && value1 < 1150:
                pt = 3165, c = [0, 2, 5, 7];
                for (let x = 1100; x <= value1; x++) c.includes(parseInt(x.toString().slice(-1))) ? pt += 6 : pt += 7;
                break;
            case value1 >= 1150 && value1 < 1200:
                pt = 3495, c = [0, 5];
                for (let y = 1150; y <= value1; y++) c.includes(parseInt(y.toString().slice(-1))) ? pt += 6 : pt += 7;
                break;
            case 1200 == value1:
                pt = 3841
        }
        return pt;
    }

    $("select[name^='uma-star']").change(function() {
        uniqePoint();
    });

    function uniqePoint() {
        var pt = 0;
        star = parseInt($("select[name='uma-star'] option:selected").val()),
        unique = parseInt($("select[name='uma-star-skill'] option:selected").val());
        star < 3 ? pt = 120 * unique : star > 2 && (pt = 170 * unique);
        $("select[name='uma-star-skill']").next().text(pt);
        totalPoint();
    }

    uniqePoint();

    fetch('./json/umamusume_skill_json.json')
        .then(response => response.json())
        .then(data => {
            lstSkill = JSON.parse(JSON.stringify(data));
            category1();
        })
        .catch(error => console.log(error));

    
    function category1() {
        var arr1 = new Array();
        lstSkill.forEach(function (item, index) {
            arr1.push(item.mainCatKor + "|" + item.mainCatCode);
        });
        
        var cat1 = new Set(arr1.sort());
        //$("#div-skills").append('<div class="p100"> <select name="uma-skill-cat1"></select>  <select name="uma-skill-cat2"></select><br> <select name="uma-skill-list" ></select> <strong></strong><small>pt</small> <button name="delSkill">삭제</button></div>');
        var cat1_ele = $("select[name='uma-skill-cat1']");
        $(cat1_ele).empty();
        cat1.forEach(function(value) {
            $(cat1_ele).append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });

        category2($(cat1_ele).val());
    }
    
    function category2(main_ele_val) {
        
        var cat1 = new Set();
        
        lstSkill.forEach(function (item, index) {
            if (main_ele_val == item.mainCatCode) {
                cat1.add(item.subCatKor + "|" + item.subCatCode);
            }
        });
        var cat2_ele = $("select[name='uma-skill-cat2']");
        $(cat2_ele).empty();
        $(cat2_ele).append($('<option>', { 
            value: "all",
            text : "전체" 
        }));
        cat1.forEach(function(value) {
            $(cat2_ele).append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });
        skills(main_ele_val, $(cat2_ele).val());
    }

    $("#running-style select, #race select, #track select").change(function() {
        totalPoint();
    });

    $("select[name='uma-skill-cat1']").change(function() {
        category2($(this).val());
    });

    $("select[name='uma-skill-cat2']").change(function() {
        skills($("select[name='uma-skill-cat1']").val(), $(this).val());
    });

    
    
    function skills(main_ele_val, sub_ele_val) {
        var arr3 = new Array();
        lstSkill.forEach(function (item, index) {
            if (main_ele_val == item.mainCatCode && (sub_ele_val == 'all' || sub_ele_val == item.subCatCode)) {
                arr3.push(item.nameKor + "|" + item.id);
            }
        });
        
        var cat3 = new Set(arr3.sort());
        var lst_ele = $("select[name='uma-skill-list']");
        $(lst_ele).empty();
        $(lst_ele).append($('<option>', { 
            value: "0",
            text : "선택" 
        }));
        cat3.forEach(function(value) {
            $(lst_ele).append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });
        
        //skillPoint();
    }

    function skillPoint(skill_id) {
        
        if ($("span[uma-skill-id='" + skill_id + "']").length > 0) {
            return;
        } else if (skill_id == '0') {
            return;
        }

        var skillname = "";
        lstSkill.forEach(function (item, index) {
            if (skill_id == item.id) {
                skillname = item.nameKor;
            }
        });

        $("#div-skills").append('<div>'
                                + '<span uma-skill-id="' + skill_id + '">' + skillname + '</span> '
                                + '<strong></strong> <small>pt</small> '
                                + '<button name="delSkill">제거</button>'
                                + '</div>');
        totalPoint();
    
        $("button[name='delSkill']").click(function() {
            $(this).parent().remove();
            totalPoint();
        });
        
    }

    $("button[name='addSkill']").on("click", function() {
        skillPoint($("select[name='uma-skill-list']").val());
        
    });

    $("button[name='addFavoriteSkill']").on("click", function() {
        skillPoint($("select[name='favoriteSkills']").val());
    });

    function rank(pt) {
        return pt < 300 ? ["G", "#676567"] : pt < 600 && pt >= 300 ? ["G+", "#676567"] : pt < 900 && pt >= 600 ? ["F", "#ada4ed"] : pt < 1300 && pt >= 900 ? ["F+", "#ada4ed"] : pt < 1800 && pt >= 1300 ? ["E", "#e18dfb"] : pt < 2300 && pt >= 1800 ? ["E+", "#e18dfb"] : pt < 2900 && pt >= 2300 ? ["D", "#6bc3ff"] : pt < 3500 && pt >= 2900 ? ["D+", "#6bc3ff"] : pt < 4900 && pt >= 3500 ? ["C", "#84db6b"] : pt < 6500 && pt >= 4900 ? ["C+", "#84db6b"] : pt < 8200 && pt >= 6500 ? ["B", "#f086a9"] : pt < 1e4 && pt >= 8200 ? ["B+", "#f086a9"] : pt < 12100 && pt >= 1e4 ? ["A", "#ffa35f"] : pt < 14500 && pt >= 12100 ? ["A+", "#ffa35f"] : pt < 15900 && pt >= 14500 ? ["S", "#eccf6c"] : pt < 17500 && pt >= 15900 ? ["S+", "#eccf6c"] : pt < 19200 && pt >= 17500 ? ["SS", "#eccf6c"] : pt < 19600 && pt >= 19200 ? ["SS+", "#eccf6c"] : pt < 2e4 && pt >= 19600 ? ["UG", "#eccf6c"] : pt < 20400 && pt >= 2e4 ? ["UG1", "#eccf6c"] : pt < 20800 && pt >= 20400 ? ["UG2", "#eccf6c"] : pt < 21200 && pt >= 20800 ? ["UG3", "#eccf6c"] : pt < 21600 && pt >= 21200 ? ["UG4", "#eccf6c"] : pt < 22100 && pt >= 21600 ? ["UG5", "#eccf6c"] : pt < 22500 && pt >= 22100 ? ["UG6", "#eccf6c"] : pt < 23e3 && pt >= 22500 ? ["UG7", "#eccf6c"] : pt < 23400 && pt >= 23e3 ? ["UG8", "#eccf6c"] : pt < 23900 && pt >= 23400 ? ["UG9", "#eccf6c"] : pt >= 23900 ? ["UF", "#eccf6c"] : ["", ""];
    }

    function totalPoint() {

        $("span[uma-skill-id]").each(function(index, ele) {
            var skillid = $(this).attr("uma-skill-id");
            var _this = $(this);
            
            lstSkill.forEach(function (item, index) {
                if (skillid == item.id) {
                    var subcode = item.subCatCode;
                    var origin_pt = parseFloat(item.point);
                    var pt = origin_pt;
                    
                    if (!",common,all".includes(subcode)) {
                        var per = parseFloat($("#uma-" + subcode).val());
                        pt = Math.round(origin_pt * per / 100);
                    }
                    
                    $(_this).next().text(pt);
                }
            });
        });

        var tp = 0;
        $("#page2").find("strong").each(function(index, ele) {
            tp += parseInt($(ele).text());
        });
        $("#rank").find("img").attr("src", "img/rank/r_" + rank(tp)[0].toLowerCase() + ".png");
        $("#rank").find("span").text(tp);
    }
    
});
