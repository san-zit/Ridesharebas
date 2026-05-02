// utils/validateForm.js

export const validateLogin = (form) => {
  const errors = {};

  // Email validation
  if (!form.email || !form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!form.password || !form.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};
