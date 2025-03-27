
// typeof verificador de tipos
function processValue(value) {
    if (typeof value === "number") {
        console.log("É um número:", value * 2);
    } else if (typeof value === "string") {
        console.log("É uma string:", value.toUpperCase());
    } else {
        console.log("Tipo desconhecido:", typeof value);
    }
}

processValue(10);        // "É um número: 20"
processValue("Hello");   // "É uma string: HELLO"
processValue(true);      // "Tipo desconhecido: boolean"
