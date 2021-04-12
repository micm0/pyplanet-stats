<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="searchMsg"
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
        :items="players"
        :items-per-page="$store.state.rowsPerPage"
        :search="search"
        class="elevation-1"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :loading="loading"
        :loading-text="loadingText"
        dense
      >
        <template v-slot:[`item.nickname`]="{ item }">
          <v-btn text :to="'/player/' + item.id">
            <span v-html="tmStyle(item.nickname)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.last_seen`]="{ item }">
          <span v-text="formatDate(item.last_seen)"></span>
        </template>
        <template v-slot:[`item.total_playtime`]="{ item }">
          <span v-text="sec2time(item.total_playtime)"></span>
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

export interface Player {
  id: number;
  login: string;
  nickname: string;
  avg: number;
  updated_at: string;
  last_seen: string;
  total_playtime: string;
}

@Component
export default class Players extends Vue {
  search = "";
  loading = true;
  sortBy = "avg";
  sortDesc = false;
  players: Player[] = [];

  get searchMsg() {
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
      { text: "Login", value: "login" },
      { text: this.$t("message.nickname"), value: "nickname", sortable: false },
      { text: this.$t("message.average"), value: "avg" },
      { text: this.$t("message.lastSeen"), value: "last_seen" },
      { text: this.$t("message.totalPlaytime"), value: "total_playtime" }
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
  }
  refresh() {
    this.loading = true;
    Vue.axios
      .get(`${this.$store.state.config.apiSite}/players/`)
      .then(resp => {
        this.players = resp.data;
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
  sec2time(timeInSeconds: string): string {
    const pad = function(num: string, size: number) {
        return ("000" + num).slice(size * -1);
      },
      time: string = parseFloat(timeInSeconds).toFixed(3),
      hours: string = Math.floor(+time / 60 / 60).toString(),
      minutes: string = (Math.floor(+time / 60) % 60).toString(),
      seconds: string = Math.floor(+time - +minutes * 60).toString();
    //milliseconds: string = time.slice(-3);

    return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
  }
}
</script>
