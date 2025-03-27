// const caixaCursos = document.querySelector("#caixaCursos")
// const btn_c = [...document.querySelectorAll(".curso")]
// const c1_2 = document.querySelector("#c1_2")
// const cursos = ["HTML", "CSS", "Javascript", "PHP", "React", "MySQL", "ReactNative"]
// const btnCursoSelecionado = document.getElementById("btnCurso")
// const btnRemover = document.getElementById("btnRemover")
// const btnBefore = document.getElementById("btnBefore")
// const btnLast = document.getElementById("btnLast")
// const inputCurso = document.getElementById("nomeCurso")
// let indice=0

// const tirarSelecao = () => {
//   const cursosSelecionados = [...document.querySelectorAll(".selecionado")]
//   cursosSelecionados.forEach((el) => {
//     el.classList.remove("selecionado")
//   })
// }

// //criar novos elementos divs com filhos irmaos texto e radio
// const createNewCurso = (curso) => {
//   const novaDiv = document.createElement("div")
//   novaDiv.setAttribute("id", "c" + indice)
//   novaDiv.setAttribute("class", "curso c1")
//   novaDiv.innerHTML = curso

//   novaDiv.addEventListener("click", (evt) => {
//     tirarSelecao()
//     evt.target.classList.toggle("selecionado")
//   })


//   return novaDiv
// }
// //método para percorrer e adicionar os elementos do array na div caixaCursos como texto
// cursos.map((el, chave) => {
//   const newElement = createNewCurso(el);
//   caixaCursos.appendChild(newElement)
//   indice++;
// })

// //método para verificar se os radios estão selecionado
// const cursoSelecionado = () => {
//   const todosCursosSelecionado = [...document.querySelectorAll(".selecionado")]
//   return todosCursosSelecionado[0]
// }

// //método para verificar os cursos selecionados no radio
// btnCursoSelecionado.addEventListener("click", (evt) => {
//   try {
//     alert(cursoSelecionado().innerHTML)
//   } catch (e) {
//     alert("Nenhum curso selecionado")
//   }
// })

// //método para remover os elementos das divs
// btnRemover.addEventListener("click", (evt) => {
//   const cs=cursoSelecionado()
//   if(cs!=undefined) {
//     cs.remove()
//   }else{
//     alert("Nenhum curso selecionado")
//   }

// })

// //método para adicionar elementos antes de outro
// btnBefore.addEventListener("click", (evt) => {
//   try {
//     if (inputCurso.value !== '') {
//     const newElement = createNewCurso(inputCurso.value);
//       caixaCursos.insertBefore(newElement, cursoSelecionado())
//     } else {
//       alert("Digite o nome de algum curso" )
//        }
//   } catch (e) {
//     alert("Nenhum curso selecionado")
//   }
//  })

// //método para adicionar elementos apos outro
// btnLast.addEventListener("click", (evt) => {
//   try {
//      if (inputCurso.value !== '') {
//     const newElement = createNewCurso(inputCurso.value);
//     caixaCursos.insertBefore(newElement, cursoSelecionado().nextSibling)
//       } else {
//       alert("Digite o nome de algum curso" + cursoSelecionado().innerHTML)
//        }
//   } catch (e) {
//     alert("Nenhum curso selecionado")
//   }
  
//  })








const CursosArray = ["HTML", "CSS", "JAVASCRIPT", "PHP", "RUBY", "C#", "C++", "GOLANG"]
const caixaCursos = document.querySelector("#caixaCursos")
const btnCursoSelecionado = document.getElementById("btnCurso")
const btnRemover = document.getElementById("btnRemover")
const btnRestart = document.getElementById("btnRestart")
const inputCursos = document.getElementById("nomeCurso")

let cursoSelecionado
let cursoSelecionadoHTML


function CursosIniciais(){
  CursosArray.forEach((curso) => {
    const NewDivsLP = createNewCurso(curso)
    caixaCursos.appendChild(NewDivsLP)
    })
}

