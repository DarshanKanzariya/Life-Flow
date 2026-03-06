import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password)
      return alert("Please fill all the fields");
    store.dispatch(userLogin({ role, email, password }));
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

  if (!role || !email || !password || !phone) {
    return alert("Please fill all required fields");
  }

  if (role === "hospital" && !hospitalName) {
    return alert("Hospital name is required");
  }

  if (role === "donor" && !donorName) {
    return alert("Donor name is required");
  }

  store.dispatch(
    userRegister({
      role,
      email,
      password,
      name,
      hospitalName,
      donorName,
      phone,
    })
  );
};