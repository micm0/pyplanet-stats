<template>
  <v-card elevation="10">
    <v-subheader>Karma Rating</v-subheader>
    <v-rating
      empty-icon="mdi-heart-outline"
      full-icon="mdi-heart"
      half-icon="mdi-heart-half-full"
      v-model="trackKarmaOfFive"
      half-increments
      background-color="grey"
      color="primary"
      readonly
      dense
    ></v-rating>
    <p class="grey--text text--lighten-2 caption">
      karma: {{ trackKarmaOfFive }} /5
    </p>
    <p class="grey--text text--lighten-2 caption ml-2">
      votes numbers: {{ trackKarmaCount }}
    </p>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

@Component
export default class KarmaCard extends Vue {
  @Prop() private trackid!: number;

  trackKarma = 0;
  trackKarmaOfFive = 0;
  trackKarmaCount = 0;

  mounted() {
    Vue.axios
      .get(`${this.$store.state.config.apiSite}/karma/${this.trackid}`)
      .then(resp => {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        let totalScore = 0;
        let totalAbs = 0;
        let trackKarmaNegative = 0;
        let trackKarmaPositive = 0;
        this.trackKarmaCount = resp.data.length;

        resp.data.forEach((karma: { score: number }) => {
          const score = karma.score;
          totalScore += score;
          totalAbs += Math.abs(score);
          if (score > 0) trackKarmaPositive += score;
        });

        trackKarmaNegative = totalAbs - trackKarmaPositive;
        this.trackKarma = totalScore;
        if (trackKarmaPositive > 0)
          this.trackKarmaOfFive = (100 * (trackKarmaPositive / totalAbs)) / 20;

        //round at most 2 decimal places
        this.trackKarmaOfFive = Math.round(this.trackKarmaOfFive * 100) / 100;
        //TODO: list of voters with nickname and vote
      });
  }
}
</script>
