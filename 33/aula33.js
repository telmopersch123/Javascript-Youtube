const promisses = document.querySelector('#pending');
const button = document.querySelector('.button');

// button.onclick = function () {
//   const promise = new Promise((resolve, reject) => {
//     const successful = false;
//     if (successful) {
//       resolve('A operação foi bem-sucedida!')
//     } else {
//       reject('Houve um erro.');
//     }
//   });

// promise.then((resultado) => {
//   promisses.textContent = resultado
// }).catch((failed) => {
//   promisses.textContent = failed
// })

// }
button.addEventListener('click', () => { 
const promise = new Promise((resolve, reject) => {
  promisses.textContent = 'Executando a operação'

  setTimeout(() => {
    const sucesso = Math.random() > 0.5;

    if (sucesso) {
      resolve('A operação foi bem-sucedida!')
    } else {
      reject('Houve um erro.');
    }
  }, 2000)
});


promise.then((resultado) => {
  promisses.textContent = resultado
}).catch((failed) => {
  promisses.textContent = failed
})
})
