const generateRandomCode = () => {
  const prefix = "2023";
  const randomSuffix = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  const code = prefix + randomSuffix;
  return code;
};
export default generateRandomCode;
