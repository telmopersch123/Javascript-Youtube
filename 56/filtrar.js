const dados = document.querySelector("#dados");
const popup = document.querySelector(".fundopopup");
const btn_salvar = document.querySelector("#btn_salvar");
const f_id = document.querySelector("#f_id");
const f_nome = document.querySelector("#f_nome");
const f_celular = document.querySelector("#f_telefone");
const f_email = document.querySelector("#f_email");
const f_dtnasc = document.querySelector("#f_dtnasc");
const f_filtronome = document.querySelector("#f_filtronome");
const preencherdgv = (endpoint) => { 
  fetch(endpoint)
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
        dados.appendChild(linha);
      })
    })
}

btnFiltrar.addEventListener("click", (evt) => {

  if (f_filtronome.value === "") {
    preencherdgv("http://127.0.0.1:1880/pesquisartodoscontatos");
  } else {
    preencherdgv(`http://127.0.0.1:1880/filtrar/${f_filtronome.value}`);
  }
})
