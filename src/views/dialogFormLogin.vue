<template>
  <v-dialog v-model="dialog" max-width="500">
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

        <v-btn variant="plain" to="/"> Sair </v-btn>

        <v-btn color="primary" variant="tonal" to="/"> Entrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount } from "@mdi/js";

export default {
  data() {
    return {
      dialog: true,
    };
  },
  components: {
    SvgIcon,
  },
};
</script>
