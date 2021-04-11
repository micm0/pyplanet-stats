<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <select-locale />
          </v-list-item-action>
          <v-list-item-title>Change Language</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="this.$route.name == 'Map' || this.$route.name == 'Records'"
        >
          <v-list-item-action>
            <v-switch dense v-model="$store.state.showCps" inset></v-switch>
          </v-list-item-action>
          <v-list-item-title>Show checkpoints</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch dense v-model="$vuetify.theme.dark" inset></v-switch>
          </v-list-item-action>
          <v-list-item-title>Dark mode</v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-5">
          <v-spacer></v-spacer>
          <v-list-item-action>
            <v-select
              dense
              v-model="$store.state.rowsPerPage"
              label="Set default rows per page"
              :items="items"
            ></v-select>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="menu = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SelectLocale from "./SelectLocale.vue";

@Component({ components: { SelectLocale } })
export default class OptionsMenu extends Vue {
  menu = false;
  items = [5, 10, 15, 50, 100];
}
</script>
