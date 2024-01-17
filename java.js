// Esto es para que el menú tenga funcionalidad en la página aparezca y desaparezca
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Efecto del texto escritura
const typed = new Typed('.typed', {
    // strings: [
    //     '<i class="saludo">Hola universo</i>',
    //     '<i class="saludo">Bienvenido a</i>',
    //     '<i class="saludo">Teqle!</i>',
    // ],
    stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
    typeSpeed: 75, // Velocidad en milisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animación. Aplica también cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1500, // Tiempo de espera después de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitante
    cursorChar: '|', // Caracter para el cursor
    contentType: 'html', // 'html' o 'null' para texto sin formato
});

// Sección opiniones
const swiper = new Swiper('.swiper-container', {
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
        const oldText = this.getTheTitle.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
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
let clientes2Title = "Clientes";
let teamTitle = "Team TEQLE!";

let getServiciosTitle = document.getElementById("servicios-section").querySelector(".title");
let getOpinionesTitle = document.getElementById("opiniones-section").querySelector(".opiniones");
let getClientes2Title = document.getElementById("clientes2-section").querySelector(".clientes2");
let getTeamTitle = document.getElementById("team").querySelector(".team");

let ServiciosTitleEffect = new ScrambleTheText(getServiciosTitle, serviciosTitle);
let OpinionesTitleEffect = new ScrambleTheText(getOpinionesTitle, opinionesTitle);
let Clientes2TitleEffect = new ScrambleTheText(getClientes2Title, clientes2Title);
let TeamTitleEffect = new ScrambleTheText(getTeamTitle, teamTitle);

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

let nextClientes2Title = () => {
    Clientes2TitleEffect.setText(clientes2Title).then(() => {
        setTimeout(nextClientes2Title, 1500);
    });
};

let nextTeamTitle = () => {
    TeamTitleEffect.setText(teamTitle).then(() => {
        setTimeout(nextTeamTitle, 1500);
    });
};

nextServiciosTitle();
nextOpinionesTitle();
nextClientes2Title();
nextTeamTitle();


// Configuración del carrusel de marcas sección
const carrusel = document.querySelector(".carrusel-items");

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;

const start = () => {
    intervalo = setInterval(function () {
        carrusel.scrollLeft = carrusel.scrollLeft + step;
        if (carrusel.scrollLeft === maxScrollLeft) {
            step = step * -1;
        } else if (carrusel.scrollLeft === 0) {
            step = step * -1;
        }
    }, 10);
};

const stop = () => {
    clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
    stop();
});

carrusel.addEventListener("mouseout", () => {
    start();
});

start();









//footer
document.addEventListener('DOMContentLoaded', function () {
    // Lógica para crear y agregar elementos al DOM

    // Agregar elementos a la lista de noticias recientes
    var recentNewsList = document.getElementById('recentNewsList');
    addNewsItem(recentNewsList, 'Want to start Your Own Play School.', 'Call +91-9122588799');
    addNewsItem(recentNewsList, 'Now we are in Faridabad,Now we are in DaudNagar.', 'Call +91-9122588799, +91-9122588799');
    addNewsItem(recentNewsList, 'Now we are in Ranchi, Admission open.', 'Call +91-9122588799, +91-9122588799');

    // Agregar formulario de correo electrónico
    var emailFormContainer = document.getElementById('emailFormContainer');
    addEmailForm(emailFormContainer);

    // Agregar elementos a la galería
    var galleryList = document.getElementById('galleryList');
    addGalleryItem(galleryList, 'https://images.unsplash.com/photo-1477239439998-839196943351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=414&q=80');
    // Repite este proceso para otros elementos

    // Agregar elementos al menú de navegación
    var footerMenu = document.getElementById('footer-menu');
    addMenuItem(footerMenu, 'Support', '#');
    addMenuItem(footerMenu, 'Contact Us', '#');
    addMenuItem(footerMenu, 'Disclaimer', '#');
    addMenuItem(footerMenu, 'Add more', '#');

    // Agregar enlaces a las redes sociales
    var footerSocials = document.getElementById('footer-socials');
    addSocialLink(footerSocials, 'Facebook', 'https://facebook.com');
    addSocialLink(footerSocials, 'Twitter', 'https://twitter.com');
    addSocialLink(footerSocials, 'Instagram', 'https://instagram.com');
    addSocialLink(footerSocials, 'YouTube', 'https://youtube.com');
    addSocialLink(footerSocials, 'Telegram', 'https://telegram.org');
});

// Funciones de ayuda para agregar elementos al DOM

function addNewsItem(parent, title, description) {
    var listItem = document.createElement('li');
    listItem.classList.add('clearfix', 'gem-pp-posts');

    var textDiv = document.createElement('div');
    textDiv.classList.add('gem-pp-posts-text');

    var newsItem = document.createElement('div');
    newsItem.classList.add('gem-pp-posts-item');
    newsItem.innerHTML = `<a href="#">${title}</a>`;

    var dateItem = document.createElement('div');
    dateItem.classList.add('gem-pp-posts-date');
    dateItem.textContent = description;

    textDiv.appendChild(newsItem);
    textDiv.appendChild(dateItem);
    listItem.appendChild(textDiv);
    parent.appendChild(listItem);
}

function addEmailForm(parent) {
    var form = document.createElement('form');
    form.method = 'post';
    form.classList.add('wpcf7-form');
    form.noValidate = 'novalidate';

    var formDiv = document.createElement('div');
    formDiv.classList.add('contact-form-footer');

    formDiv.innerHTML = `
        <p><span class="wpcf7-form-control-wrap your-first-name"><input type="text" name="your-first-name" value="" size="40" class="wpcf7-form-control wpcf7-text" aria-invalid="false" placeholder="Your name"></span></p>
        <p><span class="wpcf7-form-control-wrap your-email_1"><input type="email" name="your-email_1" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-email" aria-invalid="false" placeholder="Your email"></span></p>
        <p><span class="wpcf7-form-control-wrap your-message"><textarea name="your-message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" aria-invalid="false" placeholder="Your message"></textarea></span></p>
        <div><input type="submit" value="Send" class="wpcf7-form-control wpcf7-submit"><span class="ajax-loader"></span></div>
    `;

    form.appendChild(formDiv);
    parent.appendChild(form);
}

function addGalleryItem(parent, imageUrl) {
    var listItem = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.classList.add('magnific-anchor');
    var image = document.createElement('img');
    image.src = imageUrl;
    anchor.appendChild(image);
    listItem.appendChild(anchor);
    parent.appendChild(listItem);
}

function addMenuItem(parent, text, link) {
    var menuItem = document.createElement('li');
    menuItem.id = `menu-item-${parent.children.length + 1}`;
    menuItem.classList.add('menu-item', 'menu-item-type-custom', 'menu-item-object-custom');
    var anchor = document.createElement('a');
    anchor.href = link;
    anchor.textContent = text;
    menuItem.appendChild(anchor);
    parent.appendChild(menuItem);
}

function addSocialLink(parent, title, link) {
    var socialLink = document.createElement('a');
    socialLink.href = link;
    socialLink.target = '_blank';
    socialLink.title = title;
    socialLink.classList.add('socials-item');
    socialLink.innerHTML = `<i class="fab fa-${title.toLowerCase()} ${title.toLowerCase()}"></i>`;
    parent.appendChild(socialLink);
}




//este es el cursor que no esta habilitado
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById("myVideo");
    const siteWideCursor = document.querySelector('.custom-cursor.site-wide');
    const playCursor = document.getElementById("playCursor");
    const pauseCursor = document.getElementById("pauseCursor");
    const boxcursor = document.getElementById("boxcursor");

    const playPause = () => {
        const isPaused = video.paused;
        video[isPaused ? "play" : "pause"]();
        updateCursor();
    };

    const updateCursor = () => {
        playCursor.style.display = video.paused ? 'block' : 'none';
        pauseCursor.style.display = video.paused ? 'none' : 'block';
        siteWideCursor.style.backgroundImage = video.paused ? "url('/img/play.png')" : "url('/img/pause.png')";
    };

    document.addEventListener('mousemove', TrackCursor);
    document.addEventListener('mousedown', () => {
        siteWideCursor.classList.add('active');
        playPause();
    });
    document.addEventListener('mouseup', () => siteWideCursor.classList.remove('active'));

    boxcursor.addEventListener("mouseenter", function () {
        siteWideCursor.style.display = 'none';
        playCursor.style.display = 'block';
        pauseCursor.style.display = 'none';
        updateCursor();
    });

    boxcursor.addEventListener("mouseleave", function () {
        if (!video.paused) {
            siteWideCursor.style.display = 'none';
        }
        playCursor.style.display = 'none';
        pauseCursor.style.display = 'none';
    });

    video.addEventListener("play", function () {
        updateCursor();
    });

    video.addEventListener("pause", function () {
        updateCursor();
    });

    // Reproducción automática la primera vez
    video.play();
    updateCursor();
});

function TrackCursor(evt) {
    const siteWideCursor = document.querySelector('.custom-cursor.site-wide');
    const w = siteWideCursor.clientWidth;
    const h = siteWideCursor.clientHeight;

    siteWideCursor.style.transform = `translate(${evt.clientX - w / 2}px, ${evt.clientY - h / 2}px)`;
}