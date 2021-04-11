<template>
  <v-navigation-drawer
    app
    v-model="drawerState"
    clipped
    ref="drawer"
    :width="navigation.width"
    :floating="floating"
  >
    <v-list>
      <v-img
        :src="this.$store.state.config.drawerImage"
        alt="PyPlanet Stats"
        dark
      >
      </v-img>
    </v-list>
    <v-list flat>
      <v-list-item-group color="primary">
        <v-list-item v-for="page in pages" :key="page.id" :to="page.to">
          <v-list-item-icon>
            <v-icon
              v-if="
                (trackRecordsRouteBool && page.id == trackname) ||
                  (playerRecordsRouteBool && page.id == playername)
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

  get drawerState() {
    return this.$store.state.drawer;
  }
  set drawerState(value) {
    this.$store.commit("SET_DRAWER", value);
  }

  get trackRecordsRouteBool() {
    return this.$route.name == "Map";
  }
  get playerRecordsRouteBool() {
    return this.$route.name == "Player";
  }

  get pages() {
    return [
      // {
      //   title: "Home",
      //   to: "/",
      //   icon: "mdi-home"
      // },
      {
        id: "Players",
        title: this.$t("message.players"),
        to: "/",
        icon: "mdi-account-supervisor"
      },
      {
        id: "Maps",
        title: this.$t("message.maps"),
        to: "/maps",
        icon: "mdi-map"
      },
      {
        id: "Records",
        title: this.$t("message.records"),
        to: "/records",
        icon: "mdi-speedometer"
      }
      // {
      //   title: "About",
      //   to: "/about",
      //   icon: "mdi-information"
      // }
    ];
  }

  //Get Players/Maps position tabs and Set player/map position in case we change the pages array.
  playersPosition = this.pages.findIndex(p => p.title === "Players");
  playerPosition = this.playersPosition + 1;
  mapsPosition = this.pages.findIndex(p => p.title === "Maps");
  mapPosition = this.mapsPosition + 1;

  addMapTab() {
    this.pages.splice(this.mapPosition, 0, {
      id: `${this.trackname}`,
      title: `${this.trackname}`,
      to: `/map/${this.$route.params.id}`,
      icon: "mdi-subdirectory-arrow-right"
    });
  }
  addPlayerTab() {
    this.pages.splice(this.playerPosition, 0, {
      id: `${this.playername}`,
      title: `${this.playername}`,
      to: `/player/${this.$route.params.id}`,
      icon: "mdi-subdirectory-arrow-right"
    });
  }
  removePlayerTab() {
    this.pages.splice(this.playerPosition, 1);
  }
  removeMapTab() {
    this.pages.splice(this.mapPosition, 1);
  }

  tmStyle(name: string): string {
    return MPStyle(name);
  }

  /**
   * Drag resize feature
   */
  /* eslint-disable */
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  }

  navigation = {
    width: 256,
    borderSize: 10 //to ease the drag (but it's invisible with the floating attribute)
  };
  floating = true; //border-right visibility

  setBorderWidth() {
    const drawerBorder = (this.$refs.drawer as Vue).$el.querySelector(
      ".v-navigation-drawer__border"
    );
    (drawerBorder as any).style.width = this.navigation.borderSize + "px";
    (drawerBorder as any).style.cursor = "ew-resize";
    (drawerBorder as any).style.backgroundColor = "";
  }

  setEvents() {
    const minSize = this.navigation.borderSize;
    const el = (this.$refs.drawer as Vue).$el;
    const drawerBorder = el.querySelector(".v-navigation-drawer__border");
    const direction = el.classList.contains("v-navigation-drawer--right")
      ? "right"
      : "left";

    function resize(e: { clientX: number }) {
      document.body.style.cursor = "ew-resize";
      const f =
        direction === "right"
          ? document.body.scrollWidth - e.clientX
          : e.clientX;
      (el as any).style.width = f + "px";
    }

    (drawerBorder as Element).addEventListener(
      "mousedown",
      (e: any) => {
        this.pauseEvent(e);
        this.floating = false;
        (drawerBorder as any).style.backgroundColor =
          "rgba(25, 117, 210, 0.57)";
        if (e.offsetX < minSize) {
          (el as any).style.transition = "initial";
          document.addEventListener("mousemove", resize, false);
        }
      },
      false
    );

    document.addEventListener(
      "mouseup",
      () => {
        this.floating = true;
        (drawerBorder as any).style.backgroundColor = "";
        (el as any).style.transition = "";
        this.navigation.width = (el as any).style.width;
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", resize, false);
      },
      false
    );
  }
  //Function to prevent text/element selection with cursor drag
  pauseEvent(e: {
    stopPropagation: () => void;
    preventDefault: () => void;
    cancelBubble: boolean;
    returnValue: boolean;
  }) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
}
</script>
