var PossibleJudgmenets = ["HALAL", "HARAM", "SUSPECTED", "UNKNOWN"];
window.onload = function (_) {
    var enumber = document.getElementById("enumber");
    var result = document.getElementById("information");
    var reset = document.getElementById("reset");
    var inputform = document.getElementById("inputform");
    var EElement;
    enumber.onkeyup = function (_) {
        if (enumber.value != "") {
            EElement = "E" + hindiToArabic(enumber.value);
            console.log(EElement);
        }
    };
    inputform.onsubmit = function (ev) {
        fetch("assets/data.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var info = data["" + EElement];
            if (info === null) {
                result.innerHTML = "NOT FOUND";
            }
            else {
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
function hindiToArabic(input) {
    var hindi = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    var arabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var array = input.split('');
    console.log(input);
    array.map(function (_, i, array) {
        console.log("Looking at " + array[i]);
        if (hindi.indexOf(array[i]) >= 0) {
            console.log("Found " + array[i] + " in " + hindi);
            array[i] = arabic[hindi.indexOf(array[i])];
        }
    });
    return array.join('');
}
