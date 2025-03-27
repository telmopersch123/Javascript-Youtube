//removendo elementos com elementos sibling [elementos irmaos]


const caixa1 = document.querySelector('#caixa1');
const btn_c = [...document.querySelectorAll('.cursos')];
const cursos=["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8", "i9"]


cursos.map((el, key) => {

 const novoElemento = document.createElement("div")
  novoElemento.setAttribute("class", "c"+ (key=key+1))
  novoElemento.setAttribute("id", "kid boo")
  novoElemento.innerHTML = el


  const btn_lixeira = document.createElement("img")
  btn_lixeira.setAttribute("src", 'https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FIXKQJU3WNRJRZFZRLGS3VZESMM.jpg?auth=6cc07bf9bf98baee2e253898aa69cef0420ecfeff7a7e01b197e5262c9f80ca2&width=960&quality=80')
  btn_lixeira.setAttribute("class", 'btn_lixeira')
novoElemento.addEventListener("click", (evt) => {
    caixa1.removeChild(evt.target.parentNode)
  })

  novoElemento.appendChild(btn_lixeira)

  caixa1.appendChild(novoElemento);
})



