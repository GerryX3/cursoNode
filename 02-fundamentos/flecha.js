// function sumar(a, b) {
//     return a + b;
// }


// let sumar = (a, b) => a + b;

// let saludar = nombre => `Hola ${nombre}`;


// console.log(saludar('Gerardo'));

let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
};


console.log(deadpool.getNombre());