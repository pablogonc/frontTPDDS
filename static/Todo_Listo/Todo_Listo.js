const apiUrlMascota = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/mascota/obtener/"
const apiUrlDuenio = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/dueño/obtener/"

var app1 = new Vue({
	el: '#app',
    data: {
    	mascota: {
    		id: null,
    		id_QR: null,
    		tipo: null,
    		sexo: null,
    		nombre: null,
    		apodo: null,
    		edad: null,
    		descripcion: null,
    		fotos: [],
    		caracteristicas: [],
    		organizacion: {
				id: null,
				nombre: null,
				ubicacion: null,
				resolucion: null,
				calidad: null,
				preguntasAdicionales: [{
					id: null,
					preguntasPublicacion: [],
					pregunta: null
				}],
				caracPropias: []
    		}
    	},
    	duenio: {
    		id: null,
    		tipoDocumento: null,
    		nroDocumento: null,
    		fechaDeNacimiento: null,
    		otrosContactos: [],
    		domicilio: null,
    		nombre: null,
    		apellido: null,
    		telefono: null,
    		email: null,
    		formasDeNotificacion: [],
    		formasNotificacion: null,
    		mascotas: []
    	},
    	medios: [],
    	indice: 0
    },
    methods: {
    	anteriorFoto(fotos) {
    		if(this.indice == 0) {
    			this.indice = fotos.length - 1
    		}else{
    			this.indice = this.indice - 1
    		}
        },
        siguienteFoto(fotos) {
        	if(this.indice >= fotos.length - 1) {
        		this.indice = 0
        	}else{
        		this.indice = this.indice + 1
        	}
        },
        pasarMediosDeNotificacion() {
        	if(this.duenio.formasNotificacion.includes("EMAIL")) {
        		this.medios.push("Email")
        	}
        	if(this.duenio.formasNotificacion.includes("WPP")) {
        		this.medios.push("Whatsapp")
        	}
        	if(this.duenio.formasNotificacion.includes("SMS")) {
            	this.medios.push("Sms")
            }
        }
    },
    created() {
		const urlParams = new URLSearchParams(window.location.search);
		fetch(apiUrlMascota + urlParams.get("id"))
			.then(response => response.json())
			.then(mascotaObtenida => {this.mascota = mascotaObtenida})
		fetch(apiUrlDuenio + urlParams.get("id"))
			.then(response => response.json())
           	.then(duenio => {this.duenio = duenio})
           	.then(this.pasarMediosDeNotificacion)
    }
})