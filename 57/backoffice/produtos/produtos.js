import { Cxmsg } from "../../utilss/cxmsg.js";
const dadosGrid = document.querySelector(".dadosGrid");
const f_tipoColab = document.querySelector("#f_tipoColab");
const telefones = document.querySelector("#telefones");
const f_nomeTel = document.querySelector("#f_nomeTel");
const f_nome = document.querySelector("#f_nome");
const f_status = document.querySelector("#f_status");
const f_foto = document.querySelector("#f_foto");
const img_foto = document.querySelector("#img_foto");
const btn_gravar = document.querySelector("#btn_gravar");
const f_filtragem = document.querySelector("#f_filtragem");
const btn_pesquisar = document.querySelector("#btn_pesquisar");
const btnSListarTudo = document.querySelector("#btnSListarTudo");
const btn_fechar0 = document.querySelector("#btn_fechar0");
const btn_fechar1 = document.querySelector("#btn_fechar1");
const btn_fechar2 = document.querySelector(".btn_fechar2");
const btnCancelarEstoquePopUp = document.querySelector(".btnCancelarEstoquePopUp");
const btn_gcancelar = document.querySelector("#btn_gcancelar");
const f_tipoProdColab = document.querySelector("#f_tipoProdColab")
const f_fornprod = document.querySelector("#f_fornprod");
const movEstoque = document.querySelector("#movEstoque");
const btn_gravarmoveqtde = document.querySelector("#btn_gravarmoveqtde")
const f_descprodMove = document.querySelector("#f_descprodMove");
const f_descprodutoMove = document.querySelector("#f_descprodutoMove");
const f_quantColabMove = document.querySelector("#f_quantColabMove");
const f_quantprodMoveReg = document.querySelector("#f_quantprodMoveReg");
const btn_addQtde = document.querySelector("#btn_addQtde");
const btn_removeqtde = document.querySelector("#btn_removeqtde");
let radios;
let modojanela = "n"//n=novo colaborador | e=editar colaborador
const serv = sessionStorage.getItem("servidor_nodered");

