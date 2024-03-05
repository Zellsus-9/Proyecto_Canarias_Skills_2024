/************************************
 * Descripcion:
 * 
 * La clase Body, es donde utilizamos lo que nos
 * da la librería de ml5, exactamente el modelo del 
 * poseNet y sus atributos.
 * 
 */

class Body {
    constructor(src, cnvX) {
        this.src = src;//Contexto de p5.js

        this.canvasX = cnvX;//Ancho del Canvas
        this.saltando = 600;//Distancia a la que saltar
    }

    /** Ver y dibujar el esqueleto **/
    dibujarEsqueleto(cuerpo) {
        //Partes del Cuerpo
        let hombroI = cuerpo.leftShoulder;
        let hombroD = cuerpo.rightShoulder;
        let codoI = cuerpo.leftElbow;
        let codoD = cuerpo.rightElbow;
        let muñecaI = cuerpo.leftWrist;
        let muñecaD = cuerpo.rightWrist;
        let caderaI = cuerpo.leftHip;
        let caderaD = cuerpo.rightHip;
        let rodillaI = cuerpo.leftKnee;
        let rodillaD = cuerpo.rightKnee;
        let tobilloI = cuerpo.leftAnkle;
        let tobilloD = cuerpo.rightAnkle;

        this.src.push();//Principio

        this.src.fill("red");
        this.src.ellipse(cuerpo.nose.x, cuerpo.nose.y, 25);//Nariz
        this.src.strokeWeight(6);
        this.src.fill("white");

        if (localStorage.cuerpo == "true") {
            /** Hombros **/
            this.src.ellipse(hombroI.x, hombroI.y, 25);
            this.src.ellipse(hombroD.x, hombroD.y, 25);

            /** Codos **/
            this.src.ellipse(codoI.x, codoI.y, 25);
            this.src.ellipse(codoD.x, codoD.y, 25);

            /** Muñecas **/
            this.src.ellipse(muñecaI.x, muñecaI.y, 25);
            this.src.ellipse(muñecaD.x, muñecaD.y, 25);

            /** Caderas **/
            this.src.ellipse(caderaI.x, caderaI.y, 25);
            this.src.ellipse(caderaD.x, caderaD.y, 25);

            /** Rodillas **/
            this.src.ellipse(rodillaI.x, rodillaI.y, 25);
            this.src.ellipse(rodillaD.x, rodillaD.y, 25);

            /** Tobillos **/
            this.src.ellipse(tobilloI.x, tobilloI.y, 25);
            this.src.ellipse(tobilloD.x, tobilloD.y, 25);

            /** LINEAS **/
            this.src.strokeWeight(3);
            this.src.stroke("white");

            //Muñeca a Codo
            this.src.line(muñecaI.x, muñecaI.y, codoI.x, codoI.y);
            this.src.line(muñecaD.x, muñecaD.y, codoD.x, codoD.y);

            //Codo a Hombro
            this.src.line(codoI.x, codoI.y, hombroI.x, hombroI.y);
            this.src.line(codoD.x, codoD.y, hombroD.x, hombroD.y);

            //Hombro
            this.src.line(hombroI.x, hombroI.y, hombroD.x, hombroD.y);

            //Hombro a Cadera
            this.src.line(hombroI.x, hombroI.y, caderaI.x, caderaI.y);
            this.src.line(hombroD.x, hombroD.y, caderaD.x, caderaD.y);

            //Cadera
            this.src.line(caderaI.x, caderaI.y, caderaD.x, caderaD.y);

            // Cadera a Rodilla
            this.src.line(caderaI.x, caderaI.y, rodillaI.x, rodillaI.y);
            this.src.line(caderaD.x, caderaD.y, rodillaD.x, rodillaD.y);

            //Rodilla a Tobillos
            this.src.line(tobilloI.x, tobilloI.y, rodillaI.x, rodillaI.y);
            this.src.line(tobilloD.x, tobilloD.y, rodillaD.x, rodillaD.y);

        } else {
            /** Tobillos **/
            this.src.ellipse(tobilloI.x, tobilloI.y, 25);
            this.src.ellipse(tobilloD.x, tobilloD.y, 25);
        }

        this.src.pop();//Fin

        /** Salto **/
        //Si las rodillas están por encima de la distancia de salto
        if (tobilloD.y < this.saltando && tobilloI.y < this.saltando) {
            localStorage.setItem("salto", "true");//Salto en true
        } else {
            localStorage.setItem("salto", "false");//Salto en false
        }
    }

    /** Dibuja a una linea de referencia para el salto **/
    limiteSalto() {
        this.src.push();//Principio

        this.src.stroke("white");
        this.src.strokeWeight(8);
        this.src.line(0, this.saltando, this.canvasX, this.saltando);

        this.src.stroke("black");
        this.src.strokeWeight(4);
        this.src.line(0, this.saltando, this.canvasX, this.saltando);

        this.src.pop();//Fin
    }
}