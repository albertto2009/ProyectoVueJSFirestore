<template>
    <section class="box">
        
        <b-field label="Email" class="margintop"
            >
            <b-input type="email"
                maxlength="30" class="campo" v-model="logindata.email">
            </b-input>
        </b-field>

        <b-field label="Contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="logindata.password">
            </b-input>
        </b-field>

        <div class="buttons">
            <b-button type="is-primary" class="buttonprimary" @click="doLogin">Acceder</b-button>
        </div>

    </section>
</template>

<script>
import {Auth} from '@/modules/firebase'
    export default {
        data() {
            
            return {
                
                logindata: {
                    email: '',
                    password: '',
                },
                
                
            }
        },
        methods: {
        async doLogin(){
            if(!this.logindata.email || !this.logindata.password){
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
        try{
            const loginResult = await Auth.signInWithEmailAndPassword(this.logindata.email, this.logindata.password)
            console.info(loginResult)
            this.$buefy.notification.open({
                    title: 'Error',
                    message: 'Iniciado correctamente',
                    type: 'is-success',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            
            
            
        }catch(e){
            this.$buefy.notification.open({
                    title: 'Error',
                    message: `${e.message}`,
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
                    
        }
    }
        }
    }
</script>