let totDivs = 1
const endpoint_todosprodutos = `${serv}todosprodutos`
const criarElementosGrid = (el) => {

     const divlinha = document.createElement("div");
       divlinha.classList.add("dadosGrid");

       const divId = document.createElement("div");
       divId.classList.add("colunaElementosGrid");
       divId.innerHTML=el.id_produto 
       divlinha.appendChild(divId);

    //     const divtipo_produto  = document.createElement("div");
    //    divtipo_produto.classList.add("colunaElementosGrid");
    //    divtipo_produto.innerHTML=el.tipo_produto 
    //    divlinha.appendChild(divtipo_produto);

        const divdesc_produto = document.createElement("div");
       divdesc_produto.classList.add("colunaElementosGrid");
       divdesc_produto.innerHTML=el.desc_produto
       divlinha.appendChild(divdesc_produto);

        const divid_fornecedor = document.createElement("div");
       divid_fornecedor.classList.add("colunaElementosGrid");
       divid_fornecedor.innerHTML=el.id_fornecedor 
        divlinha.appendChild(divid_fornecedor);

        const divquantidade_produto = document.createElement("div");
       divquantidade_produto.classList.add("colunaElementosGrid");
       divquantidade_produto.innerHTML=el.quantidade_produto 
        divlinha.appendChild(divquantidade_produto);

     const divUstatusoProduto = document.createElement("div");
       divUstatusoProduto.classList.add("colunaElementosGrid");
       divUstatusoProduto.innerHTML=el.status_produto 
       divlinha.appendChild(divUstatusoProduto);

       const divOperacoesoUsuario = document.createElement("div");
            divOperacoesoUsuario.setAttribute("class", "colunaElementosGrid operacao");
            
            const delToggle = document.createElement("i");
            delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            delToggle.setAttribute("data-idprod", el.id_produto)
            if (el.status_produto == "A") {
                delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            } else {
                delToggle.setAttribute("class", "bi bi-toggle-off bi-toggle")
            }
            delToggle.addEventListener("click", function (evt) { 
                const idprodToggle = evt.target.dataset.idprod;
                if (evt.target.getAttribute("class") == "bi bi-toggle-on bi-toggle") {
                    const endpoint_mudarStatus = `${serv}mudarStatusProdutos/${idprodToggle}/I`;
                    fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                            evt.target.setAttribute("class", "bi bi-toggle-off bi-toggle");
                        }
                    })
                } else {
                    const endpoint_mudarStatus = `${serv}mudarStatusProdutos/${idprodToggle}/A`;
                     fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                             evt.target.setAttribute("class", "bi bi-toggle-on bi-toggle")
                        }
                    })
                    
                }
                produtos();
             })
            const divtextToggle = document.createElement("div");
            divtextToggle.classList.add("textToggle");
            divtextToggle.innerHTML = "Status";
            divtextToggle.appendChild(delToggle);
            divOperacoesoUsuario.appendChild(divtextToggle);

            const delPencil = document.createElement("i");
            delPencil.setAttribute("class", "bi bi-pencil bi-operacao")
             delPencil.addEventListener("click", (evt) => {
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                modojanela = "e";
                document.getElementById("tituloPopup").innerHTML = "Editar Produto";
                btn_gravar.innerHTML = "Alterar"
                let endpointprod = `${serv}dadosprodutos/${id}`
                 fetch(endpointprod).then(res => res.json()).then((res) => {
                    btn_gravar.setAttribute("data-idcolab", id)
                    f_descprod.value = res[0].id_produto
                    f_descproduto.value = res[0].desc_produto
                    f_statusProd.value = res[0].status_produto
                    f_tipoProdColab.value = res[0].tipo_produto
                    f_fornprod.value = res[0].id_fornecedor
                    f_quantColab.value = res[0].quantidade_produto
                    popoutAddRemove();
                }) 
            })
            divOperacoesoUsuario.appendChild(delPencil);

            const delBag = document.createElement("i");
            delBag.setAttribute("class", "bi bi-backpack4-fill bi-operacao")
            delBag.addEventListener("click", (evt) => { 
                const status = evt.target.parentNode.parentNode.childNodes[4].innerHTML
                if (status == "A") {
                    f_descprodMove.value = evt.target.parentNode.parentNode.childNodes[0].innerHTML
                    f_descprodutoMove.value = evt.target.parentNode.parentNode.childNodes[1].innerHTML
                    f_quantColabMove.value = evt.target.parentNode.parentNode.childNodes[3].innerHTML
                    f_quantprodMoveReg.value = ""
                    movEstoque.classList.remove("ocultarpopupadd");
                } else {
                      const config = {
                        titulo: "Alerta",
                        texto: "Status do produto deve estar Ativo",
                        cor: "#f0a500",
                        tipo: "ok",
                        comandoOk:  ()=>{},
                        comandoSim: ()=>{},
                        comandoNao: ()=>{}
                    }
                    Cxmsg.mostrar(config);
                     movEstoque.classList.add("ocultarpopupadd");
                }
               
            })
   
            divOperacoesoUsuario.appendChild(delBag);
    
           
            
             divlinha.appendChild(divOperacoesoUsuario);
            dadosGrid.appendChild(divlinha);
}
const listaTiposProd=() => {
const endpoint_tiposprod = `${serv}tiposprod`
fetch(endpoint_tiposprod) .then(res => res.json())
    .then(res => { 
        f_tipoProdColab.innerHTML = ''
        res.forEach(el => {
            const option = document.createElement("option");
            option.setAttribute("value", el.id_tipoproduto )
            option.innerHTML = el.desc_tipoproduto
            f_tipoProdColab.appendChild(option)
        })
    })
}
const listaFornsProd=() => {
const endpoint_tiposprod = `${serv}forneprod`
fetch(endpoint_tiposprod) .then(res => res.json())
    .then(res => { 
        f_fornprod.innerHTML = ''
        res.forEach(el => {
            const option = document.createElement("option");
            option.setAttribute("value", el.id_fornecedor  )
            option.innerHTML = el.desc_fornecedor
            f_fornprod.appendChild(option)
        })
    })
}
document.addEventListener('DOMContentLoaded', function() {
    produtos();
    listaTiposProd();
    listaFornsProd();
});

function produtos() {
fetch(endpoint_todosprodutos)
    .then(res => res.json())
    .then(res => {

        dadosGrid.innerHTML = '';
        res.forEach(el => {
            criarElementosGrid(el)
        });
    })
     .catch(err => {
            console.error("Erro ao carregar produtos: ", err);
        });
}

