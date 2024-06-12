import { ref, UnwrapRef } from 'vue'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const value = ref(initialValue)

  function get(): UnwrapRef<T> {
    if (localStorage.getItem(key) !== null) {
      value.value = JSON.parse(localStorage.getItem(key)!)
    }
    return value.value
  }

  function set(newValue: UnwrapRef<T>) {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return {
    get,
    set,
  }
}
