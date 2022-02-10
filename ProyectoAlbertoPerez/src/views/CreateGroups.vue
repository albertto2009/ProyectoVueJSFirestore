<template>
  <div class="CreateGroups">
    <h2 class ="cabecera">¿Qué plataforma quieres compartir?</h2>
    <p>Crea un grupo compartido y recibe dinero de forma automática cada mes.</p>
    <div>
        <h2 class ="cabecera cabeceraHome">Subscripciones disponibles:</h2>
        <ul class="listasubscripciones ">    
            <li class="licss" v-for="item in listaBotones" :key="item.id"><a href="#" @click="createForm(item)"><img :src="item.img" width="120" height="80"></a></li>
        </ul>
    </div>
    <div v-if="muestreo">
        <h2 class ="cabecera cabeceraHome">Formulario creación de grupo:</h2>
        <section>
        <!-- <img :src="formularioCreate.img" alt="" class="licss"> -->
        <b-field label="Servicio" class="margintop">
            <b-input v-model="formularioCreate.name" class="campo" disabled></b-input>
        </b-field>

        <b-field label="Email del servicio"
            >
            <b-input type="email"
                maxlength="30" class="campo" v-model="formularioCreate.email">
            </b-input>
        </b-field>

        <b-field label="Contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="formularioCreate.password">
            </b-input>
        </b-field>

        <b-field label="Repite tu contraseña">
            <b-input type="password"
                password-reveal class="campo" v-model="repeatpassword">
            </b-input>
        </b-field>
        <b-field label="Precio subscripción individual" class="margintop">
            <b-input v-model="formularioCreate.PrecioIndividual" class="campo" disabled></b-input>
        </b-field>

        <b-field label="Precio por cuenta" class="margintop ">
            <b-numberinput 
                v-model="precioPorCuenta"
                step="0.2"
                min-step="0.01"
                aria-minus-label="Decrement by 0.15"
                aria-plus-label="Increment by 0.15"
                :min="precioMinimo" :max="formularioCreate.PrecioTotal" 
                class="is-4"
                >
            </b-numberinput>
        </b-field>

        <b-field label="Elige un numero de cuentas que compartir">
            <b-select placeholder="Elige un numero de cuenta que compartir" v-model="ncuentasCompartidas">
                <option v-for="(item,index) in nVecesCompartir" :key="index">{{item}}</option>
            </b-select>
        </b-field>

        <b-field label="Ganarás" class="margintop">
            <b-input v-model="ganancia" class="campo" disabled></b-input>
        </b-field>

        <div class="buttons">
            <b-button type="is-primary" class="buttonprimary" @click="AddData">Crear Grupo</b-button>
            
        </div>

    </section>

    </div>

    
  </div>
</template>


<script>

