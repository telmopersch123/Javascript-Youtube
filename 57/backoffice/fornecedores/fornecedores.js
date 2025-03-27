import { Cxmsg } from "../../utilss/cxmsg.js";
const dadosGrid = document.querySelector(".dadosGrid");
const f_nome = document.querySelector("#f_nome");
const f_status = document.querySelector("#f_status");
const img_foto = document.querySelector("#img_foto");
const btn_gravar = document.querySelector("#btn_gravar");
const f_filtragem = document.querySelector("#f_filtragem");
const btn_pesquisar = document.querySelector("#btn_pesquisar");
const btnSListarTudo = document.querySelector("#btnSListarTudo");
const btn_fechar0 = document.querySelector("#btn_fechar0");
const btn_fechar1 = document.querySelector("#btn_fechar1");
const btn_fechar00 = document.querySelector("#btn_fechar00");
const btn_fechar01 = document.querySelector("#btn_fechar01");
const campoForm2 = document.querySelector(".campoForm2");
const ListarBtn = document.querySelector(".ListarBtn");
const btn_listarContatosForm = document.querySelector("#btn_listarContatosForm");
const dadosGrid_novosContatosForn = document.querySelector(".dadosGrid_novosContatosForn");
const dadosGrid_contatosFornAdd = document.querySelector(".dadosGrid_contatosFornAdd");
const telefonesContForn = document.querySelector("#telefonesContForn");
const dadosGrid_telefonesContForn = document.querySelector(".dadosGrid_telefonesContForn");
let radios;
let modojanela = "n"//n=novo fornecedororador | e=editar fornecedororador
const serv = sessionStorage.getItem("servidor_nodered");
 const endpoint_todosfornecedores = `${serv}todosfornecedores`
document.addEventListener('DOMContentLoaded', function () {
    fornecedores();
});

function fornecedores() {

fetch(endpoint_todosfornecedores)
    .then(res => res.json())
    .then(res => {
        dadosGrid.innerHTML = '';
        res.forEach(el => {
            criarElementosGrid(el)
        });
    })
     .catch(err => {
            console.error("Erro ao carregar fornecedores: ", err);
        });
}

btnSearch.addEventListener("click", () => {
    popoutPesqRemove();
})
btnSListarTudo.addEventListener("click", () => {
    fornecedores();
})
btn_pesquisar.addEventListener("click", (e) => {
      
    radios = document.querySelectorAll('.radio-group input[type="radio"]');
    let tipo = null
    if (radios[0].checked) {
        tipo = "id";
    } else {
        tipo = "nome";
    }
    if (pesqu.value != "" && radios[0].checked || pesqu.value != "" && radios[1].checked) {
        const endpointpesq = `${serv}pesquisafornecedor/${tipo}/${pesqu.value}`
        fetch(endpointpesq).then(res => res.json()).then((res) => { 
        dadosGrid.innerHTML = '';
        res.forEach(el => {
            criarElementosGrid(el)
        });
        })
        popoutPesqAdd();
    } else {
        const config = {
            titulo: "Alerta",
            texto: "Digite o nome ou ID do fornecedor",
            cor: "#f0a500",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
        if (pesqu.value == "") {
            document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio=> {
                radio.checked = false;
            })
    }
        return;
    }
  
})
btn_fechar01.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    popups[0].classList.add("ocultarpopupContFone");
})
btn_fechar00.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    popups[1].classList.add("ocultarpopupList");
})
btn_fechar0.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
        document.getElementById("tituloPopup").innerHTML = "Pesquisar";
        popups[2].classList.add("ocultarpopuppesq");
        LimparInputFornecedores();
})
btn_fechar1.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    pesqu.value = "";
    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio=> {
        radio.checked = false;
    })
    popups[3].classList.add("ocultarpopupadd");
    LimparInputFornecedores();
})


ListarBtn.addEventListener("click", (e) => {
    console.log("oi")
})
btn_listarContatosForm.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    popups[1].classList.remove("ocultarpopupList");
    dadosGrid_novosContatosForn.innerHTML = "";
    let endpointfornecedor = `${serv}todasPessoasFornecedores`
    fetch(endpointfornecedor).then(res => res.json()).then((res) => { 
        res.forEach(el => {
            criarLinhaContForn(el)
        });
    })
})
btnAdd.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    modojanela = "n";
    campoForm2.style.display = "none";
    btn_gravar.innerHTML = "Gravar"
    document.getElementById("tituloPopup").innerHTML = "Novo Fornecedor";
    popups[3].classList.remove("ocultarpopupadd");
})

