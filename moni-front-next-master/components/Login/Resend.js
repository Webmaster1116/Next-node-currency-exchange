import React, { useContext, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Logincontext from "../../context/LoginContext";
import UserContext from "../../context/UserContext";
import AlertContext from "../../context/alert/alertContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import Loader from "../Loader";
import Cookies from "js-cookie";
import { Route } from "react-router-dom";
import verifyMail from "../genericFunctions/verifyMail";

export const Login = () => {
  const [email, setEmail] = useState("");
  const { state, addToken, addName } = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { setAlert, alerts } = alertContext;
  const [awaitData, setAwaitData] = useState(false);

  // useEffect(() => {
  //   NotificationManager.info("Please login to continue", "Hola");
  // }, []);

  const handleResend = async (e) => {
    e.preventDefault();
    const body = { email: email };

    setAwaitData(true);
    try {
      if (body.email === "") {
        setAlert("Por favor llena todos los espacios", "danger");
        setAwaitData(false);
      } else {
        await verifyMail(body);

        Router.push("/login");
        setAlert("Verification Email sent", "danger");
      }
    } catch (error) {
      setAlert(error.response.data.msg, "danger");
      setAwaitData(false);
    }
  };

  // if (awaitData === true) {
  //   return (
  //     <div className="form-container w-100 h-100">
  //       <div className="loader">
  //         <Loader />
  //       </div>
  //       <style>{`
  //       .form-container {
  //         height: 100vh !important;
  //         // background: #071127;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="page" id="top">
        <section className="page-section pt-20 pb-0">
          <div className="home-content container">
            <div className="home-text">
              <div className="container align-center">
                <div className="row">
                  <div className="col-sm-5 col-sm-push-3">
                    <form className="form white">
                      <img
                        src="images/logo-moni.png"
                        alt="Moni"
                        width="150px"
                      />
                      <h1 className="section-title pt-80 pt-xs-40 mb-40 mb-sm-40">
                        Reenviar Verificación{" "}
                      </h1>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="input-sm bold"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        pattern=".{3,100}"
                      />
                      <i className="fa fa-envelope fa-2x campoform"></i>
                      <button
                        className="btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20"
                        onClick={handleResend}
                      >
                        Reenviar verificación
                      </button>
                      <p className="mt-20">
                        ¿Ya estás verificado?
                        <br />
                        <Link href="/login">Inicia sesión</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;

{
  /* <div className="register-container">
        <NotificationContainer />
        <h1>Reenviar verificación e-mail</h1>
        <form className="">
          <div className="form-row">
            <div className="input-group col-md-12 col-sm-12">
              <input
                className="form-control"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
           
          </div>
          <button
            type="submit"
            className="login-btn btn btn-primary mt-5"
            onClick={handleResend}
          >
            Reenviar verificación
          </button>
          
        </form>
      </div> */
}
