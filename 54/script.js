import { Login } from "./login.js";


const callBack_ok=() => {

}
const callBack_NotOk=() => {

   confirm("Erro, Login não efetuado! - Usuário ou senha incorretos");
}

Login.login(callBack_ok, callBack_NotOk);
