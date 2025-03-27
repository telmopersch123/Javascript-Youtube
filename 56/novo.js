const btn_gravar = document.querySelector("#btn_gravar");
const btn_cancelar = document.querySelector("#btn_cancelar");
const inputId = document.querySelector('#f_id');
const inputNome = document.querySelector('#f_nomed');
const inputTelefone = document.querySelector('#f_telefone1');
const inputEmail = document.querySelector('#f_emaile1');
const inputDataNascimento = document.querySelector('#f_dtnasc');


btn_gravar.addEventListener("click", (evt) => { 
  const dados = {
    "inputNome": inputNome.value,
    "inputTelefone": inputTelefone.value,
    "inputEmail": inputEmail.value,
    "inputDataNascimento": inputDataNascimento.value,
  }
  const cabecalho = {
    method: "POST",
    body: JSON.stringify(dados)
  }
  const endPoint = "http://127.0.0.1:1880/addcontatos"
  fetch(endPoint, cabecalho)
    .then(response => {
      if (response.status == 200) {
        console.log("Contato gravado com sucesso!")
      reset();
      } else {
        console.log("Erro ao gravar contato!")
      }
      console.log(response)
  })
})

btn_cancelar.addEventListener("click", (evt) => { 
  reset();
})

const reset = () => {
    inputNome.value = ''
        inputTelefone.value = ''
        inputEmail.value = ''
        inputDataNascimento.value = ''
        inputNome.focus();
}


