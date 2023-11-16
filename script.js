// Variable global para el objeto de mapa
var mapa;

// Función para inicializar el mapa
function inicializarMapa() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error('El objeto "google" o "google.maps" no está definido. Verifica la carga del script de Google Maps.');
        return;
    }

    // Coordenadas de ejemplo (ajusta según sea necesario)
    var coordenadas = { lat: 40.748817, lng: -73.985428 };

    // Crea un nuevo mapa en el contenedor con ID "google-map"
    mapa = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 12,
        center: coordenadas
    });

    // Crea un marcador en el mapa
    var marcador = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Ubicación Actual'
    });

    // Ajusta el tamaño del mapa cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function () {
        var center = mapa.getCenter();
        google.maps.event.trigger(mapa, 'resize');
        mapa.setCenter(center);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var menuBtn = document.getElementById("navbar-toggler");
    var menuNav = document.getElementById("navbarNav");

    menuBtn.addEventListener("click", function () {
        toggleMenu();
    });

    var app = document.getElementById("app");
    app.addEventListener("click", function (event) {
        if (event.target !== menuBtn && !menuNav.contains(event.target)) {
            closeMenu();
        }
    });

    // Llama a la función inicializarMapa después de la carga del DOM
    inicializarMapa();
});

function toggleMenu() {
    var menuNav = document.getElementById("navbarNav");
    menuNav.style.width = (menuNav.style.width === "250px") ? "0" : "250px";
}

function closeMenu() {
    var menuNav = document.getElementById("navbarNav");
    menuNav.style.width = "0";
}

function cambiarPestana(pestana) {
    var pestañas = document.getElementsByClassName("pestaña");
    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].classList.remove("mostrar");
    }

    document.getElementById(pestana).classList.add("mostrar");

    // Si la pestaña seleccionada es 'mapa', forzamos la actualización del mapa
    if (pestana === 'mapa') {
        setTimeout(function () {
            google.maps.event.trigger(mapa, 'resize');

            // Ajusta el centro del mapa a tus coordenadas deseadas
            var nuevasCoordenadas = { lat: 40.748817, lng: -73.985428 };
            mapa.setCenter(nuevasCoordenadas);
        }, 500);
    }

    // Cerrar el menú después de cambiar de pestaña (opcional)
    closeMenu();
}

