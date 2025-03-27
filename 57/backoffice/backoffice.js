// Obtém valores do sessionStorage
const serv = sessionStorage.getItem("servidor_nodered");
const token = sessionStorage.getItem("s_token_token");
const idPessoa = sessionStorage.getItem("id_pessoa");
const nomePessoa = sessionStorage.getItem("nome_pessoa");

// Redireciona para index.html se id_pessoa não estiver definido
if (!idPessoa) {
    window.location.href = "../index.html";
}

// Verifica o token
fetch(`${serv}verificaToken/${token}`)
    .then(res => res.json())
    .then(console.log)
    .catch(error => console.error("Erro na requisição:", error));

// Elementos do DOM
const btnMenuPrincipal = document.querySelector('#btn_menuPrincipal');
const menuPrincipal = document.querySelector('#menuPrincipal');
const btnLogoOff = document.getElementById("btnlogooff");
const divId = document.getElementById("id");
const divNome = document.getElementById("nome");
const menuItems = document.querySelectorAll('.btn_menuItem');

// Exibe informações do usuário
divId.textContent = idPessoa;
divNome.textContent = nomePessoa;

// Logout e limpeza do sessionStorage
btnLogoOff?.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
});

// Alternância do menu principal
const toggleMenu = () => menuPrincipal?.classList.toggle('menu_aberto');
btnMenuPrincipal?.addEventListener('click', toggleMenu);
menuItems.forEach(el => el.addEventListener('click', toggleMenu));
