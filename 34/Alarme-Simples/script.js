let idCounter = 1;
let AlarmsGuard = []
let divGlobalAlarm;
let DivAlarms;
let buttonX;
let buttonXGeral;
let Validate;
let audioAlarme;
let userMusic = null;
let HaveHoursAlarms = false;
let notificacaoAtiva = null;
let musicPlaying = false;

const buttonAlarm = document.getElementById('buttonAlarm');

// Classe das Horas
class Hours {
  constructor(hour, minute, second) {
    this.id = idCounter;
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    this.hoursFormatted = '';
    this.minutesFormatted = '';
    this.secondsFormatted = '';
  }

  format() {
    this.hoursFormatted = this.hour < 10 ? '0' + this.hour : this.hour;
    this.minutesFormatted = this.minute < 10 ? '0' + this.minute : this.minute;
    this.secondsFormatted = this.second < 10 ? '0' + this.second : this.second;
    return `${this.hoursFormatted}:${this.minutesFormatted}:${this.secondsFormatted}`
  }

}
let currentTime = new Hours(-1, -1, -1);

//identificar se é um dispositivo móvel ou tablet
function isMobileOrTablet() {
  return /Mobi|Tablet|iPad|iPhone/i.test(navigator.userAgent);
}

// serviço de notificação - Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('notificationService.js').then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    }).catch(error => {
      console.log('Erro ao registrar o Service Worker:', error);
    });
  });
}


// funcinabilidade para executar as validações em segundo plano - Web Worker 
const clockWorker = new Worker('clockWorker.js');
clockWorker.postMessage({ interval: 1000 });

clockWorker.onmessage = function (e) {
  const { hours, minutes, seconds } = e.data;

  const clockDiv = document.querySelector('#clockDiv');
  clockDiv.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  for (let i = 0; i < AlarmsGuard.length; i++) {
    const alarms = AlarmsGuard[i];
    if (
      parseInt(alarms.minute) === minutes &&
      parseInt(alarms.hour) === hours &&
      parseInt(alarms.second) === seconds
    ) {
      Music(); 
    }
  }
};
clockWorker.onerror = function (error) {
  console.error('Erro no Web Worker:', error);
};


