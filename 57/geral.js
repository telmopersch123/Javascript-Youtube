import { Cxmsg } from "./utilss/cxmsg.js";
const inputupassword1 = document.getElementById("inputupassword1");
const inputupassword2 = document.getElementById("inputupassword2"); 
const button_login = document.getElementById("button_login");
const inputemail2 = document.getElementById("inputemail2")
const inputupassword = document.getElementById("inputupassword");
const btn_fechar0 = document.querySelector("#btn_fechar0");
const btn_fechar1 = document.querySelector("#btn_fechar1");
const inputemail1 = document.getElementById("inputemail1");
const popup = document.querySelector(".popup");
const popup1 = document.querySelector(".popup1");
const button_trocarSenha = document.getElementById("button_trocarSenha");
const button_mudar = document.getElementById("button_mudar");
const endpoint_config = `./config.txt`;
sessionStorage.setItem("id_pessoa", null);
sessionStorage.setItem("nome_pessoa", null);
let serv = null;

if (endpoint_config) { 
fetch(endpoint_config)
  .then(res => res.json())
  .then(res => {
    sessionStorage.setItem("servidor_nodered", res.servidor_nodered)
    sessionStorage.setItem("versao", res.versao)
    serv=res.servidor_nodered
});
}
button_trocarSenha.addEventListener("click", () => {
  const endpointEmail = `${serv}trazerEmail/${inputemail1.value}`;
  fetch(endpointEmail)
  .then(res => {
      if (!res.ok) {
          throw new Error("Erro na requisição");
      }
      return res.json();
  })
  .then(data => {
      if (data.message) {
        
          return; // Sai da função se o usuário não for encontrado
      }

      const HiddenUsuario = data.id_pessoa; // Atualiza a variável dentro do escopo correto
    

      // Agora que HiddenUsuario tem um valor, podemos executar a lógica
      if (inputupassword1.value !== "" && inputupassword2.value !== "") {
          if (inputupassword1.value !== inputupassword2.value) { 
              const config = {
                  titulo: "Alerta!",
                  texto: "Senhas não são iguais!",
                  cor: "#ff0000",
                  tipo: "ok",
                  comandoOk: () => {},
                  comandoSim: () => {},
                  comandoNao: () => {}
              };
              Cxmsg.mostrar(config);
          } else {
            

              const dados = {
                  id_pessoa: HiddenUsuario, // Agora HiddenUsuario tem um valor válido
                  password_pessoa: inputupassword1.value,
              };


              const cab = {
                  method: "post",
                  body: JSON.stringify(dados)
              };

              let endpoint = `${serv}novocadastro`;

              fetch(endpoint, cab)
                  .then(res => {
                      if (res.status === 200) {
                     
                          popup.classList.add("ocultarpopupList")
                          popup1.classList.remove("ocultarpopupList")
                          inputemail2.value = inputemail1.value
                          inputupassword.value = inputupassword1.value
                      } else {
                          console.error("Erro ao gravar novo colaborador:", res);
                      }
                  })
                  .catch(error => {
                      console.error("Erro ao enviar a requisição:", error);
                  });
          }
      } else {
          const config = {
              titulo: "Alerta!",
              texto: "Digite a senha nos dois campos!",
              cor: "#ff0000",
              tipo: "ok",
              comandoOk: () => {},
              comandoSim: () => {},
              comandoNao: () => {}
          };
          Cxmsg.mostrar(config);
      }
  })
  .catch(error => {
      console.error("Erro ao buscar usuário:", error);
  });
});

button_mudar.addEventListener("click", () => {
    popup.classList.remove("ocultarpopupList")
  popup1.classList.add("ocultarpopupList")
})

button_login.addEventListener("click", () => { 
  if (inputupassword.value == "") {
     const config = {
            titulo: "Aviso!",
            texto: "Preencha o campo da Senha!",
            cor: "#ff0000",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
  }
  if (serv != null) {  
    const endpointLogin = `${serv}login/${inputemail2.value}/${inputupassword.value}`
    fetch(endpointLogin).then(res => res.json()).then((res) => {
      
      if (res.retorno == 200) { // usuario antigo
         sessionStorage.setItem("id_pessoa", res.id_pessoa);
        sessionStorage.setItem("nome_pessoa", res.nome_pessoa);
       
        sessionStorage.setItem("n_token_token ", res.insertId);
        sessionStorage.setItem("s_token_token", res.token);
       window.location.href="./backoffice/backoffice.html"
      } else if (res.retorno == 401) {  // senha errada
          const config = {
            titulo: "Aviso!",
            texto: "Senha ou Usuário incorreto!",
            cor: "#ff0000",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
      console.error("Erro ao tentar logar:", error);
      }
      
    })
  } else {
      console.error("O servidor ainda não foi carregado.");
  }
})

btn_fechar0.addEventListener("click", (e) => {
  popup.classList.add("ocultarpopupList")
})

btn_fechar1.addEventListener("click", (e) => {
  popup1.classList.add("ocultarpopupList")
})
