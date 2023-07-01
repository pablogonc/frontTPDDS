const apiUrl ="https://tp-dds-zaa66xnsca-uc.a.run.app/api/hogares";
var cantidad = 10;

new Vue({
        el: '#app',
        data() {
            return{
                allHogares: [],
                hogares: [],
                check: []
            }
        },

        created() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(hogaresObtenidos => {
                    this.allHogares = hogaresObtenidos;
                    this.hogares = this.allHogares.slice(0,cantidad);
                })
        },

        methods: {
            filtrar: function() {
                if(this.check.length > 0) {
                    this.hogares = this.allHogares.slice().filter(p =>{
                        return  false;
                    }).slice(0,cantidad);
                } else {
                    this.hogares =  this.allHogares.slice(0,cantidad);
                }
            },
            agregar: function() {
                cantidad +=10;
                this.filtrar();
            },
            orderByName: function() {
                this.allHogares.sort((p1,p2) =>{
                    if (p1.nombre > p2.nombre) return 1
                        return -1;
                    });
                this.filtrar();
            },
            reset: function() {
                document.getElementById("gatos").checked = false;
                document.getElementById("perros").checked = false;
                this.check = this.check.slice(0,0);
                this.filtrar();
            },
            cancelar: function() {
                document.getElementById("gatos").checked = false;
                document.getElementById("perros").checked = false;
            }

        }

    })

