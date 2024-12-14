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
          <v-btn v-if="!visiveBtnlSalvar" icon @click="dialog = false">
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

        <v-container fluid>
          <v-sheet>
            <!-- Grid de duas colunas -->
            <v-row class="justify-center align-center">
              <!-- Coluna 1: Home Section -->
              <v-col cols="6">
                <v-col class="justify-center align-center">
                  <v-row
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
                  </v-row>
                  <v-col> 
                  <!-- =========================================== -->
                  <!-- HOME -->
                  <!-- =========================================== -->

                  <v-col cols="4">
                    <v-label :text="home.label" />
                    <v-text-field v-model="home.text" />
                    <v-color-picker
                      v-model="home.corTexto"
                      @click="MetodoBarraHome"
                      mode="hexa"
                      show-swatches
                      hide-inputs
                      hide-sliders
                      hide-canvas
                    />
                    <v-span class="d-flex">
                      <v-switch
                        v-model="home.visivel_text"
                        @change="acaoHome"
                        :color="home.colorVisivelTrue"
                        :base-color="home.colorVisivelFalse"
                      />

                      <v-span class="px-12 pt-5">
                        <p v-if="!home.visivel_text_Oculto_Visivel">Oculto</p>
                        <p v-if="home.visivel_text_Oculto_Visivel">Visível</p>
                      </v-span>
                      <v-span class="px-6 pt-5 mb-0">
                        <span
                          v-if="home.barra"
                          :style="{ backgroundColor: home.corTexto }"
                          >{{ home.corTexto }}
                        </span>
                      </v-span>
                    </v-span>
                    <v-btn class="mt-0" @click="alterarHome" type="btn" block>
                      Salvar
                    </v-btn>
                  </v-col>
                </v-col>
              </v-col>

              <!-- =========================================== -->
              <!-- CONTATO -->
              <!-- =========================================== -->

              <v-col cols="4">
                <v-row class="justify-center align-center">
                  <v-col
                    v-if="contato.iconeSalvar"
                    cols="2"
                    class="d-flex justify-center align-center"
                  >
                    <svg-icon
                      :color="contato.colorIcone"
                      type="mdi"
                      :path="contato.icone"
                      :size="contato.size"
                    />
                  </v-col>

                  <v-col cols="6">
                    <v-label :text="contato.label" />
                    <v-text-field v-model="contato.text" />
                    <v-color-picker
                      v-model="contato.corTexto"
                      @click="MetodoBarraContato"
                      mode="hexa"
                      show-swatches
                      hide-inputs
                      hide-sliders
                      hide-canvas
                    />
                    <v-span class="d-flex">
                      <v-switch
                        v-model="contato.visivel_text"
                        @change="acaocontato"
                        :color="contato.colorVisivelTrue"
                        :base-color="contato.colorVisivelFalse"
                      />

                      <v-span class="px-12 pt-5">
                        <p v-if="!contato.visivel_text_Oculto_Visivel">Oculto</p>
                        <p v-if="contato.visivel_text_Oculto_Visivel">Visível</p>
                      </v-span>
                      <v-span class="px-6 pt-5 mb-0">
                        <span
                          v-if="contato.barra"
                          :style="{ backgroundColor: contato.corTexto }"
                          >{{ contato.corTexto }}
                        </span>
                      </v-span>
                    </v-span>
                    <v-btn class="mt-0" @click="alterarcontato" type="btn" block>
                      Salvar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <!-- =========================================== -->
              <!-- SOBRE NÓS -->
              <!-- =========================================== -->

              <v-col cols="4">
                <v-row class="justify-center align-center">
                  <v-col
                    v-if="contato.iconeSalvar"
                    cols="2"
                    class="d-flex justify-center align-center"
                  >
                    <svg-icon
                      :color="contato.colorIcone"
                      type="mdi"
                      :path="contato.icone"
                      :size="contato.size"
                    />
                  </v-col>

                  <v-col cols="6">
                    <v-label :text="contato.label" />
                    <v-text-field v-model="contato.text" />
                    <v-color-picker
                      v-model="contato.corTexto"
                      @click="MetodoBarraContato"
                      mode="hexa"
                      show-swatches
                      hide-inputs
                      hide-sliders
                      hide-canvas
                    />
                    <v-span class="d-flex">
                      <v-switch
                        v-model="contato.visivel_text"
                        @change="acaocontato"
                        :color="contato.colorVisivelTrue"
                        :base-color="contato.colorVisivelFalse"
                      />

                      <v-span class="px-12 pt-5">
                        <p v-if="!contato.visivel_text_Oculto_Visivel">Oculto</p>
                        <p v-if="contato.visivel_text_Oculto_Visivel">Visível</p>
                      </v-span>
                      <v-span class="px-6 pt-5 mb-0">
                        <span
                          v-if="contato.barra"
                          :style="{ backgroundColor: contato.corTexto }"
                          >{{ contato.corTexto }}
                        </span>
                      </v-span>
                    </v-span>
                    <v-btn class="mt-0" @click="alterarcontato" type="btn" block>
                      Salvar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- Botão Alterar -->
            <v-row class="justify-center mt-4">
              <v-col cols="12"> </v-col>
            </v-row>
          </v-sheet>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHandOkay, mdiArrowLeftCircle } from "@mdi/js";

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
      db: {}, // Inicializado como objeto vazio

      // Home section
      home: {
        barra: false,
        visivel_text_Oculto_Visivel: true,
        visivel_text: true,
        text: "",
        corTexto: "#000000",
        iconeSalvar: false,
        colorIcone: "green",
        icone: mdiHandOkay,
        size: 50,
        label: "Trocar Texto Home",
        colorVisivelTrue: "green",
        colorVisivelFalse: "red",
      },
      // Contato section
      contato: {
        barra: false,
        visivel_text_Oculto_Visivel: true,
        visivel_text: true,
        text: "",
        corTexto: "#000000",
        iconeSalvar: false,
        colorIcone: "green",
        icone: mdiHandOkay,
        size: 50,
        label: "Trocar Texto Contato",
        colorVisivelTrue: "green",
        colorVisivelFalse: "red",
      },

      // UI states
      visiveBtnlSalvar: false,
      colorSalvar: "white",
      bg: "bg-blue",
      dialog: false,
    };
  },

  methods: {
    MetodoBarraHome() {
      this.home.barra = true;
    },
    MetodoBarraContato() {
      this.contato.barra = true;
    },
    // Atualiza o localStorage com o objeto db
    saveToLocalStorage() {
      localStorage.setItem("dbConfig", JSON.stringify(this.db));
    },

    // Ação de visibilidade para a seção Home
    acaoHome() {
      this.home.visivel_text_Oculto_Visivel = this.home.visivel_text;

      this.saveToLocalStorage(); // Salva no localStorage
    },

    // Ação de visibilidade para a seção Contato
    acaoContato() {
      this.contato.visivel_text_Oculto_Visivel = this.contato.visivel_text;

      this.saveToLocalStorage(); // Salva no localStorage
    },

    // Salva todas as alterações
    salvar() {
      this.saveToLocalStorage();
      this.visiveBtnlSalvar = false;
      location.reload();
    },

    // Alteração específica para a Home
    alterarHome() {
      this.db.textVisibleHome = this.home.visivel_text;
      this.db.colorTextHome = "color:" + this.home.corTexto; // Atualiza a cor no db
      this.db.textoHome = this.home.text; // Atualiza o texto no db
      this.saveToLocalStorage();
      this.visiveBtnlSalvar = true;
    },
    alterarcontato() {
      this.db.textVisibleContato = this.contato.visivel_text;
      this.db.colorTextContato = "color:" + this.contato.corTexto; // Atualiza a cor no db
      this.db.textoContato = this.contato.text; // Atualiza o texto no db
      this.saveToLocalStorage();
      this.visiveBtnlSalvar = true;
    },
  },

  mounted() {
    // Recupera o db do localStorage e inicializa os valores
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {}; // Parse ou inicializa como objeto vazio

    // Inicializa os valores da Home
    this.home.visivel_text = this.db.textVisibleHome ?? true;
    this.home.text = this.db.textoHome ?? "";
    this.home.corTexto = this.db.colorTextHome;

    // Inicializa os valores de Contato
    this.contato.visivel_text = this.db.textVisibleContato ?? true;
    this.contato.text = this.db.textoContato ?? "";
    this.contato.corTexto = this.db.colorTextContato;
  },
};
</script>
