let domStrings ={
    inputs: document.querySelectorAll('.r_Btns'),
    inputNum:document.querySelector('#input_number'),
    randomBtn:document.querySelector('.random'),
    resultDisplay: document.querySelector('.result')
}
let inputBtns = Array.from(domStrings.inputs);
let factType =['math','trivia','year','date'];


let getData = async (number,type) => await (await fetch(`http://numbersapi.com/${number}/${type}`)).text()

async function Controller(e) {
    let result
    if(domStrings.inputNum.value!=='')
    {
        if(e.target.matches('.Math')) result = await getData(domStrings.inputNum.value,'math')
        else if(e.target.matches('.Trivia'))result = await getData(domStrings.inputNum.value,'trivia')
        else if(e.target.matches('.Year'))result = await getData(domStrings.inputNum.value,'year')
        else if(e.target.matches('.Date'))result = await getData(domStrings.inputNum.value,'date');
        UIController(result);
    }
    else UIController('Input field can only be empty in case of random');    
}

async function randomFact() {
    rNumber = Math.round(Math.random()*3)
    let response = await (await fetch(`http://numbersapi.com/random/${factType[rNumber]}`)).text()
    UIController(response);
}

function UIController(text) {
    domStrings.resultDisplay.innerHTML=' ';
    domStrings.resultDisplay.textContent=text;
}

async function selectedFact(e) {
    let type
    inputBtns.forEach(inputBtn => {
        if(inputBtn.checked)
      type=inputBtn.dataset.type
    });
    if (e.target.value!=='') {
        let response = await (await fetch(`http://numbersapi.com/${e.target.value}/${type}`)).text();
        UIController(response);
    }
    else UIController('Input field can only be empty in case of random');
}


inputBtns.forEach(inputBtn => inputBtn.addEventListener('click',Controller));
domStrings.randomBtn.addEventListener('click',randomFact);
domStrings.inputNum.addEventListener('keyup',selectedFact)