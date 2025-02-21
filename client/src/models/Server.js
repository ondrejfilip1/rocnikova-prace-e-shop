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
