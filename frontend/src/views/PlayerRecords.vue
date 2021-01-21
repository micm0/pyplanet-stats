<template>
  <div>
    <p>
      Server records from <span v-html="player.nickname"></span> |
      {{ player.login }}
    </p>
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
        :items="playerRecords"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:[`item.track.name`]="{ item }">
          <span v-html="tmStyle(item.track.name)"></span>
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
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";
import dayjs from "dayjs";

Vue.use(VueAxios, axios);

export interface PlayerRecord {
  id: number;
  track: { name: string };
  score: string;
  updated_at: string;
}

@Component
export default class PlayerRecords extends Vue {
  search = "";
  sortBy = "updated_at";
  sortDesc = true;
  player: { id: number; login: string; nickname: string } = {
    id: 1,
    login: "",
    nickname: ""
  };
  playerRecords: PlayerRecord[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Map", value: "track.name", sortable: false },
    { text: "Score", value: "score" },
    { text: "Updated At", value: "updated_at" }
  ];
  mounted() {
    Vue.axios
      .get(`http://localhost:3000/api/players/${this.$route.params.id}`)
      .then(resp => {
        this.player.id = resp.data.id;
        this.player.login = resp.data.login;
        this.player.nickname = MPStyle(resp.data.nickname);
        resp.data.records.forEach((playerRecord: PlayerRecord) => {
          this.playerRecords.push({
            id: playerRecord.id,
            track: playerRecord.track,
            score: playerRecord.score,
            // eslint-disable-next-line @typescript-eslint/camelcase
            updated_at: playerRecord.updated_at
          });
        });
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
