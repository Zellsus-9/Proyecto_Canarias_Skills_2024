/************************************
 * Descripcion:
 * 
 * La clase Animacions, contiene todas las animaciones
 * tipo Sprites que se realizan en el programa.
 * 
 */

class Animations {
    constructor(src) {
        this.src = src;//Contexto de p5.js

        //Animación de la Cabra
        //Tamaño del recorte de sprite dentro de la imagen
        this.anchoC = 200;
        this.altoC = 200;
        //Definiciones para los Sprites
        this.numColumC = 2;//Número  de columnas del sprite
        this.numFilaC = 1;//Número  de filas del sprite
        this.spriteActual = 0;//Sprite actual

    }

    /** Animacion de la Cabra **/
    cabraAnimation(img, x, y) {
        //Cada 15 frames cambia el sprite
        if (this.src.frameCount % 15 == 0) {
            this.spriteActual++;
        }

        let maxSprites = this.numColumC * this.numFilaC - 1;//Número de Sprites en total
        if (this.spriteActual > maxSprites) {//Para no superar el número máximo de Sprites
            this.spriteActual = 0;//Vuelta al primer Sprite
        }

        let columna = this.spriteActual % this.numColumC;//Columna del Sprite actual
        let fila = Math.floor(this.spriteActual / this.numColumC);//Fila del Sprite actual

        /** Dibujar la imagen **/
        // image(imagen, x, y, ancho, alto, columna, fila, ancho dentro de la imagen, alto dentro de la imagen);
        this.src.image(img, x, y, this.anchoC, this.altoC, columna * this.anchoC, fila * this.altoC, this.anchoC, this.altoC);
    }

    /** Animación de la Cabra Confusa **/
    cabraConfusaAnimation(img, x, y) {
        //Cada 15 frames cambia el sprite
        if (this.src.frameCount % 15 == 0) {
            this.spriteActual++;
        }

        let maxSprites = this.numColumC * this.numFilaC - 1;//Número de Sprites en total
        if (this.spriteActual > maxSprites) {//Para no superar el número máximo de Sprites
            this.spriteActual = 0;//Vuelta al primer Sprite
        }

        let columna = this.spriteActual % this.numColumC;//Columna del Sprite actual
        let fila = Math.floor(this.spriteActual / this.numColumC);//Fila del Sprite actual

        /** Dibujar la imagen **/
        // image(imagen, x, y, ancho, alto, columna, fila, ancho dentro de la imagen, alto dentro de la imagen)
        this.src.image(img, x, y, this.anchoC, this.altoC, columna * this.anchoC, fila * this.altoC, this.anchoC, this.altoC);
    }
}
