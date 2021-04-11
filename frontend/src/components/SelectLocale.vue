<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary" dark v-bind="attrs" v-on="on">
          <country-flag :country="locale" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(lang, i) in filteredLangs"
          :key="i"
          @click="changeCountry(lang)"
        >
          <v-list-item-title
            ><country-flag :country="country(lang)"
          /></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CountryFlag from "vue-country-flag";

@Component({
  components: {
    CountryFlag
  }
})
export default class SelectLocale extends Vue {
  langs = ["fr", "en"];

  get locale() {
    if (this.$i18n.locale === "en") return "gb";
    else if (this.$i18n.locale === "fr") return "fr";
    else return "gb";
  }

  get filteredLangs() {
    const filteredLangs: string[] = [];
    this.langs.map(lang => {
      if (lang !== this.$i18n.locale) filteredLangs.push(lang);
    });
    return filteredLangs;
  }

  country(lang: string) {
    if (lang === "en") return "gb";
    else if (lang === "fr") return "fr";
    else return "gb";
  }

  changeCountry(lang: string) {
    this.$i18n.locale = lang;
    //persist in localstorage
    localStorage.Lang = lang;
  }
}
</script>
