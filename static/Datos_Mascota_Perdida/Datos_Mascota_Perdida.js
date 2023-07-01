const apiSinQR = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/perdidas/crear";
const apiConQR = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/mascota-perdida/crear";

new Vue({
    el: '#app',
    data: {
        publicacion: {
            organizacion: null,
            aceptada: false,
            mascota: {
                errorsMascota: [],
                fotos: [],
                estado: '',
                ubicacion: {
                    lat: '',
                    long: ''
                },
                tipo: '',
                mascotaAsociada: null,
                rescatista: {
                    errorsRescatista: [],
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
                        errorsContacto: [],
                        nombre: '',
                        apellido: '',
                        telefono: '',
                        email: '',
                        formasNotificacion1: [],
                        formasNotificacion: ''
                    }]
                }
            }
        },
        id_qr: ''
    },

    created() {
        const id = new URLSearchParams(window.location.search).get("id");
        if(id != null) {
            this.id_qr = id;
        }
    },

    methods: {

        validarDatos() { // los pongo asi pq sino el if corta cuando encuetra un falso
            this.laMascotaEsValida();
            this.elRescatistaEsValido();
            this.losContactosSonValidos();
            return this.laMascotaEsValida() && this.elRescatistaEsValido && this.losContactosSonValidos()
        },

        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        laMascotaEsValida: function() {
            let esValido = true
            this.publicacion.mascota.errorsMascota = [] // para que no se acumulen los errores

            this.publicacion.mascota.ubicacion.lat = document.getElementById('lat').value;
            this.publicacion.mascota.ubicacion.long = document.getElementById('lng').value;

            if(this.publicacion.mascota.ubicacion.lat == '' || this.publicacion.mascota.ubicacion.long == '') {
                this.publicacion.mascota.errorsMascota.push("Debe seleccionar la ubicación donde encontró a la mascota.");
                esValido = false
            }

            if(this.publicacion.mascota.estado == '') {
                this.publicacion.mascota.errorsMascota.push("La descripción del estado es obligatoria.");
                esValido = false
            }

            if(this.publicacion.mascota.tipo == '') {
                this.publicacion.mascota.errorsMascota.push("El tipo es obligatorio.");
                esValido = false
            }

            if(this.publicacion.mascota.fotos.length == 0) {
                this.publicacion.mascota.errorsMascota.push("Debes subir al menos una foto de la mascota.");
                esValido = false
            }
            return esValido
        },

        elRescatistaEsValido: function() {
            let esValido = true
            this.publicacion.mascota.rescatista.errorsRescatista = [] // para que no se acumulen los errores

            if(this.publicacion.mascota.rescatista.nombre == '' || this.publicacion.mascota.rescatista.apellido == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("Debes escribir tu nombre completo.");
                esValido = false
            }

            if(!this.validTel(this.publicacion.mascota.rescatista.telefono)) {
                this.publicacion.mascota.rescatista.errorsRescatista.push("El teléfono es invalido, debe comenzar con +5411 y luego 8 digitos.");
                esValido = false
            }
            if(this.publicacion.mascota.rescatista.email == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("El correo electrónico es obligatorio.");
                esValido = false
            }else if(!this.validEmail(this.publicacion.mascota.rescatista.email)) {
                this.publicacion.mascota.rescatista.errorsRescatista.push("El email que escribiste no es válido. Revisa la dirección.");
                esValido = false
            }

            if(this.publicacion.mascota.rescatista.tipoDocumento == '' || this.publicacion.mascota.rescatista.nroDocumento == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("El tipo y número de documento son obligatorios.");
                esValido = false
            }

            if(this.publicacion.mascota.rescatista.domicilio == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("El domicilio es obligatorio.");
                esValido = false
            }

            if(this.publicacion.mascota.rescatista.formasNotificacion1 == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("Debes elegir como mínimo una forma de notificación.");
                esValido = false
            }

            if(this.publicacion.mascota.rescatista.fechaDeNacimiento == '') {
                this.publicacion.mascota.rescatista.errorsRescatista.push("La fecha de nacimiento es obligatoria.");
                esValido = false
            }
            return esValido;
        },

        losContactosSonValidos: function() {
            let esValido = true
            for(let i = 0; i < this.publicacion.mascota.rescatista.otrosContactos.length; i++) {
                this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto = [];

                if(this.publicacion.mascota.rescatista.otrosContactos[i].nombre == '' || this.publicacion.mascota.rescatista.otrosContactos[i].apellido == '') {
                    this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto.push("Debes escribir su nombre completo.");
                    esValido = false
                }

                if(!this.validTel(this.publicacion.mascota.rescatista.otrosContactos[i].telefono)) {
                    this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto.push("El teléfono es invalido, debe comenzar con +5411 y luego 8 digitos.");
                    esValido = false
                }

                if(this.publicacion.mascota.rescatista.otrosContactos[i].email == '') {
                    this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto.push("El correo electrónico es obligatorio.");
                    esValido = false
                }else if(!this.validEmail(this.publicacion.mascota.rescatista.otrosContactos[i].email)) {
                    this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto.push("El email que escribiste no es válido. Revisa la dirección.");
                    esValido = false
                }

                if(this.publicacion.mascota.rescatista.otrosContactos[i].formasNotificacion1 == '') {
                    this.publicacion.mascota.rescatista.otrosContactos[i].errorsContacto.push("Debes elegir como mínimo una forma de notificación.");
                    esValido = false
                }
            }
            return esValido;
        },
        validTel: function (telefono) {
            var re = /^\+5411([0-9]){8}$/
            return re.test(telefono);
        },
        enviar() {
            if(this.validarDatos()) {
                this.publicacion.mascota.rescatista.formasNotificacion = (this.publicacion.mascota.rescatista.formasNotificacion1).join(', ');

                for (let i = 0; i < this.publicacion.mascota.rescatista.otrosContactos.length; i++) {
                    this.publicacion.mascota.rescatista.otrosContactos[i].formasNotificacion = (this.publicacion.mascota.rescatista.otrosContactos[i].formasNotificacion1).join(', ');
                }

                var api;
                if(this.id_qr == '') {
                    api = apiSinQR;
                } else {
                    api = apiConQR;
                }

                fetch(api, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": this.id_qr
                    },
                    body: JSON.stringify(this.publicacion)
                })
                    .then(data => {
                        console.log('status: ', data.status);

                        switch (data.status) {
                            case 200:
                                if(this.id_qr == '') {
                                    alert("¡Se han guardado sus datos correctamente! Pulse aceptar para volver a la pantalla principal");
                                } else {
                                    alert("¡Se han guardado sus datos correctamente y se ha notificado el dueño! Pulse aceptar para volver a la pantalla principal");
                                }
                                window.location.href = 'index.html';
                                break;
                            default:
                                console.log('error');
                                break;
                        }
                    })
            }
        },

        addContacto() {
            this.publicacion.mascota.rescatista.otrosContactos.push({
                errorsContacto: [],
                nombre: '',
                apellido: '',
                telefono: '',
                email: '',
                formasNotificacion1: [],
                formasNotificacion: ''
            })
        },

        deleteContacto(counter) {
            this.publicacion.mascota.rescatista.otrosContactos.splice(counter,1);
        },

        getBase64: function (file) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result)
                };
                reader.onerror = function (error) {
                    reject('Error: ', error);
                }
            })
        },

        subirFotos: function (event) {
            for (let j = 0; j < event.target.files.length; j++) {
                this.getBase64(event.target.files[j])
                    .then(img => {
                        var request = {
                            contenidoBase64: img
                        }
                        this.publicacion.mascota.fotos.push(request);
                    })
            }
        }

    }
})