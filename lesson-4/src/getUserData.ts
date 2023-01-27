import { UserInterface } from './helpers.js'

const userStorage: UserInterface = {
  username: "Yuriy",
  avatarUrl: "img/avatar.png"
}

localStorage.removeItem("user");
localStorage.removeItem("favoritesAmount");
localStorage.setItem("user", JSON.stringify(userStorage));
localStorage.setItem("favoritesAmount", "5");

export const getUserData = (): UserInterface => {
  let user: unknown;
  user = localStorage.getItem("user");
  if (user == null) {
    console.log("No data");
    alert("Отсутствуют данные пользователя")
    return
  } else if (typeof user === "string") {
    const parseUser = JSON.parse(user);
    if (parseUser.username && parseUser.avatarUrl && parseUser.username !== '') {
      console.log(`Name: ${parseUser.username}, Avatar: ${parseUser.avatarUrl}`);
      return parseUser
    } else {
      return {
        username: "unknown",
        avatarUrl: ""
      }
    }
  }
}
