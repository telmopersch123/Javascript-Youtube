function soma(...valores) {
  return valores.length;
}

console.log(soma(10,5))

const f1 = function (...valores) {
  let res = 0
  for (v of valores) {
    res+=v
  }
  return res
}

console.log(f1(5,3))

// - FUNÇÕES ANÔNIMAS

const f = new Function("v1", "v2", 'return v1+v2')

console.log(f(54, 3))

// - FUNÇÕES ANÔNIMAS ; arrow functions


const soma=(v1, v2)=>{
  return v1 + v2
}
console.log(soma(3, 5))
const nome = n => { return n }
console.log(nome("bruno5"))
const add = n => n + 13
console.log(add(10))




  const somar=val=> {
    let res = 0
    for (v of val) {
      res += v
    }
     return res
}
const soma=(...valores)=> {
  return somar(valores)
}

console.log(soma(10,5,15))


