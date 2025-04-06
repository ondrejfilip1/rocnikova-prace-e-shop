export const getAllReviews = async (pageQuery = "") => {
  const req = await fetch(
    `http://localhost:3000/reviews${pageQuery ? `?page=${encodeURIComponent(pageQuery)}` : ""}`,
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

export const getReviewCount = async () => {
  const req = await fetch(
    `http://localhost:3000/reviews/count`,
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

export const getNewestReviews = async () => {
  const req = await fetch(`http://localhost:3000/reviews/newest`, {
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

export const createReview = async (formData) => {
  const req = await fetch(`http://localhost:3000/reviews`, {
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

export const deleteReview = async (id, password) => {
  const req = await fetch(`http://localhost:3000/reviews/${id}`, {
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
