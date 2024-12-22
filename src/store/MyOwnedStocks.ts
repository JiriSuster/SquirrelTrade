import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useLocalStorage from "@/composables/useLocalStorage";

const LS_FAVORITE_KEY = "owned_stocks";


export interface OwnedStock {
  id: string
  symbol: string,
  quantity: number,
  price: number,
  date: string
}
export const useMyOwnedStocks = defineStore("ownedStocks", () => {
  const storage = useLocalStorage<OwnedStock[]>(LS_FAVORITE_KEY, []);
  const ownedStocks = ref<OwnedStock[]>(storage.get());

  function addStock(newStock: OwnedStock) {
    newStock.id = generateUniqueId()
    ownedStocks.value.push(newStock);
    storage.set(ownedStocks.value)
  }

  function sellStock(id: string) {
    const index = ownedStocks.value.findIndex((s) => s.id === id);
    if (index !== -1) {
      ownedStocks.value.splice(index, 1);
      storage.set(ownedStocks.value);
    }
  }

  function generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }


  const ownedStockCount = computed(() => ownedStocks.value.length);

  return {
    addStock,
    sellStock,
    ownedStockCount,
    ownedStocks
  };
});
