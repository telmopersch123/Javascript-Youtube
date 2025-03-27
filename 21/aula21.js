
// reduce opera a interação com cada elemento de um array, operando calculos e entre outros fatores
const p_array = document.querySelector('#array');
const btnPesquisar = document.querySelector('#btnPesquisar')
const resultado = document.querySelector('#resultado')

const elementos_array = [1, 2, 3, 4, 5]
let ant=[]
let atu = []
let dobro=[]
p_array.innerHTML = "["+elementos_array+"]"


btnPesquisar.addEventListener('click', (evt) => { 
  dobro.push(elementos_array[0]*2)
  resultado.innerHTML = elementos_array.reduce((anterior, atual, pos) => {
    ant.push(anterior)
    atu.push(atual)
    dobro.push(atual*2)
    return atual+anterior
  })

  resultado.innerHTML += "<br /> anterior: " + ant + "<br /> atual: " + atu + "<br/>" + dobro
})
