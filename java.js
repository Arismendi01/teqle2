//esto es para que el menu tenga funcionalidad en la pagina aparezac y desaparezca
window.addEventListener("scroll",function(){
    var header = this.document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})

//Efecto del texto escritura
var typed = new Typed('.typed', {
//	strings: [
//		'<i class="saludo">Hola universo</i>',
//		'<i class="saludo">Bienvenido a</i>',
//		'<i class="saludo">Teqle!</i>',
//	],
	stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
	smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: false, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
});

//sección opiniones
var swiper = new Swiper('.swiper-container', {
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
	  rotate: 0,
	  stretch: 0,
	  depth: 100,
	  modifier: 1,
	  slideShadows: true,
	},
	loop: true,
	autoplay: {
	  delay: 5000, // 5 segundos de retraso entre diapositivas
	},
	speed: 800, // Ajusta la velocidad de transición según sea necesario
  });

  //este es el titulo de las secciones
  class ScrambleTheText {
    constructor(getTheTitle, chars) {
        this.getTheTitle = getTheTitle;
        this.chars = chars;
        this.update = this.update.bind(this);
    }

    setText(newText) {
        var oldText = this.getTheTitle.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise((resolve) => (this.resolve = resolve));

        this.queue = [];
        for (let i = 0; i < length; i++) {
            var from = oldText[i] || "";
            var to = newText[i] || "";
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({
                from,
                to,
                start,
                end
            });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomCharacter();
                    this.queue[i].char = char;
                }
                output += `<span class="dummy">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.getTheTitle.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomCharacter() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// The Titles
let serviciosTitle = "Nuestros Servicios";
let opinionesTitle = "Opiniones";

let getServiciosTitle = document.getElementById("servicios-section").querySelector(".title");
let getOpinionesTitle = document.getElementById("opiniones-section").querySelector(".opiniones");

let ServiciosTitleEffect = new ScrambleTheText(getServiciosTitle, serviciosTitle);
let OpinionesTitleEffect = new ScrambleTheText(getOpinionesTitle, opinionesTitle);

let nextServiciosTitle = () => {
    ServiciosTitleEffect.setText(serviciosTitle).then(() => {
        setTimeout(nextServiciosTitle, 1500);
    });
};

let nextOpinionesTitle = () => {
    OpinionesTitleEffect.setText(opinionesTitle).then(() => {
        setTimeout(nextOpinionesTitle, 1500);
    });
};

nextServiciosTitle();
nextOpinionesTitle();