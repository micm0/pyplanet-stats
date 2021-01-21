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
          <v-btn text :to="'/map/' + item.track.id">
            <span v-html="tmStyle(item.track.name)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.player.nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.player.id">
            <span v-html="tmStyle(item.player.nickname)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.score`]="{ item }">
          <span v-html="toTmTime(item.score)"></span>
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          <span v-html="formatDate(item.updated_at)"></span>
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
    { text: "Map", value: "track.name", sortable: false },
    { text: "Player", value: "player.nickname", sortable: false },
    { text: "Score", value: "score" },
    // { text: "Checkpoints Times", value: "checkpoints" },
    // { text: "Created At", value: "created_at" },
    { text: "Updated At", value: "updated_at" }
  ];
  mounted() {
    Vue.axios.get("http://localhost:3000/api/records/").then(resp => {
      this.records = resp.data;
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
