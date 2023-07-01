const apiUrlMascota = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/mascota/obtener/"
const apiPreguntasGlobales = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/preguntas/obtener"
const apiUrlGuardarPub = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/dar-en-adopcion/guardar"

new Vue({
	el: '#app',
    data: {
    	publicacion: {
    	    mascota: null,
    		preguntas: [],
    		organizacion: null
    	}
    },
    methods: {
    	enviarPreguntas() {
    		console.log(this.publicacion)
    		axios.post(apiUrlGuardarPub, this.publicacion).then((result) => {console.log(result);})
            window.location.href = 'Todo_Listo.html?id=' + this.publicacion.mascota.id;
    	}
    },
    created() {

		const urlParams = new URLSearchParams(window.location.search);

		fetch(apiUrlMascota + urlParams.get("id"))
			.then(response => response.json())
			.then(mascotaObtenida => {
			    this.publicacion.mascota = mascotaObtenida;
			    this.publicacion.organizacion = mascotaObtenida.organizacion;

                for(let i = 0; i < mascotaObtenida.organizacion.preguntasAdicionales.length; i++) {
                    var pregPub = {
                        pregunta: mascotaObtenida.organizacion.preguntasAdicionales[i],
                        respuesta: '',
                        publicacion: null
                    }
                    this.publicacion.preguntas.push(pregPub);
                }
			})
			.then(fetch(apiPreguntasGlobales)
        		.then(response => response.json())
            	.then(preguntasGlobales => {
                for(let i = 0; i < preguntasGlobales.length; i++) {
                    var pregPub = {
                        pregunta: preguntasGlobales[i],
                        respuesta: '',
                        publicacion: null
                    }
                    this.publicacion.preguntas.push(pregPub);
                }
            })
		)
    }
})