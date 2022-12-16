export const getProducts = async () => {
  const response = await fetch('http://localhost:1337/api/products');
  const products = await response.json();

  return products;
};

export const getCart = async () => {
  const response = await fetch('/api/cart');
  const cart = await response.json();

  return cart;
};

export const addCart = async (count: number, product, options) => {
  const response = await fetch('/api/cart/client', {
    method: 'POST',
    body: JSON.stringify({
      count: count,
      item: {
        ...product,
        options,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const cart = await response.json();

  return cart;
};

export const handleClickMinus = async (min, product) => {
  const response = await fetch('/api/cart/client', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      count: min - 1,
      item: { ...product },
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    setCart(data.data);
  });
};

export const handleClickPlus = async (max, product) => {
  fetch('/api/cart/client', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      count: max + 1,
      item: { ...product },
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    setCart(data.data);
  });
};

export const handleDelete = async (product) => {
  fetch('/api/cart/client', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ item: { ...product } }),
  })
  .then((res) => res.json())
  .then((data) => {
    setCart(data.data);
  });
};
