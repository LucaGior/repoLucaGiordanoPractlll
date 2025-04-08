
// clase barco

class Barco {
    constructor(tamano) {
    this.tamano = tamano;
    this.posiciones = [];
    this.tocados = 0;
    }

    recibirDisparo() {
        this.tocados++;

        let aguaCartel = document.getElementById("aguaCartel");
        aguaCartel.style.display = "none";
        let hundidoCartel = document.getElementById("hundidoCartel");
        hundidoCartel.style.display = "none";
        let tocadoCartel = document.getElementById("tocadoCartel");
        tocadoCartel.style.display = "block";    
        return this.tocados === this.tamano;
    }
}

// clase tablero, (comparar posisiones de barco para agregar al tablero aca)
class Tablero {
    constructor() {
        this.tablero = Array.from({length: 10}, () => Array(10).fill(null));
        this.barcos = [
            new Barco(5),
            new Barco(4),
            new Barco(3),
            new Barco(3),
            new Barco(2)
        ]
        this.barcosHundidos = 0;
        this.colocarBarcos()
        this.dibujarTablero()
        console.log(this.tablero)
    }

    //colocar barcos en el plano(matriz) del tablero
    colocarBarcos() {
        for (let barco of this.barcos) {

            let colocado = false;

            while (!colocado) {
                let fila = Math.floor(Math.random() * 10);
                let columna = Math.floor(Math.random() * 10);
                let horizontal = Math.random() < 0.5;

                if (this.puedeColocarse(fila, columna, barco.tamano, horizontal)) {

                    barco.posiciones = this.obtenerPosiciones(fila, columna, barco.tamano, horizontal)
                    
                    barco.posiciones.forEach(([x, y]) => (this.tablero[x][y] = barco))

                    colocado = true;
                }
            }
        }
    }
    // comparacion del las posiciones de los barcos lo que devuelve true o false para luego
    // posicionarlo o no en el plano.
    puedeColocarse(fila, columna, tamano, horizontal) {
        for (let i = 0; i < tamano; i++) {
            let x, y;
    
            if (horizontal) {
                x = fila;
                y = columna + i;
            } else {
                x = fila + i;
                y = columna;
            }
    
            if (x >= 10 || y >= 10 || this.tablero[x][y] !== null) {
                return false;
            }
        }
        return true;
    }
    
 //Creacion del plano(matriz)
    obtenerPosiciones(fila, columna, tamano, horizontal) {
        let posiciones = [];
        for (let i = 0; i < tamano; i++) {
            let x = horizontal ? fila : fila + i;
            let y = horizontal ? columna + i : columna;
            posiciones.push([x, y]);
        }
        return posiciones;
    }
// agregar en el html el tablero y funciones para cada celda de (disparar)
    dibujarTablero() {
        const tableroDiv = document.getElementById("tablero");
        tableroDiv.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const celda = document.createElement("div");
                celda.classList.add("celda");
                celda.dataset.fila = i;
                celda.dataset.columna = j;
                celda.addEventListener("click", () => this.disparar(i, j, celda));
                tableroDiv.appendChild(celda);
            }
        }
    }
// funcion que verifica si esta tocado o agua y cambia el color, cambiando la clase del cuadro
    disparar(fila, columna, celda) {
        if (celda.classList.contains("tocado") || celda.classList.contains("agua")) return;

        if (this.tablero[fila][columna]) {
            const barco = this.tablero[fila][columna];
            celda.classList.add("tocado");

            if (barco.recibirDisparo()) {
                this.barcosHundidos++;
                this.marcarBarcoHundido(barco);
                
                let tocadoCartel = document.getElementById("tocadoCartel");
                tocadoCartel.style.display = "none";

                let aguaCartel = document.getElementById("aguaCartel");
                aguaCartel.style.display = "none";
                let hundidoCartel = document.getElementById("hundidoCartel");
                hundidoCartel.style.display = "block";
            }


            if (this.barcosHundidos === this.barcos.length) {
                setTimeout(() => {
                    document.getElementById("ganaste").style.display = "block";
                    document.getElementById("reiniciar").style.display = "block";
                    comp = true;
                }, 100)
            }
        } else {

            let hundidoCartel = document.getElementById("hundidoCartel");
            hundidoCartel.style.display = "none";
            let tocadoCartel = document.getElementById("tocadoCartel");
            tocadoCartel.style.display = "none";

            let aguaCartel = document.getElementById("aguaCartel");
            aguaCartel.style.display = "block";

            celda.classList.add("agua");
        }
    }


    marcarBarcoHundido(barco) {
        barco.posiciones.forEach(([x, y]) => {
            document.querySelector(`[data-fila='${x}'][data-columna='${y}']`).classList.add("hundido");
        });
    }
}

const juego = new Tablero();


// timer

let time = 60;
const cuentaAt = document.getElementById('cuentaAt');

let inter = setInterval(cuentaAtras, 1000);

function cuentaAtras() {
    const seg = time % 60;
    cuentaAt.textContent = `${seg}`;
    time--;

    if (time < 0) {
        clearInterval(inter);
        document.getElementById("tablero").style.display = "none";
        document.getElementById("perdiste").style.display = "block";
        document.getElementById("reiniciar").style.display = "block";
    }
}


document.getElementById("reiniciar").addEventListener("click", () => {
    location.reload()
});

