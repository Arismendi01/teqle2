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
var cantidadTarjetas = 6; // Ajusta este valor según la cantidad de tarjetas que tengas

var slidesPerViewConfig = 3; // Número de tarjetas visibles en el centro

if (cantidadTarjetas <= slidesPerViewConfig) {
    slidesPerViewConfig = cantidadTarjetas;
}

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: slidesPerViewConfig,
    coverflowEffect: {
        rotate: 0, // Ajusta el ángulo de rotación si lo deseas
        stretch: 100, // Ajusta el estiramiento según sea necesario
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});