<template>
    <section class="box">
        
        <b-field label="Paypal" class="margintop"
            >
            <b-input type="email"
                maxlength="30" class="campo" v-model="UserPago.email">
            </b-input>
        </b-field>

        <b-field label="Contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="UserPago.password" >
            </b-input>
        </b-field>

        <b-field >
            <b-input v-model="msn" class="campo" disabled ></b-input>
        </b-field>

        <div class="buttons">
            <b-button type="is-primary" class="buttonprimary" @click="addGroup">Pagar</b-button>
        </div>

        

    </section>
</template>

<script>
import { Db, Auth } from "@/modules/firebase";

export default {
    data(){
        return{
            currentRoute : "",
            msn: "usted pagará",
            UserPago:{
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async addGroup(){
            if(!this.UserPago.email || !this.UserPago.password){
            this.$buefy.notification.open({
                    title: 'Error',
                    message: 'Los campos están vacios, introduce los datos',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            return
            }

            const tasks2 = await Db.collection("Productos")
            //.where("name", "==", "Crunchyroll")
            //.where("name_document", "==" , this.currentRoute)
            .get();
            //console.info(this.currentRoute)
            //console.info(tasks2.docs)
        for (const task of tasks2.docs) {
            //console.info(task.data())
            const data = task.data()
            
            if(task.id == this.currentRoute){
                console.log(task.id)
                data.ncuentasCompartidas = data.ncuentasCompartidas - 1
                data.members.push(localStorage.getItem("user_email"))
                
                await Db.collection("Productos").doc(task.id).set(data)
                await this.$router.push({name: 'Mygroups'})



            }
        
        
        }
        
        
            
        },
        async mostrarpago(){
             const tasks2 = await Db.collection("Productos")
            //.where("name", "==", "Crunchyroll")
            //.where("name_document", "==" , this.currentRoute)
            .get();
            //console.info(this.currentRoute)
            //console.info(tasks2.docs)
        for (const task of tasks2.docs) {
            //console.info(task.data())
            const data = task.data()
            
            if(task.id == this.currentRoute){
                let precioTotal = (data.precioPorCuenta) + (data.precioPorCuenta*15)/100
                
                this.msn = `Usted pagará ${data.precioPorCuenta}€ + un 15% de nuestra tarifa. Total: ${precioTotal.toFixed(2)}€`
                console.log(this.msn)

            }

        }
        }
    },
    mounted(){
        this.currentRoute = this.$route.params.id
        this.mostrarpago()
    }


}
    
</script>
