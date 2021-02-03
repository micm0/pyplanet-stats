<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-1 mt-5 mb-5 text-uppercase">
              404 - page not found
            </div>
            <div class="grey--text lighten-5 mb-5">
              The page you are trying to get to never existed in this reality,
              or has migrated to a parallel universe.
            </div>
            <v-btn to="/"
              ><v-icon class="mr-2">mdi-home</v-icon> Return Home</v-btn
            >
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.paragraph-text {
  font-size: 18px;
}
</style>
