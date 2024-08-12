export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateVerificationCode = (verificationCode: string) => {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(verificationCode);
};

export const validatePassword = (password: string) => {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
};