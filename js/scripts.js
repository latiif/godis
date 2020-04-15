function isJudgement(arg) {
    var judgmenets = ["HALAL", "HARAM", "SUSPECTED", "UNKNOWN", "NOTFOUND"];
    return judgmenets.indexOf(arg) != -1;
}
window.onload = function (_) {
    var enumber = document.getElementById("enumber");
    var result = document.getElementById("information");
    var reset = document.getElementById("reset");
    var inputform = document.getElementById("inputform");
    var EElement;
    enumber.onkeyup = function (_) {
        if (enumber.value != "") {
            EElement = "E" + hindiToArabic(enumber.value);
        }
    };
    inputform.onsubmit = function (ev) {
        var found = false;
        fetch("assets/data.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var info = data["" + EElement];
            if (info === null) {
                result.innerHTML = "NOT FOUND";
            }
            else {
                var tags = info["tags"];
                tags.forEach(function (tag) {
                    if (isJudgement(tag)) {
                        parseIntoResult(result, EElement, tag);
                        found = true;
                    }
                });
            }
        });
        if (!found) {
            parseIntoResult(result, EElement, "NOTFOUND");
        }
        enumber.value = "";
        return false; // to prevent reload
    };
    reset.onclick = function (_) {
        enumber.value = "";
    };
};
function translateToArabic(tag) {
    switch (tag) {
        case "HALAL":
            return "حلال";
        case "SUSPECTED":
            return "مشبوه";
        case "UNKNOWN":
            return "غير معروف";
        case "HARAM":
            return "حرام";
        case "NOTFOUND":
            return "غير موجود";
    }
}
function hindiToArabic(input) {
    var hindi = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    var arabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var array = input.split('');
    array.map(function (_, i, array) {
        if (hindi.indexOf(array[i]) >= 0) {
            array[i] = arabic[hindi.indexOf(array[i])];
        }
    });
    return array.join('');
}
function parseIntoResult(result, element, judgement) {
    result.innerHTML = "";
    var elementName = document.createElement("p");
    elementName.innerHTML = element;
    var elementJudgement = document.createElement("p");
    var arabicTranslation = translateToArabic(judgement);
    result.className = "result " + judgement;
    elementJudgement.innerHTML = arabicTranslation;
    result.appendChild(elementName);
    result.appendChild(elementJudgement);
}
