
//Metodo find, serve para pesquisar em arrays

const p_array = document.querySelector('#array');
const txt_pesquisar = document.querySelector('#txt_pesquisar');
const btnPesquisar = document.querySelector('#btnPesquisar')
const resultado = document.querySelector('#resultado')

const elementos_array = ["html", "css", "js", "PHP"]



p_array.innerHTML = "["+elementos_array+"]"



const pes = (e, i) => {
  if (e.toUpperCase() === txt_pesquisar.value.toUpperCase()) {
    resultado.innerHTML = "Valor pesquisado " + e + " na posição " + i
    return true
  }
}
btnPesquisar.addEventListener('click', (evt) => { 
  const ret = elementos_array.find(pes)
  console.log(ret)
})
