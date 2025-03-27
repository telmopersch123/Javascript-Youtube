//adicionando o css class destaque  em cada elemento tag da div cursos


const c1 = document.getElementById("c1");

const msg = () => {
  alert("clicou")
}

c1.addEventListener("click", (evt) => {
  const element = evt.target
  element.classList.add("destaque")
})


const cursos = [...document.querySelectorAll(".cursos")]

cursos.map((el) => {
  el.addEventListener("click", (evt) => {
    el = evt.target
    el.classList.add("destaque")
  })
})



