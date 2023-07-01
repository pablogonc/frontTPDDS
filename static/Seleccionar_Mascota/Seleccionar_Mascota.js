const apiUrlUsuario = "https://tp-dds-zaa66xnsca-uc.a.run.app/usuarios/datos-estandar"

var app1 = new Vue({
	el: '#app',
    data: {
    	usuarioEstandar: {
    	id: null,
    	password: null,
    	usuario: null,
    	duenioAsociado: {
    		id: null,
    		tipoDocumento: null,
    		nroDocumento: null,
    		fechaDeNacimiento: null,
    		otrosContactos: null,
    		domicilio: null,
    		nombre: null,
    		apellido: null,
    		telefono: null,
    		email: null,
    		formasDeNotificacion: null,
    		formasNotificacion: null,
    		mascotas: []
    		}
    	},
    	indices: []
    },
    methods: {
    	anteriorFoto(counter, fotos) {
			if(this.indices[counter] == 0) {
				Vue.set(app1.indices, counter, fotos.length - 1)
			}else{
				Vue.set(app1.indices, counter, this.indices[counter] - 1)
			}
    	},
    	siguienteFoto(counter, fotos) {
    		if(this.indices[counter] >= fotos.length - 1) {
    			Vue.set(app1.indices, counter, 0)
    		}else{
    			Vue.set(app1.indices, counter, this.indices[counter] + 1)
    		}
    	},
    	agregarIndices() {
    		for (let i=0; i<this.usuarioEstandar.duenioAsociado.mascotas.length; i++) {
    			this.indices.push(0);
    		}
    	},
    	redirect() {
    		window.location.href = 'Formulario_Registrar_Mascota.html'
    	}
    },
    created() {
		var idSesion = localStorage.getItem("IDSESION");

    	fetch(apiUrlUsuario, {
        	headers: {
        		"Authorization": idSesion //se envia el IDSESION para identificar al usuario en backend
        	}})
        .then(response =>{ return response.json()})
        .then(estandar => {
        	this.usuarioEstandar = estandar;
        	this.agregarIndices();
        })
    }
})
