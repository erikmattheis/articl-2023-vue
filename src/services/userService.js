import axiosInstance from '@/services/axiosService';

const charCounts = (val) => ({
  numUpper: val.length - val.replace(/[A-Z]/g, '').length,
  numLower: val.length - val.replace(/[a-z]/g, '').length,
  numDigit: val.length - val.replace(/[0-9]/g, '').length,
  numSpecial: val.length - val.replace(/\W|_/g, '').length,
});

const scoreChars = (val) => {
  if (!val) {
    return 0;
  }

  const chars = charCounts(val);
  const a = chars.numUpper > 0 ? 1 : 0;
  const b = chars.numLower > 0 ? 1 : 0;
  const c = chars.numDigit > 0 ? 1 : 0;
  const d = val.length > 7 ? 1 : 0;

  return a + b + c + d;
};

const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  return email.match(

    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  );
};

const login = async ({ username, password }) => {
  try {
    const data = await axiosInstance.post('/auth/login', { username, password });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async ({ refreshToken }) => {
  try {
    await axiosInstance.post('/auth/logout', { refreshToken });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  scoreChars, validateEmail, login, logout,
};
