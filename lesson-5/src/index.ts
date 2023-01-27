import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './getUserData.js'
import { getFavoritesAmount } from './getFavoritesAmount.js';
import { getCollection, getTodosByCount } from './getCollection.js';
import { cloneDate, addDays, FlatRentSdk, database } from './flat-rent-sdk.js';
import { MyGraphicsPrimitive2D, MyAreaPrimitive2D, MyRectangle, MyCircle } from './inheritance.js';

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

console.log(cloneDate(new Date()))
console.log(addDays(new Date(), 3))
const flatRentSdk = new FlatRentSdk()
console.log(flatRentSdk.database)
console.log(flatRentSdk.get('ab2e2'))
console.log(flatRentSdk.search({
  checkInDate: new Date(2022, 5, 1),
  checkOutDate: new Date(2022, 5, 12),
  city: 'Санкт-Петербург',
  priceLimit: 4500
}))
console.log(flatRentSdk.book('vnd331', new Date(2022, 5, 1), new Date(2022, 5, 12)))
console.log(flatRentSdk._generateDateRange(new Date(2022, 5, 1), new Date(2022, 5, 12)))
console.log(flatRentSdk._areAllDatesAvailable(database[0], [new Date(2022, 5, 1), new Date(2022, 5, 12)]))
console.log(flatRentSdk._formatFlatObject(database[1], 2))
// flatRentSdk. _writeDatabase({
//   id: 'vvv111',
//   title: 'New Hotel',
//   details: 'Отель расположен в 6 минутах ходьбы от центра.',
//   photos: ['vvv111.png'],
//   coordinates: [55.9322936,31.3460129],
//   bookedDates: [],
//   price: 16300
// })
console.log(flatRentSdk._readDatabase())

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
  const circle = new MyCircle(10, { x: 10, y: 20 });
  const rectangle = new MyRectangle(3, 4, 5, 8);
  console.log('Площадь круга: ' + circle.square().toFixed(2));
  console.log('Площадь прямоугольника: ' + rectangle.square());
  console.log('Высота прямоугольника: ' + rectangle.height());
  console.log('Ширина прямоугольника: ' + rectangle.width());

  document.getElementById('horizontal').addEventListener('input', (event: Event) => {
    const { target } = event;
    const moveHorizontal = target as HTMLButtonElement;
    const horizontalRec = rectangle.moveHorizontal(Number(moveHorizontal.value));
    const horizontalCircle = circle.moveHorizontal(Number(moveHorizontal.value));

    document.getElementById('rectangle-to-move').style.left = `${horizontalRec}px`;
    document.getElementById('circle-to-move').style.left = `${horizontalCircle}px`;
  })

  document.getElementById('vertical').addEventListener('input', (event: Event) => {
    const { target } = event;
    const moveVertical = target as HTMLButtonElement;
    const verticalRec = rectangle.moveVertical(Number(moveVertical.value));
    const verticalCircle = circle.moveVertical(Number(moveVertical.value));

    document.getElementById('rectangle-to-move').style.top = `${verticalRec}px`;
    document.getElementById('circle-to-move').style.top = `${verticalCircle}px`;
  })

  document.getElementById('add-rectangle').addEventListener('click', (event) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.insertAdjacentHTML("beforeend", rectangle.paintRectangle(50, 300, 150, 150));
  })
  document.getElementById('add-circle').addEventListener('click', (event) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.insertAdjacentHTML("beforeend", circle.paintCircle(300, 500, 200));
  })
})
