const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()';

export const randString = () => {
  let result = '';
  let len = 25;
  for (let i = 0; i < len; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
};
