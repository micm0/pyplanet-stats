<template>
  <div>
    <v-row justify="center" class="mb-2">
      <v-col cols>
        <map-infos-card :track="track"></map-infos-card>
      </v-col>
      <v-col cols>
        <karma-card :trackid="this.$route.params.id"></karma-card>
      </v-col>
      <v-col cols v-if="track.mx_id">
        <mx-infos-card :track="track"></mx-infos-card>
      </v-col>
      <v-col cols v-if="track.mx_id">
        <v-card width="300">
          <v-img
            :aspect-ratio="40 / 29"
            :src="mxThumb(track.mx_id)"
            alt="map thumbnail"
          />
        </v-card>
      </v-col>
    </v-row>
    <!-- <p>
      Server records on
      <span v-html="tmStyle(track.name)" class="mx-1"></span> by
      {{ track.author_login }}
    </p> -->
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
        <v-btn class="ml-2">
          <v-icon @click="refresh">mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :footer-props="footerProps"
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
import KarmaCard from "@/components/KarmaCard.vue";
import MapInfosCard from "@/components/MapInfosCard.vue";
import MxInfosCard from "@/components/MxInfosCard.vue";

Vue.use(VueAxios, axios);

export interface TrackRecord {
  id: number;
  rank: number;
  player_id: number;
  player_nickname: string;
  score: string;
  updated_at: string;
}

@Component({
  components: {
    KarmaCard,
    MapInfosCard,
    MxInfosCard
  }
})
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
  footerProps = {
    "items-per-page-options": [5, 10, 15, 50, 100, -1]
  };
  mounted() {
    this.refresh();
    Vue.axios
      .get(`http://localhost:3000/api/tracks/${this.$route.params.id}`)
      .then(resp => {
        this.track = resp.data;
        this.emitTrackName();
      });
  }
  refresh() {
    Vue.axios
      .get(`http://localhost:3000/api/records/track/${this.$route.params.id}`)
      .then(resp => {
        this.trackRecords = resp.data;
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
  mxThumb(mxId: number): string {
    return "https://tm.mania-exchange.com/maps/thumbnail/" + mxId;
  }
}
</script>
