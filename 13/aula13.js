//stop propagation, para interromper ações


const caixa1 = document.querySelector('#caixa1');

const cursos = [...document.querySelectorAll(".cursos")];

caixa1.addEventListener('click', (evt) => {
  console.log("clicou")
});

cursos.map((el) => {
  el.addEventListener('click', (evt) => { 
    evt.stopPropagation();
  })
})

