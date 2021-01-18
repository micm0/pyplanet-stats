<template>
  <div class="maps">
    <v-data-table
      :headers="headers"
      :items="maps"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.name`]="{ item }">
        <span v-html="item.name"></span>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter/";
import { TimeFormat } from "../TimeFormat";

Vue.use(VueAxios, axios);

interface Track {
  id: number;
  name: string;
  author_login: string;
  num_checkpoints: number;
  time_author: string;
  environment: string;
  mx_id: number;
}

@Component
export default class Maps extends Vue {
  maps: Track[] = [];
  headers = [
    {
      text: "Id",
      align: "start",
      value: "id"
    },
    { text: "Name", value: "name" },
    { text: "Author Login", value: "author_login" },
    { text: "Number of checkpoints", value: "num_checkpoints" },
    { text: "Author Time", value: "time_author" },
    { text: "Environment", value: "environment" },
    { text: "MX Link", value: "mx_id" }
  ];

  mounted() {
    Vue.axios.get("http://localhost:3000/api/maps/").then(resp => {
      resp.data.map((map: Track) => {
        map.name = MPStyle(map.name);
        // eslint-disable-next-line @typescript-eslint/camelcase
        map.time_author = TimeFormat(+map.time_author);
      });
      this.maps = resp.data;
    });
  }

  mxLink(mxId: number): string {
    return "https://tm.mania-exchange.com/maps/" + mxId;
  }
}
</script>