btn_gravar.addEventListener("click", (e) => {
    const contat = [...document.querySelectorAll(".novoContForn")];
    let numTels = [];
    contat.forEach(t => {
        numTels.push(t.firstChild.innerHTML)
    })
    if (f_nome.value == "") {
        const config = {
            titulo: "Aviso!",
            texto: "Por favor, Preencha todos os campos!",
            cor: "#f0a500",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
        return;
    }
    const dados = {
        "id_fornecedor":  e.target.dataset.idfornecedor,
        "desc_fornecedor": f_nome.value,
        "status_fornecedor": f_status.value,
        "lista_contatos": numTels,
        "logo_fornecedor": img_foto.getAttribute("src")
    }
    const cab = {
        method: 'post',
        body: JSON.stringify(dados)
    }
    let endpointnovoeditarofornecedor = null;
    if (modojanela=="n") {
        endpointnovoeditarofornecedor = `${serv}novofornecedor`
    } else {
        endpointnovoeditarofornecedor = `${serv}editarfornecedor`
    }
    fetch(endpointnovoeditarofornecedor, cab).then(res => {
     if (res.status == 200) {
            fornecedores();
        if (modojanela == "n") {
         mostrarPopUp(`Novo fornecedor criado com sucesso!`);
        } else {
         mostrarPopUp(`Contato do(a) ${f_nome.value} alterado com sucesso!`);
    }
        } else {
            console.error("Erro ao gravar novo  fornecedor")
        }
    })
    popoutAdd();
    LimparInputFornecedores();
})

btn_gcancelar.addEventListener("click", (e) => {
    popoutAdd();
    LimparInputFornecedores();
})

f_filtragem.addEventListener("keyup", () => {
    const linhas = [...document.querySelectorAll(".dadosGrid")];
    const termoBusca = f_filtragem.value.toLowerCase();
    linhas.forEach(elements => {
        const textoLinha = elements.textContent.toLowerCase();
        if (textoLinha.includes(termoBusca)) {
            elements.style.display = "";
        } else {
            elements.style.display = "none";
         }
    })
})
const converte_imagem_b64 = (localDestino, arquivoimg) => {
    const obj = arquivoimg;
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
        const res = reader.result;
        localDestino.src = res;
    });
    if (obj) {
        reader.readAsDataURL(obj);
    }
}

f_foto.addEventListener("change", (evt) => {
    converte_imagem_b64(img_foto, evt.target.files[0])
     campoForm2.style.display = "flex";
})

function LimparInputFornecedores() {
    if (document.querySelector(".img_foto").src != "") {
        document.querySelector(".img_foto").src = "";
    } 
    document.querySelectorAll(".corpooPopup input").forEach(input => {
        input.value = ""
    });
}
function mostrarPopUp(mensagem) {
    const div = document.createElement("div");
    div.classList.add("popupMensagem");
    const p = document.createElement("p");
    p.innerHTML = mensagem;
    div.appendChild(p);
    document.body.appendChild(div);
}
const criarElementosGrid = (el) => {
     const divlinha = document.createElement("div");
       divlinha.classList.add("dadosGrid");

       const divId = document.createElement("div");
       divId.classList.add("colunaElementosGrid");
       divId.innerHTML=el.id_fornecedor 
       divlinha.appendChild(divId);

        const divNome = document.createElement("div");
       divNome.classList.add("colunaElementosGrid");
       divNome.innerHTML=el.desc_fornecedor
       divlinha.appendChild(divNome);

        const divUstatusoUsuario = document.createElement("div");
       divUstatusoUsuario.classList.add("colunaElementosGrid");
       divUstatusoUsuario.innerHTML=el.status_fornecedor
       divlinha.appendChild(divUstatusoUsuario);

       const divOperacoesoUsuario = document.createElement("div");
            divOperacoesoUsuario.setAttribute("class", "colunaElementosGrid operacao");
            
            const delToggle = document.createElement("i");
            delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            delToggle.setAttribute("data-idfornecedor", el.id_fornecedor)
            if (el.status_fornecedor == "A") {
                delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            } else {
                delToggle.setAttribute("class", "bi bi-toggle-off bi-toggle")
            }
            delToggle.addEventListener("click", function (evt) { 
                const idfornecedorToggle = evt.target.dataset.idfornecedor;
                if (evt.target.getAttribute("class") == "bi bi-toggle-on bi-toggle") {
                    const endpoint_mudarStatus = `${serv}mudarStatusFornecedores/${idfornecedorToggle}/I`;
                    fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                            evt.target.setAttribute("class", "bi bi-toggle-off bi-toggle");
                        }
                    })
                } else {
                    const endpoint_mudarStatus = `${serv}mudarStatusFornecedores/${idfornecedorToggle}/A`;
                     fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                             evt.target.setAttribute("class", "bi bi-toggle-on bi-toggle")
                        }
                    })
                    
                }
                fornecedores();
            })
            const divtextToggle = document.createElement("div");
            divtextToggle.classList.add("textToggle");
            divtextToggle.innerHTML = "Status";
            divtextToggle.appendChild(delToggle);
            divOperacoesoUsuario.appendChild(divtextToggle);

            const delPencil = document.createElement("i");
            delPencil.setAttribute("class", "bi bi-pencil bi-operacao")
             delPencil.addEventListener("click", (evt) => {
                campoForm2.style.display = "flex";
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                modojanela = "e";
                document.getElementById("tituloPopup").innerHTML = "Editar Fornecedor";
                btn_gravar.innerHTML = "Alterar"
                let endpointfornecedor = `${serv}dadosfornecedores/${id}`
                fetch(endpointfornecedor).then(res => res.json()).then((res) => {
                    btn_gravar.setAttribute("data-idfornecedor", id)
                    f_nome.value = res[0].desc_fornecedor 
                    f_status.value = res[0].status_fornecedor
                    img_foto.src = res[0].logo_fornecedor
                    popoutAddRemove();
                })
            })
            divOperacoesoUsuario.appendChild(delPencil);

            const delTel = document.createElement("i");
            delTel.setAttribute("class", "bi bi-trash bi-operacao")
            divOperacoesoUsuario.appendChild(delTel);
            
             divlinha.appendChild(divOperacoesoUsuario);
            dadosGrid.appendChild(divlinha);
}
const criarLinhaContForn = (el) => {
     const divlinha = document.createElement("div");
       divlinha.classList.add("dadosGrid");

       const divId = document.createElement("div");
       divId.classList.add("colunaElementosGrid");
       divId.innerHTML=el.id_pessoa
       divlinha.appendChild(divId);

        const divNome = document.createElement("div");
       divNome.classList.add("colunaElementosGrid");
       divNome.innerHTML=el.nome_pessoa
       divlinha.appendChild(divNome);


       const divOperacoesoUsuario = document.createElement("div");
         divOperacoesoUsuario.setAttribute("class", "colunaElementosGrid operacao");
            const delAdd = document.createElement("i");
            delAdd.setAttribute("class", " bi-person-fill-add bi-operacao")
             delAdd.addEventListener("click", (evt) => {
                img_foto.style.display = "block";
                 const linha = evt.target.parentNode.parentNode
                 const id = el.id_pessoa;
                 const nome = el.nome_pessoa;
                 addContatoForn(id, nome);
            })
            divOperacoesoUsuario.appendChild(delAdd);
    
         const delPhone = document.createElement("i");
            delPhone.setAttribute("class", "bi bi-telephone-outbound bi-operacao")
            delPhone.addEventListener("click", (evt) => {
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                const endpointreturnphone = `${serv}retornaTelefones/${id}`
                fetch(endpointreturnphone).then(res => res.json()).then((res) => {
                    dadosGrid_telefonesContForn.innerHTML = ''
                    let popups = [...document.querySelectorAll(".popup")];
                     popups[0].classList.remove("ocultarpopupContFone");
                        res.forEach(el => {
                            addTelefoneContForm(el.numero_telefone);
                        })
                })
            })
              divOperacoesoUsuario.appendChild(delPhone);
            
            divlinha.appendChild(divOperacoesoUsuario);
            dadosGrid_novosContatosForn.appendChild(divlinha);
}
function popoutAddRemove() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[3].classList.remove("ocultarpopupadd");
}
function popoutAdd() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[3].classList.add("ocultarpopupadd");
}

