const palco = document.querySelector("#palco");
const num_objetos = document.querySelector("#num_objetos")
const txt_qtde = document.querySelector("#txt_qtde")
const btn_add = document.querySelector("#btn_add")
const btn_remover = document.querySelector("#btn_remover")



let larguraPalco = palco.offsetWidth
let alturaPalco = palco.offsetHeight
var Balls = []
var numBalls = 0


class Bolas{
  constructor(arrayBolls, stage) {
    this.dimension = Math.floor(Math.random() * 15) + 10
    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
    this.px = Math.floor(Math.random() * (larguraPalco - this.dimension));
    this.py = Math.floor(Math.random() * (alturaPalco - this.dimension));
    
    this.velocityX = Math.floor(Math.random() * 2) + 0.5
    this.velocityY = Math.floor(Math.random() * 2) + 0.5
    this.directionX = Math.floor((Math.random() * 10) > 5 ? 1 : -1)
    this.directionY = Math.floor((Math.random() * 10) > 5 ? 1 : -1)
    this.stage = stage
    this.arrayBolls = arrayBolls
    this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000)
    this.DrawBall();
    this.controle = setInterval(() => this.controlMove(),10)
    this.Boll = document.getElementById(this.id);
    numBalls++
    num_objetos.innerHTML = numBalls
  }
  myPosition = () => {
    return this.arrayBolls.indexOf(this)
  }
  removeBoll = () => {
    clearInterval(this.controle)
    Balls = Balls.filter((b) => {
      if (b.id != this.id) {
        return b
      }
      this.Boll.remove()
      numBalls--
      num_objetos.innerHTML = numBalls
    })
  }
  DrawBall = () => {
    const div = document.createElement("div")
    div.setAttribute("id", this.id)
    div.setAttribute("class", this.id)
    div.setAttribute('style', `
      position:absolute;
      left:${this.px}px;
      top:${this.py}px;
      width:${this.dimension}px;
      height:${this.dimension}px;
      background-color:rgb(${this.r},${this.g},${this.b})
      `)
    this.stage.appendChild(div)
  }

  control_borders = () => {
    const border = 20;
    if (this.px + this.dimension >= larguraPalco - border) {
      this.directionX = -1
      this.px = larguraPalco - this.dimension - border
    } else if (this.px <= 0) {
      this.directionX = 1
      this.px = 0;
    }
    if (this.py + this.dimension >= alturaPalco - border) {
      this.directionY = -1
      this.py = alturaPalco - this.dimension - border
    } else if (this.py <= 0) {
      this.directionY = 1
      this.py=0
    }
  }
  controlMove = () => { 
    this.control_borders()
    this.px += this.directionX * this.velocityX
    this.py += this.directionY * this.velocityY
    this.Boll.setAttribute('style', `
      position:absolute;
      left:${this.px}px;
      top:${this.py}px;
      width:${this.dimension}px;
      height:${this.dimension}px;
      background-color:rgb(${this.r},${this.g},${this.b})
      `)
    if ((this.px > larguraPalco) || (this.py > alturaPalco)) {
      this.removeBoll();
    }
  }
}


window.addEventListener("resize", () => { 
  larguraPalco = palco.offsetWidth
  alturaPalco = palco.offsetHeight
})
btn_add.addEventListener("click", () => { 
  const Input = txt_qtde.value
  for (let i = 0; i < Input; i++){
    Balls.push(new Bolas(Balls, palco))
  }
})
btn_remover.addEventListener("click", () => { 
  Balls.map((b) => {
    b.removeBoll();
  })
})
