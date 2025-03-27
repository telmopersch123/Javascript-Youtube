const obj = document.getElementsByTagName("div");
const obj2 = [...document.getElementsByTagName("div")];

// percorrer array e listas de forma simples e direta sem um indice explicito

obj2.forEach(element => {
 element.innerHTML = 'Corra kkk'
});


