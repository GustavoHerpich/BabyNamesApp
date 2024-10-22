<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="headline">Recuperar Senha</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="validForm">
                <v-text-field
                  v-model="username"
                  label="Nome de Usuário"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  label="Nova Senha"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[rules.required]"
                  @click:append="showPassword = !showPassword"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                ></v-text-field>
                <v-btn @click="recoverPassword" :disabled="!validForm" color="primary">Recuperar Senha</v-btn>
                <v-alert v-if="showRecoverSuccess" type="success" dismissible>
                  {{ recoverReq.response }}
                </v-alert>
                <v-alert v-if="showRecoverError" type="error" dismissible>
                  {{ extractAxiosErrorMessage(recoverReq.errorObj) }}
                </v-alert>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { _babyNames } from "@/plugins/axios";
  import Requester from "@/utils/requests/Requester";
  import { extractAxiosErrorMessage } from "@/utils/requests/Request";
  
  export default {
    setup() {
      const router = useRouter();
  
      const validForm = ref(false);
      const username = ref("");
      const newPassword = ref("");
      const showPassword = ref(false);
      const showRecoverError = ref(false);
      const showRecoverSuccess = ref(false);

  
      const recoverReq = reactive(new Requester(_babyNames));
  
      const rules = {
        required: (value: string) => !!value || "Campo obrigatório",
      };
  
      async function recoverPassword(): Promise<void> {
        showRecoverError.value = false;
  
        await recoverReq.request({
          method: "post",
          url: "auth/recoverpassword",
          data: { username: username.value, newPassword: newPassword.value },
          onSuccess: () => {
            showRecoverSuccess.value = true;
            setTimeout(() => {
              router.push({ name: "login" });
            }, 3000);
          },
          onError: () => {
            showRecoverError.value = true;
            clearRecoverFields();
          }
        });
      }
  
      function clearRecoverFields() {
        username.value = "";
        newPassword.value = "";
      }
  
      return {
        validForm,
        username,
        newPassword,
        showPassword,
        showRecoverError,
        rules,
        recoverPassword,
        extractAxiosErrorMessage,
        recoverReq,
        showRecoverSuccess
      };
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  </style>
  