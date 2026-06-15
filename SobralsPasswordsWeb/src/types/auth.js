export const createLoginRequest = (username, password) => {
  return {
    username,
    password,
  };
};

export const createLoginResponse = (data) => {
  return {
    success: data.success,
    message: data.message,
    token: data.token || null,
  };
};
