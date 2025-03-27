//passar de uma div irma para outra suas divs filhas de acordo com a classe

const caixa1 = document.querySelector("#caixa1");
const caixa2 = document.querySelector("#caixa2");
const button = document.querySelector("#btn_copiar");
todosCursos = [...document.querySelectorAll(".cursos")];

todosCursos.map((el) => {
  el.addEventListener("click", (evt) => {
   const tagHTML = evt.target
   tagHTML.classList.toggle("selecionado")
  })
})




button.addEventListener('click', () => {
   console.clear()
  const selecionados = [...document.querySelectorAll(".selecionado")];



  selecionados.map((el) => {
    caixa2.appendChild(el)
  })

  Array.from(caixa2.children).map((el) => { 
     if (!el.classList.contains("selecionado")) {
       caixa2.removeChild(el)
       caixa1.appendChild(el)
    }
  })

})





