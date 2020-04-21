let data: any | null

window.addEventListener('load', _ => {
    let components: HTMLDataListElement = document.getElementById("components") as HTMLDataListElement;
    Object.keys(data).forEach(element => {
        let option: HTMLOptionElement = document.createElement("option")
        option.value = element as string
        components.appendChild(option)
    });
})
