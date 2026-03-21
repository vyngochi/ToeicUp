export const setStorage = (data: string, key: string = import.meta.env.VITE_STORAGE_KEY) => {
  sessionStorage.setItem(key, data)
}

export const getStorage = (key: string = import.meta.env.VITE_STORAGE_KEY) => {
  return sessionStorage.getItem(key)
}

export const removeStorage = (keys: string[] = [import.meta.env.VITE_STORAGE_KEY]) => {
  keys.forEach((key) => sessionStorage.removeItem(key))
}
