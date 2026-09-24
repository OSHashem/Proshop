export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

//   Calculate Items Price
export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );

  //   Calculate Shipping Price (if order over 100 then free, else 10$ shipment)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //   Calculate tax Price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //   Calculate total Price
  state.totalPrice = (
    Number(state.shippingPrice) +
    Number(state.itemsPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
};
