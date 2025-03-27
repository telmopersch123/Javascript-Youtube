const objetos = document.querySelector(".objetos")

const computadores = [
  {
        id: 1,
        marca: "Dell",
        modelo: "Inspiron 15",
        processador: "Intel Core i5",
        ram: "8GB",
        armazenamento: "256GB SSD",
         preco: 3500.00,
        info: function() {
      console.log(`ID: ${this.id}`);
      console.log(`Marca: ${this.marca}`);
      console.log(`Modelo: ${this.modelo}`);
      console.log(`Processador: ${this.processador}`);
      console.log(`RAM: ${this.ram}`);
      console.log(`Armazenamento: ${this.armazenamento}`);
      console.log(`Preço: R$ ${this.preco}`);
    }
    },
    {
        id: 2,
        marca: "HP",
        modelo: "Pavilion x360",
        processador: "Intel Core i7",
        ram: "16GB",
        armazenamento: "512GB SSD",
        preco: 4500.00
    },
    {
        id: 3,
        marca: "Acer",
        modelo: "Aspire 5",
        processador: "AMD Ryzen 5",
        ram: "8GB",
        armazenamento: "1TB HDD",
        preco: 3000.00
    },
    {
        id: 4,
        marca: "Lenovo",
        modelo: "IdeaPad 3",
        processador: "Intel Core i3",
        ram: "4GB",
        armazenamento: "128GB SSD",
        preco: 2500.00
    },
    {
        id: 5,
        marca: "Apple",
        modelo: "MacBook Air",
        processador: "Apple M1",
        ram: "8GB",
        armazenamento: "256GB SSD",
        preco: 8500.00
  },
]




let somar = 0
computadores.forEach(function (c) {
  const div = document.createElement("div")
  
  div.innerHTML = c.marca + "<br/>" + c.ram + "<br/>" + c.armazenamento
  div.setAttribute('class', "computador")
  objetos.appendChild(div)
  delete c.preco
  somar += 100;
  c.precoPromo = somar
})

const c1 = Object.assign({}, computadores[0])
console.log(computadores)
c1.info()

const o1 = { obje3: '3' }
const o2 = { obje5: '5' }
const o4 = Object.assign(o1, o2)
console.log(o4)
