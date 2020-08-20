/* #4527a0 */
const fields = document.querySelectorAll('input[data-js="algorism"]');
const fieldCPF = document.getElementById("CPFfield");
const fieldPassw = document.querySelectorAll('input[type="password"]');

const popUP = document.getElementsByClassName("info-popup");
const RegEx = [
/([A-ZÀ-Ú-a-zà-ú_@/#&+*.])/,
/([A-ZÀ-Úa-zà-ú_@/#&+*.])/,
/([(1){6}]{6})|([(2){6}]{6})|([(3){6}]{6})|([(4){6}]{6})|([(5){6}]{6})|([(6){6}]{6})|([(7){6}]{6})|([(8){6}]{6})|([(9){6}]{6})|([(0){6}]{6})/g
];

/* 
Formatting events for text fields and animations.
*/
fields[1].addEventListener("change", eventformatingPhone => {
    fields[1].value = fields[1].value.replace(/(\d{5})/, '$1-');
});

fields[3].addEventListener("change", eventformatingZIPCODE => {
    fields[3].value = fields[3].value.replace(/(\d{5})/, '$1-');
});

/* 
Select all fields with "data-js = number", and add
a "RegeEx" and "Listener", which prevents the user from typing
alphabetic letters and some special characters.
*/
for(let item of fields){
    item.addEventListener("input", eventcleanCharac => {
        for(item of fields){
            item.value = item.value.replace(RegEx[1], '');
        }
    });
}

/* Password Validation&Interaction code */
fieldPassw[1].addEventListener("change", eventverifyPassw => {
    if(fieldPassw[1].value != fieldPassw[2].value){
        invalidPassw()
    }else{
        if((fieldPassw[1].value &&  fieldPassw[2].value) > 0){
            validPassw()
        }
    }

});

fieldPassw[2].addEventListener("change", eventverifyPassw => {
    if(fieldPassw[2].value != fieldPassw[1].value){
        invalidPassw()
    }else{
        if((fieldPassw[1].value &&  fieldPassw[2].value) > 0){
            validPassw()
        }
    }

});

function popupDisplay(x){
    popUP[x].style.display = "block";
    popUP[x].style.cursor = "pointer";
}

/*  */
function validPassw(){
    popUP[1].innerHTML = "✔️";
    popUP[1].title = "Suas senhas conferem!";//Your passwords match
    fieldPassw[2].title = "";
    fieldPassw[1].style.boxShadow = "0px 0px 1.5px 1px rgb(0, 221, 0)"; 
    fieldPassw[2].style.boxShadow = fieldPassw[1].style.boxShadow; 
    popUP[1].style.boxShadow = fieldPassw[1].style.boxShadow;
    popupDisplay(1);
}

/*  */
function invalidPassw(){
    popUP[1].innerHTML = "❌";
    popUP[1].title = "Suas senhas não conferem!";//Your passwords do not match
    fieldPassw[2].title = "Essa senha não é igual a inserida a cima.";//This password is not the same as the one above.
    fieldPassw[1].style.boxShadow = "";
    fieldPassw[2].focus();
    fieldPassw[2].style.boxShadow = "0px 0px 1.5px 1px rgb(255, 0, 0)";
    popUP[1].style.boxShadow = fieldPassw[2].style.boxShadow;
    popupDisplay(1)
}

popUP[1].addEventListener("click", eventclosePasswPopup => {
    if(popUP[1].title !== "Suas senhas conferem!"){
        fieldPassw[2].value = "";
    }
    popUP[1].style.display = "none";
});

/* CPF Validation&Interaction code */
fieldCPF.addEventListener("input", eventcleanCharc => {
    fieldCPF.value = cleanCharacter(fieldCPF.value);

    function cleanCharacter(x){
        return x.replace(RegEx[0], '');
    }
});

fieldCPF.addEventListener("change", eventgetCPF => {
    fieldCPF.value = fieldCPF.value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    const cpf = fieldCPF.value.replace(/[^0-9]/g, ''); // Clear the special characters added above.
    if(cpf.match(RegEx[2]) || cpf.length < 11){
        invalidCPF();
    }else{
        if(validatesCPF(cpf)){ 
            fieldCPF.style.boxShadow = "0px 0px 1.5px 1px rgb(0, 221, 0)"; //Confirms the validity of the CPF.
            popUP[0].style.boxShadow = fieldCPF.style.boxShadow;
            popUP[0].title = "Esse CPF é válido!";//This CPF is valid!
            popUP[0].innerHTML = "✔️";
            fieldCPF.title = popUP[0].title;
            popUP[0].style.display = "block";
            popUP[0].style.cursor = "default"; 
        }else{
            invalidCPF();
        }
    }
    
    function invalidCPF(){
        popupDisplay(0);
        popUP[0].innerHTML = "❌";
        popUP[0].title = "Esse CPF é inválido!";//Your CPF is invalid!
        fieldCPF.style.boxShadow = "0px 0px 1.5px 1px rgb(255, 0, 0)"; //Simulates the CPF input in an invalid state.
        popUP[0].style.boxShadow = fieldCPF.style.boxShadow;
        //This CPF is invalid!, please click on the right popup to clean this field.
        fieldCPF.title = "Esse CPF é inválido, porfavor click no popup a direita para limpar esse campo.";
        fieldCPF.focus();
    }
});

popUP[0].addEventListener("click", eventcloseCPFPopup => {
    if(popUP[0].innerHTML == "❌"){
        fieldCPF.value = "";//Clean the CPF input. 
        popUP[0].style.display = "none";
    }
});

/* 
    Whais CPF? 

    The Individual Taxpayer Registry is the register 
    maintained by the Federal Revenue of Brazil in which
    any natural persons, regardless of age or nationality,
    including those who have died, can register once. Each
    registrant is uniquely identified by an 11 decimal 
    digitCPF registration number.

    So basically this part verify if "CPF" is valid.

*/
function validatesCPF(x) {
let sum = 0;
let digValidator = "";
let indexInit = 0, inedxEnd = 1; //Walk through CPF positions.
    
    //1º Calculation.  
    for(let i = 10; i >= 2 ;i--){ 
        sum += i * parseInt(x.substring(indexInit,inedxEnd));
        indexInit++;
        inedxEnd++;
    }   

    /* 
    Assigns the first "validator type" to digValidator.  
    */
    if(sum%11 < 2){
        digValidator = "0";
    }else{
        digValidator = String(11-(sum%11));
    }

    /* 
    Resetting the variables for the next calculation. 
    */
    indexInit = 0;
    inedxEnd = 1;
    sum = 0;

    //2º Calculation.
    for(let i = 11; i >= 2 ;i--){
        sum += i * parseInt(x.substring(indexInit,inedxEnd));
        indexInit++;
        inedxEnd++;
    }   

    /* 
    Increments the second "validator type" to digValidator.  
    */
    if(sum%11 < 2){
        digValidator += "0";
    }else{
        digValidator += String(11-(sum%11));
    }

    /* 
    The "validator digits" discovered are verified,
    are the same as the inserted cpf and returns true.
     */
    if(digValidator === x.substring(9,11)) return true;
}

/* function checkForm(){

} */
