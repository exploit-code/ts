import { renderBlock } from './lib.js'
import { search, showData } from "./helpers.js";


const currentDate = new Date();
const minDateFormatted = currentDate.toISOString().split('T')[0];
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
const maxDateFormatted = new Date(maxDate.setDate(maxDate.getDate() + 1)).toISOString().split('T')[0];
const inDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
const inDateFormatted = inDate.toISOString().split('T')[0];
const outDateFormatted = new Date(inDate.setDate(inDate.getDate() + 2)).toISOString().split('T')[0];


export function renderSearchFormBlock(arrival: string = inDateFormatted, departure: string = outDateFormatted) {
  renderBlock(
    'search-form-block',
    `
    <form id="form">
      <fieldset class="search-fieldset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" name="city" value="Санкт-Петербург" />
            <input type="hidden" name="location"  value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked/> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${arrival} min=${minDateFormatted} max=${maxDateFormatted} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${departure} min=${minDateFormatted} max=${maxDateFormatted} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  const form = document.getElementById("form");
  form.onsubmit = function (e) {
    const data = search(e, (value) => {
      console.log(value)
    });
    showData(data);
  };
}
