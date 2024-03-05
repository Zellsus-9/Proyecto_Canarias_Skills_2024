/************************************
 * Descripcion:
 * 
 * La clase Goat, es donde se definen
 * todas las acciones de la Cabra (Player)
 * desde su movimiento, las colisiones, etc.
 * 
 */

class Goat {
    constructor(src, cnvY, animation) {
        this.src = src;//Contexto de p5.js
        this.animation = animation;//Contexto de la clase Animations

        this.velocidad = 0.7;//Velocidad de la Cabra  
        this.suelo = cnvY - 300;//Distancia que será el suelo
        this.limite = cnvY - 355;//Límite de altura en la colisión
        this.gravedad = 1;//Gravedad de la Cabra
        this.empuje = 20;//Fuerza con la que la Cabra vuelve al suelo

        this.aumentoVel = 0.001;//Número de aumento a la velocidad
        this.maxVel = 1.5;//Velocidad máxima que se alcanza

        this.distActualizada = 0;//Distancia recorrida por la cabra
        this.escena = false;//Variable de control para cambiar de escena

        /** La Cabra **/
        this.cabra = {
            pos: this.suelo,//Posición de la Cabra
            vel: 0//Velocidad de la Cabra
        }
    }

    /** Dibujar la Cabra **/
    player(cabra) {
        this.animation.cabraAnimation(cabra, 90, this.cabra.pos, 200, 200);//Animación de la Cabra
    }

    /** Movimiento de la cabra **/
    move(distancia, $meh) {
        distancia += this.velocidad;//Aumento de la distancia según la velocidad
        this.velocidad += this.aumentoVel;//Aumento de la velocidad
        this.velocidad = this.src.min(this.velocidad, this.maxVel);//Que la velocidad no pase de su máxima

        this.cabra.pos += this.cabra.vel;//Velocidad del salto
        this.cabra.vel += this.gravedad;//Gravedad del salto

        if (this.cabra.pos > this.suelo) {//Si la posición de la cabra es mayor a la del suelo
            this.cabra.pos = this.suelo;//Volver la posición de la Cabra al suelo
            this.gravedad = 1;//Establecer la gravedad
        }
        this.distActualizada = distancia;//Distancia actualizada

        if (distancia > 2000) {//Primer aumento de velocidad
            this.maxVel = 1.8;
        }

        if (distancia > 3500) {//Segundo aumento de velocidad
            this.maxVel = 2.3;
        }
        /** Balidos de la Cabra **/
        //Cada 250 frames hay un 50% de escuchar un Belido
        if (this.src.frameCount % 255 == 0) {
            if (this.src.random() > 0.5) {
                $meh.play();
            }
        }
    }

    /** Colisión con los obstáculos **/
    colision(distancia, obstaculo, escala) {
        let ob = obstaculo;//Datos del obstáculo
        let obpos = (ob.pos - distancia) * escala;//Posición del obstáculo en la pantalla

        //if (Posición de la cabra /mayor que/ el limite & obpos /menor que/ A distancia de colisión & obpos /mayor que/ A distancia de colisión)
        //es decir this.limite es arriba // obpos <  210 es defrente // obpos > 20 es de atras // Formando así como tres paredes
        if (this.cabra.pos > this.limite && obpos < 120 && obpos > 20) {
            this.escena = 3;//Cambiar la escena
        }
    }

    /** Salto de la Cabra **/
    salto($sonido) {
        if (this.cabra.pos == this.suelo) {//Si la posición de la cabra es igual a la del suelo
            $sonido.play();//Efecto del sonido del salto
            this.cabra.vel = -this.empuje;//Establece la potencia del salto
            localStorage.setItem("salto", "false");//Cambiar la variable del localStorage
        }
    }

    /** Reseteo de variables cambiantes **/
    resetCabra() {
        this.velocidad = 0.7;
        this.maxVel = 1.5;
        this.distActualizada = 0;
        this.escena = false;
    }
}