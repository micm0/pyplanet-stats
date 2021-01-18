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
        :items="records"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.track.name`]="{ item }">
          <span v-html="item.track.name"></span>
        </template>
        <template v-slot:[`item.player.nickname`]="{ item }">
          <span v-html="item.player.nickname"></span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { TimeFormat } from "../TimeFormat";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { Track } from "./Maps.vue";
import { Player } from "./Players.vue";
import dayjs from "dayjs";

Vue.use(VueAxios, axios);

interface Record {
  id: number;
  created_at: string;
  updated_at: string;
  map_id: number;
  track: Track;
  player_id: number;
  player: Player;
  score: string;
  checkpoints: string;
}

@Component
export default class Records extends Vue {
  search = "";
  records: Record[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Map", value: "track.name" },
    { text: "Player", value: "player.nickname" },
    { text: "Score", value: "score" },
    // { text: "Checkpoints Times", value: "checkpoints" },
    // { text: "Created At", value: "created_at" },
    { text: "Updated At", value: "updated_at" }
  ];
  mounted() {
    Vue.axios.get("http://localhost:3000/api/records/").then(resp => {
      resp.data.map((record: Record) => {
        record.track.name = MPStyle(record.track.name);
        record.player.nickname = MPStyle(record.player.nickname);
        // eslint-disable-next-line @typescript-eslint/camelcase
        record.score = TimeFormat(+record.score);
        // eslint-disable-next-line @typescript-eslint/camelcase
        record.created_at = dayjs(record.created_at).format(
          "DD/MM/YYYY | HH:mm"
        );
        // eslint-disable-next-line @typescript-eslint/camelcase
        record.updated_at = dayjs(record.updated_at).format(
          "DD/MM/YYYY | HH:mm"
        );
      });
      this.records = resp.data;
    });
  }
}
</script>
