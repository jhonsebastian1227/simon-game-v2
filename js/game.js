var colorList = ["green", "red", "yellow", "blue"];
var randomList = [];
var filledListBtn = [];
var start = "closed";
var countLevel = 0;
var numberRandom = 0;
var count = -1;

// generador de sonido
function sounds(value) {
    var sound = new Audio("./sounds/" + value + ".mp3");
    sound.play();
}

// generador de números aleatorios y animación
function animation(value = "", valueType, time, keyRandom){
    // Número aleatorio
    if (keyRandom === true) {
        numberRandom = Math.floor(Math.random() * 4);
        randomList.push(colorList[numberRandom]);
        value = "." + randomList[randomList.length - 1];
        countLevel++;
        if (start == "open") {
            $("h1").text("Level " + countLevel);
            sounds(colorList[numberRandom]);
        }
    }
    
    // Animación
    $(value).addClass(valueType);
    setTimeout(function() {
        $(value).removeClass(valueType);
    }, time);
}

// funcion para comenzar el juego con tecla o boton
function startGame(event) {
    if(start === "closed" && (event.key === "a" || event.key === "A" || event === "start")){
        count = -1;
        start = "open";
        animation("", "animation", 200, true);
        sounds(randomList[0]);
   }

   if (start === "newGame") {
        countLevel = 0;
        count = -1;
        filledListBtn = [];
        randomList = [];
        start = "open";
        animation("", "animation", 200, true);
        sounds(randomList[0]);
    }
}

// tecla
$(document).keypress(function(event){
   startGame(event);
});

// boton
$(".play-btn").click(function(){
    startGame("start");
});

// instruciones
$(".menu-toggle").click(function(){
    $(".menu-content").slideToggle();

    var imagenActual = $(this).find('img').attr('src');
    if(imagenActual === './images/inf.svg') {
        $(this).find('img').attr('src', './images/x.svg');
    } else {
        $(this).find('img').attr('src', './images/inf.svg');
    }
});

// eventos botones
$(".btn").on("click", function() {
    
    if (start === "open") {
        count++;
        filledListBtn.push(this.id);
        animation("." + this.id, "pressed", 200, false);
        sounds(this.id);
    }

    if (start === "open" && (JSON.stringify(randomList[count]) != JSON.stringify(filledListBtn[count]))) {
        start = "newGame";
    }
    
    if (start === "newGame") {
        $("h1").text("Game Over");
        animation("body", "game-over", 200, false);
        animation("." + this.id, "pressed", 200, false);
        sounds("wrong");
    }

    if (start === "open" && (JSON.stringify(randomList) === JSON.stringify(filledListBtn))) {
        count = -1;
        filledListBtn = [];
        setTimeout(function() {
            animation("", "animation", 200, true);
        }, 700);
    }

    if (start === "closed"){
        count = -1;
    }
});