import { Db, Auth } from "@/modules/firebase";
export default {
  name: 'CreateGroups',
  data() {
      return{
        muestreo : false,
        nVecesCompartir: [],
        ncuentasCompartidas: "",
        precioMinimo : "",
        ganancia: "",
        repeatpassword: "",
        precioPorCuenta : "",
        listaBotones : [
          {"id":1 , img : '/imgLogos/disney.png', name: 'Disney', PrecioIndividual : 8.99 , nVecesCompartir : 4 , precioMinVenta : 1.5 },
          {"id":2 , img : '/imgLogos/crunchyroll.png', name: 'Crunchyroll',  PrecioIndividual : 6.49 , nVecesCompartir : 4, precioMinVenta : 0.65 },
          {"id":3 , img : '/imgLogos/filmin.png', name: 'Filmin',  PrecioIndividual : 7.99 , nVecesCompartir : 2, precioMinVenta : 0.65},
          {"id":4 , img : '/imgLogos/hbo.png', name: 'HBOMax',  PrecioIndividual : 8.99, nVecesCompartir : 3, precioMinVenta : 2},
          {"id":5 , img : '/imgLogos/netflix.png', name: 'Netflix',  PrecioIndividual : 17.99 , nVecesCompartir : 4, precioMinVenta : 3.5},
          {"id":6 , img : '/imgLogos/spotify.png', name: 'Spotify' , PrecioIndividual : 16.99, nVecesCompartir : 6,  precioMinVenta : 3.5}
        
        ],
        formularioCreate: {
            userPropietario: localStorage.getItem("user_email"),
            name : "",
            img: "",
            email: "",
            password : "",
            PrecioIndividual: "",
            ncuentasCompartidas: "",
            PrecioTotal: "",
            precioPorCuenta : "",
        }
    
      }
      
  },
  methods:{
      createForm(item){
          this.muestreo = true
          
          console.log("Has pulsado " + item.name)

          this.formularioCreate.name = item.name
          this.formularioCreate.img = item.img
          this.formularioCreate.PrecioIndividual = `${item.PrecioIndividual}€`
          this.formularioCreate.PrecioTotal = item.PrecioIndividual
          this.precioMinimo = item.precioMinVenta

          const vecesCompartido =  item.nVecesCompartir
          console.log(vecesCompartido)
          this.nVecesCompartir.length = 0
          for(let i = 1; i <= vecesCompartido; i++){
              console.log(i)
              this.nVecesCompartir.push(i)
          }

         // console.log(this.formularioCreate.nVecesCompartir)

          
      },
      async AddData(){
          //comprobamos contraseña
        if(this.formularioCreate.email == "" || this.formularioCreate.password == "" || this.formularioCreate.ncuentasCompartidas == ""){
             this.$buefy.notification.open({
                    title: 'Error',
                    message: 'Hay campos que están vacios, rellene el formulario',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            return
        }

        console.log(this.formularioCreate.img)
        if(this.repeatpassword === this.formularioCreate.password){
              console.info("contraseñas iguales")
        }else{
              this.$buefy.dialog.alert({
                    title: 'Contraseña equivocada',
                    message: 'Asegurese de que la contraseña es igual en ambos campos',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
        }
        // cargamos los datos de formulariocreate
        try {
            this.formularioCreate.members = []
            await Db.collection("Productos").add(this.formularioCreate);
            await this.$router.replace({name: 'Mygroups'})
        } catch (e) {
            console.error(e);
        }

        


      },




  },

    watch: {
    ncuentasCompartidas(){
      console.info("Ha cambiado el numero del formulario")
      this.formularioCreate.ncuentasCompartidas = this.ncuentasCompartidas
      console.info(this.formularioCreate.ncuentasCompartidas)
      const precioUnitario = this.formularioCreate.precioPorCuenta
      const numeroCuentasVender = this.formularioCreate.ncuentasCompartidas
      this.ganancia = precioUnitario * numeroCuentasVender
      this.ganancia = `${this.ganancia.toFixed(2)} €`
      console.log(precioUnitario)
      console.log(numeroCuentasVender)
      console.log(this.ganancia)
    },
    precioPorCuenta(){
        console.log("precio cambiado")
        this.formularioCreate.precioPorCuenta = this.precioPorCuenta
        const precioUnitario = this.formularioCreate.precioPorCuenta
        const numeroCuentasVender = this.formularioCreate.ncuentasCompartidas
        this.ganancia = precioUnitario * numeroCuentasVender
        this.ganancia = `${this.ganancia.toFixed(2)} €`

    }
  },
  
}
</script>



<style>

.creategroups {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
}

.cabecera{
    font-family: Raleway, sans-serif;
    font-weight: 700;
    font-size: 2.25rem;
    line-height: 1.33;
    text-align: center;
    color: rgb(67, 72, 80);
}

.licss{
    
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(245, 250, 255);
    box-shadow: rgb(0 0 0 / 20%) 1px 4px 6px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    height: 80px;
    width: 120px;
    float: left;
    margin-left: 2em;
    list-style:none;
}

.listasubscripciones{
    display: flex;
    align-content: center;
    width: 100%;
    justify-content: center;
    margin-top: 2em;
}

.licss img{
    padding-top: 1.5em;
}

section {
    margin-top: 2em;
}

</style>