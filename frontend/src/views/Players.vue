<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="players"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:[`item.nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.id">
            <span v-html="tmStyle(item.nickname)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.last_seen`]="{ item }">
          <span v-text="formatDate(item.last_seen)"></span>
        </template>
        <template v-slot:[`item.total_playtime`]="{ item }">
          <span v-text="toTmTime(item.total_playtime)"></span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";
import dayjs from "dayjs";

Vue.use(VueAxios, axios);

export interface Player {
  id: number;
  created_at: string;
  updated_at: string;
  login: string;
  nickname: string;
  last_seen: string;
  total_playtime: string;
}

@Component
export default class Players extends Vue {
  search = "";
  sortBy = "last_seen";
  sortDesc = true;
  players: Player[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Login", value: "login" },
    { text: "Nickname", value: "nickname", sortable: false },
    { text: "Last Seen", value: "last_seen" },
    { text: "Total Playtime", value: "total_playtime" }
  ];
  mounted() {
    Vue.axios.get("http://localhost:3000/api/players/").then(resp => {
      this.players = resp.data;
    });
  }
  tmStyle(nickname: string): string {
    return MPStyle(nickname);
  }
  toTmTime(score: string): string {
    return TimeFormat(+score);
  }
  formatDate(updatedAt: string): string {
    return dayjs(updatedAt).format("DD/MM/YYYY | HH:mm");
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
</style>
