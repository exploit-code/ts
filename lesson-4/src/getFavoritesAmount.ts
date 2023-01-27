export const getFavoritesAmount = (): number | undefined => {
  let amount: unknown;
  amount = localStorage.getItem("favoritesAmount");
  if (amount == null) {
    console.log("No data");
    return
  } else if (typeof amount === "string") {
    if (Number(amount) >= 1) {
      const favorites = Math.floor(Number(amount));
      console.log(`Amount of favorite goods: ${favorites}`);
      return favorites
    }
  }
}
