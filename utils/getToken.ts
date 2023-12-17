const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const authObj = JSON.parse(auth);
    return authObj.token;
  }
  return "";
};

export default getToken;
