/************************************
 * Descripcion:
 * 
 * La clase Screen, es donde se dibujaran las principales
 * pantallas el Inicio, el Menu, el Juego y el GameOver.
 * 
 */

class Screen {

    constructor(src, cnvX, animation, fondos) {
        this.src = src;//Contexto de p5.js
        this.animation = animation;//Contexto de la clase Animations

        this.canvasX = cnvX;//Ancho del Canvas
        this.distancia = 0;//Contador de la distancia
        this.anchopantalla = 100;//Ancho de la pantalla
        this.escala = cnvX / this.anchopantalla;//Escala de la pantalla

        //Datos de otra clase
        this.Fondos = fondos;
    }

    /** Dibujar la pantalla de Inicio **/
    dibujarInicio(img, font) {
        this.src.push();//Principio

        this.src.clear();
        this.src.background(80);
        this.src.image(img, 0, 0);

        //Movida para el texto 
        let txtPress = this.src.abs((this.src.sin(this.src.frameCount * 0.03) * 5) + 35);//Caculo para la animacion de las letras
        this.src.fill("#120a04");
        this.src.textAlign(this.src.CENTER);
        this.src.textFont(font);
        this.src.textSize(txtPress);
        this.src.text('Pulsa "Espacio" Para Empezar', 700, 650);

        this.src.pop();//Fin
    }

    /** Dibujar la pantalla de Menu **/
    dibujarMenu(img, font) {
        this.src.push();//Principio

        this.src.clear();//Limpiar canvas
        this.src.image(img, 0, 0);

        //Movida para el texto 
        let txtPress = this.src.abs((this.src.sin(this.src.frameCount * 0.03) * 5) + 35);//Caculo para la animacion de las letras
        this.src.fill("#120a04");
        this.src.textFont(font);
        this.src.textAlign(this.src.CENTER);
        this.src.textSize(80);
        this.src.text("Saltos Por Fuerteventura", 700, 190);
        this.src.textSize(60);
        this.src.text("Skills 2024", 700, 260);
        this.src.textSize(txtPress);
        this.src.text('Pulsa "Espacio" Para Jugar', 700, 540);

        this.src.pop();//Fin
    }

    /** Dibujar la pantalla de Juego **/
    dibujarJuego(font) {
        this.src.push();//Principio

        this.src.clear();//Limpiar canvas
        this.src.background("#69c3ff");

        //Capa Cielo
        this.Fondos.capaCielos(this.anchopantalla, this.escala);
        //Capa Mar
        this.Fondos.capaMares(this.anchopantalla, this.escala);
        //Capa Montañas
        this.Fondos.capaMontas(this.anchopantalla, this.escala);
        //Capa Suelo
        this.Fondos.capaSuelos(this.distancia, this.anchopantalla, this.escala);

        //Movida para el texto 
        this.src.textFont(font);
        this.src.textSize(35);
        this.src.text(this.src.floor(this.distancia).toString().padStart(6, 0), 1160, 45);

        this.src.pop();//Fin
    }

    /** Dibujar la pantalla de Game Over **/
    dibujarGameOver(img, y, obs, font) {

        this.src.push();//Principio

        this.src.clear();//Limpiar canvas

        //Los Fondos Parados
        this.Fondos.stopFondo(this.distancia, this.anchopantalla, this.escala);

        //Obstaculos
        for (let o of obs) {
            if (o.pos < this.anchopantalla + this.distancia) {
                this.src.image(o.img, this.escala * (o.pos - this.distancia), 540, 150, 150);
            }
        }

        this.animation.cabraConfusaAnimation(img, 90, y);//Animacion Cabra Confundida

        //Movida para el texto 
        this.src.fill(255);
        this.src.textFont(font);
        this.src.textSize(35);
        this.src.text(this.src.floor(this.distancia).toString().padStart(6, 0), 1160, 45);
        this.src.textAlign(this.src.CENTER);
        this.src.textSize(80);
        this.src.fill(0);
        this.src.textStyle(this.src.BOLD);
        this.src.text("GAME OVER", 700, 200);
        this.src.textStyle(this.src.NORMAL);
        let txtPress = this.src.abs((this.src.sin(this.src.frameCount * 0.03) * 5) + 55);
        this.src.fill("#ffff00");
        this.src.textSize(txtPress);
        this.src.text('Volver a Jugar?', 700, 500);

        this.src.pop();//Fin
    }

    /** Reseteo de Variables cambiantes **/
    resetDistancia() {
        this.distancia = 0;
        this.Fondos.resetFondo();
    }
}
