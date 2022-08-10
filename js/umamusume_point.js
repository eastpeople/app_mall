var skillcat1 = [], skillcat2 = [], skillcat3 = [];
$(function() {
    
    $("input[name^='uma-stat']").change(function() {
        $(this).next().text(statPoint(parseInt($(this).val())));
    });

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
        var cat1 = new Set();
        lstSkill.forEach(function (item, index) {
            cat1.add(item.mainCatKor + "|" + item.mainCatCode);
        });
        
        $("select[name='uma-skill-cat1']").empty();
        cat1.forEach(function(value) {
            $("select[name='uma-skill-cat1']").append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });

        category2($("select[name='uma-skill-cat1']").val());
    }

    $("select[name='uma-skill-cat1']").change(function() {
        category2($(this).val());
    });
    
    function category2(mainCatCode) {
        var cat1 = new Set();
        lstSkill.forEach(function (item, index) {
            if (mainCatCode == item.mainCatCode) {
                cat1.add(item.subCatKor + "|" + item.subCatCode);
            }
        });
        
        $("select[name='uma-skill-cat2']").empty();
        cat1.forEach(function(value) {
            $("select[name='uma-skill-cat2']").append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });
        skills($("select[name='uma-skill-cat1']").val(), $("select[name='uma-skill-cat2']").val());
    }

    $("select[name='uma-skill-cat2']").change(function() {
        skills($("select[name='uma-skill-cat1']").val(), $(this).val());
    });
    
    function skills(mainCatCode, subCatCode) {
        var cat1 = new Set();
        lstSkill.forEach(function (item, index) {
            if (mainCatCode == item.mainCatCode && subCatCode == item.subCatCode) {
                cat1.add(item.nameKor + "|" + item.point);
            }
        });
        
        $("select[name='uma-skill-list']").empty();
        cat1.forEach(function(value) {
            $("select[name='uma-skill-list']").append($('<option>', { 
                value: value.replace(/^.+\|/g, ""),
                text : value.replace(/\|.+$/g, "") 
            }));
        });

        var lst = $("select[name='uma-skill-list']");
        skillPoint(parseFloat($(lst).val()));
    }

    $("select[name='uma-skill-list']").change(function() {
        skillPoint(parseFloat($(this).val()));
    });

    function skillPoint(origin_pt) {
        var cat2 = $("select[name='uma-skill-cat2']");
        var cat2val = $(cat2).val();
        console.log(cat2val, origin_pt);
        var pt = origin_pt;
        if (cat2val != "common") {
            var per = parseFloat($("#uma-" + cat2val).val());
            console.log(per);
            pt = Math.round(origin_pt * per / 100);
        }
        $("select[name='uma-skill-list']").next().text(pt);
    }
});