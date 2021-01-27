<template>
  <v-navigation-drawer app v-model="drawer" clipped>
    <v-list>
      <v-img
        src="https://pbs.twimg.com/media/EeVlIjyXkAICq_z?format=jpg&name=4096x4096"
        alt="PyPlanet Stats"
        dark
      >
      </v-img>
    </v-list>
    <v-list flat>
      <v-list-item-group color="primary">
        <v-list-item v-for="(page, i) in pages" :key="i" :to="page.to">
          <v-list-item-icon>
            <v-icon
              v-if="
                (trackRecordsRouteBool && page.title == trackname) ||
                  (playerRecordsRouteBool && page.title == playername)
              "
              v-text="page.icon"
              class="ml-4"
            ></v-icon>
            <v-icon v-else v-text="page.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="tmStyle(page.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { MPStyle } from "@tomvlk/ts-maniaplanet-formatter";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component
export default class Drawer extends Vue {
  @Prop() readonly drawer: boolean = true;
  @Prop() trackname: string | undefined;
  @Prop() playername: string | undefined;

  //Watch trackname and add dynamically MapRecords Tab with name
  @Watch("trackname")
  onTrackNameChanged(value: string) {
    if (this.trackRecordsRouteBool) {
      this.addMapTab();
    } else if (value == "") {
      this.removeMapTab();
    }
  }
  //Watch playername and add dynamically PlayerRecord Tab with name
  @Watch("playername")
  onPlayerNameChanged(value: string) {
    if (this.playerRecordsRouteBool) {
      this.addPlayerTab();
    } else if (value == "") {
      this.removePlayerTab();
    }
  }

  get trackRecordsRouteBool() {
    return this.$route.name == "Map";
  }
  get playerRecordsRouteBool() {
    return this.$route.name == "Player";
  }
  pages = [
    {
      title: "Home",
      to: "/",
      icon: "mdi-home"
    },
    {
      title: "Players",
      to: "/players",
      icon: "mdi-account-supervisor"
    },
    {
      title: "Maps",
      to: "/maps",
      icon: "mdi-map"
    },
    {
      title: "Records",
      to: "/records",
      icon: "mdi-speedometer"
    },
    {
      title: "About",
      to: "/about",
      icon: "mdi-information"
    }
  ];
  tmStyle(name: string): string {
    return MPStyle(name);
  }
  addMapTab() {
    this.pages.splice(3, 0, {
      title: `${this.trackname}`,
      to: `/map/${this.$route.params.id}`,
      icon: "mdi-subdirectory-arrow-right"
    });
  }
  addPlayerTab() {
    this.pages.splice(2, 0, {
      title: `${this.playername}`,
      to: `/player/${this.$route.params.id}`,
      icon: "mdi-subdirectory-arrow-right"
    });
  }
  removePlayerTab() {
    this.pages.splice(2, 1);
  }
  removeMapTab() {
    this.pages.splice(3, 1);
  }
}
</script>
