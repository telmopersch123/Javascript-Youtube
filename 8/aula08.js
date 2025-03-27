//Maps para poder percorrer arrays e listas mais complexos, com indices


const cursos = ['HTML', 'CSS', 'jAVASCRIPT', 'PHP', 'React']
  
let c=cursos.map((elemento, indice) => {
  return "<div>"+elemento+"</div>";
})

console.log(c)

let el = document.getElementsByTagName("div")

el=[...el]
el.map((e, i) => {

  console.log(e.innerHTML)
})

const elements = document.getElementsByTagName("div")

const valores1 = Array.prototype.map.call(elements,({innerHTML})=>innerHTML)
console.log(valores)

const converterInt = (e) => parseInt(e)

const dobrar=(e)=>e*2

const valores = ["1", "2", "3", "4", "5"].map(dobrar)

console.log(valores)
