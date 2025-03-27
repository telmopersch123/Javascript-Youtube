import { Cxmsg } from "../../utilss/cxmsg.js";
const dadosGrid = document.querySelector(".dadosGrid");
const popup = document.querySelector(".popup");
const f_email = document.querySelector("#f_email");
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
const btn_fechar1= document.querySelector("#btn_fechar1");
let radios;
let modojanela = "n"//n=novo colaborador | e=editar colaborador
const serv = sessionStorage.getItem("servidor_nodered");

let totDivs = 1
const endpoint_todoscolaboradores = `${serv}todaspessoas`
document.addEventListener('DOMContentLoaded', function() {
    colaboradores();
});

function colaboradores() {

fetch(endpoint_todoscolaboradores)
    .then(res => res.json())
    .then(res => {
        dadosGrid.innerHTML = '';
        res.forEach(el => {
            criarElementosGrid(el)
        });
    })
     .catch(err => {
            console.error("Erro ao carregar colaboradores: ", err);
        });
}
const endpoint_tiposcolab = `${serv}tiposcolab`

fetch(endpoint_tiposcolab) .then(res => res.json())
    .then(res => { 
        f_tipoColab.innerHTML = ''
        res.forEach(el => {
            const option = document.createElement("option");
            option.setAttribute("value", el.id_tipopessoa)
            option.innerHTML = el.desc_tipopessoa
            f_tipoColab.appendChild(option)
        })
    })


btnSearch.addEventListener("click", () => {
   popoutPesqRemove();
})
btnSListarTudo.addEventListener("click", () => {
    colaboradores();
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
        const endpointpesq = `${serv}pesquisacolab/${tipo}/${pesqu.value}`
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
        LimparInputColaboradores();
})
btn_fechar1.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    document.body.style = "overflow: auto;"
    pesqu.value = "";
    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio=> {
        radio.checked = false;
    })
    popups[1].classList.add("ocultarpopupadd");
    LimparInputColaboradores();
})



btnAdd.addEventListener("click", (e) => {
    let popups = [...document.querySelectorAll(".popup")];
    modojanela = "n";
    img_foto.style.display = "none";
    btn_gravar.innerHTML = "Gravar"
    document.getElementById("tituloPopup").innerHTML = "Novo Colaborador";
    popups[1].classList.remove("ocultarpopupadd");
})

btn_gravar.addEventListener("click", (e) => {
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
    const tels = [...document.querySelectorAll(".novoTel")];
    let numTels = [];
    tels.forEach(t => {
      numTels.push(t.innerHTML) 
    })
    const dados = {
        "id_pessoa":  e.target.dataset.idcolab,
        "nome_pessoa": f_nome.value,
        "email_pessoa": f_email.value,
        "password_pessoa": "-1",
        "primary_access_pessoa": 1,
        "tipo_pessoa": f_tipoColab.value,
        "status_pessoa": f_status.value,
        "numtelefones": numTels,
        "foto_pessoa": img_foto.getAttribute("src")
    }
    const cab = {
        method: 'post',
        body: JSON.stringify(dados)
    }
    let endpointnovoeditarocolab = null;
    if (modojanela=="n") {
        endpointnovoeditarocolab = `${serv}novocolab`
    } else {
        endpointnovoeditarocolab = `${serv}editarcolab`
    }
    fetch(endpointnovoeditarocolab,cab).then(res => {
        if (res.status === 200) {
            colaboradores();
            popoutAdd();
        } else {
            console.error("Erro ao gravar novo colaborador")
        }
    })

    if (modojanela == "n") {
         mostrarPopUp(`Novo coloborador criado com sucesso!`);
    } else {
         mostrarPopUp(`Contato do(a) ${f_nome.value} alterado com sucesso!`);
    }
    LimparInputColaboradores();
})

btn_gcancelar.addEventListener("click", (e) => {
    popoutAdd();
    LimparInputColaboradores();
})


