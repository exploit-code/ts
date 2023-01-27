export interface UserInterface {
  username: string
  avatarUrl?: string
}

export interface SearchFormData {
  city: string
  location: number[]
  inDate: string
  outDate: string
  maxPrice: number
  providers?: string[]
}

export interface Place {

}



export const search = (event, callback: (value?: Place[], error?: Error) => void): SearchFormData => {
  event.preventDefault();

  const dataForm = new FormData(event.target);
  const providersElements = [...dataForm.getAll('provider')];
  let providers: string[] = []
  for (const provider of providersElements) {
    providers.push(provider.toString())
  }
  const city = dataForm.get('city');
  const locationStr = dataForm.get('location').toString().split(",");
  const locationNum = [Number(locationStr[0]), Number(locationStr[1])];
  const checkin = dataForm.get('checkin');
  const checkout = dataForm.get('checkout');
  const price = dataForm.get('price');


  setTimeout(() => {
    const rand = Math.random();
    if (rand < 0.5) {
      return Promise.resolve([]).then(callback)
    } else {
      return Promise.reject("This is error").then(callback)
    }
  }, 2000)

  if (!checkin || !checkout || !price || !city || !locationNum) {
    return null
  } else if (isNaN(Number(price))) {
    return null
  } else {
    return {
      city: city.toString(),
      location: locationNum,
      inDate: checkin.toLocaleString(),
      outDate: checkout.toLocaleString(),
      maxPrice: Number(price),
      providers: [...providers]

    };
  }

}

export const showData = (data: SearchFormData): void => {
  if (data == null) {
    console.log('Oooopps! Введите корректные данные')
  } else {
    let dateResult = `City: ${data.city}, Check-in: ${data.inDate}, Checkout-out: ${data.outDate}, Max price: ${data.maxPrice}, Location: `
    for (let i = 0; i < data.location.length; i++) {
      dateResult += `${data.location[i]}`
      if (i === data.location.length - 1) break;
      dateResult += `, `
    }
    if (data.providers.length > 0) {
      for (let i = 0; i < data.providers.length; i++) {
        dateResult += `, Provider: ${data.providers[i]}`

      }
    }
    console.log(dateResult);
  }
}
