var mapa;

function inicializarMapa() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error('El objeto "google" o "google.maps" no está definido. Verifica la carga del script de Google Maps.');
        return;
    }

    var coordenadas = { lat: 40.748817, lng: -73.985428 };

    mapa = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 12,
        center: coordenadas
    });

    var marcador = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Ubicación Actual'
    });

    window.addEventListener('resize', function () {
        var center = mapa.getCenter();
        google.maps.event.trigger(mapa, 'resize');
        mapa.setCenter(center);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var menuBtn = document.getElementById("navbar-toggler");
    var navbarNav = document.querySelector(".navbar-nav");

    if (!menuBtn || !navbarNav) {
        console.error("No se encontraron elementos del menú.");
        return;
    }

    menuBtn.addEventListener("click", function () {
        navbarNav.classList.toggle("abierto");
    });

    var opcionesMenu = document.querySelectorAll(".navbar-nav ul li a");
    opcionesMenu.forEach(function(opcion) {
        opcion.addEventListener("click", function(event) {
            event.preventDefault();
            var pestana = this.getAttribute("href").substring(1);
            cambiarPestana(pestana);
            navbarNav.classList.remove("abierto");
        });
    });

    inicializarMapa();
});

function cambiarPestana(pestana) {
    console.log("Cambiando a la pestaña:", pestana);
    var pestanaActual = document.getElementById(pestana);

    if (pestanaActual) {
        var pestañas = document.getElementsByClassName("pestaña");
        for (var i = 0; i < pestañas.length; i++) {
            pestañas[i].classList.remove("mostrar");
        }

        pestanaActual.classList.add("mostrar");

        if (pestana == 'mapa') {
            setTimeout(function () {
                google.maps.event.trigger(mapa, 'resize');
                var nuevasCoordenadas = { lat: 40.748817, lng: -73.985428 };
                mapa.setCenter(nuevasCoordenadas);
            }, 500);
        }
    } else {
        console.error("Elemento con ID " + pestana + " no encontrado.");
    }
}
