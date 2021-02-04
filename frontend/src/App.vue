<template>
  <div>
    <v-app>
      <drawer :trackname="trackName" :playername="playerName" />
      <v-app-bar clipped-left dense app>
        <v-app-bar-nav-icon @click="setDrawer(!drawer)">
          <v-icon v-if="drawer">mdi-menu</v-icon>
          <v-icon v-else>mdi-arrow-expand-right</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          <span>PyPlanet </span> <span>Stats</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <options-menu></options-menu>
      </v-app-bar>
      <v-main>
        <v-container>
          <transition name="fade" mode="out-in">
            <router-view
              class="mt-6"
              @trackname="getTrackName"
              @playername="getPlayerName"
            />
          </transition>
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
import OptionsMenu from "@/components/OptionsMenu.vue";
import { Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { mapMutations, mapState } from "vuex";

@Component({
  components: {
    Drawer,
    OptionsMenu
  },
  computed: {
    ...mapState(["drawer"])
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
})
export default class App extends Vue {
  trackName = "";
  playerName = "";
  //Watch route change.
  //Empty trackName/playerName if new route isn't Map/Player
  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newRoute: Route) {
    if (newRoute.name !== "Map") this.trackName = "";
    if (newRoute.name !== "Player") this.playerName = "";
  }

  get drawer() {
    return this.$store.state.drawer;
  }

  get trackRecordsRoute() {
    return this.$route.name == "Map";
  }
  //get trackname value from maprecords child component
  getTrackName(value: string) {
    this.trackName = value;
  }
  //get playername value from playerrecords child component
  getPlayerName(value: string) {
    this.playerName = value;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.v-btn {
  text-transform: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
