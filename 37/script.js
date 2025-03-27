const btn_alert = document.getElementById('btn_alert');
const btn_confirm = document.getElementById('btn_confirm');
const btn_prompt = document.getElementById('btn_prompt');

btn_alert.addEventListener('click', () => {
  alert()
});

btn_confirm.addEventListener('click', () => { 
confirm()
})

btn_prompt.addEventListener('click', () => {
  const a = prompt("digite")
  alert("seu nome:"+a)
});
