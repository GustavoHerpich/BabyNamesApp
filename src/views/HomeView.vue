<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card class="text-center">
            <v-card-title class="headline">Bem-vindo ao Nomes de Bebês!</v-card-title>
            <v-card-text>
              <p>Aqui você pode encontrar os melhores nomes para o seu bebê.</p>
              <v-btn @click="goToLogin" color="primary" large>Comece Agora</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
  
      const goToLogin = () => {
        router.push({ name: 'login' });
      };
  
      return { goToLogin };
    },
  });
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  
  h1 {
    font-size: 2em;
  }
  </style>  