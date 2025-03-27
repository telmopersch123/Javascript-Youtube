//let cursos = "js"
// export default function getCumputed() {
//   return cursos.toUpperCase() + " - Calculado"
// }

class Cursos{
  static cursos = ['1', '2', '3', '4',]
  constructor() { }
  static getTodosCursos = () => {
    return this.cursos
  }

  static getCursos = (ind) => {
    return yhis.cursos[ind]
  }

  static addCurso = (nC) => {
    this.cursos.push(nC)
  }

  static apagarCursos=()=>{
   this.cursos=[]
  }

}


export default Cursos 



