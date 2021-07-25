import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

// const getUser = async (token, id) => {
//   const header = {
//     headers: {
//       "x-auth-token": token,
//     },
//   };
//   const res = await Axios.get(
//     "https://moni-api.herokuapp.com/api/profiles",
//     header
//   );
//   return res.data;
// };

const ViewUserPopup = (props) => {
  const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);
  const [user, setUser] = useState("");

  const listenScrollEvent = (e) => {
    if (window.scrollY > 50) {
      setMargintop(`${window.scrollY + 50}px`);
    } else {
      setMargintop(`${window.scrollY + 50}px`);
    }
  };

  //   const init = async () => {
  //     const data = await getUser(Cookies.get("token"));
  //     setUser(data);
  //   };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    // init();
  }, []);

  return (
    <div className="div-custom shadow-custom round container">
      <button
        className="btn btn-custom"
        onClick={(e) => {
          props.setViewUserPopup(false);
        }}
      >
        <i
          style={{ position: "absolute", right: "5%" }}
          className="fa fa-times"
        ></i>
      </button>
      <h2 className="text-center orange">Perfil</h2>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-5">
          <div className="text-center">
            <div style={{ textAlign: "start" }}>
              <p>Nombre de pila</p>
              <p>Segundo nombre</p>
              <p>Apellido</p>
              <p>Tipo de cuenta</p>
              <p>Email</p>
              <p>Contacto</p>
              <p>Tipo de Documento</p>
              <p>Número del Documento</p>
              <p>Fecha de nacimiento</p>
              <p>Nacionalidad</p>
              <p>Apellido de la madre</p>
              <p>Fecha de creación el</p>
              {/* <p>Numero de Operacion</p> */}
            </div>
          </div>
        </div>
        <div
          className="col-md-1 text-center"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div className="col-md-5">
          <div className="text-center">
            <div style={{ textAlign: "start" }}>
              <p>{props.user.firstName || "-"}</p>
              <p>{props.user.secondName || "-"}</p>
              <p>{props.user.lastName || "-"}</p>
              <p>{props.user.accountType || "-"}</p>
              <p>{props.user.email || "-"}</p>
              <p>{props.user.phone || "-"}</p>
              <p>{props.user.doctype || "-"}</p>
              <p>{props.user.dni || "-"}</p>
              <p>{props.user.birthDate || "-"}</p>
              <p>{props.user.nationality || "-"}</p>
              <p>{props.user.motherLastName || "-"}</p>
              <p>{moment(props.user.date).format("DD/MM/YYYY hh:mm") || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold"
          onClick={(e) => props.setViewUserPopup(false)}
        >
          Confirmar
        </button>
      </div>

      <style jsx>{`
        .div-custom {
          max-width: 650px;
          position: absolute;
          top: ${margintop};
          z-index: 9999999999 !important;
          left: 40%;
          background: white;
          padding: 3em;
          margin-left: -150px;
        }
        p {
          margin: 2px;
        }
        .mr-4 {
          margin-right: 5px;
        }
        .pt-0 {
          padding-top: 6px !important;
          padding-bottom: 5px !important;
        }
        .mt-2 {
          margin-top: 3em;
        }
        .shadow-custom {
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12) !important;
          border-radius: 25px !important;
        }
        .input-cust {
          border: none;
          border-bottom: solid;
          border-width: 1px;
        }
        .btn-custom {
          background: transparent;
        }
        .btn-img {
          background: transparent;
          margin: 0px;
          padding: 0px;
        }
        span {
          margin: 2px;
        }

        p,
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default ViewUserPopup;
