<template>
  <div>
    <p>
      Server records from <span v-html="tmStyle(player.nickname)"></span> |
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
        loading-text="Loading... Please wait"
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
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
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
  @Emit("playername")
  emitPlayerName() {
    return this.player.nickname;
  }
  @Watch("$store.state.showCps")
  OnPropertyChanged(value: boolean) {
    value
      ? this.headers.push({ text: "Checkpoints", value: "checkpoints" })
      : this.headers.splice(
          this.headers.findIndex(h => h.text === "Checkpoints")
        );
  }
  player: { id: number; login: string; nickname: string } = {
    id: 1,
    login: "",
    nickname: ""
  };
  playerRecords: PlayerRecord[] = [];
  headers = [
    { text: "Rank", align: "start", value: "rank" },
    { text: "Map", value: "map_name", sortable: false },
    { text: "Score", value: "score" },
    { text: "Updated At", value: "updated_at" }
  ];
  footerProps = {
    "items-per-page-options": [5, 10, 15, 50, 100, -1]
  };

  mounted() {
    this.refresh();
    if (this.$store.state.showCps)
      this.headers.push({ text: "Checkpoints", value: "checkpoints" });
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
      .catch(error => (this.loading = false));
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
