import React, { useState } from "react";
import Layout from "../components/Layout";
import BankList from "../Data/BankList";
import ChooseProfile from "../components/Register/chooseProfile";
import PersonalReg from "../components/Register/PersonalReg";
import CompanyReg from "../components/Register/CompanyReg";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(/^[0-9\b]+$/);

const Register = (props) => {
  const [isAccountSelect, setIsAccountSelect] = useState(false);
  const [profile, setProfile] = useState("");

  const [state, setState] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    password: "",
    birthDate: "",
    email: "",
    phone: "",
    nationality: "Afghanistan",
    doctype: "DNI",
    dni: "",
    motherLastName: "",
    bankName: "BCP",
    nickname: "",
    accountNumber: "",
    type: BankList[0],
    accountType: "Personal",
    currency: "Soles",
    profile: "",

    formErrors: {
      firstName: "",
      secondName: "",
      lastName: "",
      password: "",
      birthDate: "",
      email: "",
      phone: "",
      nationality: "",
      dni: "",
      doctype: "",
      motherLastName: "",
      bankName: "",
      nickname: "",
      accountNumber: "",
      type: "",
      currency: "",
    },
  });

  const handleChange = (input) => (event) => {
    const { value } = event.target;
    setState({ ...state, [input]: value });
  };

  const { step, formErrors } = state;
  const {
    firstName,
    secondName,
    lastName,
    password,
    birthDate,
    email,
    phone,
    nationality,
    motherLastName,
    dni,
    accountType,
    doctype,
  } = state;
  const values = {
    firstName,
    secondName,
    lastName,
    password,
    birthDate,
    email,
    phone,
    nationality,
    motherLastName,
    dni,
    accountType,
    doctype,
  };

  if (isAccountSelect === false) {
    return (
      <Layout>
        <ChooseProfile
          setIsAccountSelect={setIsAccountSelect}
          setProfile={setProfile}
        />
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        {/* <div className="page-loader">
            <div className="loader">Cargando...</div>
          </div> */}
        <div className="page" id="top">
          <PersonalReg
            handleChange={handleChange}
            values={values}
            formErrors={formErrors}
            profile={profile}
          />
          {/* {profile === "Personal" ? (
            
          ) : (
            <CompanyReg
              handleChange={handleChange}
              values={values}
              formErrors={formErrors}
              profile={profile}
            />
          )} */}
        </div>
      </Layout>
    </>
  );
};

export default Register;
