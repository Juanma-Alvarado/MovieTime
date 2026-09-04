let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnBusqueda = document.querySelector("#btnBusqueda");
const buscador = document.querySelector(".input-search");
const cardContainer = document.getElementById("contenedor");

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

const mostrarToast = (mensaje, colorFondo) => {
    Toastify({
        text: mensaje,
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: colorFondo,
        },
    }).showToast();
};

// Dando forma a las cards
const cargarPeliculas = async () => {
    try {
        // Obtener los datos de la API y renderizar las cards
        const respuesta = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-MX&page=${pagina}`
        );

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = "";
            datos.results.forEach((pelicula) => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <div class="star">
                            <img src="assect/bxs-star.svg" alt="">                            
                            <p class"vote">${pelicula.vote_average}</p>
                        </div>
                    </div>
                            `;
            });

            document.getElementById("contenedor").innerHTML = peliculas;
        }

    } catch (error) {
        console.log(error);
        mostrarToast("Error", "linear-gradient(to right, #ff5f6d, #ffc371)");
    }
};

// Filtrar las cards que coincidan con el término de búsqueda.
// Se registra una sola vez (no dentro de cargarPeliculas) para no acumular
// listeners duplicados cada vez que se cambia de página.
let sinResultadosNotificado = false;

buscador.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".pelicula");
    let coincidencias = 0;

    cards.forEach((card) => {
        const title = card.querySelector(".titulo").textContent.toLowerCase();
        const coincide = title.includes(term);
        card.style.display = coincide ? "block" : "none";
        if (coincide) coincidencias++;
    });

    if (coincidencias === 0 && term.length > 0) {
        if (!sinResultadosNotificado) {
            mostrarToast("Sin resultados 😕", "linear-gradient(to right, #ff5f6d, #ffc371)");
            sinResultadosNotificado = true;
        }
    } else {
        sinResultadosNotificado = false;
    }
});

cargarPeliculas();

// Cambio de titulo
let webTitle = document.title;

window.addEventListener("blur", () => {
    webTitle = document.title;
    document.title = "¡Regresa! ¡No te vayas! 😱";
});
window.addEventListener("focus", () => {
    document.title = webTitle;
});