function AnalysingCurso() {
  const cursosSelecionados = [...document.querySelectorAll(".selecionado")]
  const HaveElementClass = cursosSelecionados.some((el) => el.classList.contains("selecionado"))
  
  return HaveElementClass
}

function verificarSelecion(cursoSelecionado, inputCursos) {
  const HaveElementCurso = AnalysingCurso()

if (cursoSelecionado === undefined || !HaveElementCurso) {
  alert("Curso não selecionado");
   return false;
  }

  if (inputCursos.value === "") {
  alert("Escreva um curso por favor");
   return false;
  }

  return true;
}

const removerStatus = () => {
  removerClassSelecionados()
  inputCursos.value= ''
}

const cursosSelection = () => {
const cursos = [...document.querySelectorAll(".curso")]
  cursos.forEach((el) => {
    el.addEventListener("click", () => {
      const paragrapho = el.querySelector(".cursoP");
       cursoSelecionadoHTML = el
       cursoSelecionado = paragrapho.textContent
      })
  })
}

const createNewCurso = (curso) => {
  const NewDivsLP = document.createElement("div")
  const paragrafo = document.createElement("p")

  NewDivsLP.setAttribute("class", "curso")
  paragrafo.setAttribute("class", "cursoP")

  paragrafo.innerHTML = curso
  NewDivsLP.appendChild(paragrafo)

  NewDivsLP.addEventListener("click", (evt) => { 
    removerClassSelecionados()
    evt.currentTarget.classList.toggle("selecionado")
    
  })
  cursosSelection()
  return NewDivsLP
}

const removerClassSelecionados = () => {
  const cursoSelecionado = [...document.querySelectorAll(".selecionado")]
  cursoSelecionado.forEach((el) => {
     el.classList.remove("selecionado")
  })
}

btnRestart.addEventListener("click", () => { 
  window.location.reload();
})

btnRemover.addEventListener("click", () => { 
  try {
      if (cursoSelecionado === undefined) {
       throw new Error("Curso não selecionado");  // Lança um erro explicitamente
    } 
      cursoSelecionado = undefined
      const cursoSelection = [...document.querySelectorAll(".selecionado")]
      cursoSelection.forEach((el) => {
      el.remove()
  })
  } catch (e) {
     alert("Selecione um curso")
  }
})

btnCursoSelecionado.addEventListener("click", () => { 
  const HaveElementCurso = AnalysingCurso()
  try {
     if (cursoSelecionado === undefined || !HaveElementCurso) {
       throw new Error("Curso não selecionado");  // Lança um erro explicitamente
    } 
    alert("Curso selecionado " + cursoSelecionado)
  } catch (e) { 
    alert("Selecione um curso")
  }
})

btnBefore.addEventListener("click", () => { 
  if (verificarSelecion(cursoSelecionadoHTML, inputCursos)) {
  const ValueInput = inputCursos.value;
  const newDiv = createNewCurso(ValueInput);
    caixaCursos.insertBefore(newDiv, cursoSelecionadoHTML)
    cursosSelection()
    removerStatus()
  }
})

btnLast.addEventListener("click", () => { 
  if (verificarSelecion(cursoSelecionadoHTML, inputCursos)) {
    const ValueInput = inputCursos.value;
    const newDiv = createNewCurso(ValueInput);
    caixaCursos.insertBefore(newDiv, cursoSelecionadoHTML.nextSibling)
    cursosSelection()
    removerStatus()
  }
});

btnAdicionar.addEventListener("click", () => { 

  if (inputCursos.value === "") {
  alert("Escreva um curso por favor");
    return;
  }

  const ValueInput = inputCursos.value;
  const newDiv = createNewCurso(ValueInput);
  caixaCursos.appendChild(newDiv);
  cursosSelection()
});

document.addEventListener('DOMContentLoaded', () => {
  CursosIniciais();
});

// document.addEventListener('click', (event) => {
//  const cursoSelecionado = [...document.querySelectorAll(".selecionado")]
//   cursoSelecionado.forEach((el) => {
//   if (event.target !== el && !el.contains(event.target)) {
//        removerClassSelecionados();
//       }
//    })
//   });
