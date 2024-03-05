/************************************
 * Descripcion:
 * 
 * La clase Backgrounds, contiene todos los fondos
 * del programa con sus propiedades y métodos.
 * 
 */

class Backgrounds {
    constructor(src, suelos_, montas_, mares_, cielos_) {
        this.src = src;//Contexto de p5.js

        /** Info Capas **/
        //Imagenes
        this.suelos_ = suelos_;
        this.montas_ = montas_;
        this.mares_ = mares_;
        this.cielos_ = cielos_;
        //Variables de Movimiento
        this.moverMonta = 0;
        this.moverMar = 0;
        this.moverCielo = 0;

        //Arrays del inicio 
        this.suelos = [{ pos: 0, img: suelos_[0] }, { pos: 99.9, img: suelos_[1] }, { pos: 199.8, img: suelos_[2] }];//Suelos Iniciales
        this.montas = [{ pos: 0, img: montas_[0] }, { pos: 99.9, img: montas_[1] }, { pos: 199.8, img: montas_[2] }];//Montañas Iniciales
        this.mares = [{ pos: 0, img: mares_[0] }, { pos: 99.9, img: mares_[1] }, { pos: 199.8, img: mares_[2] }];//Mares Iniciales
        this.cielos = [{ pos: 0, img: cielos_[0] }, { pos: 99.9, img: cielos_[1] }, { pos: 199.8, img: cielos_[2] }];//Cielos Iniciales
    }

    /** Dibujar los Suelos con movimiento **/
    capaSuelos(distancia, anchopantalla, escala) {
        //Bucle que revisa los suelos y los dibuja
        for (let s of this.suelos) {
            if (s.pos < anchopantalla + distancia) {
                this.src.image(s.img, escala * (s.pos - distancia), 0);
            }
        }

        //Bucle que modifica el array de los suelos
        for (let s of this.suelos) {
            if (s.pos < distancia - 110) {
                let imagen = this.suelos[0].img;//Imagen del primer objeto del Array
                let newsuelo = {
                    pos: this.suelos[this.suelos.length - 1].pos + 99.9,//Posision del ultimo suelo + 99
                    img: imagen
                };//Un nuevo objeto para el Array
                this.suelos.splice(0, 1);//Borra el primero del Array
                this.suelos.push(newsuelo);//Añade al Array
            }
        }
    }

    /** Dibujar las Montañas con movimiento **/
    capaMontas(anchopantalla, escala) {
        this.moverMonta += 0.3;//Velocidad a la que se mueve la x

        //Bucle que revisa las montañas y los dibuja
        for (let m of this.montas) {
            if (m.pos < anchopantalla + this.moverMonta) {
                this.src.image(m.img, escala * (m.pos - this.moverMonta), 0);
            }
        }

        //Bucle que modifica el array de las Montañas
        for (let m of this.montas) {
            if (m.pos < this.moverMonta - 110) {
                let imagen = this.montas[0].img;//Imagen del primer objeto del Array
                let newmonta = {
                    pos: this.montas[this.montas.length - 1].pos + 99.9,//Posision del ultimo suelo + 99
                    img: imagen
                };//Un nuevo objeto para el Array
                this.montas.splice(0, 1);//Borra el primero del Array
                this.montas.push(newmonta);//Añade al Array
            }
        }

    }

    /** Dibujar los Mares con movimiento **/
    capaMares(anchopantalla, escala) {
        this.moverMar += 0.2;//Velocidad a la que se mueve la x
        //Bucle que revisa los mares y los dibuja
        for (let m of this.mares) {
            if (m.pos < anchopantalla + this.moverMar) {
                this.src.image(m.img, escala * (m.pos - this.moverMar), 0);
            }
        }

        //Bucle que modifica el array de los mares
        for (let m of this.mares) {
            if (m.pos < this.moverMar - 110) {
                let imagen = this.mares[0].img;//Imagen del primer objeto del Array
                let newmar = {
                    pos: this.mares[this.mares.length - 1].pos + 99.9,//Posision del ultimo suelo + 99
                    img: imagen
                };//Un nuevo objeto para el Array
                this.mares.splice(0, 1);//Borra el primero del Array
                this.mares.push(newmar);//Añade al Array
            }
        }
    }
    
    /** Dibujar los Cielos con movimiento **/
    capaCielos(anchopantalla, escala) {
        this.moverCielo += 0.1;//Velocidad a la que se mueve X
        
        //Bucle que revisa los cielos y los dibuja
        for (let c of this.cielos) {
            if (c.pos < anchopantalla + this.moverCielo) {
                this.src.image(c.img, escala * (c.pos - this.moverCielo), 0);
            }
        }

        //Bucle que modifica el array de los Cielos
        for (let c of this.cielos) {
            if (c.pos < this.moverCielo - 110) {
                let imagen = this.cielos[0].img;//Imagen del primer objeto del Array
                let newcielo = {
                    pos: this.cielos[this.cielos.length - 1].pos + 99.9,//Posision del ultimo suelo + 99
                    img: imagen
                };//Un nuevo objeto para el Array
                this.cielos.splice(0, 1);//Borra el primero del Array
                this.cielos.push(newcielo);//Añade al Array
            }
        }
    }

    /** Dibujar los fondos sin movimiento **/
    stopFondo(distancia, anchopantalla, escala) {
        //Cielo
        for (let c of this.cielos) {
            if (c.pos < anchopantalla + this.moverCielo) {
                this.src.image(c.img, escala * (c.pos - this.moverCielo), 0);
            }
        }

        // Mar
        for (let m of this.mares) {
            if (m.pos < anchopantalla + this.moverMar) {
                this.src.image(m.img, escala * (m.pos - this.moverMar), 0);
            }
        }

        //Montañas
        for (let m of this.montas) {
            if (m.pos < anchopantalla + this.moverMonta) {
                this.src.image(m.img, escala * (m.pos - this.moverMonta), 0);
            }
        }

        //Suelos
        for (let s of this.suelos) {
            if (s.pos < anchopantalla + distancia) {
                this.src.image(s.img, escala * (s.pos - distancia), 0);
            }
        }
    }

    /** Reseteo de las variables necesarias **/
    resetFondo() {
        //Variables de Movimiento
        this.moverMonta = 0;
        this.moverMar = 0;
        this.moverCielo = 0;

        //Arrays del inicio 
        this.suelos = [{ pos: 0, img: this.suelos_[0] }, { pos: 99.9, img: this.suelos_[1] }, { pos: 199.8, img: this.suelos_[2] }];//Suelos Iniciales
        this.montas = [{ pos: 0, img: this.montas_[0] }, { pos: 99.9, img: this.montas_[1] }, { pos: 199.8, img: this.montas_[2] }];//Montañas Iniciales
        this.mares = [{ pos: 0, img: this.mares_[0] }, { pos: 99.9, img: this.mares_[1] }, { pos: 199.8, img: this.mares_[2] }];//Mares Iniciales
        this.cielos = [{ pos: 0, img: this.cielos_[0] }, { pos: 99.9, img: this.cielos_[1] }, { pos: 199.8, img: this.cielos_[2] }];//Cielos Iniciales
    }
}