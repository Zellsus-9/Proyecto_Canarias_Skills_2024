/************************************
 * Descripcion:
 * 
 * La clase Ranking, ordena, añade y muestra 
 * por pantalla el top 10 de mejores puntuaciones.
 * 
 */

class Ranking {
    constructor() {
        //Si existe el local storage de rank lo usa si no es un array Vacío
        localStorage.rank ? this.rank = JSON.parse(localStorage.rank) : this.rank = [];
    }

    /** Visualizar a los 10 primeros del Ranking en el Html de la cámara **/
    viewRank() {
        //Añadir la información al Ranking
        localStorage.rank ? this.rank = JSON.parse(localStorage.rank) : this.rank = [];

        let ranking = document.getElementById("rank");
        ranking.innerHTML = "";//Limpia los elementos del DOM

        //Ordena el array de mayor a menor por los puntos
        this.rank.sort((a, b) => {
            return b.points - a.points;
        });

        let hx = 1;//Tamaño del h1, h2,...
        //Bucle para mostrar los 10 Primeros en la lista
        for (let i = 0; i < 10; i++) {
            if (this.rank[i] && i == 0) {//El Primero
                //Add lista al Ranking
                ranking.innerHTML += `<li class="list-group-item active">
                <h${hx}>${this.rank[i].name} &#10132; ${Math.floor(this.rank[i].points)}
                <img src="./recursos/img/medalla_${i}.png" width="50px" height="50px">
                </h${hx}></li>`;

                //Si hx es menor a 5; para no tener un html con etiquetas que no existen
                if (hx < 5) {
                    hx++;
                }

            } else if (this.rank[i] && i <= 2 && i != 0) {//El Segundo y el Tercero
                //Add lista al Ranking
                ranking.innerHTML += `<li class="list-group-item">
                <h${hx}>${this.rank[i].name} &#10132; ${Math.floor(this.rank[i].points)}
                <img src="./recursos/img/medalla_${i}.png" width="50px" height="50px">
                </h${hx}></li>`;
                if (hx < 5) {
                    hx++;
                }

            } else if (this.rank[i]) {//Hasta el ultimo
                //Add lista al Ranking
                ranking.innerHTML += `<li class="list-group-item">
                <h${hx}>${this.rank[i].name} &#10132; ${Math.floor(this.rank[i].points)}
                </h${hx}></li>`;
                if (hx < 5) {
                    hx++;
                }

            }

        }

    }

    /** Añade una persona al Ranking **/
    addToRank() {
        let confirmacion;
        let nombre = prompt("¿Cual es tu nombre?");//Preguntar el nombre

        //Bucle Para Revisar si existe tu nombre
        for (let i = 0; i < this.rank.length; i++) {
            if (this.rank[i].name == nombre) {//Si el nombre existe
                confirmacion = confirm("Ya existe ese nombre, Quieres usarlo otra vez?");
                if (confirmacion) {
                    localStorage.setItem('nombre', nombre);//Guarda el nombre en el LocalStorage
                } else {
                    nombre = prompt("Otro nombre por favor");//Preguntar por otro nombre
                    i = 0;
                }

            }
        }

        if (!confirmacion) {
            localStorage.setItem('nombre', nombre);//Guarda el nombre en el LocalStorage
            
            let newRank = {
                name: nombre,
                points: 0
            };

            this.rank.push(newRank);//Añade el nombre al ranking con los puntos a 0
            localStorage.setItem('rank', JSON.stringify(this.rank));//Actualiza el array del Ranking
        }


    }

    /** Añadir los puntos a la persona correspondiente **/
    addPoints(distancia) {
        //Añadir la información al Ranking
        localStorage.rank ? this.rank = JSON.parse(localStorage.rank) : this.rank = [];

        //Bucle que recorre en el ranking 
        for (let j = 0; j < this.rank.length; j++) {
            if (localStorage.nombre == this.rank[j].name) {//Si el nombre Guardado existe en el ranking
                //Si los puntos que están en el ranking es menor a los nuevos puntos
                if (this.rank[j].points < distancia) {
                    let newPoints = this.rank[j].points = distancia;//Modifica los puntos con los nuevos
                    this.rank.push(newPoints);//Añade los puntos modificados al array
                    this.rank.pop();//Borra el último elemento del array porque no nos interesa que este
                    localStorage.setItem('rank', JSON.stringify(this.rank));//Modifica el Array guardado en el LocalStorage
                }
            }

        }
    }

}