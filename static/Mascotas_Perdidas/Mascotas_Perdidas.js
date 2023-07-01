const apiUrl = "https://tp-dds-zaa66xnsca-uc.a.run.app/api/perdidas/publicaciones";
var cantidad = 4;

new Vue({
    el: '#app',
    data () {
        return {
            allPublicaciones: [],
            recientes: [],
            publicacionesMacotas: [],
            check: []
        }
    },

    created() {
        fetch(apiUrl)
            .then(response =>{return response.json()})
            .then(publicaciones =>{
                var aceptadas = publicaciones.filter(p => {
                                                            return p.aceptada == '1';
                                                            });
                this.allPublicaciones = aceptadas;
                this.recientes = aceptadas.slice().sort((p1,p2) => {
                    return -(p1.id-p2.id);
                }).slice(0,4);
                this.publicacionesMacotas = aceptadas.slice(0,cantidad);
            })
    },

    methods: {
        filtrar: function() {
            if(this.check.length > 0) {
                this.publicacionesMacotas =  this.allPublicaciones.slice().filter(p =>{
                    return  this.check.includes(p.mascota.tipo);
                }).slice(0,cantidad);
            }else{
                this.publicacionesMacotas =  this.allPublicaciones.slice(0,cantidad);
            }
        },
        agregar: function() {
            cantidad +=4;
            this.filtrar();
        },
        orderByName: function() {
            this.allPublicaciones.sort((p1,p2) =>{
                if (p1.mascota.nombre>p2.mascota.nombre) return 1
                return -1;
            });
            this.filtrar();
        },
        reset: function() {
            document.getElementById("GATO").checked = false;
            document.getElementById("PERRO").checked = false;
            this.check = this.check.slice(0,0);
            this.filtrar();
        },
        pedirInicio: function() {
            alert("Por favor inicie sesion");
        },
        cancelar: function() {
            document.getElementById("gatos").checked = false;
            document.getElementById("perros").checked = false;
        }
    }
});