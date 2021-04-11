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
        :footer-props="footerProps"
        :items="maps"
        :items-per-page="$store.state.rowsPerPage"
        :search="search"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading... Please wait"
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
            ><img
              v-if="$store.state.config.mxOrTmx == 'mx'"
              src="../assets/mx_100.png"
              width="30px"
            />
            <img v-else src="../assets/tmx_100.png" width="30px" />
          </v-btn>
        </template>
        <template v-slot:[`item.uid`]="{ item }">
          <img
            v-if="item.mx_id != null"
            width="50px"
            :src="mxThumb(item.mx_id)"
            alt="map thumbnail"
          />
          <span v-else>Not on mx</span>
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
  loading = true;
  maps: Track[] = [];
  headers = [
    {
      text: "Map id",
      align: "start",
      value: "id"
    },
    { text: "Name", value: "name", sortable: false },
    { text: "Author Login", value: "author_login" },
    { text: "Number of checkpoints", value: "num_checkpoints" },
    { text: "Author Time", value: "time_author" },
    { text: "Environment", value: "environment" },
    {
      text: this.$store.state.config.mxOrTmx == "mx" ? "MX Link" : "Tmx Link",
      value: "mx_id",
      sortable: false
    },
    {
      text:
        this.$store.state.config.mxOrTmx == "mx"
          ? "Preview(from MX)"
          : "Preview(from TMX)",
      value: "uid"
    }
  ];
  footerProps = {
    "items-per-page-options": [5, 10, 15, 50, 100, -1]
  };

  mounted() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    Vue.axios
      .get(`${this.$store.state.config.apiSite}/tracks/`)
      .then(resp => {
        this.maps = resp.data;
        this.loading = false;
      })
      .catch(() => (this.loading = false));
  }

  mxLink(mxId: number): string {
    if (this.$store.state.config.mxOrTmx == "mx")
      return "https://tm.mania-exchange.com/maps/" + mxId;
    else {
      return "https://trackmania.exchange/maps/" + mxId;
    }
  }
  mxThumb(mxId: number): string {
    if (this.$store.state.config.mxOrTmx == "mx")
      return "https://tm.mania-exchange.com/maps/thumbnail/" + mxId;
    else {
      return "https://trackmania.exchange/maps/thumbnail/" + mxId;
    }
  }
  tmStyle(nickname: string): string {
    return MPStyle(nickname);
  }
  toTmTime(score: string): string {
    return TimeFormat(+score);
  }
}
</script>
