class Pessoa{
  canal = "CFB Cursos"
  constructor(pnome, ptipo) {
    this.nome = pnome
    switch (ptipo) {
      case 1:
        this.tipo = 'esport'
        this.velmax = 300
        break
        case 2:
        this.tipo = 'utata'
        this.velmax = 100
         break
        case 3:
        this.tipo = 'passio'
        this.velmax = 160
         break
        default:
        this.tipo = 'militarao'
        this.velmax = 180
    }
  }

  getNome() {
    return this.nome
  }
   getTipo() {
    return this.tipo
  }
   getVelMax() {
    return this.velmax
  }
  getInfo() {
    return [this.nome, this.tipo, this.velmax]
  }
  setNome(nome) {
    this.nome = nome
  }
  info() {
    console.log("Nome: " + this.nome)
    console.log("Tipo: " + this.tipo)
    console.log("V.Max: " + this.velmax)
    console.log("Canal: " + this.canal)
    console.log("------------------")
  }
}
let c1 = new Pessoa("Rapidao", 1)
let p = new Pessoa("Super luxo", 2)
let c2 = new Pessoa("bombadao", 4)
let c4 = new Pessoa("carrego tudo", 3)


c1.setNome("Oi")
console.log(c1)
