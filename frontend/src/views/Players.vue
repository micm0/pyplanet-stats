<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="players"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.nickname`]="{ item }">
        <span v-html="item.nickname"></span>
      </template>
    </v-data-table>
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

interface Player {
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
