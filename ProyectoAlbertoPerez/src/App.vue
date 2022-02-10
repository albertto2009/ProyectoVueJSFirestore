<template>
  <div id="app" class="container">
    <main-header :has-session="hasSession" />
    <router-view :has-session="hasSession"/>
  </div>
</template>

<script>
import MainHeader from '@/Components/MainHeader'
import { Auth } from "@/modules/firebase"
export default {
  name: 'App',

  components: {
    MainHeader,
    
  },
  data(){
    return{
      hasSession: false,
    }
    
  },
   mounted() {
    Auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.warn('La sesión del usuario está iniciada')
        console.log(user);
        console.log(user.uid);
        this.hasSession = true
        localStorage.setItem('user_id', user.uid)
        localStorage.setItem('user_email', user.email)
        try{
          await this.$router.push({name: 'Home'})
        }catch(error){
        }
      }
      if (!user) {
        console.warn('La sesión del usuario está cerrada')
        //enviar a página pública y desconectar usuario
        this.hasSession = false
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_email')
        try{
          await this.$router.push({name: 'Login'})
        }catch(error){
        }
      }
    });
  },


}






</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
