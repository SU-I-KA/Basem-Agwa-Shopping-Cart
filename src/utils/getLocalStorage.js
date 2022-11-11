export const getLocalStorage = (key, initialValue) => {
   let data = localStorage.getItem(key)
   if (data) {
      return JSON.parse(localStorage.getItem(key))
   } else {
      return initialValue
   }
}
