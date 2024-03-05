/************************************
 * Descripcion:
 * 
 * Canvas con las propiedades del juego
 * y sus distintas etapas.
 * 
 */

let CabraGame = function (src) {
    /** Variables **/
    const INICIO = 0, MENU = 1, JUEGO = 2, GAMEOVER = 3;
    let escena = INICIO;

    //Tamaños del Canvas x e y
    let cnvX = 1400;
    let cnvY = 800;

    //Imagenes
    let cabra_ = [];
    let cabraRandom = src.floor(src.random(4));
    let cabraDerrota_ = [];
    let obs_ = [];
    let suelos_ = [];
    let montas_ = [];
    let mares_ = [];
    let cielos_ = [];
    let fondo_, play_;

    //Texto
    let font;

    //Sonidos
    let $play_ = false;//Cambiar a true si es automatico
    let $inicio, $choque, $salto, $meh;

    //Llamadas a las Clases
    let Animacion = new Animations(src);
    let Cabra = new Goat(src, cnvY, Animacion);
    let Clasificacion = new Ranking();
    let Fondos;
    let Pantalla;
    let Obstaculo;

    //Funcion encargada de precargar los elementos para el programa como fuentes, imagenes y sonidos
    src.preload = function () {
        /** Precarga de las Imagenes **/
        //Cabras
        cabra_[0] = src.loadImage("./recursos/img/cabras/animacion_Cabra_0.png");
        cabra_[1] = src.loadImage("./recursos/img/cabras/animacion_Cabra_1.png");
        cabra_[2] = src.loadImage("./recursos/img/cabras/animacion_Cabra_2.png");
        cabra_[3] = src.loadImage("./recursos/img/cabras/animacion_Cabra_3.png");

        //Cabras En Derrota
        cabraDerrota_[0] = src.loadImage("./recursos/img/cabras/animacion_CabraDead_0.png");
        cabraDerrota_[1] = src.loadImage("./recursos/img/cabras/animacion_CabraDead_1.png");
        cabraDerrota_[2] = src.loadImage("./recursos/img/cabras/animacion_CabraDead_2.png");
        cabraDerrota_[3] = src.loadImage("./recursos/img/cabras/animacion_CabraDead_3.png");
        //Obstaculos
        obs_[0] = src.loadImage("./recursos/img/obstaculos/arrbusto.png");
        obs_[1] = src.loadImage("./recursos/img/obstaculos/roca.png");
        obs_[2] = src.loadImage("./recursos/img/obstaculos/muro.png");

        /** Fondos **/
        //Cielos
        cielos_[0] = src.loadImage("./recursos/img/fondos/cielo/Cielo_1.png");
        cielos_[1] = src.loadImage("./recursos/img/fondos/cielo/Cielo_2.png");
        cielos_[2] = src.loadImage("./recursos/img/fondos/cielo/Cielo_3.png");
        //Mares
        mares_[0] = src.loadImage("./recursos/img/fondos/mares/Mar_1.png");
        mares_[1] = src.loadImage("./recursos/img/fondos/mares/Mar_2.png");
        mares_[2] = src.loadImage("./recursos/img/fondos/mares/Mar_3.png");
        //Montañas
        montas_[0] = src.loadImage("./recursos/img/fondos/monts/Mont_1.png");
        montas_[1] = src.loadImage("./recursos/img/fondos/monts/Mont_2.png");
        montas_[2] = src.loadImage("./recursos/img/fondos/monts/Mont_3.png");
        //Suelos
        suelos_[0] = src.loadImage("./recursos/img/fondos/suelos/Suelo_1.png");
        suelos_[1] = src.loadImage("./recursos/img/fondos/suelos/Suelo_2.png");
        suelos_[2] = src.loadImage("./recursos/img/fondos/suelos/Suelo_3.png");
        //Inicio
        play_ = src.loadImage("./recursos/img/play.png");
        //Fondo del MENU
        fondo_ = src.loadImage("./recursos/img/Fondo_A.png");

        /** Precarga de la Fuente del Texto **/
        font = src.loadFont("./recursos/font/BirchLeaf.otf");

        /** Precarga de Sonidos y Musica **/
        $salto = src.loadSound('./recursos/audio/salto.mp3');
        $inicio = src.loadSound('./recursos/audio/inicio.mp3');
        $choque = src.loadSound('./recursos/audio/choque.mp3');
        $meh = src.loadSound('./recursos/audio/meh.mp3');

        /** Llamadas de las Clases que necesitan X archivo de la precarga **/
        Fondos = new Backgrounds(src, suelos_, montas_, mares_, cielos_);
        Pantalla = new Screen(src, cnvX, Animacion, Fondos);
        Obstaculo = new Obstacle(src, Pantalla.anchopantalla, Pantalla.escala, cnvY, obs_);
    }

    src.setup = function () {
        let cnv = src.createCanvas(cnvX, cnvY);
        cnv.parent('cnv-game');//Canvas

        //Ajustar el volumen de los sonidos
        $inicio.setVolume(0.5);
        $salto.setVolume(0.6);
        $choque.setVolume(0.4);
        $meh.setVolume(0.4);

    }

    src.draw = async function () {
        /** DIBUJAR EN EL CANVAS **/
        //Pantalla Inicio 
        if (escena == INICIO) {
            Pantalla.dibujarInicio(play_, font);//Pantalla
        }

        //Pantalla Menu
        if (escena == MENU) {
            //Activar la Musica en loop
            if ($play_) {
                $inicio.loop();
                $play_ = false;
            }

            Pantalla.dibujarMenu(fondo_, font);//Pantalla
        }

        //Pantalla Juego
        if (escena == JUEGO) {
            //Activar la Musica en loop
            if ($play_) {
                $inicio.loop();
                $play_ = false;
            }

            Pantalla.dibujarJuego(font);//Pantalla
            Obstaculo.dibujarObsts(Pantalla.distancia, obs_);//Obstaculos
            Cabra.player(cabra_[cabraRandom]);//Cabra / jugador
        }

        //Pantalla Derrota
        if (escena == GAMEOVER) {
            //Parar la musica
            if ($play_ == false) {
                $inicio.stop();
                $salto.stop();
                $choque.play();
                $play_ = true;
            }

            Pantalla.dibujarGameOver(cabraDerrota_[cabraRandom], Cabra.cabra.pos, Obstaculo.obstaculo, font);//Pantalla
        }

        /** MOVER o LOGICA **/
        //Pantalla Juego
        if (escena == JUEGO) {
            Cabra.move(Pantalla.distancia, $meh);//Movimientos de la Cabra(player)
            Pantalla.distancia = Cabra.distActualizada;//Actualizar la distancia de la Cabra

            Cabra.colision(Pantalla.distancia, Obstaculo.obstaculo[0], Pantalla.escala);//Activar la coliciones con la cabra

            if (Cabra.escena == GAMEOVER) {//Cuando la Cabra se choca
                await Clasificacion.addPoints(Pantalla.distancia);//Añade los puntos al ranking
                localStorage.setItem("actualizarRanking", "true");//Actualiza el ranking
                escena = GAMEOVER;//La Pantalla cambia a Game over
            }
        }

        //Salto con la IA
        if (escena == JUEGO && localStorage.salto == "true") {
            Cabra.salto($salto);
        }

        /** Modificar la linea de salto de la camara **/
        //Subir Linea
        if (src.keyIsDown(87)) {
            console.log("W");
            localStorage.setItem("upSalto", "true");
        } else {
            localStorage.setItem("upSalto", "false");
        }
        //Bajar Linea
        if (src.keyIsDown(83)) {
            console.log("S");
            localStorage.setItem("downSalto", "true");
        } else {
            localStorage.setItem("downSalto", "false");
        }

    }

    src.keyPressed = function (event) {
        //Salto con las Flechas para probar el Juego durante el desarrollo
        if (escena == JUEGO && event.keyCode === src.UP_ARROW) {
            Cabra.salto($salto);
        } else if (event.keyCode === src.DOWN_ARROW) {
            Cabra.gravedad = 3;
        }

        //Pasar del INICIO al MENU
        if (escena == INICIO && event.key == ' ') {
            escena = MENU;
            $play_ = true;
        } else if (event.key == ' ' && escena == MENU) {//Pasar del MENU al JUEGO
            escena = JUEGO;
        }

        //Pasar al Juego del GameOver
        if (escena == GAMEOVER && event.key == ' ') {
            cabraRandom = src.floor(src.random(4));//Cambiar la Cabra
            Pantalla.resetDistancia();//Reset
            Obstaculo.resetObts();//Reset
            Cabra.resetCabra();//Reset
            escena = JUEGO;
        }

        //Borrar el nombre del LocalStorage
        if (event.code == "KeyN") {
            localStorage.removeItem("nombre");
        }

        //Cambiar de Cuerpo a tobillos nada mas
        if (event.code == "KeyC") {
            localStorage.setItem("cuerpo", "false");
        }

        if (event.code == "KeyV") {
            localStorage.setItem("cuerpo", "true");
        }

        //Añadir Nombre al Ranking
        if (event.code == "KeyA") {
            Clasificacion.addToRank();
            localStorage.setItem("actualizarRanking", "true");
        }

        //Borra el LocalStorage
        if (event.code == "KeyL") {
            localStorage.clear();
        }
    }

}

new p5(CabraGame);//Inizializar el Canvas Juego