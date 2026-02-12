/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputType from "./InputType";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [donorName, setDonorName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
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
            <InputType
              labelText="Name"
              labelFor="name"
              inputType="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              labelText="Hospital Name"
              labelFor="hospitalName"
              inputType="text"
              name="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />

            <InputType
              labelText="Donor Name"
              labelFor="donorName"
              inputType="text"
              name="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
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
        <div className="d-flex">
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