//funções de execuções diversas
function configurarAlarme(userMusic) {
  // Configura o alarme apenas se a permissão foi concedida
  if (notificacaoAtiva) {
    return
  }
    if (Notification.permission === 'granted') {
        // Verifica se já existe uma notificação ativa
        if (!notificacaoAtiva) {
            navigator.serviceWorker.ready.then(function (registration) {
                // Exibe a notificação inicial com o alarme
                registration.showNotification('Alarme', {
                    body: 'Seu alarme está tocando!',
                    icon: 'icon.png',
                    requireInteraction: true, 
                    actions: [
                        {
                            action: 'close', 
                            title: 'Remover Alarme',
                            icon: 'close-icon.png' 
                        }
                    ]
                }).then((notification) => {
                   
                    notificacaoAtiva = notification;

                  
                    notification.onclose = function () {
                        notificacaoAtiva = null; 
                        StopMusic(); 
                    };

                    // Ouve o clique na notificação
                    notification.onclick = function (event) {
                        event.preventDefault(); 
                        window.focus(); 
                    };

                    
                    Music(userMusic);
                });

               
                registration.active.postMessage('playAudio');
            });
        } else {
            console.log('A notificação já está ativa. Aguarde até que seja fechada.');
        }
    } else {
        console.log('Permissão de notificações não concedida. Alarme não configurado.');
    }
}
function setupInputEvent() {
  const mp3Input = document.querySelector('#mp3Input');
  mp3Input.addEventListener('change', (evt) => {

    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        userMusic = e.target.result;
        StopMusic();
      };
      reader.readAsDataURL(file);
    }
    const divaddMusic = document.querySelector('#addMusic');
    divaddMusic.innerHTML = '';

   
    const p = document.createElement('p');
    p.textContent = file.name.replace('.mp3', '')
    p.setAttribute('class', 'pMusic')
 
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('bi', 'bi-trash3');

   
    const divMusic = document.createElement('div');
    divMusic.classList.add('divMusic');
   
    divMusic.appendChild(p);
    divMusic.appendChild(trashIcon);
    divaddMusic.appendChild(divMusic);

    trashIcon.addEventListener('click', () => {
      
      userMusic = null;
      StopMusic()
      if (HaveHoursAlarms) {
        Music();
      }
      
      divaddMusic.innerHTML = '';
      //recriando label
      const label = document.createElement('label');
      label.setAttribute('for', 'mp3Input')
      label.textContent = 'Clique para adicionar seu próprio alarme (mp3)';
      //recriando input
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('id', 'mp3Input');
      input.setAttribute('accept', '.mp3');
      //adicionando input
      divaddMusic.appendChild(label);
      divaddMusic.appendChild(input);
      setupInputEvent()
    })
  })
}
function Music() {

  if (!userMusic) {
    if (!audioAlarme) {

      audioAlarme = new Audio();
      audioAlarme.src = './musicaAlarme.mp3';
      audioAlarme.loop = true;
      audioAlarme.play();
      musicPlaying = true;
     } else {
       musicPlaying = false
    }
  } else {
    if (!audioAlarme) {

      audioAlarme = new Audio();
      audioAlarme.src = userMusic;
      audioAlarme.loop = true;
      audioAlarme.play();
      musicPlaying = true;
     } else {
       musicPlaying = false
    }
  }
}
function clickInputEvent() {
  setupInputEvent();
}
function StopMusic() {
  if (audioAlarme) {
    audioAlarme.pause();
    audioAlarme.currentTime = 0;
    audioAlarme = null;
  }
}
function NewAlerts(mensagem) {

    if (!document.querySelector('.alerta')) {
      const alerta = document.createElement('div');
      alerta.classList.add('alerta');

      const texto = document.createElement('span');
      texto.textContent = mensagem;
      alerta.appendChild(texto);

      const fecharBtn = document.createElement('button');
      fecharBtn.textContent = 'X';
      fecharBtn.classList.add('fechar');
      fecharBtn.addEventListener('click', function () {
        alerta.remove();
      });
  
      alerta.appendChild(fecharBtn);
      document.body.appendChild(alerta);

      setTimeout(() => {
        alerta.classList.add('sumirParacima');
        alerta.addEventListener('animationend', () => {
          alerta.remove();
        })
      },5000)
    }
}
function getRemoveElement(id, buttonType) {
    AlarmsGuard = AlarmsGuard.filter((el) => el.id !== id);
    const divToRemove = document.querySelector(`[data-id="${id}"]`);
    
  if (divToRemove) {
    divToRemove.removeAttribute('id')
    divToRemove.classList.add('desaparecer');
    divToRemove.addEventListener('animationend', () => {
      DivAlarms.removeChild(divToRemove);
      if (buttonType === 'alarme') {
                StopMusic();
          }
    })
  }
  
  for (let i = 0; i < AlarmsGuard.length; i++) {
    if (AlarmsGuard[i].id > id) {
      
      AlarmsGuard[i].id--;
   
      const divToUpdate = document.querySelector(`[data-id="${AlarmsGuard[i].id + 1}"]`) 
      if (divToUpdate) {
        divToUpdate.setAttribute('data-id', AlarmsGuard[i].id);
      
        const title = divToUpdate.querySelector('.titleAlarm');
        if (title) {
          title.textContent = 'Alarme ' + AlarmsGuard[i].id
        }
      }
    }
  }
  if (AlarmsGuard.length > 0) {
    const ultimoValueHour = AlarmsGuard[AlarmsGuard.length - 1]
    idCounter = ultimoValueHour.id + 1
  }
  if (AlarmsGuard.length === 0) {
    idCounter = 1;
    } 
}



