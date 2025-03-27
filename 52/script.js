const timer = document.querySelector("#hours");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const parcial = document.querySelector("#parcial");
const ParciaisPai = document.querySelector(".ParciaisPai");
const parciais = document.querySelector(".parciais");

let interval = null;
let verification = null;
let timeStemp = null;
let acumuledLatedTime = 0;
let ClickContinuos = 0;
let pausado = false;

const contador = () => {
  const timeAtual = Date.now();
  let seg = (timeAtual - timeStemp) / 1000 + acumuledLatedTime;
  timer.innerHTML = converter(seg);
};

const converter = (seg) => {
  const hora = Math.floor(seg / 3600);
  let rest = seg % 3600;
  const minuto = Math.floor(rest / 60);
  const segundos = Math.floor(rest % 60);
  const tempoFormt =
    (hora < 10 ? "0" + hora : hora) +
    ":" +
    (minuto < 10 ? "0" + minuto : minuto) +
    ":" +
    (segundos < 10 ? "0" + segundos : segundos);
  return tempoFormt;
};

parcial.addEventListener('click', function () {
  if (verification > 0) {
 
  let parcial = timer.innerHTML;
  const novoParagrafo = document.createElement('p');
  novoParagrafo.innerHTML = parcial;
   novoParagrafo.classList.add('parcial');
    parciais.appendChild(novoParagrafo);
     }
});
startButton.addEventListener("click", () => {
  if (!interval && !pausado) {
    acumuledLatedTime = 0;
    timeStemp = Date.now();
    interval = setInterval(contador, 1000);
    verification = interval;
  }
  if (pausado) {
    alert("Crônometro Pausado! Por favor, resete ou continue a antiga crônometragem");
  }
});

pauseButton.addEventListener("click", () => {
  if (verification > 0) {
    ClickContinuos++;
    if (ClickContinuos % 2 !== 0) {
      pauseButton.textContent = "Continuar";
    } else {
      pauseButton.textContent = "Pausar";
    }
     pauseButton.classList.toggle("continuar")

    if (!pausado) {
      pausado = true;
      if (interval) {
        clearInterval(interval);
        interval = null;
        const timeAtual = Date.now();
        acumuledLatedTime += Math.floor((timeAtual - timeStemp) / 1000);
      }
    } else if (pausado) {
      if (!interval) {
        pausado = false;
        timeStemp = Date.now();
        interval = setInterval(contador, 1000);
      }
    }
  } else {
    alert("Não começou o crônometro");
  }
});

resetButton.addEventListener("click", () => {
  if (verification > 0) {
    pauseButton.textContent = "Pausar";
     pauseButton.classList.remove("continuar")
    ClickContinuos = 0;
    clearInterval(interval);
    clearInterval(verification);
    pausado = false;
    interval = null;
    verification = null;
    timeStemp = null;
    acumuledLatedTime = 0;
    timer.innerHTML = "00:00:00";
    parciais.innerHTML = '';
  } else {
    alert("Não começou o crônometro");
  }
});
