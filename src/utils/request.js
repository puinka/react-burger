const handleServerResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url, options) => {
  return await fetch(url, options).then((res) => handleServerResponse(res));
};
