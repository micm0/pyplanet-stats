<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="secondary" elevation="10" rounded>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <select-locale />
          </v-list-item-action>
          <v-list-item-title>{{ $t("message.changeLang") }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="
            this.$route.name == 'Map' ||
              this.$route.name == 'Records' ||
              this.$route.name == 'Player'
          "
        >
          <v-list-item-action>
            <v-switch dense v-model="$store.state.showCps" inset></v-switch>
          </v-list-item-action>
          <v-list-item-title>{{ $t("message.showCps") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch dense v-model="$vuetify.theme.dark" inset></v-switch>
          </v-list-item-action>
          <v-list-item-title>{{ $t("message.darkMode") }}</v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-5">
          <v-spacer></v-spacer>
          <v-list-item-action>
            <v-select
              dense
              v-model="$store.state.rowsPerPage"
              :label="setDefaultRowsPerPageText"
              :items="items"
            ></v-select>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="menu = false">
          {{ $t("message.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SelectLocale from "./SelectLocale.vue";
import { Watch } from "vue-property-decorator";

@Component({ components: { SelectLocale } })
export default class OptionsMenu extends Vue {
  menu = false;
  items = [5, 10, 15, 50, 100];

  get setDefaultRowsPerPageText() {
    return this.$t("message.setDefaultRowsPerPage");
  }

  @Watch("$vuetify.theme.dark")
  onThemeChange() {
    localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
  }
  @Watch("$store.state.rowsPerPage")
  onRowPerPageChange() {
    localStorage.setItem(
      "default_row_per_page",
      this.$store.state.rowsPerPage.toString()
    );
  }
  @Watch("$store.state.showCps")
  onShowCpsChange() {
    localStorage.setItem("show_cps", this.$store.state.showCps.toString());
  }
}
</script>
