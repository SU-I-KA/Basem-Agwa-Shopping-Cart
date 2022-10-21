export const getLocalStorage = (key, initialValue) => {
   let list = localStorage.getItem(key)
   if (list) {
      return JSON.parse(localStorage.getItem(key))
   } else {
      return initialValue
   }
}
