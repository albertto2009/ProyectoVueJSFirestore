<template>
    <section class="box">
       
        <b-field label="Email" class="margintop"
            >
            <b-input type="email"
                maxlength="30" class="campo" v-model="userdata.email">
            </b-input>
        </b-field>

        <b-field label="Contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="userdata.password">
            </b-input>
        </b-field>

        <b-field label="Repite tu contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="repeatpassword" >
            </b-input>
        </b-field>
        <div class="buttons">
            <b-button type="is-primary" class="buttonprimary" @click="register">Registro</b-button>
            <b-button type="is-primary is-light" @click.prevent="goToPage('Login')">Acceder</b-button>
        </div>

    </section>
</template>

<script>
import {Auth} from '@/modules/firebase'
    export default {
        data() {
            
            return {
                repeatpassword: '',
                userdata: {
                    email: '',
                    password: '',
                },
                username: '',
                
            }
        },
        methods: {
             
            comprobarDatos(){
              //type="is-success" message="This username is available" para cuando algo es valido
              //type="is-danger" message= "This username is unavailable" para cuando algo es invalido
              if(this.userdata.password === this.repeatpassword){
                  console.log("es igual")
                  
                  
                  
              }else {
                  this.$buefy.notification.open({
                    title: 'Error',
                    message: 'Usuario y contraseña deben coincidir',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
                return
              }
            
            },
           async register() {
              if(this.userdata.email === '' || this.userdata.password === ''){
              console.warn("Introduce los datos de registro")
               this.$buefy.notification.open({
                    title: 'Error',
                    message: 'Debe Introducir los datos en el formulario',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
              
              return
            }     
            try{

              this.comprobarDatos()

              await Auth.createUserWithEmailAndPassword(this.userdata.email,this.userdata.password)
              this.$router.push({name: 'Home'})
            }catch(error){
              this.$buefy.notification.open({
                    title: 'Error',
                    message: `${error.message}`,
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
              console.error(error.message)
            }
            
            },


            async goToPage(name){
                await this.$router.push({name: name})
            },
            
        }

        
    }



</script>

<style>
section{
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20%;
  border: 0.1px solid #000000;
  border-radius: 1em;
}

.buttons{
  padding-bottom: 1em;
  padding-right: 1em;
}

.buttonprimary {
  margin-left: auto ;
  margin-right: 3em;
  
}

.campo{
  width: 80%;
  margin-left: auto ;
  margin-right: auto;
}

.margintop {
  margin-top: 1em;
}
</style>