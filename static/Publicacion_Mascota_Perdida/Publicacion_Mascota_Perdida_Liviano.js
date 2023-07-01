document.addEventListener('DOMContentLoaded', () => {


    var lat= parseFloat(document.getElementById("lat").value);
    var long = parseFloat(document.getElementById("long").value);

    initMap(lat,long);
} );

function initMap(lat, long) {
    const uluru = { lat: lat, lng: long };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: uluru,
    });

    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}


const urlParams = new URLSearchParams(window.location.search);

setFirst = function (id){
    var str = 'foto_'+id;
    document.getElementById("principal").src= document.getElementById(str).src;

};

contactar = function (id){

    var idsesion = document.getElementById("idSesion").value;
    window.location.href="https://tp-dds-zaa66xnsca-uc.a.run.app/cliente-liviano/perdidas/publicacion/"+ id +"/contactar?sesion="+idsesion;
};

goToRegistrarse = function() {
    window.location.href = 'http://localhost:63342/TPDDS_Grupo5_K3002/templates/Registrarse.html';
};
gotoIniciarSesion = function() {
    window.location.href = 'https://tp-dds-zaa66xnsca-uc.a.run.app/cliente-liviano/inicio_sesion';
};
