<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="searchText"
          single-line
          hide-details
          dense
        ></v-text-field>
        <v-btn class="ml-2" @click="refresh"
          ><v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :footer-props="footerProps"
        :items="records"
        :items-per-page="$store.state.rowsPerPage"
        :search="search"
        class="elevation-1"
        :loading="loading"
        :loading-text="loadingText"
        dense
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
  loading = true;
  records: Record[] = [];
  get playerText() {
    return this.$t("message.player");
  }
  get updatedAtText() {
    return this.$t("message.updatedAt");
  }
  get searchText() {
    return this.$t("message.search");
  }
  get loadingText() {
    return this.$t("message.loading");
  }
  get headers() {
    return [
      // {
      //   text: "Id",
      //   align: "start",
      //   value: "id"
      // },
      { text: "Map", value: "track.name", sortable: false },
      { text: this.playerText, value: "player.nickname", sortable: false },
      { text: "Score", value: "score" },
      this.$store.state.showCps && {
        text: "Checkpoints",
        value: "checkpoints"
      },
      // { text: "Created At", value: "created_at" },
      { text: this.updatedAtText, value: "updated_at" }
    ];
  }
  get footerProps() {
    return {
      "items-per-page-options": [5, 10, 15, 50, 100],
      "items-per-page-text": this.$t("message.rowsPerPage")
    };
  }

  mounted() {
    this.refresh();
  }
  refresh() {
    this.loading = true;
    Vue.axios
      .get(`${this.$store.state.config.apiSite}/records/`)
      .then(resp => {
        this.records = resp.data;
        this.loading = false;
      })
      .catch(() => (this.loading = false));
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
