<template>
   <div>
      <div class="CreateGroups">
        <h2 class ="cabecera cabeceraHome">¿En qué quieres ahorrar?</h2>
        <div class="margintop">
          <b-field
             class="searchBar">
            <b-select placeholder="Selecciona un servicio" expanded v-model="list">
                <option v-for="value in listaBotones" :key="value.id" >{{value.name}}</option>
                
            </b-select>
        </b-field>
          

        </div>
        <br>

        <div class="Products">
          
        <h2 class="cabecera cabeceraHome">Productos</h2>
        </div>
        <br>
        <div class="columns is-multiline" v-if="!filtrado">
          <div class=" column is-4" v-for="(item,index) in listGroups" :key="index">
            <div class="box">
              <img :src="item.img" alt="" width="80" height="120">
            <p>Grupo compartido de: {{item.userPropietario}}</p>
            <p>Usuarios disponibles: {{item.ncuentasCompartidas}} </p>
            <b-button type="is-primary" class="buttonprimary" v-if="hasSession" @click="goToProjectPage(item.name_document)">Unirse al grupo</b-button>
            <b-button type="is-primary" class="buttonprimary" v-if="!hasSession" @click="gotoLogin" >Unirse al grupo</b-button>
            <br><br>
            <p>Precio individual: {{item.PrecioTotal}}€ ----> Precio colectivo: <b>{{item.precioPorCuenta}}€</b> </p>
            </div>
            
          </div>
        </div>

        <div class="columns is-multiline" v-if="filtrado">
          <div class="column is-4" v-for="(item,index) in filteredList" :key="index">
            <div class="box">
            <img :src="item.img" alt="" width="80" height="120">
            <p>Grupo compartido de: {{item.userPropietario}} </p>
            <p>Usuarios disponibles: {{item.ncuentasCompartidas}} </p>
            <b-button type="is-primary" class="buttonprimary" v-if="hasSession" @click="UnirseAgrupo(item)">Unirse al grupo</b-button>
            <b-button type="is-primary" class="buttonprimary" v-if="!hasSession" @click="gotoLogin" >Unirse al grupo</b-button>
            <br><br>
            <p>Precio individual: {{item.PrecioTotal}}€ ----> Precio colectivo: <b>{{item.precioPorCuenta}}€</b></p>
            </div>
            
          </div>
        </div>

        

    
      </div>
    
    
    
    
  </div>
</template>

<script>

import { Db, Auth } from "@/modules/firebase";


export default {
  data() {
    return{
      list: "",
      listaBotones : [
          {"id":7 , img : '/imgLogos/disney.png', name: 'Todos'},
          {"id":1 , img : '/imgLogos/disney.png', name: 'Disney'},
          {"id":2 , img : '/imgLogos/crunchyroll.png', name: 'Crunchyroll' },
          {"id":3 , img : '/imgLogos/filmin.png', name: 'Filmin'},
          {"id":4 , img : '/imgLogos/hbo.png', name: 'HBOMax'},
          {"id":5 , img : '/imgLogos/netflix.png', name: 'Netflix'},
          {"id":6 , img : '/imgLogos/spotify.png', name: 'Spotify'}
        ],
      listGroups: [],
      filteredList: [],
      filtrado : false,
    }
    
  }, 
  async mounted() {
    const tasks = await Db.collection("Productos")
    .where("userPropietario", "!=" , localStorage.getItem("user_email"))
    //.where("ncuentasCompartidas", ">", 0)
     .get();
     console.log(tasks.docs)
    
      for (const task of tasks.docs) {
         console.info(task.id)
         let datos = task.data()
         datos.name_document = task.id
         console.info(datos.members.includes(localStorage.getItem("user_email")))
         if(!datos.members.includes(localStorage.getItem("user_email"))){
            if(datos.ncuentasCompartidas > 0){
                 this.listGroups.push(datos)
           }

         }

        

         console.info(this.listGroups)
       }
   

  },
  methods: {
    async gotoLogin(){
      await this.$router.replace({name: 'Login'})
    },

    async goToProjectPage(name_document) {
      await this.$router.push({name: 'PaySimulator', params: {id: name_document}})
    },

    async UnirseAgrupo(item){
      //clonamos el item que traemos
      
      console.info(item.name_document)
      //ponemos un -1 al usuarios disponibles
      item.ncuentasCompartidas = item.ncuentasCompartidas - 1
      item.members.push(localStorage.getItem("user_email"))
      
      await Db.collection("Productos").doc(item.name_document).set(item)
      await this.$router.push({name: 'Mygroups'})
    }

  },
  watch: {
    list(){
      console.info(this.list)
      // this.filtrado(this.list)
      if(this.list == "Todos"){
        this.filtrado = false
      }else{
        this.filtrado = true
        this.filteredList.length = 0
        for(let i of this.listGroups){
          if(i.name == this.list)
        this.filteredList.push(i)
      }

      }
      
      

    }
  
  }, 
  props: {
    hasSession: {
        type: Boolean,
        default: false
    }
  },
}
</script>

<style>

.contenedorProductos{
  
  text-align: left;
  justify-content: left;
  align-items: left;
  margin-left: 10%;
  
  
  display: flex;
}


.contenedorProductos img{
  margin-left: 30%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.contenedorProductos p{
  flex: none;
  margin-left: 1em;
  margin-right: 1em;
}

.contenedorProductos button{
  flex: none;
  margin-left: 3em;
  
}

.borde {
  
  border: 0.1px solid #000000;
  border-radius: 1em;
  
  

}

.cabeceraHome {
  text-align: left;
  margin-left: 5em;
  margin-top:1em;
}


.searchBar{
  margin-left: 10%;
  width: 40%;
 
  float: left;
}


.margintop {
  margin-top: 2em;
}

.products {
  float: right;
}

</style>