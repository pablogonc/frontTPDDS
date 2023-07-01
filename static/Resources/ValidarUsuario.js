const apiUrlSesion = "https://tp-dds-zaa66xnsca-uc.a.run.app/sesion/eliminar";

new Vue({
    el: "#app-sesion",
    data: {
        sesionInvalida: false
    },
    created() {
        var idSesion = localStorage.getItem("IDSESION");
        if(idSesion == null) {
           this.sesionInvalida = true
        } else {
            fetch("https://tp-dds-zaa66xnsca-uc.a.run.app/sesion/validar", {
                method: "GET",
                    headers: {
                    "Authorization": idSesion
                }
            })
           .then(response => response.json())
           .then(data => {
            this.sesionInvalida = !data;
           })
        }
    },
    methods: {
    	eliminarSesion() {
    		var idSesion = localStorage.getItem("IDSESION");
    		fetch(apiUrlSesion, {headers: { "Authorization": idSesion}})
    		localStorage.removeItem("IDSESION");
    	}
    }

})