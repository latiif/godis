let PossibleJudgmenets : Array<string> = ["HALAL", "HARAM","SUSPECTED", "UNKNOWN"]

window.onload = _ => {
    let enumber: HTMLInputElement = document.getElementById("enumber") as HTMLInputElement
    let result: HTMLDivElement = document.getElementById("information") as HTMLDivElement
    let reset: HTMLButtonElement = document.getElementById("reset") as HTMLButtonElement
    let inputform: HTMLFormElement = document.getElementById("inputform") as HTMLFormElement
    let EElement: string
    enumber.onkeyup = _ => {
        if (enumber.value != "") {
            EElement = `E${enumber.value}`
        }
    }

    inputform.onsubmit = ev => {
        fetch("assets/data.json")
            .then(response => response.json())
            .then(data => {
                var info = data[`${EElement}`]
                if (info === null) {
                    result.innerHTML = "NOT FOUND"
                } else {
                    result.innerHTML = ""
                    let EElementName: HTMLParagraphElement = document.createElement("p")
                    EElementName.innerHTML=EElement
                    let judgement: HTMLParagraphElement = document.createElement("p")

                    let tags = info["tags"] as Array<string>
                    tags.forEach(tag => {
                        if (PossibleJudgmenets.indexOf(tag) === -1)
                            return
                        let arabicTranslation = translateToArabic(tag)
                        if (arabicTranslation != "") {
                            result.className = `result ${tag}`
                            judgement.innerHTML = arabicTranslation
                        }
                    })
                    result.appendChild(EElementName)
                    result.appendChild(judgement)
                }
            })
        enumber.value = ""
        return false // to prevent reload
    }

    reset.onclick = ev => {
        enumber.value = ""
    }
}


function translateToArabic(tag:string) : string{
    switch (tag) {
        case "HALAL":
            return "حلال"
        case "COLOR":
            return "ملوّن"
        case "SUSPECTED":
            return "مشبوه"
        case "ALLERGY":
            return "قد يسبب حساسية"
        case "UNKNOWN":
            return "غير معروف"
        case "HARAM":
            return "حرام"
        default:
            return ""
    }
}
