export const getAllEmails = async (password) => {
  const req = await fetch(`http://localhost:3000/email/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(password),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const sendGroupNewsletter = async (emailData) => {
  const req = await fetch(`http://localhost:3000/email/group`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(emailData),
  });
  const data = await req.json();
  return {
    status: req.status,
    message: data.message,
  };
};

export const addEmail = async (email) => {
  const req = await fetch(`http://localhost:3000/email/add`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(email),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const removeEmail = async (id, password) => {
  const req = await fetch(`http://localhost:3000/email/${id}`, {
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
