const generateRandomCode = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const code = `${String(randomNumber).padStart(4, "0")}`;
  return code;
};
export default generateRandomCode;
