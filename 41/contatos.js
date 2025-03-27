import { contatos } from "./Matriz.js"

let contato = {
  getAllContact: function () {
    return {contatos}
  },
  getContact: function (i) {
    return contatos[i]
  },
  addContact: function (novoContact, destinyDOM) {
    const cont = {
      nome: novoContact.nome,
      telefone: novoContact.telefone,
      email: novoContact.email,
    }
   
      const contatoExistente = contatos.some((e) => 
      e.nome === novoContact.nome &&
      e.telefone === novoContact.telefone &&
      e.email === novoContact.email
    );
    if (contatoExistente) {
      console.log('Contato já existe. Impedindo a adição.');
       return; 
    }

    contatos.push(cont)
    destinyDOM.innerHTML = ''
    contatos.forEach((c) => {
    const div = document.createElement('div')
    div.setAttribute("class", "contato")
    const p_name = document.createElement('p')
    p_name.innerHTML = c.nome
    const p_phone = document.createElement('p')
    p_phone.innerHTML = c.telefone
    const p_email = document.createElement('p')
      p_email.innerHTML = c.email
    const p_x = document.createElement('p')
    p_x.innerHTML = "X"
      p_x.setAttribute("class", "XFECHAR");
      p_x.addEventListener("click", () => {
        contatos.splice(contatos.indexOf(c), 1)
        destinyDOM.removeChild(div)
      })
    div.appendChild(p_name)
    div.appendChild(p_phone)
    div.appendChild(p_email)
    div.appendChild(p_x)
    destinyDOM.appendChild(div)
    })
    console.log(contatos)
  }
}

export default contato
