const apiSesion = "https://tp-dds-zaa66xnsca-uc.a.run.app/sesion/validar";

new Vue({
    el: "#app",
    data: {
        unlocked: false
    },

    methods: {
        redirect: function() {
            var idSesion = localStorage.getItem("IDSESION");
            if(idSesion == null) {
                this.unlocked = true
            } else {
                fetch(apiSesion, {
                    method: "GET",
                        headers: {
                        "Authorization": idSesion
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data) {
                        window.location.href = 'Formulario_Registrar_Mascota.html';
                    } else {
                        this.unlocked = true;
                    }
                })

            }
        },

        goToRegistrarse: function() {
            window.location.href = 'Registrarse.html';
        },

        goToRegistrarMascota: function() {
            window.location.href = 'Formulario_Registrar_Mascota.html';
        }
    }
})