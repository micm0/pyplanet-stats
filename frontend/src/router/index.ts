import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Maps from "../views/Maps.vue";
import Players from "../views/Players.vue";
import Records from "../views/Records.vue";
import PlayerRecords from "../views/PlayerRecords.vue";
import TrackRecords from "../views/MapRecords.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps
  },
  {
    path: "/map/:id",
    name: "Map",
    component: TrackRecords
  },
  {
    path: "/players",
    name: "Players",
    component: Players
  },
  {
    path: "/player/:id",
    name: "Player",
    component: PlayerRecords
  },
  {
    path: "/records",
    name: "Records",
    component: Records
  },
  {
    // catch all 404 - define at the very end
    path: "*",
    name: "404 NotFound",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  routes
});

router.afterEach(to => {
  if (to.name) {
    document.title = to.name + " | PyPlanet Stats";
  }
});

export default router;