f_nomeTel.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && totDivs <= 6) {
        if (e.target.value.length >= 8 && e.target.value.length <= 10) {
            telefonecriar(e.target.value, "-1","n");
            e.target.value = ""
        } else {
        const config = {
            titulo: "Alerta",
            texto: "Número de telefone inválido",
            cor: "#f0a500",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
           
        }
       

        totDivs = Array.from(telefones.children).filter(child => child.tagName.toLowerCase() === 'div').length + 1

        e.target.value = ""
    } else if (e.key == "Enter" && totDivs > 5) {
          const config = {
            titulo: "Alerta",
            texto: "Número máximo de telefone permitidos",
            cor: "#f0a500",
            tipo: "ok",
            comandoOk:  ()=>{},
            comandoSim: ()=>{},
            comandoNao: ()=>{}
        }
        Cxmsg.mostrar(config);
    }

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
     img_foto.style.display = "block";
})
function telefonecriar(fone, idtel, tipo) {
 
      const divTel = document.createElement("div");
            divTel.setAttribute("class", "tel")

    const numTel = document.createElement("div");
            if(tipo=="n"){
                numTel.setAttribute("class", "numTel novoTel")
            } else {
                numTel.setAttribute("class", "numTel editarTel")
            }
            numTel.innerHTML = fone;
            divTel.appendChild(numTel)

            const delTel = document.createElement("i");
            delTel.setAttribute("class", "bi bi-trash")
            delTel.setAttribute("data-idtel", idtel)
            divTel.appendChild(delTel)
            divTel.addEventListener("click", () => {
                telefones.removeChild(delTel.parentNode)
                totDivs = Array.from(telefones.children).filter(child => child.tagName.toLowerCase() === 'div').length + 1
                if (btn_gravar.addEventListener("click", (e) => {
                if(idtel !="-1"){
                const endpointdeltel = `${serv}deltelefone/${idtel}`
                fetch(endpointdeltel).then(res => {
                    if (res.status === 200) {} else {
                        console.error("Erro remover telefone de colaborador")
                    }
                })
                } else {
                    evt.target.parentNode.remove();
                    }
                }));
              
            })
             telefones.appendChild(divTel)
}
function LimparInputColaboradores() {
    document.querySelector(".img_foto").src = "";
    document.getElementById("telefones").innerHTML = "";
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
       divId.innerHTML=el.id_pessoa
       divlinha.appendChild(divId);

        const divNome = document.createElement("div");
       divNome.classList.add("colunaElementosGrid");
       divNome.innerHTML=el.nome_pessoa
       divlinha.appendChild(divNome);

        const divTipoUsuario = document.createElement("div");
       divTipoUsuario.classList.add("colunaElementosGrid");
       divTipoUsuario.innerHTML=el.tipo_pessoa
       divlinha.appendChild(divTipoUsuario);

        const divUstatusoUsuario = document.createElement("div");
       divUstatusoUsuario.classList.add("colunaElementosGrid");
       divUstatusoUsuario.innerHTML=el.status_pessoa
       divlinha.appendChild(divUstatusoUsuario);

       const divOperacoesoUsuario = document.createElement("div");
            divOperacoesoUsuario.setAttribute("class", "colunaElementosGrid operacao");
            
            const delToggle = document.createElement("i");
            delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            delToggle.setAttribute("data-idcolab", el.id_pessoa)
            if (el.status_pessoa == "A") {
                delToggle.setAttribute("class", "bi bi-toggle-on bi-toggle")
            } else {
                delToggle.setAttribute("class", "bi bi-toggle-off bi-toggle")
            }
            delToggle.addEventListener("click", function (evt) { 
                const idcolabToggle = evt.target.dataset.idcolab;
                if (evt.target.getAttribute("class") == "bi bi-toggle-on bi-toggle") {
                    const endpoint_mudarStatus = `${serv}mudarStatusColab/${idcolabToggle}/I`;
                    fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                            evt.target.setAttribute("class", "bi bi-toggle-off bi-toggle");
                        }
                    })
                } else {
                    const endpoint_mudarStatus = `${serv}mudarStatusColab/${idcolabToggle}/A`;
                     fetch(endpoint_mudarStatus).then(res => {
                        if (res.status == 200) {
                             evt.target.setAttribute("class", "bi bi-toggle-on bi-toggle")
                        }
                    })
                    
                }
                colaboradores();
            })
            const divtextToggle = document.createElement("div");
            divtextToggle.classList.add("textToggle");
            divtextToggle.innerHTML = "Status";
            divtextToggle.appendChild(delToggle);
            divOperacoesoUsuario.appendChild(divtextToggle);

            const delPencil = document.createElement("i");
            delPencil.setAttribute("class", "bi bi-pencil bi-operacao")
             delPencil.addEventListener("click", (evt) => {
                img_foto.style.display = "block";
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                modojanela = "e";
                document.getElementById("tituloPopup").innerHTML = "Editar Colaborador";
                btn_gravar.innerHTML = "Alterar"
                let endpointcolab = `${serv}dadoscolab/${id}`
                fetch(endpointcolab).then(res => res.json()).then((res) => {
                    btn_gravar.setAttribute("data-idcolab", id)
                    f_nome.value = res[0].nome_pessoa
                    f_email.value = res[0].email_pessoa
                    // "-1" = res[0].password_pessoa
                    // 1 = res[0].primary_access_pessoa
                    f_status.value = res[0].status_pessoa
                    f_tipoColab.value = res[0].tipo_pessoa
                    img_foto.src = res[0].foto_pessoa
                    popoutAddRemove();
                })
                endpointcolab = `${serv}telefonescolab/${id}`
                fetch(endpointcolab).then(res => res.json()).then((res) => {
                    res.forEach((tel) => {
                        telefonecriar(tel.numero_telefone, tel.id_telefone, "e" );
                    })
                })
            })
            divOperacoesoUsuario.appendChild(delPencil);

            const delTel = document.createElement("i");
            delTel.setAttribute("class", "bi bi-trash bi-operacao")
            divOperacoesoUsuario.appendChild(delTel);
            
             divlinha.appendChild(divOperacoesoUsuario);
            dadosGrid.appendChild(divlinha);
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
