<template>
  <div>
    <p>
      Server records on
      <span v-html="tmStyle(track.name)" class="mx-1"></span> by
      {{ track.author_login }}
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
        :items="trackRecords"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        dense
      >
        <template v-slot:[`item.player_nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.player_id">
            <span v-html="tmStyle(item.player_nickname)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.score`]="{ item }">
          <span>{{ toTmTime(item.score) }}</span>
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          <span>{{ formatDate(item.updated_at) }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";
import dayjs from "dayjs";
import { Track } from "./Maps.vue";

Vue.use(VueAxios, axios);

export interface TrackRecord {
  id: number;
  rank: number;
  player_id: number;
  player_nickname: string;
  score: string;
  updated_at: string;
}

@Component
export default class TrackRecords extends Vue {
  search = "";
  @Emit("trackname")
  emitTrackName() {
    return this.track.name;
  }
  /* eslint-disable @typescript-eslint/camelcase */
  //unknown object value because vuejs will warn if we don't set a value
  track: Track = {
    id: 0,
    uid: "unknown",
    name: "unknown",
    author_login: "unknown",
    environment: "Stadium",
    num_checkpoints: 10,
    time_author: "43808",
    mx_id: null
  };
  trackRecords: TrackRecord[] = [];
  headers = [
    { text: "Rank", align: "start", value: "rank" },
    { text: "Player", value: "player_nickname", sortable: false },
    { text: "Score", value: "score" },
    { text: "Updated At", value: "updated_at" }
  ];
  mounted() {
    Vue.axios
      .get(`http://localhost:3000/api/records/track/${this.$route.params.id}`)
      .then(resp => {
        this.trackRecords = resp.data;
      });
    Vue.axios
      .get(`http://localhost:3000/api/tracks/${this.$route.params.id}`)
      .then(resp => {
        this.track = resp.data;
        this.emitTrackName();
      });
  }
  tmStyle(name: string): string {
    return MPStyle(name);
  }
  toTmTime(score: string): string {
    return TimeFormat(+score);
  }
  formatDate(updatedAt: string): string {
    return dayjs(updatedAt).format("DD/MM/YYYY | HH:mm");
  }
}
</script>
