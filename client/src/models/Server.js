export const isAlive = async () => {
  // tato metoda tu je jen abychom vedeli jestli server zije
  const req = await fetch(`http://localhost:3000/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return req.status === 200;
};

export const hasCorrectPassword = async (password) => {
  // tato metoda zjistuje spravne heslo
  const req = await fetch(`http://localhost:3000/products/password/`, {
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
    message: data.message,
  };
};
