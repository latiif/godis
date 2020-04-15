
type Judgement = "HALAL" | "HARAM" | "SUSPECTED" | "UNKNOWN" | "NOTFOUND"
function isJudgement(arg: string): arg is Judgement {
    let judgmenets: Array<string> = ["HALAL", "HARAM", "SUSPECTED", "UNKNOWN", "NOTFOUND"]
    return judgmenets.indexOf(arg) != -1
}

window.onload = _ => {
    let enumber: HTMLInputElement = document.getElementById("enumber") as HTMLInputElement
    let result: HTMLDivElement = document.getElementById("information") as HTMLDivElement
    let reset: HTMLButtonElement = document.getElementById("reset") as HTMLButtonElement
    let inputform: HTMLFormElement = document.getElementById("inputform") as HTMLFormElement
    let EElement: string
    enumber.onkeyup = _ => {
        if (enumber.value != "") {
            EElement = `E${hindiToArabic(enumber.value)}`
        }
    }

    inputform.onsubmit = ev => {
        let found = false
        fetch("assets/data.json")
            .then(response => response.json())
            .then(data => {
                var info = data[`${EElement}`]
                if (info === null) {
                    result.innerHTML = "NOT FOUND"
                } else {
                    let tags = info["tags"] as Array<string>
                    tags.forEach(tag => {
                        if (isJudgement(tag)) {
                            parseIntoResult(result, EElement, tag)
                            found = true
                        }
                    })
                }
            })
        if (!found) {
            parseIntoResult(result,EElement,"NOTFOUND")
        }
        enumber.value = ""
        return false // to prevent reload
    }

    reset.onclick = _ => {
        enumber.value = ""
    }
}


function translateToArabic(tag: Judgement): string {
    switch (tag) {
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
