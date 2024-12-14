<template>
  <div >
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn     
          max-width="80"    
          size="small"
          v-bind="activatorProps"         
        >
      <span class="mx-3"  >
        {{ title }}
      </span >
      

<span>
      <svg-icon type="mdi" :path="icones"></svg-icon>
    </span>
        </v-btn>      
      
        
      </template>

      <v-card >
        <v-toolbar>
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>Configurar Imagens e Fundos</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
              text="Save"
              variant="text"
              @click="dialog = false"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <h1>Formulário Aqui</h1>
        </v-container>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {  mdiCogs, 
          mdiAccount, 
          mdiHomeAccount,
          mdiCardAccountMail,
          mdiInformation,
          mdiWhatsapp,
          mdiMenu } from "@mdi/js";

  export default {
    props:{
      title:{
        type: String,
      },
      icones:{
        type: String
      }

    },
    components: {
    SvgIcon,
  },
    
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>