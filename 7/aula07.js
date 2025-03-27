//funções e modelos de usos

// function*: Declara uma função generator.
// yield: Pausa a execução da função e retorna um valor. A execução pode ser retomada mais tarde do ponto onde foi pausada.
// Cada vez que a função é chamada com o método next(), ela avança para o próximo yield.
function* cores() {
  yield 'Vermelho';
  yield 'Amarelo';
  yield 'Azul';
  yield 'Laranja';
}

const itc0 = cores();
console.log(itc0.next().value);


function* perguntas() {
  const nome = yield 'Qual seu nome?'
  const idade = yield 'Quantos anos você tem?'
  return "Seu nome é " + nome + " Aventino de " + idade + " anus"
}

const itc1 = perguntas();

console.log(itc1.next().value);
console.log(itc1.next('Joao').value);
console.log(itc1.next(20).value);


function* contator() {
  let i = 0
  while (true) {
    yield i++;
    if (i > 5) {
      break
    }
  }
}

let itc2 = contator();
for (let c of itc2) {
  console.log(c);
}

