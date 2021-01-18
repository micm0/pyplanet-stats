<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/records">Records</router-link> |
        <router-link to="/players">Players</router-link> |
        <router-link to="/maps">Maps</router-link> |
        <router-link to="/about">About</router-link>
      </v-navigation-drawer>
      <v-app-bar app>
        <!-- -->
      </v-app-bar>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
