/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              role,
              email,
              password,
              name,
              hospitalName,
              donorName,
              phone,
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="userRadio"
              value={"user"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="userRadio">
              User
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="adminRadio">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="hospitalRadio">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value={"donor"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="donorRadio">
              Donor
            </label>
          </div>
        </div>
        {/*Switch beetween login and register form*/}
        {formType === "login" && (
          <>
            <InputType
              labelText="Email"
              labelFor="email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputType
              labelText="Password"
              labelFor="password"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {formType === "register" && (
          <>
            {(role === "admin" || role === "user") && (
              <InputType
                labelText="Name"
                labelFor="name"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText="Hospital Name"
                labelFor="hospitalName"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
            {role === "donor" && (
              <InputType
                labelText="Donor Name"
                labelFor="donorName"
                inputType="text"
                name="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            )}
            <InputType
              labelText="Email"
              labelFor="email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="password"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputType
              labelText="Phone"
              labelFor="phone"
              inputType="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}
        <div className="d-flex justify-content-between">
          {formType === "login" ? (
            <p>
              Register
              <Link to="/register" className="ms-2">
                {" "}
                Here!
              </Link>
            </p>
          ) : (
            <p>
              Alrady User Please
              <Link to="/login" className="ms-2">
                {" "}
                Login!
              </Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
