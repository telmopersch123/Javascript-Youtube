class Cxmsg{
  //   config = {
  //   titulo: "",
  //   texto: "",
  //   cor: "",
  //   comandoOk: null,
  //   comandoSim: null,
  //   comandoNao: null
  // }
  static config = null;
  static mostrar = (config) => {
this.config = config;
// Cria o fundo da caixa de mensagem
const cxmsgFundo = document.createElement('div');
cxmsgFundo.id = 'cxmsg_fundo';
    cxmsgFundo.setAttribute("class", 'cxmsg_fundo'); 
    cxmsgFundo.setAttribute("id", 'cxmsg_fundo'); 
// Cria o container da caixa de mensagem
const cxmsg = document.createElement('div');
cxmsg.id = 'cxmsg';
cxmsg.classList.add('cxmsg');
// Cria a área de título
const tituloCxmsg = document.createElement('div');
tituloCxmsg.classList.add('titulo_cxmsg');
tituloCxmsg.setAttribute("style", `background-color:${config.cor} !important`);
tituloCxmsg.id = 'titulo_cxmsg';
// Cria o título
const titulo = document.createElement('p');
titulo.textContent = config.titulo; 
// Cria o botão de fechar
const btnFechar = document.createElement('button');
btnFechar.classList.add('btn_fechar_cxmsg');
btnFechar.id = 'btn_fechar_cxmsg';
const iconFechar = document.createElement('i');
iconFechar.classList.add('bi', 'bi-x');
btnFechar.addEventListener('click', () => {
  this.fechar();
    });    
btnFechar.appendChild(iconFechar);
// Anexa o título e o botão de fechar na área de título
tituloCxmsg.appendChild(titulo);
const btnFecharContainer = document.createElement('div');
btnFecharContainer.appendChild(btnFechar);
tituloCxmsg.appendChild(btnFecharContainer);
// Cria a área do corpo da caixa de mensagem
const corpoCxmsg = document.createElement('div');
corpoCxmsg.classList.add('corpo_cxmsg');
corpoCxmsg.id = 'corpo_cxmsg';
const mensagem = document.createElement('p');
mensagem.textContent = config.texto; // Mensagem
corpoCxmsg.appendChild(mensagem);
// Cria o rodapé da caixa de mensagem
const rodapeCxmsg = document.createElement('div');
rodapeCxmsg.classList.add('rodape_cxmsg');
rodapeCxmsg.id = 'rodape_cxmsg';
    // Cria os botões de ação
    if (config.tipo == "ok") {
      const btnOk = document.createElement('button');
      btnOk.id = 'btn_ok_cxmsg';
      btnOk.classList.add('btn_cxmsg');
      btnOk.textContent = 'Ok';
      btnOk.addEventListener('click', () => {
      config.comandoOk();
      this.fechar();
 }); 
      rodapeCxmsg.appendChild(btnOk);
    } else if (config.tipo == "sn") {
     const btnSim = document.createElement('button');
      btnSim.id = 'btn_sim_cxmsg';
      btnSim.classList.add('btn_cxmsg');
      btnSim.textContent = 'Sim';
      btnSim.addEventListener('click', () => {
          config.comandoSim();
         this.fechar();
      });
      rodapeCxmsg.appendChild(btnSim);
     const btnNao = document.createElement('button');
      btnNao.id = 'btn_nao_cxmsg';
      btnNao.classList.add('btn_cxmsg');
      btnNao.textContent = 'Não';
      btnNao.addEventListener('click', () => {
        config.comandoNao();
        this.fechar();
      });
      rodapeCxmsg.appendChild(btnNao);
 }
// Anexa o título, corpo e rodapé na caixa de mensagem
cxmsg.appendChild(tituloCxmsg);
cxmsg.appendChild(corpoCxmsg);
cxmsg.appendChild(rodapeCxmsg);
// Anexa a caixa de mensagem no fundo
cxmsgFundo.appendChild(cxmsg);
document.body.appendChild(cxmsgFundo);
  }
  static fechar = () => {
    document.getElementById('cxmsg_fundo').remove();
  }
}

export { Cxmsg };

  