function popoutPesqRemove() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[2].classList.remove("ocultarpopuppesq");
}
function popoutPesqAdd() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[2].classList.add("ocultarpopuppesq");
}
const addTelefoneContForm = (telefone) => {
    const divlinha = document.createElement("div");
       divlinha.classList.add("dadosGrid");

       const divc1 = document.createElement("div");
       divc1.classList.add("colunaElementosGrid");
       divc1.innerHTML=telefone
       divlinha.appendChild(divc1);

        dadosGrid_telefonesContForn.appendChild(divlinha)
}

const addContatoForn = (id, nome) => {
        const divlinha = document.createElement("div");
       divlinha.setAttribute("class", "dadosGrid novoContForn");

       const divc1 = document.createElement("div");
       divc1.classList.add("colunaElementosGrid");
       divc1.innerHTML=id
       divlinha.appendChild(divc1);

        const divc2 = document.createElement("div");
       divc2.classList.add("colunaElementosGrid");
       divc2.innerHTML=nome
    divlinha.appendChild(divc2);
    
    const divOperacoesoUsuario = document.createElement("div");
         divOperacoesoUsuario.setAttribute("class", "colunaElementosGrid operacao");
            const delremove = document.createElement("i");
            delremove.setAttribute("class", "bi bi-trash3 bi-operacao")
             delremove.addEventListener("click", (evt) => {
                 const linhas = evt.target.parentNode.parentNode;
                 linhas.remove();
            })
    divOperacoesoUsuario.appendChild(delremove);
    const delPhone = document.createElement("i");
            delPhone.setAttribute("class", "bi bi-telephone-outbound bi-operacao")
            delPhone.addEventListener("click", (evt) => {
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                const endpointreturnphone = `${serv}retornaTelefones/${id}`
                fetch(endpointreturnphone).then(res => res.json()).then((res) => {
                    dadosGrid_telefonesContForn.innerHTML = ''
                    let popups = [...document.querySelectorAll(".popup")];
                     popups[0].classList.remove("ocultarpopupContFone");
                        res.forEach(el => {
                            addTelefoneContForm(el.numero_telefone);
                        })
                })
            })
              divOperacoesoUsuario.appendChild(delPhone);
        divlinha.appendChild(divOperacoesoUsuario);
        dadosGrid_contatosFornAdd.appendChild(divlinha)
}
