const objs=document.getElementsByTagName("div");
const objs1 = document.getElementsByTagName("p");

//loop for - variantes de modos

for (n of objs) {
  console.log(n)
}
for (o of objs1) {
  console.log(o)
}
for (o in objs1) {
  console.log(o)
}

num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

for (o of num) {
  console.log(o)
}
for (o in num) {
  console.log(o)
}


let n = 1

while (n != 10) {
  console.log(n)
  n++;
}

do {
  console.log(n)
  n++
} while(n <= 10)
