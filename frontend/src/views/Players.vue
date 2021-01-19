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
      >
        <template v-slot:[`item.nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.id">
            <span v-html="item.nickname"></span>
          </v-btn>
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
  players: Player[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Login", value: "login" },
    { text: "Nickname", value: "nickname" },
    { text: "Last Seen", value: "last_seen" },
    { text: "Total Playtime", value: "total_playtime" }
  ];
  mounted() {
    Vue.axios.get("http://localhost:3000/api/players/").then(resp => {
      resp.data.map((player: Player) => {
        player.nickname = MPStyle(player.nickname);
        // eslint-disable-next-line @typescript-eslint/camelcase
        player.total_playtime = TimeFormat(+player.total_playtime);
        // eslint-disable-next-line @typescript-eslint/camelcase
        player.last_seen = dayjs(player.last_seen).format("DD/MM/YYYY | HH:mm");
      });
      this.players = resp.data;
    });
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
</style>
