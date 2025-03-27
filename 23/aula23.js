const input1 = document.querySelector("#value1")
const input2 = document.querySelector("#value2")
const inputResult = document.querySelector("#value3");
const adicao = document.querySelector("#adicao")
const subtracao = document.querySelector("#subtracao")
const multiplicacao = document.querySelector("#multiplicacao")
const divisao = document.querySelector("#divisao")

const converterValores = (v1, v2) => {
  const valor1 = Number.parseFloat(v1)
  const valor2 = Number.parseFloat(v2)
  return { valor1, valor2 }
}
adicao.addEventListener("click", () => {
  const { valor1, valor2 } = converterValores(input1.value, input2.value)
  const somar = valor1 + valor2
  inputResult.value = somar
})
subtracao.addEventListener("click", () => {
  const { valor1, valor2 } = converterValores(input1.value, input2.value)
  const somar = valor1 - valor2
   inputResult.value = somar
})
multiplicacao.addEventListener("click", () => {
  const { valor1, valor2 } = converterValores(input1.value, input2.value)
  const somar = valor1 * valor2
  inputResult.value = somar
})
divisao.addEventListener("click", () => {
  const { valor1, valor2 } = converterValores(input1.value, input2.value)
  const somar = valor1 / valor2
   inputResult.value = somar
})



