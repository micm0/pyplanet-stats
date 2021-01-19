<template>
  <div>
    <v-app>
      <drawer :drawer="drawer" />
      <v-app-bar clipped-left dense app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon v-if="drawer">mdi-menu</v-icon>
          <v-icon v-else>mdi-arrow-expand-right</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          <span>PyPlanet </span> <span>Stats</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-switch
          v-model="$vuetify.theme.dark"
          append-icon="mdi-weather-night"
          color="yellow lighten-3"
          hide-details
        >
        </v-switch> -->
        <v-btn text @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <div v-if="!$vuetify.theme.dark">
            <v-icon>mdi-weather-night</v-icon>
          </div>
          <div v-else>
            <v-icon color="yellow lighten-3">mdi-weather-night</v-icon>
          </div>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <router-view class="mt-6" />
        </v-container>
      </v-main>
      <v-footer padless app>
        <v-card-text class="py-2 text-center">
          <span class="text-caption"> © {{ new Date().getFullYear() }} </span>
          <strong
            ><a
              href="https://github.com/micm0"
              target="blank"
              class="text-caption"
              style="color: inherit;"
              >Micmo</a
            ></strong
          >
        </v-card-text>
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Drawer from "@/components/Drawer.vue";

@Component({
  components: {
    Drawer
  }
})
export default class App extends Vue {
  drawer = true;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
