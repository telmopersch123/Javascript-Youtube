//inputs normais
const inputYear = document.querySelector('#input1')
const inputDoors = document.querySelector('#input2')
const inputShield = document.querySelector('#input3')
const inputAmmunition = document.querySelector('#input4')

//buttons
const button = document.querySelector('#bottunAdd')
//divs
const divsRadio = document.querySelectorAll('.divsradio')
const espaceDiv = document.querySelector('#espace')
//radio
const radioMilitar = document.querySelector('#radioMilitar')
//var
let ArraysElements = []
let currentId = 1


class Car {
  constructor( year, doors, shield, ammunition) {
    this.id = currentId++
    this.year = year
    this.doors = doors
    this.shield = shield
    this.ammunition = ammunition
  }

  getCreateHTML = (el) => {
    //criação de elementos HTML e classes
    const div = document.createElement('div')
    const divirmao1 = document.createElement('div')
    const divirmao2 = document.createElement('div')

    divirmao1.classList.add('class', 'divirmao1');
    divirmao2.classList.add('class', 'divirmao2');

    div.classList.add('class', 'create');
    div.setAttribute('data-id', el.id)

    const pYear = document.createElement('p')
    pYear.textContent = `Ano: ${el.year}`

    const pDoors = document.createElement('p')
    pDoors.textContent = `Portas: ${el.doors}`

    const pShield = document.createElement('p')
    pShield.textContent = `Escudo: ${el.shield}`

    const pAmmunition = document.createElement('p')
    if (el.ammunition === undefined || el.ammunition === null || Number.isNaN(el.ammunition)) {
      pAmmunition.classList.add('indisponivel')
      pAmmunition.textContent = `Munição: Indísponivel`
    } else {
      pAmmunition.classList.remove('indisponivel')
      pAmmunition.textContent = `Munição: ${el.ammunition}`
    }

    
    const buttonRemove = document.createElement('button')
    buttonRemove.textContent = 'Remover'
    buttonRemove.classList.add('remove')
    
    buttonRemove.addEventListener('click', () => this.getRemoveElement(el.id))
 
    //adição dos elementos nas constantes e no site
    divirmao1.appendChild(pYear)
    divirmao1.appendChild(pDoors)
    divirmao1.appendChild(pShield)
    divirmao1.appendChild(pAmmunition)
    divirmao2.appendChild(buttonRemove)
    div.appendChild(divirmao1)
    div.appendChild(divirmao2)
    espaceDiv.appendChild(div)

  }
    getCreateElementsArray = () => {
    espaceDiv.innerHTML = ''
    ArraysElements.map((el) => this.getCreateHTML(el))
  }

  getRemoveElement = (id) => {
    // Remove o elemento do array
    ArraysElements = ArraysElements.filter((el) => el.id !== id);
    // Remove a div correspondente do DOM
    const divToRemove = document.querySelector(`[data-id="${id}"]`)
      if (divToRemove) {
        espaceDiv.removeChild(divToRemove)
      }
  }
}



divsRadio.forEach((element) => {
  element.addEventListener('click', () => {
  if (radioMilitar.checked) {
    inputAmmunition.disabled = false;
    inputAmmunition.value = ''
  } else {
   inputAmmunition.disabled = true;
  }
})
});



button.addEventListener('click', () => {
  const generalInputs = [...document.querySelectorAll('input[type="number"]:not([disabled])')];
  let isValid = true;
  const CarroNovo = new Car(Number.parseFloat(inputYear.value), Number.parseFloat(inputDoors.value), Number.parseFloat(inputShield.value), Number.parseFloat(inputAmmunition.value))



  generalInputs.forEach((input) => {
    if (input.value === '' || isNaN(input.value)) {
    isValid = false;
    console.log(`Valor inválido`);
  }
  })

 if (!isValid) {
  alert('Preencha corretamente todos os campos de número!');
 } else {  
   ArraysElements.push(CarroNovo)
   CarroNovo.getCreateElementsArray()
  }
})
