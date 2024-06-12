// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/router/pages/Home.vue";
import Watchlist from "@/router/pages/Watchlist.vue";
import MyTrades from "@/router/pages/MyTrades.vue";
import News from "@/router/pages/News.vue";
import Backtests from "@/router/pages/Backtests.vue";
import DetailView from "@/router/pages/DetailView.vue";

const routes = [
  { path: '/', component: Home, name: "home" },
  { path: '/watchlist', component: Watchlist, name: "watchlist" },
  { path: '/mytrades', component: MyTrades, name: "mytrades" },
  { path: '/news', component: News, name: "news" },
  { path: '/backtests', component: Backtests, name: "backtests" },
  { path: '/detail', component: DetailView, name: "detail" },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
