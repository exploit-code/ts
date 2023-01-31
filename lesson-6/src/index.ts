import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './getUserData.js'
import { getFavoritesAmount } from './getFavoritesAmount.js';
import { getTodosByCount } from './getCollection.js';
import { cloneDate, addDays, FlatRentSdk, database } from './flat-rent-sdk.js';
import { MyRectangle, MyCircle } from './inheritance.js';

const rectangleMove: HTMLElement | null = document.getElementById('rectangle-to-move');
const vertical: HTMLElement | null = document.getElementById('vertical');
const horizontal: HTMLElement | null = document.getElementById('horizontal');
const circleMove: HTMLElement | null = document.getElementById('circle-to-move');
const addRectangle: HTMLElement | null = document.getElementById('add-rectangle');
const addCircle: HTMLElement | null = document.getElementById('add-circle');


getTodosByCount(7).catch((error) => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.error(error);
  }
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
console.log(flatRentSdk._readDatabase())

window.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData()
  const favoritesAmount = getFavoritesAmount()
  if (userData) {
    if (favoritesAmount) {
      renderUserBlock(userData.username, userData.avatarUrl, favoritesAmount)
    } else {
      renderUserBlock(userData.username, userData.avatarUrl, 0)
    }
  }

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


  if (horizontal)
    horizontal.addEventListener('input', (event: Event) => {
      const { target } = event;
      const moveHorizontal = target as HTMLButtonElement;
      const horizontalRec = rectangle.moveHorizontal(Number(moveHorizontal.value));
      const horizontalCircle = circle.moveHorizontal(Number(moveHorizontal.value));
      if (rectangleMove)
        rectangleMove.style.left = `${horizontalRec}px`;
      if (circleMove)
        circleMove.style.left = `${horizontalCircle}px`;
    })

  if (vertical)
    vertical.addEventListener('input', (event: Event) => {
      const { target } = event;
      const moveVertical = target as HTMLButtonElement;
      const verticalRec = rectangle.moveVertical(Number(moveVertical.value));
      const verticalCircle = circle.moveVertical(Number(moveVertical.value));
      if (rectangleMove)
        rectangleMove.style.top = `${verticalRec}px`;
      if (circleMove)
        circleMove.style.top = `${verticalCircle}px`;
    })
  if (addRectangle)
    addRectangle.addEventListener('click', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.insertAdjacentHTML('beforeend', rectangle.paintRectangle(50, 300, 150, 150));
    })
  if (addCircle)
    addCircle.addEventListener('click', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.insertAdjacentHTML('beforeend', circle.paintCircle(300, 500, 200));
    })
})
