export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password)
      return alert("Please fill all the fields");
    console.log("login", e, role, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const handleRegister = (
  e,
  role,
  email,
  password,
  name,
  hospitalName,
  donorName,
  phone,
) => {
  e.preventDefault();
  try {
    console.log(
      "register",
      e,
      email,
      password,
      role,
      name,
      hospitalName,
      donorName,
      phone,
    );
  } catch (error) {
    console.error(error);
  }
};
