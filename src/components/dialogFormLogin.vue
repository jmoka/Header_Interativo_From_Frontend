<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="entrar">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :loading="loading" color="primary" block>Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { request, gql } from "graphql-request";

const CONSULTAR_USER_EMAIL = gql`
  query perfil($email: String!) {
    perfil(email: $email) {
      user
      email
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation logar($user: String!, $email: String!, $senha: String!) {
    logar(user: $user, email: $email, senha: $senha) {
      user
      email
      token
    }
  }
`;

export default {
  data() {
    return {
      dialog: true,
      senha: "",
      email: "",
      loading: false,
    };
  },

  methods: {
    async consultarUserEmail() {
      if (!this.email || !this.senha) {
        alert("É obrigatório fornecer Email e Senha.");
        localStorage.removeItem("token");
        return null;
      }

      try {
        const variables = { email: this.email };
        const response = await request(
          "http://localhost:4000/",
          CONSULTAR_USER_EMAIL,
          variables
        );

        return response.perfil?.user || null; // Retorna null caso perfil.user não exista
      } catch (err) {
        console.error("Erro ao consultar usuário:", err);
        alert("Usuário não encontrado ou erro na consulta.");
        return null;
      }
    },

    async entrar() {
      this.loading = true;

      try {
        const user = await this.consultarUserEmail();

        if (!user) {
          alert("Email e senha não conferem.");
          localStorage.removeItem("token");
          this.loading = false;
          return;
        }

        const variables = { user, email: this.email, senha: this.senha };
        const response = await request(
          "http://localhost:4000/",
          LOGIN_MUTATION,
          variables
        );

        const token1 = response;
        console.log(token1.logar.token, "hhhhh");
        const { token } = token1.logar.token;
        console.log(token, "hhhhh");

        if (!token) {
          throw new Error("Token não retornado pelo servidor.");
        }

        // Armazena o token diretamente
        localStorage.setItem("token", token);

        // Configuração do menu
        const dbConfig = localStorage.getItem("dbConfig");

        if (dbConfig) {
          const dados = JSON.parse(dbConfig);
          dados.menu.menuVisible = true;
          localStorage.setItem("dbConfig", JSON.stringify(dados));
          console.log("Configurações do menu atualizadas:", dados);
        } else {
          console.log("Nenhuma configuração encontrada.");
        }

        // Redirecionamento
        window.location.href = "/";
      } catch (error) {
        console.error("Erro ao realizar login:", error.message || error);
        alert("Erro ao realizar login. Verifique suas credenciais e tente novamente.");
        localStorage.removeItem("token");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui */
</style>
