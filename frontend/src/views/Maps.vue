<template>
  <div class="maps">
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
        :items="maps"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        dense
      >
        <template v-slot:[`item.name`]="{ item }">
          <v-btn text :to="'/map/' + item.id">
            <span v-html="tmStyle(item.name)"></span>
          </v-btn>
        </template>
        <template v-slot:[`item.time_author`]="{ item }">
          <span v-html="toTmTime(item.time_author)"></span>
        </template>
        <template v-slot:[`item.mx_id`]="{ item }">
          <v-btn
            v-if="item.mx_id"
            :href="mxLink(item.mx_id)"
            target="blank"
            small
            text
            fab
            ><img src="../assets/mx_full.png" width="30px"
          /></v-btn>
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

Vue.use(VueAxios, axios);

export interface Track {
  id: number;
  uid: string;
  name: string;
  author_login: string;
  num_checkpoints: number;
  time_author: string;
  environment: string;
  mx_id: number | null;
}

@Component
export default class Maps extends Vue {
  search = "";
  maps: Track[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Name", value: "name", sortable: false },
    { text: "Author Login", value: "author_login" },
    { text: "Number of checkpoints", value: "num_checkpoints" },
    { text: "Author Time", value: "time_author" },
    { text: "Environment", value: "environment" },
    { text: "MX Link", value: "mx_id", sortable: false }
  ];

  mounted() {
    Vue.axios.get("http://localhost:3000/api/tracks/").then(resp => {
      this.maps = resp.data;
    });
  }
  mxLink(mxId: number): string {
    return "https://tm.mania-exchange.com/maps/" + mxId;
  }
  tmStyle(nickname: string): string {
    return MPStyle(nickname);
  }
  toTmTime(score: string): string {
    return TimeFormat(+score);
  }
}
</script>
