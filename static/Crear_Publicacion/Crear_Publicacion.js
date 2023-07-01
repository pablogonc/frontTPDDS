const apiUrlPublicacion = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/publicacion-interesado/crear";
const apiUrlCaracteristicas = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/caracteristicas";
const apiUrlComodidades = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/comodidades";

var app1 = new Vue({
	el: '#app',
    data: {
     	form : {
	        emailDelInteresado: null,
            preferencias: {
            	tipoMascota: null,
            	sexo: null,
            	edadMin: null,
            	edadMax: null,
            	caracteristicas: [],
            	comodidades: []
            }
        },
        caracteristicas2: [],
        comodidades2: [],
        errors: []
    },
    methods: {
    	enviar() {
    		if(this.elFormEsValido()){
    			axios.post(apiUrlPublicacion, this.form).then((result) => {console.log(result);})
    			window.location.href = 'Mensaje_Final.html';
    		}
        },
        habilitar: function() {
        	let edadMin = document.getElementById("edadMin")
        	let edadMax = document.getElementById("edadMax")
        	edadMin.disabled = false
            edadMax.disabled = false
        },
        deshabilitar: function() {
            let edadMin = document.getElementById("edadMin")
            let edadMax = document.getElementById("edadMax")
            edadMin.value = null 								//Esto no los borra del Form, es solo para que no se vean en pantalla
            edadMax.value = null
            edadMin.disabled = true
            edadMax.disabled = true
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        elFormEsValido: function() {
        	this.errors = [];
        	let esValido = true

        	if(this.form.emailDelInteresado == null) {
        		this.errors.push("El correo electrónico es obligatorio.");
        		esValido = false
        	}else if(!this.validEmail(this.form.emailDelInteresado)) {
        		this.errors.push("El email que escribiste no es válido. Revisa la dirección.");
        		esValido = false
        	}

        	if(this.form.preferencias.tipoMascota == null) {
        		this.errors.push("El tipo de mascota es un campo obligatorio.");
        		esValido = false
        	}

			if(this.form.preferencias.sexo == null) {
				this.errors.push("El sexo de la mascota es un campo obligatorio.");
                esValido = false
            }

			let entre 			= document.getElementById("entre")
			let cualquierEdad 	= document.getElementById("cualquier-Edad")

			if(!entre.checked && !cualquierEdad.checked) {
				this.errors.push("La edad es un campo obligatorio.");
				esValido = false
			} else if(entre.checked) {
				if(this.form.preferencias.edadMax <= this.form.preferencias.edadMin) {
					this.errors.push("La edad máxima no puede ser menor ni igual que la edad mínima. Revise el rango de edad.");
					esValido = false
				}
			} else {
				// En BBDD se recibe como 0 y 0. Representa que eligió la opcion "Cualquiera"
				// Si ponia rango, el form lo limita a que la edadMax sea como mínimo 1
				this.form.preferencias.edadMax = null
				this.form.preferencias.edadMin = null
			}
        	return esValido
        }
    },
	created () {
		fetch(apiUrlCaracteristicas)
        	.then(response => response.json())
        	.then(data => {
        		this.caracteristicas2 = data
           	})
        fetch(apiUrlComodidades)
            .then(response => response.json())
            .then(data => {
        	    this.comodidades2 = data
            })
    }
})
