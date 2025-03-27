const nome = Symbol("Nome")
const idade = Symbol("Nome")
const pontos = Symbol("Nome")


const Jogador={
  [nome]: 'João',
  idade: 22,
}

Jogador[pontos] = 100

for(let p in Jogador){
  console.log(p)
}


console.log(Jogador.nome)
