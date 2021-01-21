<template>
  <div>
    <p>
      Server records on <span v-html="track.name" class="mx-1"></span> by
      {{ track.authorLogin }}
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
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:[`item.player.nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.player.id">
            <span v-html="tmStyle(item.player.nickname)"></span>
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
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";
import dayjs from "dayjs";

Vue.use(VueAxios, axios);

export interface TrackRecord {
  id: number;
  player: { nickname: string };
  score: string;
  updated_at: string;
}

@Component
export default class TrackRecords extends Vue {
  search = "";
  sortBy = "score";
  sortDesc = false;
  track: { id: number; name: string; authorLogin: string } = {
    id: 1,
    name: "",
    authorLogin: ""
  };
  trackRecords: TrackRecord[] = [];
  headers = [
    // {
    //   text: "Id",
    //   align: "start",
    //   value: "id"
    // },
    { text: "Player", value: "player.nickname", sortable: false },
    { text: "Score", value: "score" },
    { text: "Updated At", value: "updated_at" }
  ];
  mounted() {
    Vue.axios
      .get(`http://localhost:3000/api/tracks/${this.$route.params.id}`)
      .then(resp => {
        this.track.id = resp.data.id;
        this.track.name = MPStyle(resp.data.name);
        this.track.authorLogin = resp.data.author_login;
        resp.data.records.forEach((trackRecord: TrackRecord) => {
          this.trackRecords.push({
            id: trackRecord.id,
            player: trackRecord.player,
            score: trackRecord.score,
            // eslint-disable-next-line @typescript-eslint/camelcase
            updated_at: trackRecord.updated_at
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