btnSearch.addEventListener("click", () => {
   popoutPesqRemove();
})
btnSListarTudo.addEventListener("click", () => {
    produtos();
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
        const endpointpesq = `${serv}pesquisaproduto/${tipo}/${pesqu.value}`
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
            texto: "Digite o nome ou ID do colaborador",
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

btn_fechar0.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
        document.getElementById("tituloPopup").innerHTML = "Pesquisar";
        document.body.style = "overflow: hidden;"
        popups[0].classList.add("ocultarpopuppesq");
        LimparInputProdutos();
})
btn_fechar1.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    document.body.style = "overflow: auto;"
    pesqu.value = "";
    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio=> {
        radio.checked = false;
    })
    popups[1].classList.add("ocultarpopupadd");
    LimparInputProdutos();
})

//CLOSE POP UP ESTOQUE vvvvvvvvv
btn_fechar2.addEventListener("click", (e) => {
fecharPopupEstoque()
})
btnCancelarEstoquePopUp.addEventListener("click", (e) => {
fecharPopupEstoque()
})
//CLOSE POP UP ESTOQUE ^^^^^^^^


btn_gravarmoveqtde.addEventListener("click", (e) => {
    
    const dados = {
        "id_produto":  f_descprodMove.value,
        "quantidade_produto": f_quantColabMove.value,
    }
    const cab = {
        method: 'post',
        body: JSON.stringify(dados)
    }
const endpointMoveProd = `${serv}editarMoveprod`
fetch(endpointMoveProd,cab) .then(res => res.json())
    .then(res => { 
        produtos();
        fecharPopupEstoque();
    })
})
btn_addQtde.addEventListener("click", (e) => {
    let qtdeAtual =  parseInt(f_quantColabMove.value)
    let qtdeAdd = parseInt(f_quantprodMoveReg.value)

    qtdeAtual += qtdeAdd
    f_quantColabMove.value = qtdeAtual
    f_quantprodMoveReg.value=""
})
btn_removeqtde.addEventListener("click", (e) => {
    let qtdeAtual =  parseInt(f_quantColabMove.value)
    let qtdeRem = parseInt(f_quantprodMoveReg.value)
    if (qtdeRem <= qtdeAtual) {
         qtdeAtual -= qtdeRem
    } else {
        return
    }
    f_quantColabMove.value = qtdeAtual
    f_quantprodMoveReg.value=""
})
btnAdd.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    modojanela = "n";
   // img_foto.style.display = "none";
    btn_gravar.innerHTML = "Registrar Movimentação"
    document.getElementById("tituloPopup").innerHTML = "Novo Produto";
    popups[1].classList.remove("ocultarpopupadd");
    listaTiposProd()
    listaFornsProd();
})

btn_gravar.addEventListener("click", (e) => {
    if (f_descprod.value == "" && f_descproduto.value) {
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
        "id_produto":  f_descprod.value,
        "tipo_produto": f_tipoProdColab.value,
        "desc_produto": f_descproduto.value,
        "id_fornecedor": f_fornprod.value,
        "quantidade_produto": f_quantColab.value,
        "status_produto": f_statusProd.value,
    }
    const cab = {
        method: 'post',
        body: JSON.stringify(dados)
    }
    let endpointnovoeditarocolab = null;
    if (modojanela=="n") {
        endpointnovoeditarocolab = `${serv}novoprod`
    } else {
        endpointnovoeditarocolab = `${serv}editarprod`
    }
    fetch(endpointnovoeditarocolab, cab).then(res => {
        if (res.status === 200) {
            produtos();
            fecharPopupEstoque()
            popoutAdd();
             if (modojanela == "n") {
                mostrarPopUp(`Novo produto criado com sucesso!`);
            } else {
                mostrarPopUp(`Produto ${f_descproduto.value} alterado com sucesso!`);
            }
        } else {
            console.error("Erro ao gravar novo produto")
        }
    })

   
    LimparInputProdutos();
})

btn_gcancelar.addEventListener("click", (e) => {
    popoutAdd();
    LimparInputProdutos();
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

function fecharPopupEstoque() {
    movEstoque.classList.add("ocultarpopupadd")
}
function LimparInputProdutos() {
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
function popoutAddRemove() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[1].classList.remove("ocultarpopupadd");
}
function popoutAdd() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[1].classList.add("ocultarpopupadd");
}

function popoutPesqRemove() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[0].classList.remove("ocultarpopuppesq");
}
function popoutPesqAdd() {
    let popups = [...document.querySelectorAll(".popup")];
   popups[0].classList.add("ocultarpopuppesq");
}
