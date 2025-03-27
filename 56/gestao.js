const dados = document.querySelector("#dados");
const popup = document.querySelector(".fundopopup");
const btn_salvar = document.querySelector("#btn_salvar");
const f_id = document.querySelector("#f_id");
const f_nome = document.querySelector("#f_nome");
const f_celular = document.querySelector("#f_telefone");
const f_email = document.querySelector("#f_email");
const f_dtnasc = document.querySelector("#f_dtnasc");
const preencherdgv=()=>{ 
  let endPoint = `http://127.0.0.1:1880/pesquisartodoscontatos`;
  fetch(endPoint)
    .then(response => response.json())
    .then(data => { 
      dados.innerHTML = '';
      data.forEach((el) => {
        const linha = document.createElement('div');
        linha.setAttribute("class", "linhadados");

        const c1 = document.createElement('div');
        c1.setAttribute("class", "coluna c1");
        c1.innerHTML = el.n_contato_contato;
        linha.appendChild(c1);


        const c2 = document.createElement('div');
        c2.setAttribute("class", "coluna c2");
        c2.innerHTML = el.s_nome_contato;
        linha.appendChild(c2);

        const c3 = document.createElement('div');
        c3.setAttribute("class", "coluna c3");
        c3.innerHTML = el.s_celular_contato;
        linha.appendChild(c3);

        const c4 = document.createElement('div');
        c4.setAttribute("class", "coluna c4");
        c4.innerHTML = el.s_email_contato;
        linha.appendChild(c4);

        const c5 = document.createElement('div');
        c5.setAttribute("class", "coluna c5");
        c5.innerHTML = el.dt_dtnasc_contato;
        linha.appendChild(c5);

        const c6 = document.createElement('div');
        c6.setAttribute("class", "coluna c6");
        const imgeditar = document.createElement('i');
        imgeditar.setAttribute("class", "bi bi-pencil-fill iconeop");
        imgeditar.addEventListener("click", (evt) => {
          if (!popup.classList.contains("ativo")) {
            popup.classList.add("ativo"); 
          }
          const dados = [...evt.target.parentNode.parentNode.childNodes];
          f_id.value = dados[0].innerHTML;
          f_nome.value = dados[1].innerHTML;
          f_celular.value = dados[2].innerHTML;
          f_email.value = dados[3].innerHTML;
          f_dtnasc.value = dados[4].innerHTML.split("T")[0];
        })

        const imgdel = document.createElement('i');
        imgdel.setAttribute("class", "bi bi-trash3 iconeop");
        imgdel.addEventListener("click", (evt) => {
          DelContato(evt.target.parentNode.parentNode.firstChild.innerHTML)
        })
        c6.appendChild(imgeditar)
        c6.appendChild(imgdel)
        linha.appendChild(c6);
        dados.appendChild(linha);
      })
    })
}
preencherdgv();



btn_salvar.addEventListener("click", () => { 
  popup.classList.remove("ativo");
  const endpoint = `http://127.0.0.1:1880/atualizarcontatos/${f_id.value}/${f_nome.value}/${f_celular.value}/${f_email.value}/${f_dtnasc.value}`
  fetch(endpoint)
    .then(res => {
      if (res.status == 200) {
        alert("dados atualizados")
        preencherdgv();
      } else {
        alert("Erro ao atualizar dados")
    }
  })
})
btn_cancel.addEventListener("click", () => {
   popup.classList.remove("ativo");
})
const DelContato = (id) => {
  const endpoint = `http://127.0.0.1:1880/deletarcontatos/${id}`;
  fetch(endpoint)
    .then(res => {
      if (res.status == 200) {
        if (confirm("Tem certeza que deseja remover esse contato?")) {
          preencherdgv();
        }
      }
    })
}
