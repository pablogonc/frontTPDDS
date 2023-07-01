const apiRegistrar = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/dueño/registrar";
const apiOrganizaciones = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/organizaciones";
const apiSesion = "https://tp-dds-zaa66xnsca-uc.a.run.app/sesion/validar";
const apiAgregarMascota = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/mascota/agregar-mascota";

new Vue({
    el: '#app',
    data: {
        duenio : {
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
                formasNotificacion: '',
                errorContacto: []
            }],
            mascotas: [{
                nombre: '',
                apodo: '',
                edad: '',
                sexo: '',
                tipo: '',
                descripcion: '',
                caracteristicas: [],
                fotos: [],
                organizacion: {},
                errorMascota: []
            }]
        },
        organizaciones: [],
        sesionInvalida: true,
        idSesion: '',
        errorsDuenio: []

    },

    created() {
        fetch(apiOrganizaciones)
            .then(response => response.json())
            .then(organizacionesObtenidas => {
                this.organizaciones = organizacionesObtenidas;
        })

        /* Valido la sesion, si hay */
        this.idSesion = localStorage.getItem("IDSESION");
        console.log(this.idSesion);

        if(this.idSesion == null) {
            this.sesionInvalida = true
        } else {
            fetch(apiSesion, {
                method: "GET",
                headers: {
                    "Authorization": this.idSesion
                }
            })
            .then(response => response.json())
            .then(esValida => {
                this.sesionInvalida = !esValida;
            })
        }
    },

    methods: {

        validarDatos() {
            if(this.sesionInvalida) {
                this.losContactosSonValidos(); // los pongo asi pq sino el if corta cuando encuetra un falso
                this.elDuenioEsValido();
                this.lasMascotasSonValidas();
                return this.losContactosSonValidos() && this.elDuenioEsValido() && this.lasMascotasSonValidas()
            } else {
                return this.lasMascotasSonValidas();
            }
        },

        enviar() {
            if(this.validarDatos()) {
                this.duenio.formasNotificacion = (this.duenio.formasNotificacion1).join(', ');

                for (let i = 0; i < this.duenio.otrosContactos.length; i++) {
                    this.duenio.otrosContactos[i].formasNotificacion = (this.duenio.otrosContactos[i].formasNotificacion1).join(', ');
                }

                if(this.sesionInvalida) {
                axios.post(apiRegistrar, this.duenio)
                    .then((result) => {
                        alert("¡Se ha registrado a su mascota correctamente! Pulse aceptar para volver a la pantalla principal");
                        window.location.href = 'index.html';
                    })
                } else {
                    fetch(apiAgregarMascota, {
                         method: "POST",
                         headers: {
                            'Content-Type': 'application/json',
                            "Authorization": this.idSesion
                         },
                         body: JSON.stringify(this.duenio.mascotas)
                    })
                    .then(data => {
                        console.log('status: ', data.status);

                        switch (data.status) {
                            case 200:
                                alert("¡Se han guardado sus datos correctamente! Pulse aceptar para volver a la pantalla principal");
                                window.location.href = 'index.html';
                            break;
                            default:
                                console.log('error');
                            break;
                        }
                    })
                }
            }
        },

        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        validTel: function (telefono) {
            var re = /^\+5411([0-9]){8}$/
            return re.test(telefono);
        },
        validAge: function (age) {
            var re = /^(0?[1-9]|[1-2][0-9]|30)$/;
            return re.test(age)
        },

        elDuenioEsValido: function() {
        	let esValido = true
        	this.errorsDuenio = [] // para que no se acumulen los errores

        	if(this.duenio.nombre == '' || this.duenio.apellido == '') {
        		this.errorsDuenio.push("Debes escribir tu nombre completo.");
        		esValido = false
        	}


            if(!this.validTel(this.duenio.telefono) ) {
                this.errorsDuenio.push("El teléfono es invalido, debe comenzar con +5411 y luego 8 digitos");
                esValido = false
            }

        	if(this.duenio.email == '') {
        		this.errorsDuenio.push("El correo electrónico es obligatorio.");
        		esValido = false
        	}else if(!this.validEmail(this.duenio.email)) {
        		this.errorsDuenio.push("El email que escribiste no es válido. Revisa la dirección.");
        		esValido = false
        	}

        	if(this.duenio.tipoDocumento == '' || this.duenio.nroDocumento == '') {
        		this.errorsDuenio.push("El tipo y número de documento son obligatorios.");
        		esValido = false
        	}

        	if(this.duenio.domicilio == '') {
        		this.errorsDuenio.push("El domicilio es obligatorio.");
        		esValido = false
        	}

        	if(this.duenio.formasNotificacion1 == '') {
        		this.errorsDuenio.push("Debes elegir como mínimo una forma de notificación.");
        		esValido = false
        	}

        	if(this.duenio.fechaDeNacimiento == '') {
        		this.errorsDuenio.push("La fecha de nacimiento es obligatoria.");
        		esValido = false
        	}
        	return esValido;
        },

        losContactosSonValidos: function() {
        	let esValido = true
        	for(let i = 0; i < this.duenio.otrosContactos.length; i++) {
        	    this.duenio.otrosContactos[i].errorContacto = [];

                if(this.duenio.otrosContactos[i].nombre == '' || this.duenio.otrosContactos[i].apellido == '') {
                    this.duenio.otrosContactos[i].errorContacto.push("Debes escribir su nombre completo.");
                    esValido = false
                }

                if(!this.validTel(this.duenio.otrosContactos[i].telefono) ) {
                    this.duenio.otrosContactos[i].errorContacto.push("El teléfono es invalido, debe comenzar con +5411 y luego 8 digitos");
                    esValido = false
                }

                if(this.duenio.otrosContactos[i].email == '') {
                    this.duenio.otrosContactos[i].errorContacto.push("El correo electrónico es obligatorio.");
                    esValido = false
                }else if(!this.validEmail(this.duenio.otrosContactos[i].email)) {
                    this.duenio.otrosContactos[i].errorContacto.push("El email que escribiste no es válido. Revisa la dirección.");
                    esValido = false
                }

                if(this.duenio.otrosContactos[i].formasNotificacion1 == '') {
                    this.duenio.otrosContactos[i].errorContacto.push("Debes elegir como mínimo una forma de notificación.");
                    esValido = false
                }
        	}
        	return esValido;
        },

        lasMascotasSonValidas: function() {
        	let esValido = true
        	for(let i = 0; i < this.duenio.mascotas.length; i++) {
        	    this.duenio.mascotas[i].errorMascota = [];

                if(this.duenio.mascotas[i].nombre == '' || this.duenio.mascotas[i].apodo == '') {
                    this.duenio.mascotas[i].errorMascota.push("Debes escribir su nombre y apodo.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].edad == '') {
                    this.duenio.mascotas[i].errorMascota.push("La edad es obligatoria.");
                    esValido = false
                }else if(!this.validAge(this.duenio.mascotas[i].edad)) {
                    this.duenio.mascotas[i].errorMascota.push("La edad debe ser un valor entre 1 y 30.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].descripcion == '') {
                    this.duenio.mascotas[i].errorMascota.push("La descripción es obligatoria.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].tipo == '' || this.duenio.mascotas[i].sexo == '') {
                    this.duenio.mascotas[i].errorMascota.push("El tipo y sexo son obligatorios.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].fotos.length == 0) {
                    this.duenio.mascotas[i].errorMascota.push("Debes subir al menos una foto de la mascota.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].organizacion.nombre == null) {
                    this.duenio.mascotas[i].errorMascota.push("Debes elegir una organización.");
                    esValido = false
                }

                if(this.duenio.mascotas[i].caracteristicas.length == 0) {
                    this.duenio.mascotas[i].errorMascota.push("Debes seleccionar al menos una característica.");
                    esValido = false
                }

        	}
        	return esValido;
        },

        addContacto() {
            this.duenio.otrosContactos.push({
                                    nombre: '',
                                    apellido: '',
                                    telefono: '',
                                    email: '',
                                    formasNotificacion1: [],
                                    formasNotificacion: '',
                                    errorContacto: []
            })
        },

        addMascota() {
            this.duenio.mascotas.push({
                                    nombre: '',
                                    apodo: '',
                                    edad: '',
                                    tipo: '',
                                    descripcion: '',
                                    fotos: [],
                                    organizacion: {},
                                    caracteristicas: [],
                                    errorMascota: []
            })
        },

        deleteContacto(counter) {
              this.duenio.otrosContactos.splice(counter,1);
        },

        deleteMascota(i) {
              this.duenio.mascotas.splice(i,1);
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

        subirFotos: function (event, i) {
            for (let j = 0; j < event.target.files.length; j++) {
                this.getBase64(event.target.files[j])
                    .then(img => {
                    var request = {
                        contenidoBase64: img
                    }
                    this.duenio.mascotas[i].fotos.push(request);
                    })
            }
        }
    }
})