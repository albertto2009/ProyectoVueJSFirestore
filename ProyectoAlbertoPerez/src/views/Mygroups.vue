<template>
  <div class="CreateGroups">
    <h2 class ="cabecera">Grupos de Usuario</h2>
    
    <div class="CreateGroups">
        <h2 class="cabecera cabeceraHome">Grupos en los que eres el admin</h2>
        <div class="columns is-multiline">
          <div class="column is-4" v-for="(item,index) in adminGroups" :key="index">
            <div class="box">
               <img :src="item.img" alt="" width="80" height="120">
            <p>Grupo compartido de: {{item.userPropietario}} </p>
            <p>Usuarios disponibles: {{item.ncuentasCompartidas}} </p>
            <p>Precio individual: {{item.PrecioTotal}}€ ----> Precio colectivo: {{item.precioPorCuenta}}€ </p>
            <p>Cuenta email del servicio: <b>{{item.email}}</b></p>
            <b-field>
            <b-input type="password"
                :value="item.password"
                password-reveal class="label" disabled>
            </b-input>
          </b-field>

            </div>
           
            
          </div>

        </div>
         <h2 class="cabecera cabeceraHome">Grupos en los que eres miembro</h2>
         <div class="columns is-multiline">
          <div class=" column is-4" v-for="(item,index) in memberGroups" :key="index">
            <div class="box">
               <img :src="item.img" alt="" width="80" height="120">
            <p>Grupo compartido de: {{item.userPropietario}} </p>
            <p>Usuarios disponibles: {{item.ncuentasCompartidas}} </p>
            <p>Precio individual: {{item.PrecioTotal}}€ ----> Precio colectivo: {{item.precioPorCuenta}}€ </p>
            <p>Cuenta email del servicio: <b>{{item.email}}</b></p>
            <b-field>
            <b-input type="password"
                :value="item.password"
                password-reveal class="label" disabled>
            </b-input>
          </b-field>
            </div>
           
            
          </div>

        </div>

    </div>
    
  </div>
</template>

<script>

import { Db, Auth } from "@/modules/firebase"

export default {
  data() {
    return{
      adminGroups : [],
      memberGroups : [],
    }
 
    
  },
  async mounted() {
    const tasks = await Db.collection("Productos")
    //.where("name", "==", "Crunchyroll")
    .where("userPropietario", "==" , localStorage.getItem("user_email"))
    .get();
    console.log(tasks.docs)
     for (const task of tasks.docs) {
        //console.info(task.data())
        this.adminGroups.push(task.data())
      }
    // this.adminGroups = tasks.docs

    // buscamos propietarios distintos
    const tasks2 = await Db.collection("Productos")
    //.where("name", "==", "Crunchyroll")
    .where("userPropietario", "!=" , localStorage.getItem("user_email"))
    .get();
    for (const task2 of tasks2.docs) {
        console.info(task2.data())
        const data = task2.data()
        console.log(data.members)
        const actualUser = localStorage.getItem("user_email")
        for(let i of data.members){
          if(i == actualUser ) {
            this.memberGroups.push(data)
          }
        }
        
      }
       
    },
    methods: {
      mostrarContrasena(){
      var tipo = document.getElementById("password");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }

    }
    }
   
}
 
</script>


<style>

.contenidoMygroups{
    width: 80%;
    margin-top: auto;
    margin-left: auto;
    position: relative;
}

.contenidoMygroups p {
    margin-top: 3em;
    margin-left: 0;
    text-align: left;
    
}

.label {
  
  margin-left: 3em;
  text-align: left;
  width: 50%;
}

</style>