
//Metodo every, serve para verificar se um array possui um valor que não esteja em conformidade com o desejado

const p_array = document.querySelector('#array');
const txt_pesquisar = document.querySelector('#txt_pesquisar');
const btnPesquisar = document.querySelector('#btnPesquisar')
const resultado = document.querySelector('#resultado')

const elementos_array = [21, 22, 43, 24, 65, 286, 18, 8, 39]

p_array.innerHTML = "["+elementos_array+"]"


btnPesquisar.addEventListener('click', (evt) => { 

  const ret = elementos_array.every((e, i) => {
    if (e < 18) {
        resultado.innerHTML = "Array nao conforme na posição " + i 
    }
    return e>=18
  })
  if (ret) {
    resultado.innerHTML = "Ok"
  }
  
})
