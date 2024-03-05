/************************************
 * Descripcion:
 * 
 * Canvas con las propiedades de la camara y la IA.
 * 
 */

let CabraCamara = function (src) {
    /** Variables **/
    let cnvX = 940;
    let cnvY = 680;

    let poseNet;
    let cuerpo;
    let video;

    //Llamadas a las Clases
    let Cuerpo = new Body(src, cnvX);
    let Clasificacion = new Ranking();

    src.setup = function () {
        let cnv = src.createCanvas(cnvX, cnvY);
        cnv.parent('cnv-cam');//Canvas

        //Camara
        video = src.createCapture(src.VIDEO);
        video.size(cnvX, cnvY);
        video.hide();//Ocultar el video

        poseNet = ml5.poseNet(video, PoseNetReady);

        poseNet.on("pose", getPoses);
        //Inicio del rank
        Clasificacion.viewRank();
        //Set localStorage Cuerpo
        localStorage.setItem("cuerpo", "true");
    }

    src.draw = function () {
        src.clear();
        src.image(video, 0, 0, cnvX, cnvY);//Añadir la camara al canvas
        
        if (cuerpo) {//Si hay un cuerpo
            Cuerpo.dibujarEsqueleto(cuerpo);
        }

        /** Modificar la linea de salto **/
        // Subir Linea
        if (localStorage.upSalto == "true") {
            Cuerpo.saltando--;
        }
        //Bajar Linea
        if (localStorage.downSalto == "true") {
            Cuerpo.saltando++;
        }

        Cuerpo.limiteSalto();//Dibuja el limite del salto

        //Actualizar el Ranking 
        if (localStorage.actualizarRanking == "true") {
            Clasificacion.viewRank();
            localStorage.setItem("actualizarRanking", "false");
        }

    }

    //PoseNet listo
    function PoseNetReady() {
        console.log("PoseNet Cargo Bien");
    }

    //Tengo las Poses
    function getPoses(poses) {
        if (poses.length > 0) {
            cuerpo = poses[0].pose;
        }
    }
}

new p5(CabraCamara);//Canvas Camara