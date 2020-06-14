let data: any | null

type Score = [string, number]
let distance = (score: Score): number => score[1]
let value = (score: Score): string => score[0]

type Judgement = "HALAL" | "HARAM" | "SUSPECTED" | "UNKNOWN" | "NOTFOUND"
function isJudgement(arg: string): arg is Judgement {
    let judgmenets = ["HALAL", "HARAM", "SUSPECTED", "UNKNOWN", "NOTFOUND"]
    return judgmenets.indexOf(arg) != -1
}

window.addEventListener('load', _ => {
    let enumber: HTMLInputElement = document.getElementById("enumber") as HTMLInputElement
    let result: HTMLDivElement = document.getElementById("information") as HTMLDivElement
    let inputform: HTMLFormElement = document.getElementById("inputform") as HTMLFormElement
    let hint: HTMLDivElement = document.getElementById("hint") as HTMLDivElement

    let eElement: string

    enumber.oninput = _ => {
        hint.style.display = "none"
        console.log("DEBUG: ", `${hindiToArabic(enumber.value)}`)
        eElement = `${hindiToArabic(enumber.value)}`
    }

    inputform.onsubmit = ev => {
        let score: Score = getMostSimilar(eElement);
        if (distance(score) != 0) { // Not an exact match
            hint.innerHTML = `هل تقصد${value(score)}؟`
            hint.style.display = "block";
        } else {
            hint.style.display = "none"
        }
        findJudgement(result, value(score))
        return false // to prevent reload
    }
})

function translateToArabic(judgement: Judgement): string {
    switch (judgement) {
        case "HALAL":
            return "حلال"
        case "SUSPECTED":
            return "مشبوه"
        case "UNKNOWN":
            return "غير معروف"
        case "HARAM":
            return "حرام"
        case "NOTFOUND":
            return "غير موجود"
    }
}

function hindiToArabic(input: string): string {
    let hindi = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let arabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let array = input.split('');
    array.map(function (_, i, array) {
        if (hindi.indexOf(array[i]) >= 0) {
            array[i] = arabic[hindi.indexOf(array[i])];
        }
    });
    return array.join('');
}

function parseIntoResult(result: HTMLDivElement, element: string, judgement: Judgement) {
    result.innerHTML = ""
    let elementName: HTMLParagraphElement = document.createElement("p")
    elementName.innerHTML = element
    let elementJudgement: HTMLParagraphElement = document.createElement("p")
    let arabicTranslation = translateToArabic(judgement)
    result.className = `result ${judgement}`
    elementJudgement.innerHTML = arabicTranslation
    result.appendChild(elementName)
    result.appendChild(elementJudgement)
}

function findJudgement(result: HTMLDivElement, element: string): boolean {
    let found = false
    var info = data[`${element}`]
    if (info === null || info === undefined) {
        result.innerHTML = "NOT FOUND"
    } else {
        console.log("info " + info)
        let tags = info["tags"] as Array<string>
        tags.forEach(tag => {
            if (isJudgement(tag)) {
                parseIntoResult(result, element, tag)
                found = true
            }
        })
    }
    if (!found) {
        parseIntoResult(result, element, "NOTFOUND")
    }
    return found
}

let getMostSimilar: (string) => Score
