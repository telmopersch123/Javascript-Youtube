const inputCar = document.querySelector('#input1')
const inputYear = document.querySelector('#input2')
const button = document.querySelector('#bottunAdd')
const buttonR = document.querySelector('#bottunRemove')
const espaceDiv = document.querySelector('#espace')
let arrayCarros = [];

class Car {

  constructor(Car, Year) {
    this.Car = Car
    this.Year = Year
  }

  getCreateElements = () => {
    espaceDiv.innerHTML = ''
    arrayCarros.map((el) => {
      let div = document.createElement('div')
      div.classList.add('class', 'create');
      let pCar = document.createElement('p')
      let pYear = document.createElement('p')
      pCar.textContent = `Carro: ${el.Car}`
      pYear.textContent = `Ano: ${el.Year}`
      div.appendChild(pCar)
      div.appendChild(pYear)
      espaceDiv.appendChild(div)
   })
  }



  // info() {
  //  // console.log(`Carro: ${this.Car}, Ano: ${this.Year}`)
  //   console.log(arrayCarros)
  // }
}

button.addEventListener('click', () => {
  if (inputCar.value === '' || inputYear.value === '' ) {
    alert('Preencha todos os campos!')
    return
  }
  const carro1 = new Car(inputCar.value, Number.parseInt(inputYear.value))
  arrayCarros.push(carro1)
  carro1.getCreateElements()
})
buttonR.addEventListener('click', () => {
  const carro1 = new Car(inputCar.value, Number.parseInt(inputYear.value))
  if (arrayCarros.length === 0) {
    alert('Nenhum carro cadastrado!')
    return
  }
  arrayCarros.pop()
  carro1.getCreateElements()
})
