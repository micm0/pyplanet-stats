<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="3">
        <v-card elevation="10">
          <v-list dense>
            <v-list-item>
              <v-list-item-title class="text-left">Name</v-list-item-title>
              <v-list-item-title
                v-html="tmStyle(track.name)"
              ></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="text-left"
                >Author login</v-list-item-title
              >
              <v-list-item-title
                v-text="track.author_login"
              ></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="text-left"
                >Author time</v-list-item-title
              >
              <v-list-item-title
                v-html="toTmTime(track.time_author)"
              ></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="text-left"
                >Environment</v-list-item-title
              >
              <v-list-item-title v-text="track.environment"></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="text-left">UID</v-list-item-title>
              <span class="caption">
                {{ track.uid }}
              </span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card elevation="10">
          <v-subheader>Karma Rating</v-subheader>
          <v-rating
            empty-icon="mdi-heart-outline"
            full-icon="mdi-heart"
            half-icon="mdi-heart-half-full"
            v-model="trackKarmaOfFive"
            half-increments
            background-color="grey"
            color="primary"
            readonly
            dense
          ></v-rating>
          <p class="grey--text text--lighten-2 caption">
            karma: {{ trackKarmaOfFive }} /5
          </p>
          <p class="grey--text text--lighten-2 caption ml-2">
            votes numbers: {{ trackKarmaCount }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-subheader>Mania-Exchange Informations</v-subheader>
          <v-list v-if="track.mx_id" dense>
            <v-list-item>
              <v-list-item-title class="text-left">
                Link
              </v-list-item-title>
              <v-list-item-title
                ><v-btn
                  v-if="track.mx_id"
                  :href="mxLink(track.mx_id)"
                  target="blank"
                  small
                  text
                  fab
                >
                  <img src="../assets/mx_full.png" width="30px" /> </v-btn
              ></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="text-left">
                Download
              </v-list-item-title>
              <v-list-item-title>
                <v-btn
                  small
                  color="indigo"
                  :href="
                    `https://tm.mania-exchange.com/maps/download/${track.mx_id}`
                  "
                  ><v-icon left> mdi-download </v-icon>Download</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <span v-else class="caption">not on mania-exchange</span>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card width="300px">
          <v-img :src="mxThumb(track.mx_id)" alt="map thumbnail" />
        </v-card>
      </v-col>
    </v-row>
    <p>
      Server records on
      <span v-html="tmStyle(track.name)" class="mx-1"></span> by
      {{ track.author_login }}
    </p>
    <v-card elevation="10">
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
  trackKarma = 0;
  trackKarmaOfFive = 0;
  trackKarmaCount = 0;
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
        console.log(this.track);
      });

    Vue.axios
      .get(`http://localhost:3000/api/karma/${this.$route.params.id}`)
      .then(resp => {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        let totalScore = 0;
        let totalAbs = 0;
        let trackKarmaNegative = 0;
        let trackKarmaPositive = 0;
        this.trackKarmaCount = resp.data.length;

        resp.data.forEach((karma: { score: number }) => {
          const score = karma.score;
          totalScore += score;
          totalAbs += Math.abs(score);
          if (score > 0) trackKarmaPositive += score;
        });

        trackKarmaNegative = totalAbs - trackKarmaPositive;
        this.trackKarma = totalScore;
        if (trackKarmaPositive > 0)
          this.trackKarmaOfFive = (100 * (trackKarmaPositive / totalAbs)) / 20;

        //round at most 2 decimal places
        this.trackKarmaOfFive = Math.round(this.trackKarmaOfFive * 100) / 100;
        //TODO: list of voters with nickname and vote
      });
  }
  copyUid() {
    navigator.clipboard.writeText(this.track.uid);
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
  mxLink(mxId: number): string {
    return "https://tm.mania-exchange.com/maps/" + mxId;
  }
  mxThumb(mxId: number): string {
    return "https://tm.mania-exchange.com/maps/thumbnail/" + mxId;
  }
}
</script>
