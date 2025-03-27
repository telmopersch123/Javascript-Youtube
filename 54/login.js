class Login{
  static mat = null;
  static pas = null;
  static logado = false;
  static matlogado = null;
  static nomelogado = null;
  static acessologado = null;
  static styleCSS = null;
  static callBack_ok = null;
  static callBack_NotOk = null;
  static config = {
    cor: "048",
    img:"./logo.jpg"
  };
  //static endpoint="https://405e7907-f406-4148-acd4-b3a9e7a819e9-00-6f3mm9l008sr.kirk.replit.dev:3000/"
  static login = (callBack_ok,callBack_NotOk,config=null) => {
    if (config!=null) {
      this.config = config;
    }
    this.callBack_ok =()=>{callBack_ok();};
    this.callBack_NotOk =()=>{callBack_NotOk();};
    this.styleCSS = `
  html { height: 100%; font-family: Arial, sans-serif; background: rgba(0, 0, 0, 0.63); }
  .fundoLogin { background: #ffffff00; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); overflow: hidden; width: 400px; max-width: 90%;  position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); }
  .headerLogin { background: #ffffff48; color: #fff; padding: 20px; text-align: center; }
  .headerLogin img { width: 50px; height: 50px; border-radius: 50%; margin-bottom: 10px; }
  .headerLogin h1 { font-size: 24px; margin: 0; }
  .elementosLogin { padding: 20px; }
  .campoLogin { margin-bottom: 20px; }
  .campoLogin label { display: block; margin-bottom: 5px; color: #333; }
  .campoLogin input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }
  .buttonLogin { display: flex; justify-content: space-between; }
  .buttonLogin button { 
    padding: 10px 20px; 
    border: none; 
    border-radius: 5px; 
    color: #fff; 
    cursor: pointer; 
    font-size: 16px; 
    transition: background 0.3s;
    background: #${this.config.cor};
  }
  .buttonLogin button:hover { background: #2575fc; }
  @media (max-width: 500px) {
    .headerLogin h1 { font-size: 20px; }
    .campoLogin input { font-size: 14px; }
    .buttonLogin button { padding: 10px 20px; border: none; border-radius: 5px; color: #fff; cursor: pointer; }
  }
`;
    const LinkStyle = document.createElement("style");
    LinkStyle.setAttribute("id", "id_styleLogin");
    LinkStyle.setAttribute("rel", "stylesheet");
    LinkStyle.innerHTML = this.styleCSS;
    document.head.appendChild(LinkStyle);

     // Criação dos elementos
    const fundoLogin = document.createElement("div");
    fundoLogin.id = "fundoLogin";
    fundoLogin.className = "fundoLogin";

    const baseLogin = document.createElement("div");
    baseLogin.id = "baseLogin";
    baseLogin.className = "baseLogin";

    const headerLogin = document.createElement("div");
    headerLogin.id = "headerLogin";
    headerLogin.className = "headerLogin";

    const logoImg = document.createElement("img");
    logoImg.src = this.config.img;
    logoImg.alt = "Logo";

    const titulo = document.createElement("h1");
    titulo.textContent = "Login";

    headerLogin.appendChild(logoImg);
    headerLogin.appendChild(titulo);

    const elementosLogin = document.createElement("div");
    elementosLogin.id = "elementosLogin";
    elementosLogin.className = "elementosLogin";

    const campoLoginUsername = document.createElement("div");
    campoLoginUsername.className = "campoLogin";

    const labelUsername = document.createElement("label");
    labelUsername.textContent = "Username";
    labelUsername.htmlFor = "f_username";

    const inputUsername = document.createElement("input");
    inputUsername.type = "text";
    inputUsername.name = "f_username";
    inputUsername.id = "f_username";

    campoLoginUsername.appendChild(labelUsername);
    campoLoginUsername.appendChild(inputUsername);

    const campoLoginPassword = document.createElement("div");
    campoLoginPassword.className = "campoLogin";

    const labelPassword = document.createElement("label");
    labelPassword.textContent = "Password";
    labelPassword.htmlFor = "f_senha";

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.name = "f_senha";
    inputPassword.id = "f_senha";

    campoLoginPassword.appendChild(labelPassword);
    campoLoginPassword.appendChild(inputPassword);

    const buttonLogin = document.createElement("div");
    buttonLogin.className = "buttonLogin";

    const btnLogin = document.createElement("button");
    btnLogin.id = "btn_login";
    btnLogin.textContent = "Login";
    btnLogin.addEventListener("click", () => { 
     this.verificaLogin()
    })

    const btnCancel = document.createElement("button");
    btnCancel.id = "btn_cancel";
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", () => {
      this.fechar();
     })

    buttonLogin.appendChild(btnLogin);
    buttonLogin.appendChild(btnCancel);

    elementosLogin.appendChild(campoLoginUsername);
    elementosLogin.appendChild(campoLoginPassword);
    elementosLogin.appendChild(buttonLogin);

    baseLogin.appendChild(headerLogin);
    baseLogin.appendChild(elementosLogin);

    fundoLogin.appendChild(baseLogin);

    document.body.appendChild(fundoLogin);
  }

  static verificaLogin = () => {
    const mat = document.querySelector("#f_username").value;
    const pas = document.querySelector("#f_senha").value;

    //ENDPOINT API
    const endPoint = `https://405e7907-f406-4148-acd4-b3a9e7a819e9-00-6f3mm9l008sr.kirk.replit.dev:3000/?matricula=${mat}&senha=${pas}`
    fetch(endPoint)
      .then(res => res.json())
      .then(respost => { 
        if (respost) {
          this.logado = true;
          this.matlogado = mat;
          this.nomelogado = respost.nome;
          this.acessologado = respost.acesso;
          this.callBack_ok();
          this.fechar();
        } else {
          this.logado = false;
          this.matlogado = null;
          this.nomelogado = null;
          this.acessologado = null;
          this.callBack_NotOk();
        }
      })
      .catch(err => { 
        console.error('Error:', err);  
      })
  }
  static fechar = () => {
    const id_styleLogin = document.querySelector("#id_styleLogin")
    id_styleLogin.remove()
    const fundoLogin = document.querySelector("#fundoLogin")
    fundoLogin.remove()
  }
}
export { Login };
  

