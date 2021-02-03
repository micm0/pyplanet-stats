<template>
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
            <img
              v-if="$store.state.config.mxOrTmx == 'mx'"
              src="../assets/mx_100.png"
              width="30px"
            />
            <img v-else src="../assets/tmx_100.png" width="30px" />
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-left">
          Download
        </v-list-item-title>
        <v-list-item-title>
          <v-btn
            small
            color="indigo"
            :href="mxDownloadMap(track.mx_id)"
            target="blank"
            ><v-icon left> mdi-download </v-icon>Download</v-btn
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <span v-else class="caption">not on mania-exchange</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Track } from "@/views/Maps.vue";

@Component
export default class MxInfosCard extends Vue {
  @Prop() private track!: Track;

  mxLink(mxId: number): string {
    if (this.$store.state.config.mxOrTmx == "mx")
      return "https://tm.mania-exchange.com/maps/" + mxId;
    else {
      return "https://trackmania.exchange/maps/" + mxId;
    }
  }

  mxDownloadMap(mxId: number): string {
    if (this.$store.state.config.mxOrTmx == "mx")
      return "https://tm.mania-exchange.com/maps/download/" + mxId;
    else {
      return "https://trackmania.exchange/maps/download" + mxId;
    }
  }
}
</script>
