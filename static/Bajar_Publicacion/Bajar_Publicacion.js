const apiUrlBajarPub 	= "https://tp-dds-zaa66xnsca-uc.a.run.app/api/publicacion-interesado/borrar";
const apiUrlObtenerPub 	= "https://tp-dds-zaa66xnsca-uc.a.run.app/api/publicacion-interesado/obtener";

new Vue({
    el: "#app",
    data: {
        publicacion: {
			id: null,
			emailDelInteresado: null,
			preferencias: {
				id: null,
				tipoMascota: null,
				sexo: null,
				edadMin: null,
				edadMax: null,
				caracteristicas: [{
					id: null,
					caracteristica: null,
				}],
				comodidades: []
			},
			cod_baja: null
        }
    },
    created() {
    	const urlParams = new URLSearchParams(window.location.search);
    	const codigo = urlParams.get("cod")
		fetch(apiUrlObtenerPub, { headers: {"Authorization" : codigo}})
			.then(response => response.json())
            .then(publicacion => {this.publicacion = publicacion})
    },
    methods: {
    	borrar() {
			axios.post(apiUrlBajarPub, this.publicacion)
			alert("La publicación se eliminó correctamente")
    	},
    	calcularEdad() {
    		if(this.publicacion.preferencias.edadMin == 0 && this.publicacion.preferencias.edadMax == 0) {
    			return "CUALQUIERA"
    		} else {
    			return this.publicacion.preferencias.edadMin +' a '+ this.publicacion.preferencias.edadMax +' años'
    		}
    	},
    	mostrarCaracteristicas() {
    		return this.publicacion.preferencias.caracteristicas.map(caracteristica => caracteristica.caracteristica).join(', ')
    	},
    	mostrarComodidades() {
    		return this.publicacion.preferencias.comodidades.map(comodidad => comodidad.comodidad).join(', ')
    	}
    }

})