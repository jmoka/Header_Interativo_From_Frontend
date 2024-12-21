<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn max-width="80" size="small" v-bind="activatorProps">
          <span class="mx-3">{{ title }}</span>
          <span>
            <svg-icon type="mdi" :path="icones" />
          </span>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn v-if="visiveBtnlSalvar" icon @click="dialog = false">
            <svg-icon :color="'red'" type="mdi" :path="mdiArrowLeftCircle" />
          </v-btn>

          <v-toolbar-title>Configurar Textos e Títulos</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            v-if="visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
          >
            Salvar
          </v-btn>
        </v-toolbar>

        <v-container fluid class="bg-primary">
          <v-row class="mb-1 bg-red">
            <v-col cols="12" md="6" lg="3" xl="12">
              <Home @alterado="visiveBtnlSalvar = $emit" />
            </v-col>

            <v-col cols="12" md="6" lg="3" xl="12">
              <Contato @alterado="this.visiveBtnlSalvar = $emit" />
            </v-col>

            <v-col cols="12" md="6" lg="3" xl="12">
              <Sobre @alterado="this.visiveBtnlSalvar = $emit" />
            </v-col>

            <v-col cols="12" md="6" lg="3" xl="12">
              <Login @alterado="this.visiveBtnlSalvar = $emit" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import Home from "./home.vue";
import Contato from "./contato.vue";
import Sobre from "./sobreNos.vue";
import Login from "./login.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icones: {
      type: String,
      required: true,
    },
  },
  components: {
    SvgIcon,
    Home,
    Contato,
    Sobre,
    Login,
  },

  data() {
    return {
      visiveBtnlSalvar: false,
      colorSalvar: "white",
      bg: "bg-blue",
      dialog: false,
    };
  },

  methods: {
    salvar() {
      // Lógica de salvar
      console.log("Configurações salvas");
      location.reload();
    },
  },
};
</script>
