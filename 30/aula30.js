class Car{
  constructor(tipo, estagioTurbo) {
    this.Turbo = new Turbo(estagioTurbo)
    if (tipo == 1) {
      this.velMax = 120
      this.nome="Normal"
    } else  if (tipo == 2) {
      this.velMax = 160
      this.nome="Mercedes"
    }else  if (tipo == 3) {
      this.velMax = 200
      this.nome="Ferrari"
    }
    this.velMax+=this.Turbo.pot
  }
  info() {
    console.log(this.nome)
    console.log(this.velMax)
    console.log(this.Turbo)
    console.log("----------")
  }
}

class Turbo{
  constructor(e) { 
    if (e == 0) {
      this.pot=0
    } else if (e == 1) {
      this.pot=50
    } else if (e == 2) {
      this.pot=75
    }else if (e == 3) {
      this.pot=100
    }
  }
}

class CarroEspecial extends Car{
  constructor(estagioTurbo) {   
    super(4, estagioTurbo)
    this.velMax = 300+this.Turbo.pot
    this.nome='Carro especial'
  }
  info() {
    if (this.tipoInfo == 1) {
      super.info()
    } else {
      console.log(`Nome...: ${this.nome}`)
      console.log(`vel.Max...: ${this.velMax}`)
      console.log(`Turbo...: ${this.Turbo.pot}`)
       console.log(`-------------------------`)
    }
  }
}

const c1 = new Car(1, 0);
const c2 = new Car(1, 1);
const c3 = new CarroEspecial(3);
c1.info()
c2.info()
c3.info()
