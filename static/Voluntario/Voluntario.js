const apiDatosVoluntario = "https://tp-dds-zaa66xnsca-uc.a.run.app/usuarios/datos-voluntario";
const apiUrlPublicaciones = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/perdidas/publicaciones";

new Vue({
	el: '#app',
	data: {
		voluntario: {
			id: null,
			usuario: null,
			password: null,
			organizacion: {
				id: null,
				nombre: null,
				ubicacion: null,
				resolucion: null,
				calidad: null,
				administradores: [],
				voluntarios: [],
				mascotasRegistradas: [],
				preguntasAdicionales: [],
				publicacionesMascotasEncontradas: [{
					id: null,
					mascota: {
						id: null,
						fotos: [{
							id: null,
							contenidoBase64: null,
							normalizada: null
						}],
						estado: null,
						ubicacion: {
							id: null,
							direccion: null,
							lat: null,
							long: null
						},
						rescatista: {
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
							formasNotificacion: null
						},
						tipo: null
					},
					aceptada: null
				}],
				caracPropias: []
			}
		}
	},
	created() {
		var idSesion = localStorage.getItem("IDSESION")
		fetch(apiDatosVoluntario, {headers: { "Authorization": idSesion}})
			.then(response => response.json())
			.then(voluntario => { this.voluntario = voluntario;})
	},
	methods: {
		aceptar(publicacion) {
			publicacion.aceptada = true
			axios.post(apiUrlPublicaciones, publicacion)
			alert("¡Publicación aceptada con éxito!")
		},
		todasAceptadas() {
			return this.voluntario.organizacion.publicacionesMascotasEncontradas.filter(pub => pub.aceptada == false).length == 0
		}
	}
})