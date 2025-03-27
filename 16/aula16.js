

const idades = [15, 21, 42, 33, 64, 85, 16, 18]
const maior = idades.filter((v, i, a) => {
  if (v >= 18) 
    return v
})
  console.log(maior)
