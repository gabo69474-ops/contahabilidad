// ===============================
// Manejo de navegación y secciones con scroll suave
// ===============================

const enlaces = document.querySelectorAll('nav a[data-seccion]');
const secciones = document.querySelectorAll('.seccion');

function inicializarMenu() {
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      const seccion = enlace.dataset.seccion;
      if (document.getElementById(seccion)) {
        activarSeccion(seccion, true);
        history.replaceState(null, "", `${window.location.pathname}#${seccion}`);
      } else {
        console.warn(`No existe la sección: ${seccion}`);
      }
    });
  });
}

function activarSeccion(nombreSeccion, smooth = false) {
  // Desactivar enlaces
  enlaces.forEach(a => a.classList.remove('activo'));
  const enlace = document.querySelector(`#menu a[data-seccion="${nombreSeccion}"]`);
  if (enlace) enlace.classList.add('activo');

  // Mostrar/ocultar secciones
  secciones.forEach(sec => sec.classList.remove('activa'));
  const activa = document.getElementById(nombreSeccion);
  if (activa) {
    activa.classList.add('activa');
    if (smooth) {
      activa.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ===============================
// Botones especiales (contacto y blog)
// ===============================

function scrollASeccion(nombre) {
  activarSeccion(nombre, true);
}

document.querySelectorAll('.btn-contacto').forEach(b => {
  b.addEventListener('click', e => {
    e.preventDefault();
    scrollASeccion('contacto');
  });
});

document.querySelectorAll('.btn-blog').forEach(b => {
  b.addEventListener('click', e => {
    e.preventDefault();
    scrollASeccion('blog');
  });
});

// ===============================
// Carrusel testimonios
// ===============================

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

function moverCarrusel() {
  if (!track || !track.children.length) return;
  const ancho = track.children[0].clientWidth;
  track.style.transform = `translateX(-${index * ancho}px)`;
}

if (nextBtn && prevBtn && track) {
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % track.children.length;
    moverCarrusel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + track.children.length) % track.children.length;
    moverCarrusel();
  });
}

// ===============================
// Lightbox de imágenes
// ===============================

function openLightbox(imgElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  if (!lightbox || !lightboxImg || !caption) return;

  lightbox.style.display = 'block';
  lightboxImg.src = imgElement.src;
  caption.textContent = imgElement.alt;
}

document.querySelector('.close')?.addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target.id === 'lightbox') {
    e.target.style.display = 'none';
  }
});

// ===============================
// Buscador en portafolio
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const buscador = document.getElementById('buscador');
  if (buscador) {
    buscador.addEventListener('input', () => {
      const texto = buscador.value.trim().toLowerCase();
      document.querySelectorAll('.portfolio-item').forEach(item => {
        const contenido = item.textContent.trim().toLowerCase();
        item.style.display = contenido.includes(texto) ? '' : 'none';
      });
    });
  }
});

// ===============================
// Inicialización al cargar la página con scroll suave
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();

  // Prioridad: hash > parámetro > inicio
  let seccion = window.location.hash.replace("#", "");
  if (!seccion) {
    const params = new URLSearchParams(window.location.search);
    seccion = params.get("seccion") || "inicio";
  }

  activarSeccion(seccion);

  window.addEventListener("hashchange", () => {
    const nueva = window.location.hash.replace("#", "");
    activarSeccion(nueva, true);
  });

  // ===============================
  // Animación numérica
  // ===============================
  const elemento = document.getElementById("num");
  if (elemento) {
    const objetivo = 1280;
    const duracion = 1500;
    let inicio = null;

    function animar(timestamp) {
      if (!inicio) inicio = timestamp;
      const progreso = timestamp - inicio;
      const valor = Math.min(Math.floor((progreso / duracion) * objetivo), objetivo);
      elemento.textContent = valor;

      if (progreso < duracion) requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
  }
});








