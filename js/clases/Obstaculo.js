/************************************
 * Descripcion:
 * 
 * La clase Obstacle, es donde se definen
 * todas las aciones de los obstaculos desde 
 * dibujarlos en el canvas hasta modificar el array.
 * 
 */

class Obstacle {
    constructor(src, anchopantalla, escala, cnvY, imgs) {
        this.src = src;//Contexto de p5.js

        this.anchopantalla = anchopantalla;//Ancho de la pantalla
        this.escala = escala;//Escala de la pantalla
        this.cnvY = cnvY;//Alto del Canvas

        this.imagen = imgs;//Array con las imagenes cargadas
        //Obstaculos Iniciales
        this.obstaculo = [{ pos: 100, img: imgs[this.src.floor(this.src.random(3))] }, { pos: 180, img: imgs[this.src.floor(this.src.random(3))] }, { pos: 260, img: imgs[this.src.floor(this.src.random(3))] }];
    }

    /** Dibuja y Modifica los Obstaculos **/
    dibujarObsts(distancia, imgs) {

        //Bucle que revisa los obstaculos y los dibuja
        for (let o of this.obstaculo) {
            if (o.pos < this.anchopantalla + distancia) {
                this.src.fill(0);
                this.src.image(o.img, this.escala * (o.pos - distancia), this.cnvY - 260, 150, 150);
            }
        }

        //Bucle que modifica el array de obstaculos
        for (let o of this.obstaculo) {
            if (o.pos < distancia - 10) {
                let newobts = this.obstaculo.splice(0, 1);//Añade el primer obstaculo a una variable y borra el primer obstaculo
                newobts.pos = this.obstaculo[this.obstaculo.length - 1].pos + this.src.floor(this.src.random(95, 150));//Usa la posicion del ultimo obstaculo para sumarle un numero entre 95 y 150 para cacular la distancia ente obstaculos
                newobts.img = imgs[this.src.floor(this.src.random(3))];//Imagen aleatoria de obstaculo
                this.obstaculo.push(newobts);//Se añade el nuevo obstaculo al array
            }
        }
    }
    
    /** Reseteo de Variables cambiantes **/
    resetObts() {
        this.obstaculo = [{ pos: 100, img: this.imagen[this.src.floor(this.src.random(3))] }, { pos: 180, img: this.imagen[this.src.floor(this.src.random(3))] }, { pos: 260, img: this.imagen[this.src.floor(this.src.random(3))] }];
    }
}