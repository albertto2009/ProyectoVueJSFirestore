<template>
  
  <b-navbar class="toolsbar" >
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item href="#" @click.prevent="goToPage('CreateGroups')" v-if="hasSession" >
                Crear grupos
            </b-navbar-item>
             <b-navbar-item href="#" @click.prevent="goToPage('Mygroups')" v-if="hasSession">
                Mis grupos
            </b-navbar-item>
            
        </template>

        <template #end>
            <b-navbar-item tag="div" v-if="!hasSession">
                <div class="buttons">
                    <a class="button is-primary" @click.prevent="goToPage('Register')">
                        <strong>Registrarse</strong>
                    </a>
                    <a class="button is-light" @click.prevent="goToPage('Login')">
                        Acceder
                    </a>
                </div>
            </b-navbar-item>
            <b-navbar-item tag="div" v-if="hasSession">
                <div class="buttons">
                    <a class="button is-primary" @click.prevent="closeSession">
                        <strong>Cerrar sesión</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { Auth } from "@/modules/firebase"
export default {
  name: 'MainHeader',
  props: {
    hasSession: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    async goToPage(name){
        await this.$router.push({name: name})
    },
       
    async closeSession(){
        console.log("saliendo sesión....")
        await Auth.signOut()
        await this.$router.push({name: 'Login'})
    }
    
  }
}
</script>

<style scoped>
.main-menu {
    list-style: none;
    display: flex;
}
.main-menu .menu-item{
    margin-right: 10px;
}
.main-menu .menu-item:last-child{
    margin-right: 0;
}


</style>