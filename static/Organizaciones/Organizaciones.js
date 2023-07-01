const apiUrl ="https://tp-dds-zaa66xnsca-uc.a.run.app/api/organizaciones";

new Vue({
        el: '#app',
        data() {
            return{
                organizaciones: []
            }
        },
        created() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(organizacionesObtenidas => {
                    this.organizaciones = organizacionesObtenidas
                })
        }
    })