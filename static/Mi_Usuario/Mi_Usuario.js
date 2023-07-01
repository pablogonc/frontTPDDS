const apiUrlUsuario = "https://tp-dds-zaa66xnsca-uc.a.run.app/usuarios/datos-estandar-qr";
const apiUrlEliminarSesion = "https://tp-dds-zaa66xnsca-uc.a.run.app/sesion/eliminar";

new Vue({
        el: '#app',
        data() {
            return {
                usuario: {
                    duenioAsociado : {
                        nombre: '',
                        apellido: '',
                        telefono: '',
                        email: '',
                        formasNotificacion1: [],
                        formasNotificacion: '',
                        fechaDeNacimiento: '',
                        tipoDocumento: '',
                        nroDocumento: '',
                        domicilio: '',
                        otrosContactos: [{
                            nombre: '',
                            apellido: '',
                            telefono: '',
                            email: '',
                            formasNotificacion1: [],
                            formasNotificacion: ''
                        }],
                        mascotas: [{
                            nombre: '',
                            apodo: '',
                            edad: '',
                            sexo: '',
                            descripcion: '',
                            caracteristicas: [],
                            fotos: [],
                            organizacion: {},
                            id_QR: ''
                        }]
                    }
                }
            }
        },

        created() {
            var idSesion = localStorage.getItem("IDSESION");

            fetch(apiUrlUsuario, {
                headers: {
                    "Authorization": idSesion //se envia el IDSESION para identificar al usuario en backend
                }})
                .then(response => response.json())
                .then(usrObtenido => {
                    this.usuario = usrObtenido;
            });
        },
        methods: {
        	cerrarSesion() {
            	var idSesion = localStorage.getItem("IDSESION");
            	fetch(apiUrlEliminarSesion, {headers: { "Authorization": idSesion}})
            	localStorage.removeItem("IDSESION");
            	window.location.href = 'index.html';
            }
        }
    })