//atualização do relógio a cada 1 segundo
function UpdateClock() {
  const clockDiv = document.querySelector('#clockDiv')
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  let seconds = now.getSeconds();

  currentTime = new Hours(hours, minutes, seconds);
  currentTime.format();

  clockDiv.textContent = currentTime.format();
  let anyActive = false;
  for (let i = 0; i < AlarmsGuard.length; i++) {
    const alarms = AlarmsGuard[i];
    const adjusteIndice = i + 1;
    if (
      parseInt(alarms.minute) === parseInt(currentTime.minutesFormatted) &&
      parseInt(alarms.hour) === parseInt(currentTime.hoursFormatted) &&
      parseInt(alarms.second) === parseInt(currentTime.secondsFormatted)
    ) {
       

      const matchedId = alarms.id;
      if (adjusteIndice === matchedId) {
      
           
        const specificDivAlarm = DivAlarms.querySelectorAll('.container')[i];
        const specificButtonX = specificDivAlarm.querySelector('.buttonX');
        const buttonXGeralEspecific = specificDivAlarm.querySelector('.buttonXGeral');

        if (specificButtonX) {
          HaveHoursAlarms = true;
          musicPlaying = true;
          specificDivAlarm.setAttribute('id', 'activeAlarms');
          specificButtonX.style.display = 'block';
          buttonXGeralEspecific.style.display = 'none';
           if (musicPlaying && !notificacaoAtiva) {
              if ('Notification' in window && navigator.serviceWorker) {
                configurarAlarme(userMusic);
              } else {
              NewAlerts('Notificações ou Service Workers não são suportados neste navegador.');
             }
         }
        }
      } else {
        HaveHoursAlarms = false;
 
      }
    } else {
      HaveHoursAlarms = false;
    }
  }
  const activeAlarms = document.querySelectorAll('#activeAlarms');
  if (activeAlarms.length > 0) {
    anyActive = true;
  } else {
    anyActive = false;
  }
  if (anyActive) {
    Music()
  } 
}
setInterval(UpdateClock, 1000);




//Botao de Alarma e criar divs e tratar de outros assuntos, como por exemplo, reconher o audio inicialmente no site
// Adicionando o evento de click e touchstart no botão
buttonAlarm.addEventListener("click", handleAlarmAction);
buttonAlarm.addEventListener("touchstart", handleAlarmAction); // Evento de toque

// Função que lida com a ação do alarme
function handleAlarmAction(event) {
 StopMusic();
 if ('serviceWorker' in navigator && 'Notification' in window) {
  // O navegador suporta Service Worker e Notificações
  Notification.requestPermission()
    .then(function (result) {
      console.clear();
      console.log('Permissão solicitada:', result);
      if (result === 'granted') {
        console.log('Permissão de notificações concedida.');
      } else if (result === 'denied') {
        console.log('Permissão de notificações negada pelo usuário.');
        NewAlerts("Por favor, caso queira ser alertado em outra guia, permita notificações desse site.");
      } else {
        console.log('Permissão de notificações ignorada.');
        NewAlerts("Por favor, caso queira ser alertado em outra guia, permita notificações desse site.");
      }
    })
    .catch(function (error) {
      console.log('Erro ao solicitar permissão de notificações:', error);
      NewAlerts("Por favor, caso queira ser alertado em outra guia, permita notificações desse site.");
    });

  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
        audioAlarme = new Audio();
        audioAlarme.src = './musicaAlarme.mp3';
        audioAlarme.play().then(() => {
            StopMusic();
            console.log('Áudio permitido pelo usuário.');
        }).catch((error) => {
            console.error('Erro ao reproduzir áudio:', error);
        });
    } else {
        console.log('Permissão de notificações não concedida.');
    }
  });
} 


  //validando entrada 
  if (currentTime.hour !== -1 && currentTime.minute !== -1 && currentTime.second !== -1) {
    const inputAlarms = [...document.querySelectorAll("#alarm input")];

    if (parseInt(currentTime.hour) > parseInt(inputAlarms[0].value)) {
      NewAlerts('Horário já Indisponível');
      return;
    } else if (parseInt(inputAlarms[0].value) <= parseInt(currentTime.hour)) {
      if (parseInt(currentTime.minute) > parseInt(inputAlarms[1].value)) {
        NewAlerts('Horário já Indisponível');
        return;
      } else if (parseInt(currentTime.second) >= parseInt(inputAlarms[2].value) && parseInt(inputAlarms[1].value) <= parseInt(currentTime.minute)) {
        NewAlerts('Horário já Indisponível');
        return;
      }
    }

    for (let alarms of AlarmsGuard) {
      if (alarms.hour === inputAlarms[0].value && alarms.minute === inputAlarms[1].value && alarms.second === inputAlarms[2].value) {
        NewAlerts('Horario já existente');
        return;
      }    
    }

    //validando entrada 
    if (inputAlarms.some((item) => item.value.trim()==='')) {
      NewAlerts('Por favor, Selecione um Horario Válido');
      return;
    }
  
    //criando divs
    DivAlarms = document.getElementById("DivAlarms");
    const divAlarms = document.createElement('div');
    divAlarms.setAttribute('class', 'divAlarms');
    const title = document.createElement('h3');
    title.setAttribute('class', 'titleAlarm');
    buttonX = document.createElement('button');
    buttonX.setAttribute('class', 'buttonX');
    buttonX.textContent = 'Encerrar';

    const HoursGuard = document.createElement('span');
    const MinutesGuard = document.createElement('span');
    const SecondsGuard = document.createElement('span');
  
    buttonXGeral = document.createElement('button');
    buttonXGeral.setAttribute('class', 'buttonXGeral');
    buttonXGeral.textContent = 'X';

    //adicionando valores
    title.textContent = 'Alarme ' + currentTime.id;
    inputAlarms.forEach((item, index) => { 
      if (index === 0) {
        HoursGuard.textContent = item.value; 
      } else if (index === 1) {
        MinutesGuard.textContent = item.value ; 
      } else if (index === 2) {
        SecondsGuard.textContent = item.value; 
      }
    });

    //criando novo alarme
    const newAlarm = new Hours(HoursGuard.textContent, MinutesGuard.textContent, SecondsGuard.textContent, idCounter);
    AlarmsGuard.push(newAlarm);
    
    //adicionando valores à div
    divAlarms.appendChild(HoursGuard);
    divAlarms.appendChild(MinutesGuard);
    divAlarms.appendChild(SecondsGuard);

    //criando a div global do alarme
    divGlobalAlarm = document.createElement('div');
    divGlobalAlarm.setAttribute('class', 'container');
    divGlobalAlarm.setAttribute('data-id', newAlarm.id);
    divGlobalAlarm.appendChild(title);
    divGlobalAlarm.appendChild(divAlarms);
    divGlobalAlarm.appendChild(buttonX);
    divGlobalAlarm.appendChild(buttonXGeral);
    DivAlarms.appendChild(divGlobalAlarm);
    ++idCounter; 
    
    buttonXGeral.addEventListener('click', () => getRemoveElement(newAlarm.id, 'geral'));
    buttonX.addEventListener('click', () => getRemoveElement(newAlarm.id, 'alarme'));
  }
}




