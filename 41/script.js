import Contact from './contatos.js';
const listaContatos = document.querySelector('.listaContatos');
const botao_btn = document.querySelector('.botao_btn');

botao_btn.addEventListener('click', () => { 
  const cont = {
    nome: document.getElementById("name").value,
    telefone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  }
  Contact.addContact(cont,listaContatos)
})
