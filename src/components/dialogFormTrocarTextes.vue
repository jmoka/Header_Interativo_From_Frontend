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

          <v-btn
            v-if="visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
            >Salvar</v-btn
          >
        </v-toolbar>

        <v-container>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="alterar">
              <v-row>
                <v-col cols="10">
                  <span class="d-flex">
                    <v-text-field
                      v-model="textHome"
                      label="Título do Home"
                    ></v-text-field>
                    <svg-icon
                      :color="colorIcone"
                      v-if="iconeAba1Visivel"
                      type="mdi"
                      :path="mdiHandOkay"
                      size="50"
                    />
                  </span>
                </v-col>
                <v-col>
                  <v-switch
                    v-model="keyHome"
                    @change="acaobtnVisivel"
                    color="green"
                    base-color="red"
                  >
                  </v-switch>
                </v-col>
              </v-row>

              <span class="d-flex">
                <v-text-field
                  v-model="textContato"
                  label="Título do Contato"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeAba2Visivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>

              <span class="d-flex">
                <v-text-field
                  v-model="textSobreNos"
                  label="Título Sobre Nós"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeAba3Visivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>

              <span class="d-flex">
                <v-text-field v-model="textDoLogin" label="Título Login"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeLoginVisivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>
              <span class="d-flex">
                <v-text-field v-model="textOBS" label="Título Observação"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="visibleObs"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
              </span>
              <span class="d-flex">
                <v-label text="+5591999999999"></v-label>
                <v-text-field
                  v-model="TextWhatsapp"
                  label="Numero WhatsApp"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="visibleWhatsapp"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="whatsapp"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <v-btn class="mt-2" type="submit" block>Alterar</v-btn>
            </v-form>
          </v-sheet>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHandOkay, mdiNull, mdiWhatsapp } from "@mdi/js";

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
      keyHome: true,
      whatsapp: true,
      visiveBtnlSalvar: false,
      visibleWhatsapp: false,
      visibleObs: false,
      colorSalvar: "white",
      bg: "bg-blue",
      iconeAba1Visivel: false,
      iconeAba2Visivel: false,
      iconeAba3Visivel: false,
      iconeLoginVisivel: false,
      dialog: false,
      textHome: "",
      textContato: "",
      textSobreNos: "",
      textDoLogin: "",
      TextWhatsapp: "",
      mdiHandOkay,
      colorIcone: "green",
    };
  },
  methods: {
    acaobtnVisivel() {
      if (this.keyHome) {
        localStorage.setItem("opcao", JSON.stringify(this.keyHome));
      } else {
        localStorage.setItem("opcao", JSON.stringify(this.keyHome));
      }

      if (this.whatsapp) {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      } else {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      }
    },

    salvar() {
      location.reload();
    },
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        let dbAtualizado = db ? JSON.parse(db) : {};

        if (this.textHome) {
          dbAtualizado.textoAba1 = this.textHome || null;
          this.iconeAba1Visivel = true;
        }

        if (this.textContato) {
          dbAtualizado.textoAba2 = this.textContato || null;
          this.iconeAba2Visivel = true;
        }
        if (this.textSobreNos) {
          dbAtualizado.textoAba3 = this.textSobreNos || null;
          this.iconeAba3Visivel = true;
        }
        if (this.textDoLogin) {
          dbAtualizado.textLogin = this.textDoLogin || null;
          this.iconeLoginVisivel = true;
        }
        if (this.textOBS) {
          dbAtualizado.obs = this.textOBS || null;
          this.visibleObs = true;
        }
        if (this.TextWhatsapp) {
          console.log();
          dbAtualizado.numeroWhatsApp = this.TextWhatsapp || null;
          this.visibleWhatsapp = true;
        }

        dbAtualizado.textVisibleHome = this.keyHome || null;
        dbAtualizado.wnatsappVisible = this.whatsapp || null;

        localStorage.setItem("dbConfig", JSON.stringify(dbAtualizado));
        this.visiveBtnlSalvar = true;

        this.colorSalvar = "white";
        this.bg = "bg-green";
      } catch (error) {
        console.error("Erro ao alterar as configurações:", error);
      }
    },
  },
  mounted() {
    const opcaoArmazenada = localStorage.getItem("opcao");
    this.keyHome = opcaoArmazenada ? JSON.parse(opcaoArmazenada) : true;

    const opcaoWhatsappa = localStorage.getItem("opcao1");
    this.whatsapp = opcaoWhatsappa ? JSON.parse(opcaoWhatsappa) : true;
  },
};
</script>
