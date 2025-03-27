const btnHome = document.querySelector('#btn_home');
const btnNew = document.querySelector('#btn_new');
const btnSearch = document.querySelector('#btn_search');
const btnManagement = document.querySelector('#btn_management');
const btn_filtrar = document.querySelector("#btn_filtrar");
const btnOn = document.querySelector('#btn_On');
const cabecalho = document.querySelector('#cabecalho');
const menu = document.querySelector('#menu');
const principal = document.querySelector('#principal');

btnHome.addEventListener('click', (evt) => {
AbrirPagina(evt.target, "./home.html");
});
btnNew.addEventListener('click', (evt) => {
   AbrirPagina(evt.target, "./novo.html");
});
btn_filtrar.addEventListener('click', (evt) => {
   AbrirPagina(evt.target, "./filtrar.html");
});
btnManagement.addEventListener('click', (evt) => {
   AbrirPagina(evt.target, "./gestao.html");
});
btnSearch.addEventListener('click', (evt) => {
   AbrirPagina(evt.target, "./pesquisar.html");
});
btnOn.addEventListener('click', (evt) => {
   AbrirPagina(evt.target, "./sobre.html");
});

const AbrirPagina = (el, url) => {
   const abas = [...document.querySelectorAll(".aba")];
   abas.forEach((aba) => {
      aba.classList.remove("abaSelecionada");
   });
    el.classList.add("abaSelecionada");
   window.open(url,"if_principal")
}
