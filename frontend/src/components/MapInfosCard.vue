<template>
  <v-card :loading="loadingTrack" elevation="10">
    <v-list dense>
      <v-list-item>
        <v-list-item-title class="text-left">Name</v-list-item-title>
        <v-list-item-title v-html="tmStyle(track.name)"></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-left">Author login</v-list-item-title>
        <v-list-item-title v-text="track.author_login"></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-left">Author time</v-list-item-title>
        <v-list-item-title
          v-html="toTmTime(track.time_author)"
        ></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-left">Environment</v-list-item-title>
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
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Track } from "@/views/Maps.vue";
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter";
import { TimeFormat } from "@/TimeFormat";

@Component
export default class MapInfosCard extends Vue {
  @Prop() private track!: Track;
  @Prop() private loadingTrack!: boolean;

  tmStyle(name: string): string {
    return MPStyle(name);
  }
  toTmTime(score: string): string {
    return TimeFormat(+score);
  }
}
</script>
