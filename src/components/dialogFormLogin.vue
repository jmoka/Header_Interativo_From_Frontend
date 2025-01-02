<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="Login">
      <v-card-text>
        <v-row dense>
          <v-col cols="8">
            <v-text-field label="Email*" required v-model="email"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              label="Password*"
              type="password"
              required
              v-model="senha"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="plain" to="/"> Sair </v-btn>

        <v-btn color="primary" variant="tonal" @click="entrar" :loading="loading">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { request, gql } from "graphql-request";

const CONSULTAR_USER_EMAIL = gql`
  query perfil($email: String) {
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
      loading: false, // Estado de carregamento
    };
  },

  methods: {
    async consultarUserEmail() {
      if (!this.email || !this.senha) {
        alert("É Obrigatório o Email e Senha ");
        localStorage.removeItem("token");
      }

      this.loading = true;

      try {
        const variables = {
          // user: "User", // Alterar conforme necessário
          email: this.email,
          // senha: this.senha, // Adicione a senha aqui
        };

        const response = await request(
          "http://localhost:4000/", // URL da API GraphQL
          CONSULTAR_USER_EMAIL,
          variables
        );

        return response.perfil.user;
      } catch (err) {
        throw new Error(err);
      }
    },

    async entrar() {
      const user = await this.consultarUserEmail();

      if (!user) {
        alert("Email e Senha não Confere");
        localStorage.removeItem("token");
      }

      this.loading = true;

      try {
        const variables = {
          user: user, // Alterar conforme necessário
          email: this.email,
          senha: this.senha, // Adicione a senha aqui
        };

        const response = await request(
          "http://localhost:4000/", // URL da API GraphQL
          LOGIN_MUTATION,
          variables
        );

        // console.log("Resposta da Mutação: ", response.logar.token);

        const token = JSON.stringify(response.logar.token);

        localStorage.setItem("token", token);

        //console.log(token);
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        localStorage.removeItem("token");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
