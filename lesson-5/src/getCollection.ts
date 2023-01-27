export type geo = {
  lat: string
  lng: string
}
export type address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: geo
}
export type company = {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: address
  phone: string
  website: string
  company: company
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface ToDo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface Album {
  userId: number
  id: number
  title: string
}

export interface Photo {
  albumId: number
  id: number
  url: string
  thumbnailUrl: string
}

export type requests = User | Photo | Post | Album | ToDo | Comment;

export interface Collection<V, K = string> {
  [K: string]: V
}


function getElements(data: object): void {

  for (let dataKey in data) {
    if (typeof (data[dataKey]) === 'object') {
      console.log(`${dataKey}: {`)
      getElements(data[dataKey]);
      console.log(`}`)
    } else {
      console.log(`${dataKey} : ${data[dataKey]}`)
    }
  }
}

export function getCollection(url: string, index: number) {

  return fetch(`https://jsonplaceholder.typicode.com/${url}/${index}`)
    .then((response) => {
      return response.text()
    })
    .then<Collection<requests>>((responseText) => {
      return JSON.parse(responseText)
    })
    .then((data) => {
      console.log(`${url}:`)
      getElements(data)
      return data
    })
}

export function getTodosByCount(count: number) {
  return fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then((response) => {
      return response.text()
    })
    .then<Collection<ToDo>>((responseText) => {
      return JSON.parse(responseText)
    })
    .then((data) => {
      for (let i = 0; i < count; i++) {
        console.log(`userId: ${data[i].userId}, id: ${data[i].id}, title: ${data[i].title}, completed: ${data[i].completed}`)
      }
      return data
    })
}
