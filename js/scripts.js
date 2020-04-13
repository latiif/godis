var PossibleJudgmenets = ["HALAL", "HARAM", "SUSPECTED", "UNKNOWN"];
window.onload = function (_) {
    var enumber = document.getElementById("enumber");
    var result = document.getElementById("information");
    var reset = document.getElementById("reset");
    var inputform = document.getElementById("inputform");
    var EElement;
    console.log(enumber);
    enumber.onkeyup = function (_) {
        if (enumber.value != "") {
            EElement = "E" + enumber.value;
            console.log(EElement);
        }
    };
    inputform.onsubmit = function (ev) {
        console.log(EElement);
        fetch("assets/data.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(EElement);
            var info = data["" + EElement];
            console.log(info);
            if (info === null) {
                result.innerHTML = "NOT FOUND";
            }
            else {
                console.log(info["tags"]);
                result.innerHTML = "";
                var EElementName = document.createElement("p");
                EElementName.innerHTML = EElement;
                var judgement_1 = document.createElement("p");
                var tags = info["tags"];
                tags.forEach(function (tag) {
                    if (PossibleJudgmenets.indexOf(tag) === -1)
                        return;
                    var arabicTranslation = translateToArabic(tag);
                    if (arabicTranslation != "") {
                        result.className = "result " + tag;
                        judgement_1.innerHTML = arabicTranslation;
                    }
                });
                result.appendChild(EElementName);
                result.appendChild(judgement_1);
            }
        });
        enumber.value = "";
        return false; // to prevent reload
    };
    reset.onclick = function (ev) {
        enumber.value = "";
    };
};
function translateToArabic(tag) {
    switch (tag) {
        case "HALAL":
            return "حلال";
        case "COLOR":
            return "ملوّن";
        case "SUSPECTED":
            return "مشبوه";
        case "ALLERGY":
            return "قد يسبب حساسية";
        case "UNKNOWN":
            return "غير معروف";
        case "HARAM":
            return "حرام";
        default:
            return "";
    }
}