//Regras para adicionar valores ao input, pelos botoes personalizados
const divIconsList = [...document.querySelectorAll('.div_Inputs')];
divIconsList.forEach((divInput, inputIndex) => {
  const divIcons = divInput.querySelectorAll('.divIcons .arrow');
    divIcons.forEach((arrow, index) => { 
      const startAction = (e) => {
            e.preventDefault(); 
          const input = divInput.querySelector('input'); 
        intervalId = setInterval(() => {
          if (index === 0) {
            if (input.value == '') {
                input.value = '00'
            }
                if (inputIndex === 0) {
                    if (parseInt(input.value) < 23) {
                        AddValue(input);
                      }
                 } else {
                     if (parseInt(input.value) < 59) {
                        AddValue(input);
                      }
                  }
              } else if (index === 1) {

                RemoveValue(input);
                }
              }, 60);
      }
      const stopAction = () => {
      clearInterval(intervalId);
      };
      if (isMobileOrTablet()) {
        arrow.addEventListener('touchstart', startAction);
        arrow.addEventListener('touchend', stopAction);
        arrow.addEventListener('touchmove', stopAction); 
      } else {
        arrow.addEventListener('mousedown', startAction);
        arrow.addEventListener('mouseup', stopAction);
        arrow.addEventListener('mouseleave', stopAction);
      }
 })
})
const AddValue = (input) => {
  let value = parseInt(input.value);
  value = value + 1;
  input.value = value < 10 ? '0' + value : value;
}
const RemoveValue=(input)=>{
  let value = parseInt(input.value); 
  value = value - 1;
  input.value = value < 10 ? '0' + value : value;
}



divIconsList.forEach((divInput) => {
    const divZero = divInput.querySelectorAll('.ZerarDiv .bi-file-x');
    divZero.forEach((icon) => {
      icon.addEventListener('click', () => {
        const input = divInput.querySelector('input'); 
         if(input.value !== ''){
           input.value = '00';
           }
      })
      
    })
  
  })



