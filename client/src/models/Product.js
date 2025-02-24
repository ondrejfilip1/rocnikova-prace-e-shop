export const getAllProducts = async (
  searchQuery = "",
  categoryQuery = "",
  brandQuery = "",
  minPriceQuery = "",
  maxPriceQuery = ""
) => {
  // encodeURIComponent prevede searchQuery na string s + misto mezery a tak
  const req = await fetch(
    `http://localhost:3000/products?search=${encodeURIComponent(
      searchQuery
    )}&category=${encodeURIComponent(categoryQuery)}&brand=${encodeURIComponent(
      brandQuery
    )}&minprice=${encodeURIComponent(
      minPriceQuery
    )}&maxprice=${encodeURIComponent(maxPriceQuery)}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
export const getProductById = async (id) => {
  const req = await fetch(`http://localhost:3000/products/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
export const createProduct = async (formData) => {
  const req = await fetch(`http://localhost:3000/products`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
export const updateProduct = async (id, formData) => {
  const req = await fetch(`http://localhost:3000/products/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
export const deleteProduct = async (id, password) => {
  const req = await fetch(`http://localhost:3000/products/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ password: password }),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
/* export const getProductByBrand = async (brand) => {
  const req = await fetch(`http://localhost:3000/products/search?brand=${brand}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
 */
