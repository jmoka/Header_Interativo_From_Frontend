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
          <v-btn v-if="!visiveBtnlSalvar" icon @click="dialog = false">
            <svg-icon :color="red" type="mdi" :path="mdiArrowLeftCircle" />
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

        <v-container style="width: 50%">
          <v-sheet>
            <v-form @submit.prevent="alterar">
              <v-row class="mb-6 justify-center align-center">
                <!-- Ícone de Confirmação -->
                <v-col
                  v-if="home.iconeSalvar"
                  cols="2"
                  class="d-flex justify-center align-center"
                >
                  <svg-icon
                    :color="home.colorIcone"
                    type="mdi"
                    :path="home.icone"
                    :size="home.size"
                  />
                </v-col>

                <!-- Texto Home text-field -->
                <v-col cols="5" class="d-flex flex-column align-left">
                  <v-label :text="home.label"></v-label>
                  <v-text-field class="w-100" v-model="home.text"> </v-text-field>
                  <span class="mt-2" :style="{ backgroundColor: home.corTexto }">.</span>
                </v-col>

                <!-- Switch Visibilidade -->

                <v-col cols="2">
                  <p v-if="!home.visivel_text_Oculto_Visivel">Oculto</p>
                  <v-switch
                    v-model="home.visivel_text"
                    @change="acaoHome"
                    :color="home.colorVisivelTrue"
                    :base-color="home.colorVisivelFalse"
                  >
                  </v-switch>

                  <p v-if="home.visivel_text_Oculto_Visivel">Visivel</p>
                </v-col>

                <!-- Caixa de  Cor -->
                <v-col cols="3" class="d-flex flex-column align-center">
                  <p :style="{ color: home.corTexto }">Caixa de Cor</p>
                  <v-color-picker
                    v-model="home.corTexto"
                    mode="hexa"
                    show-swatches
                    hide-inputs
                    hide-sliders
                    hide-canvas
                  ></v-color-picker>
                </v-col>
              </v-row>
              <v-row class="mb-6 justify-center align-center">
                <!-- Texto Contato -->

                <v-col
                  v-if="iconeAba2Visivel"
                  cols="2"
                  class="d-flex justify-center align-center"
                >
                  <svg-icon
                    :color="colorIcone"
                    type="mdi"
                    :path="mdiHandOkay"
                    size="50"
                  />
                </v-col>
                <!-- texto contatos -->
                <v-col cols="5" class="d-flex flex-column align-left">
                  <v-label text="Trocar texto Contatos"></v-label>
                  <v-text-field
                    class="w-100"
                    v-model="textContato"
                    label="Título do Contato"
                  ></v-text-field>
                  <span class="mt-2" :style="{ backgroundColor: corContato }">.</span>
                </v-col>

                <!-- Switch Visibilidade -->

                <v-col>
                  <p v-if="!TextovisivelOcultoContatos">Oculto</p>
                  <v-switch
                    v-model="contato"
                    @change="acaobtnVisivel"
                    color="green"
                    base-color="red"
                  >
                  </v-switch>

                  <p v-if="TextovisivelOcultoContatos">Visivel</p>
                </v-col>
                <v-col cols="3" class="d-flex flex-column align-center">
                  <p :style="{ color: corContato }">Cor texto Contato</p>
                  <v-color-picker
                    v-model="corContato"
                    mode="hexa"
                    show-swatches
                    hide-inputs
                    hide-sliders
                    hide-canvas
                  ></v-color-picker>
                </v-col>
              </v-row>

              <v-row class="mb-6 justify-center align-center">
                <!-- Ícone de Confirmação -->
                <v-col
                  v-if="iconeAba3Visivel"
                  cols="1"
                  class="d-flex justify-center align-center"
                >
                  <svg-icon
                    :color="colorIcone"
                    type="mdi"
                    :path="mdiHandOkay"
                    size="50"
                  />
                </v-col>
                <!-- texto-sobre-nos -->
                <v-col cols="5" class="d-flex flex-column align-left">
                  <v-label text="Trocar texto Sobre Nós"></v-label>
                  <v-text-field class="w-100" v-model="textSobreNos" label="Sobre Nós">
                  </v-text-field>
                  <span class="mt-2" :style="{ backgroundColor: corSobreNos }">.</span>
                </v-col>
                <!-- Switch Visibilidade -->
                <v-col>
                  <p v-if="!TextovisivelOcultoSobreNos">Oculto</p>

                  <v-switch
                    v-model="sobrenos"
                    @change="acaobtnVisivel"
                    color="green"
                    base-color="red"
                  >
                  </v-switch>

                  <p v-if="TextovisivelOcultoSobreNos">Visivel</p>
                </v-col>

                <!-- Cor do Texto -->
                <v-col cols="3" class="d-flex flex-column align-center">
                  <p :style="{ color: corSobreNos }">Cor texto Sobre Nós</p>
                  <v-color-picker
                    v-model="corSobreNos"
                    mode="hexa"
                    show-swatches
                    hide-inputs
                    hide-sliders
                    hide-canvas
                  ></v-color-picker>
                </v-col>
              </v-row>

              <!-- login -->
              <span class="d-flex">
                <v-text-field v-model="textDoLogin" label="Título Login"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeLoginVisivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="textVisibleLogin"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
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
                <v-switch
                  v-model="textObsVisible"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <v-row>
                <span class="d-flex">
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
              </v-row>

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
import { mdiHandOkay, mdiArrowLeftCircle, mdiFormatListBulletedSquare } from "@mdi/js";

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
      TextovisivelOcultoContatos: true,
      TextovisivelOcultoSobreNos: true,
      colorIcoVoltar: "",
      // home
      home: {
        visivel_text_Oculto_Visivel: true,
        visivel_text: true,
        text: "",
        // switch: true,
        corTexto: "color-black",
        iconeSalvar: false,
        colorIcone: "green",
        icone: mdiHandOkay,
        size: 50,
        label: "Trocar texto Home",
        colorVisivelTrue: "green",
        colorVisivelFalse: "red",
        localStorageVisibleText: "localStorageVisibleText",
        localStorageCorTexto: "localStorageCorTexto",
        localStorageTexto: "localStorageTexto",
      },

      corContato: "color-black",

      corSobreNos: "color-black",
      whatsapp: true,
      contato: true,
      sobrenos: true,
      textVisibleLogin: true,
      visiveBtnlSalvar: false,
      visibleWhatsapp: false,
      textObsVisible: false,
      visibleObs: false,
      colorSalvar: "white",
      bg: "bg-blue",
      TextovisivelOcultoContatos: true,
      TextovisivelOcultoSobreNos: true,

      iconeAba2Visivel: false,
      iconeAba3Visivel: false,
      iconeLoginVisivel: false,
      dialog: false,

      textContato: "",
      textSobreNos: "",
      textDoLogin: "",
      TextWhatsapp: "",
      textOBS: "",
      mdiHandOkay,
      mdiArrowLeftCircle,
      colorIcone: "green",
    };
  },

  methods: {
    acaoHome() {
      if (this.home.visivel_text) {
        localStorage.setItem(
          this.home.localStorageVisibleText,
          JSON.stringify(this.home.visivel_text)
        );
        this.home.visivel_text_Oculto_Visivel = this.home.visivel_text;
      } else {
        localStorage.setItem(
          this.home.localStorageVisibleText,
          JSON.stringify(this.home.visivel_text)
        );
        this.home.visivel_text_Oculto_Visivel = this.home.visivel_text;
      }

      if (this.home.corTexto) {
        localStorage.setItem(
          this.home.localStorageCorTexto,
          JSON.stringify("color:" + this.home.corTexto)
        );
      }
    },

    acaobtnVisivel() {
      if (this.whatsapp) {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      } else {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      }

      if (this.contato) {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
        this.TextovisivelOcultoContatos = this.contato;
      } else {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
        this.TextovisivelOcultoContatos = this.contato;
      }

      if (this.sobrenos) {
        localStorage.setItem("opcao3", JSON.stringify(this.sobrenos));
        this.TextovisivelOcultoSobreNos = this.sobrenos;
      } else {
        localStorage.setItem("opcao3", JSON.stringify(this.sobrenos));
        this.TextovisivelOcultoSobreNos = this.sobrenos;
      }

      if (this.textVisibleLogin) {
        localStorage.setItem("opcao4", JSON.stringify(this.textVisibleLogin));
      } else {
        localStorage.setItem("opcao4", JSON.stringify(this.textVisibleLogin));
      }

      if (this.textObsVisible) {
        localStorage.setItem("opcao5", JSON.stringify(this.textObsVisible));
      } else {
        localStorage.setItem("opcao5", JSON.stringify(this.textObsVisible));
      }

      if (this.corContato) {
        localStorage.setItem("corContato", JSON.stringify("color:" + this.corContato));
      } else {
        localStorage.setItem("corContato", JSON.stringify("color:" + this.corContato));
      }
      if (this.corSobreNos) {
        localStorage.setItem("corSobreNos", JSON.stringify("color:" + this.corSobreNos));
      } else {
        localStorage.setItem("corSobreNos", JSON.stringify("color:" + this.corSobreNos));
      }
    },

    salvar() {
      location.reload();
    },
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        let dbAtualizado = db ? JSON.parse(db) : {};
        let localStorageVisibleText_ = JSON.parse(
          localStorage.getItem(this.home.localStorageVisibleText)
        );

        // home
        if (localStorageVisibleText_) {
          console.log(this.home.visivel_text);
          dbAtualizado.textVisibleHome = localStorageVisibleText_;
          console.log(dbAtualizado.textVisibleHome);
          this.home.iconeSalvar = true;
        } else {
          console.log(this.home.visivel_text);
          dbAtualizado.textVisibleHome = localStorageVisibleText_;
          console.log(dbAtualizado.textVisibleHome);
        }

        if (this.home.text) {
          dbAtualizado.textoAba1 = this.home.text || null;
          this.home.iconeSalvar = true;
        }

        if (this.home.corTexto) {
          dbAtualizado.colorTextHome = "color:" + this.home.corTexto;
          this.home.iconeSalvar = true;
        }

        // ===============================================================
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
          dbAtualizado.numeroWhatsApp = this.TextWhatsapp || null;
          this.visibleWhatsapp = true;
        }
        if (this.textLoginVisible) {
          dbAtualizado.textLoginVisible = this.textVisibleLogin;
          this.iconeAba1Visivel = true;
        }
        if (this.textObsVisible) {
          dbAtualizado.visibleObs = this.textObsVisible;
          this.iconeAba1Visivel = true;
        }

        if (this.corContato) {
          dbAtualizado.colorTextContato = "color:" + this.corContato;
          this.iconeAba2Visivel = true;
        }
        if (this.corSobreNos) {
          dbAtualizado.colorTextSobreNos = "color:" + this.corSobreNos;
          this.iconeAba3Visivel = true;
        }

        dbAtualizado.wnatsappVisible = this.whatsapp;
        dbAtualizado.contatoVisible = this.contato;
        dbAtualizado.sobrenostoVisible = this.sobrenos;
        dbAtualizado.textLoginVisible = this.textVisibleLogin;
        dbAtualizado.visibleObs = this.textObsVisible;

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
    // home
    const localStorageVisibleText_ = localStorage.getItem("localStorageVisibleText");
    this.home.visivel_text = localStorageVisibleText_
      ? JSON.parse(localStorageVisibleText_)
      : true;

    const localStorageCorTexto_ = localStorage.getItem("localStorageCorTexto");
    this.home.corTexto = localStorageCorTexto_ ? JSON.parse(localStorageCorTexto_) : "";

    const opcaoWhatsappa = localStorage.getItem("opcao1");
    this.whatsapp = opcaoWhatsappa ? JSON.parse(opcaoWhatsappa) : true;

    const opcaoContato = localStorage.getItem("opcao2");
    this.contato = opcaoContato ? JSON.parse(opcaoContato) : true;

    const opcaoSobreNos = localStorage.getItem("opcao3");
    this.sobrenos = opcaoSobreNos ? JSON.parse(opcaoSobreNos) : true;

    const opcaoTextoLogin = localStorage.getItem("opcao4");
    this.textVisibleLogin = opcaoTextoLogin ? JSON.parse(opcaoTextoLogin) : true;

    const opcaoTextoObs = localStorage.getItem("opcao5");
    this.textObsVisible = opcaoTextoObs ? JSON.parse(opcaoTextoObs) : true;

    const opcaoCorContato = localStorage.getItem("corContato");
    this.corContato = opcaoCorContato ? JSON.parse(opcaoCorContato) : "";

    const opcaoCorSobreNos = localStorage.getItem("corSobreNos");
    this.corSobreNos = opcaoCorSobreNos ? JSON.parse(opcaoCorSobreNos) : "";
  },
};
</script>
