var map;            // Para contener al objeto mapa
var marker = false; // Para saber si el usuario selecciono una ubicacion

// Esta funcion se llama cuando se carga la pagina para crear/inicializar al mapa
function initMap() {

    // Centro al mapa para que aparezca en esta ubicacion (que es Bs. As)
    var centerOfMap = new google.maps.LatLng(-34.616095600598214, -58.50616086702921);

    // Otras configuraciones
    var options = {
      center: centerOfMap, // Que este centrado
      zoom: 10 // El zoom
    };

    // Creo el mapa
    map = new google.maps.Map(document.getElementById('map'), options);

    // Creo un listener para saber si el usuario hace un click en el map (es decir, si selecciona una ubicacion)
    google.maps.event.addListener(map, 'click', function(event) {
        // Obtengo la latitud y longitud que selecciono
        var clickedLocation = event.latLng;
        // Si no esta el marcador en el mapa
        if(marker === false){
            // Se crea
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true // Para que pueda desplazarlo
            });
            // Escuchamos si el marcador es desplazado
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            // Si ya existia el marcador solamente le cambiamos la ubicacion
            marker.setPosition(clickedLocation);
        }
        markerLocation();
    });
}

// Esta funcion agarra la ubicacion actual del marcador y la carga en los campos Latitud y Longitud (que son de solo lectura)
function markerLocation(){
    var currentLocation = marker.getPosition();
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}

// Se carga el mapa cuando la pagina haya terminado de cargar
google.maps.event.addDomListener(window, 'load', initMap);