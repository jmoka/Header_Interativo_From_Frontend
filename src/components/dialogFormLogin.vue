<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn variant="tonal" v-bind="activatorProps">
          <svg-icon
            class="me-2"
            type="mdi"
            :path="mdiAccount"
            :color="colorIconeLogin"
          ></svg-icon>
          <h4 :class="colorTextLogin">Login</h4>
        </v-btn>
      </template>

      <v-card title="Login">
        <v-card-text>
          <v-row dense>
            <v-col cols="8">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="plain" @click="dialog = false"> Sair </v-btn>

          <v-btn color="primary" variant="tonal" @click="dialog = false"> Entrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount } from "@mdi/js";

export default {
  data() {
    return {
      dialog: false,
      mdiAccount: mdiAccount,
    };
  },
  components: {
    SvgIcon,
  },
  props: {
    colorIconeLogin: {
      type: String,
      default: "blue", // Cor padrão
    },
    colorTextLogin: {
      type: String,
      default: "text-blue", // Classe de texto padrão
    },
  },
};
</script>
