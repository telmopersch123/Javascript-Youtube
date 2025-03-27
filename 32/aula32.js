const divPai = document.querySelector('.divCalcDesligada');
const LIGAR = document.querySelector('.LIGAR');
const numbers = [...document.querySelectorAll('#DivNumbersOper > .numbers')]
const display = document.querySelector('#display');
const clean = document.querySelector('.clean');
const result = document.querySelector('.result');
const operator = [...document.querySelectorAll('.opers')];
let analysingColchetes; 
let calculandoReal = []
let colchetesTrue = false;


LIGAR.addEventListener('click', () => {
  if (divPai.classList.contains('divCalcDesligada')){
    divPai.classList.remove('divCalcDesligada')
    divPai.setAttribute('id', 'divCalc')
    LIGAR.textContent = 'ON'
    divPai.style.pointerEvents = "auto";
    
  } else {
    calculandoReal = '0'
    display.value = '0'
    divPai.classList.add('divCalcDesligada')
    divPai.removeAttribute('id');
    LIGAR.textContent = 'OFF'
    divPai.querySelectorAll('*').forEach((element) => {
      if (element !== paragraphs[0]) {
        element.style.pointerEvents = "none";
      }
    })
    
  }
})
//focus
const focusInput = (display) => {
   display.selectionStart = display.selectionEnd = display.value.length;
   display.scrollLeft = display.scrollWidth;
}
//formating
function formating(input) {
  // Regex para identificar os operadores (+, -, ÷, %, x)
  const operatorRegex = /[+\-÷%x()]/g;
  
  // Divide a entrada em números e operadores
  const parts = input.split(operatorRegex);
  const operators = input.match(operatorRegex) || [];

   // Formata cada parte numérica
  const formattedParts = parts.map((part) => {
  //método para identificar a virgula e separar de numero inteiro para decimal
  const [integerPart, decimalPart] = part.split(',');

  // Formata apenas a parte inteira
  const formattedInteger = integerPart
    .replace(/\./g, '') // Remove pontos antigos
    .split('')          // Divide em caracteres
    .reverse()          // Reverte para processar de trás para frente
    .reduce((acc, digit, index) => {
      return digit + (index > 0 && index % 3 === 0 ? '.' : '') + acc;
    }, '');

    // Retorna número formatado com a parte decimal intacta
    return decimalPart !== undefined
      ? `${formattedInteger},${decimalPart}` // Parte decimal presente
      : formattedInteger;                    // Apenas parte inteira
  });

  // Junta as partes formatadas e os operadores originais, repetindo os operadores
  let formattedInput = formattedParts[0];  // Começa com a primeira parte
  for (let i = 0; i < operators.length; i++) {
    formattedInput += operators[i] + formattedParts[i + 1];  // Adiciona cada operador seguido da próxima parte
  }

  return formattedInput;
}
//REGRAS FUNCIONAIS
function inputInitialRules() {
   if (display.value === '0') {
     display.value = '';
     calculandoReal = ''
    }
}
clean.addEventListener('click', () => {
  display.value = '0'
  calculandoReal = '0'
  colchetesTrue = false;
})
//MÉTODOS DE CALCULAR E FUNCIONAMENTO RAIZ
numbers.map((number) => { 
  number.addEventListener('click', (evt) => { 
    if (display.value === "Valores Indefinidos") {
      display.value = '0'
      calculandoReal = '0'
    }
    const value = evt.target.textContent;
    const colchetesClosedVerification = display.value.slice(-1);
    inputInitialRules()
    if (colchetesClosedVerification === ')') {
       calculandoReal += '*'
    } 
     display.value += value;
     calculandoReal += value;
     display.value = formating(display.value);
     console.log(calculandoReal)
     focusInput(display)
  })
})
operator.map((ope) => { 
  ope.addEventListener('click', (evt) => {
    const operador = evt.target.textContent;
    const lastNumber = calculandoReal.split(/[\+\-\*\/]/).pop(); 
    analysingColchetes = display.value.slice(-1); 
    //Regras de utilização
        //Impossibilidades de cálculos
    if (display.value === 'Valores Indefinidos') {
      return;
    }
    if (operador === ',' && lastNumber.includes('.')) {
      return
    }
    if (/[+\-÷%x,(]/.test(analysingColchetes) && operador !== '()') {
      return; 
    }
    if (analysingColchetes === ')' && operador === ',') {
        return
    }
      //Métodos de colchetes
    if (operador === '()') {
      if (!colchetesTrue && analysingColchetes !== ')') {
          display.value += '(';
          colchetesTrue = true;
      } else {
         if (analysingColchetes !== ')' && !/[+\-÷%x(]/.test(analysingColchetes)) {
            display.value += ')';
            colchetesTrue = false;
          }
      }
    } else {
        display.value += operador;
    }
        //Adição e trocas de operadores
      if (operador === ',') {
        calculandoReal += '.';  
      } else if (operador === 'x') {
        calculandoReal += '*';
      } else if (operador === '÷') {
        calculandoReal += '/';
      } else if (operador === '()' && colchetesTrue) {
        if(/\d$/.test(analysingColchetes)) {
           calculandoReal += '*';
           calculandoReal += '(';
        } else if(!colchetesTrue){
           calculandoReal += '(';
        }
      } else if (operador === '()' && !colchetesTrue) {
        if (analysingColchetes === ')' && operador === '()') {
          return
        }
        calculandoReal += ')';
      } else {
        if (operador === ',' && lastNumber.includes('.')) {
          return;  
        }
        calculandoReal += operador;
      }
    display.value = formating(display.value);
    focusInput(display);
    console.log(calculandoReal);
  });
});
result.addEventListener('click', () => {
  console.log("calculandoReal:" + calculandoReal)

  if (display.value !== "0") {
    try {
      const Resultado = eval(calculandoReal)
      if (!isFinite(Resultado)) {
        display.value = "Valores Indefinidos";
        calculandoReal = "";
        return;
      }
      console.log("Resultado:" + Resultado)
      display.value = Resultado
      calculandoReal = Resultado.toString();
    } catch (e) {
      console.error("Erro ao calcular a expressão:", error);
      display.value = "Erro";
      calculandoReal = "";
    }
  } else {
    display.value = "0"
  }
})
