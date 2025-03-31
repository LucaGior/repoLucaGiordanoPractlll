let total = 0;

function juego() {
    total = 0; 

    document.getElementById('num').value = ""; 
    document.getElementById('boton').disabled = true;
    document.getElementById('boton').disabled = true;
    document.getElementById('resp').innerHTML = ``;

    for (let i = 0; i < 10; i++) {
        let aleatorio = Math.floor(Math.random() * 21) - 10;
        console.log("Número aleatorio entre -10 y 10: " + aleatorio);

        setTimeout(() => {document.getElementById('numeros').innerHTML = aleatorio}, 1500 * i + 200);

        setTimeout(() => {document.getElementById('numeros').innerHTML = ` // `}, 1500 * i);

        total += aleatorio; 
    }

    setTimeout(() => {
        console.log("Total:", total)
        document.getElementById('num').disabled = false
        document.getElementById('boton').disabled = false}, 15000)}

function comprobar() {
    let comp = Number(document.getElementById('num').value);
    
    if (comp === total) {
        document.getElementById('resp').innerHTML = `<h2 id="ganaste">ganaste</h2>`;
    } else {
        document.getElementById('resp').innerHTML = `<h2 id="perdiste">perdiste el total era ${total}.</h2>`;
    }
}









