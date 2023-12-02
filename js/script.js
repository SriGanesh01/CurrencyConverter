const dropList = document.querySelectorAll(".DropDownOuter select");
fromCurrency = document.querySelector(".fromcurr select");
toCurrency = document.querySelector(".tocurr select");

getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (currencyCode in country_list){
        // default option tag
        let selected;
        if (i == 0){
            selected = currencyCode == "USD" ? "selected" : "";
        }
        else if (i == 1){
            selected = currencyCode == "INR" ? "selected" : "";
        }

        let optionTag = `<option value="${currencyCode}" ${selected} >${currencyCode}</option>`;
        // inserting the optionTag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });

    function loadFlag(element){
        for (code in country_list){
            if (code == element.value){
                let imgTag = element.parentElement.querySelector("img");
                imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
            }
        }
    }
}

window.addEventListener("load", () =>{

    getExchangeRate();
})

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".DropDownOuter .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/1b9e4ec07ce33543553da965/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    })
}