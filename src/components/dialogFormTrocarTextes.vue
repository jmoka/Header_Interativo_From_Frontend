<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn max-width="80" size="small" v-bind="activatorProps">
          <span class="mx-3">{{ title }}</span>
          <span>
            <svg-icon type="mdi" :path="icones"></svg-icon>
          </span>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Configurar Textos e Títulos</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Botão Salvar com cor e fundo dinâmicos -->
          <v-btn :color="colorSalvar" :class="bg" text @click="salvar"> Salvar </v-btn>
        </v-toolbar>

        <v-container>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="alterar">
              <span class="d-flex">
                <v-text-field v-model="textHome" label="Texto do Home"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="textoAba1"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>

              <span class="d-flex">
                <v-text-field
                  v-model="textContato"
                  label="Texto do Contato"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="textoAba2"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>

              <v-btn class="mt-2" type="submit" block @click="alterar"> Submit </v-btn>
            </v-form>
          </v-sheet>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHandOkay } from "@mdi/js";

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
  },
  data() {
    return {
      // Definir a cor inicial do botão: texto branco e fundo azul
      colorSalvar: "white",
      bg: "bg-blue",
      textoAba1: false,
      textoAba2: false,
      dialog: false,
      textHome: "", // Valor inicial para Texto do Home
      textContato: "", // Correção do nome do campo para "textContato"
      mdiHandOkay,
      colorIcone: "green",
    };
  },
  methods: {
    salvar() {
      location.reload();
    },
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        let dbAtualizado = db ? JSON.parse(db) : {}; // Recupera o objeto existente ou inicia um novo

        // Atualiza somente os campos que possuem valores informados
        if (this.textHome) {
          dbAtualizado.textoAba1 = this.textHome;
          this.textoAba1 = true;
        } else {
          this.textoAba1 = false; // Se o campo for vazio, não exibe o ícone
        }

        if (this.textContato) {
          // Corrigido para "textContato"
          dbAtualizado.textoAba2 = this.textContato;
          this.textoAba2 = true;
        } else {
          this.textoAba2 = false; // Se o campo for vazio, não exibe o ícone
        }

        // Salva o objeto atualizado no localStorage
        localStorage.setItem("dbConfig", JSON.stringify(dbAtualizado));

        // Mudando a cor e o fundo do botão Salvar após o envio
        this.colorSalvar = "white"; // Texto branco
        this.bg = "bg-green"; // Fundo verde
      } catch (error) {
        console.error("Erro ao alterar as configurações:", error);
      }
    },
  },
};
</script>
