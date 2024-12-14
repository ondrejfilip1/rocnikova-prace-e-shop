export const getAllItems = async () => {
  const req = await fetch("http://localhost:3000/cart/", {
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
export const addItem = async (formData) => {
  const req = await fetch(`http://localhost:3000/cart`, {
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
export const updateItem = async (id, formData) => {
  const req = await fetch(`http://localhost:3000/cart/${id}`, {
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
export const deleteItem = async (id) => {
  const req = await fetch(`http://localhost:3000/cart/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
