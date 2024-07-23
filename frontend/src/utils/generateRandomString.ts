export const generateRandomString = (length: number = 18) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const useAlphabet = Math.random() < 0.5;
    const characters = useAlphabet ? alphabet : numbers;
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};
