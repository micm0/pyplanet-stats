<template>
  <div>
    <p>
      {{ $t("message.serverRecords") }}
      <span v-html="tmStyle(player.nickname)"></span> |
      {{ player.login }}
    </p>
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
        <v-btn @click="refresh" class="ml-2"
          ><v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :footer-props="footerProps"
        :items="playerRecords"
        :items-per-page="$store.state.rowsPerPage"
        :search="search"
        class="elevation-1"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :loading="loading"
        :loading-text="loadingText"
        dense
      >
        <template v-slot:[`item.map_name`]="{ item }">
          <v-btn text :to="'/map/' + item.map_id">
            <span v-html="tmStyle(item.map_name)"></span>
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
import { Component, Emit, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";
import dayjs from "dayjs";

Vue.use(VueAxios, axios);

export interface PlayerRecord {
  id: number;
  rank: number;
  map_id: number;
  map_name: string;
  score: string;
  updated_at: string;
}

@Component
export default class PlayerRecords extends Vue {
  search = "";
  loading = true;
  sortBy = "rank";
  sortDesc = false;
  get searchText() {
    return this.$t("message.search");
  }
  get loadingText() {
    return this.$t("message.loading");
  }
  get rankText() {
    return this.$t("message.rank");
  }
  get updatedAtText() {
    return this.$t("message.updatedAt");
  }
  @Emit("playername")
  emitPlayerName() {
    return this.player.nickname;
  }

  player: { id: number; login: string; nickname: string } = {
    id: 1,
    login: "",
    nickname: ""
  };
  playerRecords: PlayerRecord[] = [];

  get headers() {
    return [
      { text: this.rankText, align: "start", value: "rank" },
      { text: "Map", value: "map_name", sortable: false },
      { text: "Score", value: "score" },
      { text: this.updatedAtText, value: "updated_at" },
      this.$store.state.showCps && {
        text: "Checkpoints Times",
        value: "checkpoints"
      }
    ];
  }

  get footerProps() {
    return {
      "items-per-page-options": [5, 10, 15, 50, 100, -1],
      "items-per-page-text": this.$t("message.rowsPerPage")
    };
  }

  mounted() {
    this.refresh();
    Vue.axios
      .get(
        `${this.$store.state.config.apiSite}/players/${this.$route.params.id}`
      )
      .then(resp => {
        this.player = resp.data;
        this.emitPlayerName();
      });
  }
  refresh() {
    this.loading = true;
    Vue.axios
      .get(
        `${this.$store.state.config.apiSite}/records/player/${this.$route.params.id}`
      )
      .then(resp => {
        this.playerRecords = resp.data;
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
