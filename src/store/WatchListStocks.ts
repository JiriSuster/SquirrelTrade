import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useLocalStorage from "@/composables/useLocalStorage";

const LS_FAVORITE_KEY = "watchlist_stocks";

export const useWatchlistStore = defineStore("watchlist", () => {
  const storage = useLocalStorage<String[]>(LS_FAVORITE_KEY, []);
  const favoriteSymbols = ref<String[]>(storage.get());

  function toggleFavorite(watchListSymbol: String) {
    const index = favoriteSymbols.value.findIndex((p) => p === watchListSymbol);

    if (index !== -1) {
        favoriteSymbols.value.splice(index, 1);
    } else {
        favoriteSymbols.value.push(watchListSymbol);
    }

    storage.set(favoriteSymbols.value)
  }

  function isFavorite(watchListSymbol: String) {
    return favoriteSymbols.value.includes(watchListSymbol);
  }

  const favoritesCount = computed(() => favoriteSymbols.value.length);

  return {
    toggleFavorite,
    isFavorite,
    favoritesCount,
    favoriteSymbols,
  };
});
