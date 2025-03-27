const texto = document.getElementById('texto');

const endPoint = "CFBCURSOS.txt";
fetch(endPoint)
.then(respost => respost.text() )
  .then(respost => {
    respost=JSON.parse(respost)
    console.log(respost);
})
