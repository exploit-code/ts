import { renderBlock } from './lib.js'
import { search, showData } from "./helpers.js";


const currentDate = Date.now();

export interface DateParametersInterface {
  minDate: Date
  minDateFormatted: string
  maxDate: Date
  inDate: Date
}


const DateParameters: DateParametersInterface = {
  minDate: new Date(currentDate),
  minDateFormatted: new Date(currentDate).toISOString().split('T')[0],
  maxDate: new Date(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth() + 2, 0),
  inDate: new Date(currentDate + 24 * 60 * 60 * 1000)
}

const maxDateFormatted = new Date(DateParameters.maxDate.setDate(DateParameters.maxDate.getDate() + 1)).toISOString().split('T')[0];
const inDateFormatted = DateParameters.inDate.toISOString().split('T')[0];
const outDateFormatted = new Date(DateParameters.inDate.setDate(DateParameters.inDate.getDate() + 2)).toISOString().split('T')[0];


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
            <input id="check-in-date" type="date" value=${arrival} min=${DateParameters.minDateFormatted} max=${maxDateFormatted} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${departure} min=${DateParameters.minDateFormatted} max=${maxDateFormatted} name="checkout" />
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
