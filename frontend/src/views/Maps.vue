<template>
  <div class="maps">
    Here will be tm maps
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

@Component
export default class Maps extends Vue {
  maps = undefined;

  mounted() {
    Vue.axios.get("http://localhost:3000/api/maps/").then(resp => {
      this.maps = resp.data;
    });
  }
}
</script>
