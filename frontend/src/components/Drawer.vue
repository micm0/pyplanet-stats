<template>
  <v-navigation-drawer app v-model="drawer" width="200" clipped>
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
            <v-icon v-text="page.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content v-text="page.title"> </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Drawer extends Vue {
  @Prop() readonly drawer: boolean = true;
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
}
</script>
