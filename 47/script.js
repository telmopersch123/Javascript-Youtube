const leftButton = document.querySelector('.arrow.left');
const rightButton = document.querySelector('.arrow.right');
const rectangle = document.querySelector('.rectangle');
const BTNstop = document.querySelector('.stop');

let animation = null
let porcentage = 40.2
const init = () => {
  rectangle.style.width = '20%';
}

// SET-INTERVAL------------------------------------
// const movetion = (dir) => {
//   rectangle.style.left= parseInt(rectangle.style.left) + (10*dir) + 'px';
// }
// BTNstop.addEventListener("click", () => {
//   rectangle.style.left = "0px"
//   clearInterval(animation)
// })
// rightButton.addEventListener("click", () => {
//   clearInterval(animation)
//   animation=setInterval(movetion,20,1)
// })
// leftButton.addEventListener("click", () => {
//   clearInterval(animation)
//   animation=setInterval(movetion,20,-1)
// })

// SET-TIMEOUT------------------------------------
const movetion = (dir) => {
  const currentLeft = parseInt(rectangle.style.left) || 0
  const newLeft = currentLeft + 10 * dir;
  const widthInPixels = (porcentage / 100) * window.innerWidth 
  const PositiveValue = widthInPixels
  const NegativeValue = -widthInPixels
  
  if (newLeft >= NegativeValue && newLeft <= PositiveValue) {
    rectangle.style.left = `${newLeft}px`
  }
  if (newLeft >= PositiveValue) {
    dir = -1;
  } else if (newLeft <= NegativeValue) {
    dir = 1; 
  }

  animation = setTimeout(movetion, 20, dir)

  console.log(newLeft)
  console.log(NegativeValue)
}
BTNstop.addEventListener("click", () => { 
  rectangle.style.left = "0px"
  clearTimeout(animation)
})
rightButton.addEventListener("click", () => {
  clearTimeout(animation)
  movetion(1)
})
leftButton.addEventListener("click", () => {
  clearTimeout(animation)
  movetion(-1)
})


window.addEventListener("load", init);


window.addEventListener("resize", () => {
  clearTimeout(animation)
  rectangle.style.left = "0px"
 })

