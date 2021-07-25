import React from "react";

export const Steps = () => {
  return (
    <section id="features" className="features section-bg">
      <div className="container">
        <div className="section-title">
          <h1 data-aos="fade-in" className="features-title">
            Features
          </h1>
        </div>
        <div className="row justify-content-center content">
          <div className="col-md-4" data-aos="fade-right">
            <img
              src={require("../Data/img/features1.png")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-5 pt-4" data-aos="fade-left">
            <h3>Paso 1: </h3>
            <p className="font-italic">
              Para comprar bitcoins primero revise el precio de VENTA que se
              encuentra en la parte superior de la web en la calculadora, en la
              opción VENTA.
            </p>
          </div>
        </div>

        <div className="row justify-content-center content">
          <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
            <img
              src={require("../Data/img/features2.png")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div
            className="col-md-5 pt-5 order-2 order-md-1"
            data-aos="fade-right"
          >
            <h3>Paso 2: </h3>
            <p className="font-italic">
              Solicite al operador (mediante whatsapp, facebook o chat en línea)
              nuestros números de cuenta.Cupiditate placeat cupiditate placeat
              est ipsam culpa.
            </p>
          </div>
        </div>

        <div className="row justify-content-center content">
          <div className="col-md-4" data-aos="fade-right">
            <img
              src={require("../Data/img/features3.png")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-5 pt-5" data-aos="fade-left">
            <h3>Paso 3: </h3>
            <p>
              Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus
              quia minima quod. Sunt saepe odit aut quia voluptatem hic voluptas
              dolor doloremque.
            </p>
          </div>
        </div>

        <div className="row justify-content-center content">
          <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
            <img
              src={require("../Data/img/features4.png")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div
            className="col-md-5 pt-5 order-2 order-md-1"
            data-aos="fade-right"
          >
            <h3>Service 4</h3>
            <p className="font-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
