
const configDataGridView = {
   endpoint: "http://127.0.0.1:1880/produtos",
}
const datagridview = (configDataGridView) => {
   const dgvGiven = document.getElementById('dgvGiven');
   dgvGiven.innerHTML = ''
   fetch(configDataGridView.endpoint)
   .then(response => response.json())
      .then(response => {
         
         console.log(response)
   response.forEach(item => {
   
    const dgvRow = document.createElement('div');
    dgvRow.classList.add('dgvGiven'); 

 
    const idDiv = document.createElement('div');
    idDiv.textContent = item.n_id_produto;
    dgvRow.appendChild(idDiv);

    const produtoDiv = document.createElement('div');
    produtoDiv.textContent = item.s_nome_produto;
    dgvRow.appendChild(produtoDiv);

    const marcaDiv = document.createElement('div');
    marcaDiv.textContent = item.s_marca_produto;
    dgvRow.appendChild(marcaDiv);

    const modeloDiv = document.createElement('div');
    modeloDiv.textContent = item.s_modelo_produto;
    dgvRow.appendChild(modeloDiv);
      
      const divIcon = document.createElement('div');
      divIcon.classList.add("Divicones");
      
      const pDel = document.createElement('p');
      pDel.setAttribute("class", "bi bi-trash icon")
      pDel.addEventListener("click", (evt) => { 
         const idConsultaSQL = evt.target.parentNode.parentNode.firstChild.innerHTML
         const linha = evt.target.parentNode.parentNode;
         const endpoint = `http://127.0.0.1:1880/removeproduto/${idConsultaSQL}`;
         fetch(endpoint)
            .then(response => {
               if (response.status == 200) {
                 linha.remove()
              }
            }).catch(error => { })
      })
       
      divIcon.appendChild(pDel);

      const pPen = document.createElement('p');
      pPen.setAttribute("class", "bi bi-pencil icon")
      divIcon.appendChild(pPen);

      const pEye = document.createElement('p');
      pEye.setAttribute("class", "bi bi-eye icon");
      divIcon.appendChild(pEye)
      dgvRow.appendChild(divIcon);


    dgvGiven.appendChild(dgvRow);
   })
   }).catch(err => {})
}
datagridview(configDataGridView)
