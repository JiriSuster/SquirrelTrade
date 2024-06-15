// Composables
import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import Home from "@/router/pages/Home.vue";
import Watchlist from "@/router/pages/Watchlist.vue";
import MyTrades from "@/router/pages/MyTrades.vue";
import News from "@/router/pages/News.vue";
import Backtests from "@/router/pages/Backtests.vue";
import DetailView from "@/router/pages/DetailView.vue";

class RouteWithSymbolQuery {
}

const routes = [
  { path: '/', component: Home, name: "home" },
  { path: '/watchlist', component: Watchlist, name: "watchlist" },
  { path: '/mytrades', component: MyTrades, name: "mytrades" },
  { path: '/news', component: News, name: "news" },
  { path: '/backtests', component: Backtests, name: "backtests" },
  // { path: '/detail', component: DetailView, name: "detail" },

  {
    path: '/detail',
    component: DetailView,
    name: "detail",
    props: (route: RouteWithSymbolQuery) => ({
      symbol: route.query.symbol
    }),
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const routeWithQuery = to as RouteWithSymbolQuery;
      if (!routeWithQuery.query.symbol) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
