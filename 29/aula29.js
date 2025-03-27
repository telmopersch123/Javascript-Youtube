const pessoa = {
  nome: 'John Doe',
  idade: 30,
  cidade: 'New York',
  endereco: {
    rua: '123 Main St',
    cidade: 'New York',
    estado: 'NY'
  }
}

const jsonValues = JSON.stringify(pessoa);
const objectValues = JSON.parse(jsonValues);

console.log(pessoa)
console.log(objectValues) // string
console.log(jsonValues)
