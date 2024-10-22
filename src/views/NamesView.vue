<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">Nomes de Bebês</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="validForm">
              <v-text-field
                v-model="year"
                label="Ano"
                :rules="[rules.required]"
                type="number"
              ></v-text-field>
              <v-btn @click="fetchTopNamesByYear" color="primary">Buscar Nomes do Ano</v-btn>
              <v-alert v-if="topNames.length === 0 && fetchedTopNames" type="info">Nenhum nome encontrado.</v-alert>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="name in topNames" :key="name.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ name.name }}</v-list-item-title>
                      <v-list-item-subtitle>Ocorrências: {{ name.births }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-form>

            <v-divider></v-divider>

            <v-text-field
              v-model="searchName"
              label="Buscar Ocorrências de Nome"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn @click="fetchNameOccurrences" color="primary">Buscar Ocorrências</v-btn>
            <v-alert v-if="nameOccurrences.length === 0 && fetchedOccurrences" type="info">Nenhuma ocorrência encontrada.</v-alert>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="occurrence in nameOccurrences" :key="occurrence.year">
                  <v-list-item-content>
                    <v-list-item-title>{{ occurrence.year }}</v-list-item-title>
                    <v-list-item-subtitle>Ocorrências: {{ occurrence.count }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <v-divider></v-divider>

            <v-btn @click="fetchTopNamesLastDecade" color="primary">Buscar Nomes da Última Década</v-btn>
            <v-alert v-if="lastDecadeNames.length === 0 && fetchedLastDecade" type="info">Nenhum nome encontrado.</v-alert>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="name in lastDecadeNames" :key="name.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ name.name }}</v-list-item-title>
                    <v-list-item-subtitle>Ocorrências: {{ name.births }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref } from "vue";
import { _babyNames } from "@/plugins/axios";
import BabyNames from "@/models/BabyName/BabyNames"; 

export default {
  setup() {
    const year = ref<number | null>(null);
    const searchName = ref("");
    const topNames = ref<BabyNames[]>([]);
    const nameOccurrences = ref<Array<{ year: number; count: number }>>([]);
    const lastDecadeNames = ref<BabyNames[]>([]);
    const validForm = ref(false);
    const fetchedTopNames = ref(false);
    const fetchedOccurrences = ref(false);
    const fetchedLastDecade = ref(false);

    const rules = {
      required: (value: string) => !!value || "Campo obrigatório",
    };

    async function fetchTopNamesByYear() {
      if (!year.value) return;

      try {
        const response = await _babyNames.get(`/names/${year.value}`);
        topNames.value = response.data.topNames.map((name: any) => new BabyNames(
          name.id,
          year.value as number,
          name.name,
          name.gender,
          name.births,
          name.position
        ));
        fetchedTopNames.value = true;
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchNameOccurrences() {
      if (!searchName.value) return;

      try {
        const response = await _babyNames.get(`/names/occurrences/${searchName.value}`);
        nameOccurrences.value = response.data.years.map((yearData: any) => ({
          year: yearData.year,
          count: yearData.occurrences,
        }));
        fetchedOccurrences.value = true;
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchTopNamesLastDecade() {
      try {
        const response = await _babyNames.get("/names/last-decade");
        lastDecadeNames.value = response.data.boys.map((name: any) => new BabyNames(
          name.id,
          name.year,
          name.name,
          name.gender,
          name.births,
          name.position
        ));
        fetchedLastDecade.value = true;
      } catch (error) {
        console.error(error);
      }
    }

    return {
      year,
      searchName,
      topNames,
      nameOccurrences,
      lastDecadeNames,
      validForm,
      fetchedTopNames,
      fetchedOccurrences,
      fetchedLastDecade,
      fetchTopNamesByYear,
      fetchNameOccurrences,
      fetchTopNamesLastDecade,
      rules,
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>