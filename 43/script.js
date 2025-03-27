class Player{
  constructor(nome) {
    this.nome = nome
    this.id=Symbol()
  }
}

let jogadores = [
  new Player("jogador1"),
  new Player("jogador2"),
  new Player("jogador3"),
  new Player("jogador4")
];

let s=[]


let s_jogadores = jogadores.filter((j) => {
  return j.nome === "jogador1"
})

s = s_jogadores.map((j) => {
  return j.id
})

console.log(s_jogadores);
console.log(s)
