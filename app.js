
const currencyToConvert = document.querySelector(".currency-To-Convert");
const currencyConverted = document.querySelector(".currency-converted");
const currencySelect = document.querySelector(".currency");
const valueToConvert = document.querySelector(".value-To-Convert");
const valueConverted = document.querySelector(".converted");
const btn_convert = document.querySelector(".btn-convert");

let appData = {
    currency:[],
    values:[]
}
    
let base;
const url = "https://api.exchangeratesapi.io/latest";
let apidata = [];
fetch(`${url}`)
.then(response => response.json())
.then(function(data){
    console.log(data);

    // 1.Populate dropdowns with currencies
    currencySelect.innerHTML = "";
    currencyConverted.innerHTML = "";
    let curs = [data.base,...Object.keys(data.rates)];
    curs.forEach(cur =>{    
        currencySelect.innerHTML += `<option class = "currency-picked " value = ${cur}>${cur}</option>`;
        currencyConverted.innerHTML += `<option value = ${cur}>${cur}</option>`;
    })
    // 2. Set currencies in both fields
    currencySelect.value = data.base;
    currencyConverted.value = Object.keys(data.rates)[0];   
    
    
    // 3. Poplulate currency-exchange rate array
    let currencies = Object.keys(data.rates)
    currencies.forEach(cur =>{
        let DATA_CUR = cur;
        let DATA_VAL = data.rates[cur];
    appData.currency.push(DATA_CUR);  
    appData.values.push(DATA_VAL);       
    })
})

console.log(appData);

// Convertation

btn_convert.addEventListener("click", convert);

function convert(){
    console.log("Ready to convert!!!")
    // clearFields();
    // 1. GEt user's input
        // CURRENCY
    let curToConvert = currencyToConvert.value;
    console.log(`Convert from ${curToConvert}`);
    let currResult  = currencyConverted.value;
    console.log(`Convert to ${currResult}`);
        //AMOUNT    
    let amount  = valueToConvert.value;
    console.log(amount);

    let result = converter(curToConvert,currResult,amount,appData);
        // INSERT RESULT TO UI
    valueConverted.value = result;
}

function converter(curFrom,curTo,amount,obj){
    let indexCurFrom,indexCurTo,exRateCurFrom,exRateCurTo,result;

    indexCurTo = obj.currency.findIndex(cur =>cur==curTo);
    exRateCurTo = obj.values[indexCurTo];
    if (curFrom == "EUR"){
        result = amount*exRateCurTo;
    } else {
        indexCurFrom = obj.currency.findIndex(cur =>cur==curFrom);
        exRateCurFrom = obj.values[indexCurFrom];
        result = amount*exRateCurTo/exRateCurFrom;
    }
    return result;
}

function clearFields(){
    
    valueToConvert.value = "";
    valueConverted.value = "";
}



