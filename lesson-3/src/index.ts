import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './getUserData.js'
import { getFavoritesAmount } from "./getFavoritesAmount.js";
import { getCollection, getTodosByCount } from "./getCollection.js";


getCollection("users", 1).catch((error?: string) => {
  throw error
});
getCollection("todos", 1).catch((error?: string) => {
  throw error
});
getCollection("posts", 1).catch((error?: string) => {
  throw error
});
getCollection("comments", 1).catch((error?: string) => {
  throw error
});
getCollection("photos", 2).catch((error?: string) => {
  throw error
});
getCollection("albums", 1).catch((error?: string) => {
  throw error
});
getTodosByCount(7).catch((error?: string) => {
  throw error
});

window.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData()
  const favoritesAmount = getFavoritesAmount()
  renderUserBlock(userData.username, userData.avatarUrl, favoritesAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    {
      name: 'Понял', handler: () => {
        console.log('Уведомление закрыто')
      }
    }
  )

})
