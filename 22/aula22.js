// iterator percorre e resume cada item, analisa cada um, de um array, map,strings,Sets e etc

const valores = [10, 8, 7, 4, 3, 2]
const texto = 'zombie'


const it_texto= texto[Symbol.iterator]()


console.log(texto)
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())
console.log(it_texto.next())


// const it_valores= valores[Symbol.iterator]()
// console.log(valores)
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
// console.log(it_valores.next())
