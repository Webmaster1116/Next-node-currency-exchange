import React from "react";

const Function = (props) => {
  return (
    <section className="small-section pt-80 pt-xs-40 pt-sm-40 pb-100 pb-sm-60 bg-white">
      <div className="container relative">
        <h1 className="section-title mb-40 mb-sm-40">¿Cómo funciona?</h1>
        <div className="container bg-hr">
          <hr className="orange mt-0 mb-0" />
        </div>

        <div className="row multi-columns-row align-center">
          <div className="col-sm-6 col-md-4 col-lg-4 pb-xs-20 wow fadeInUp">
            <div className="alt-features-item align-center">
              <div className="alt-features-icon cotiza"> </div>
              <h3 className="orange bold mb-10">Cotiza tu operación</h3>
              <div className="alt-features-descr">
                <span className="bold">Cotiza el monto a cambiar</span> y
                selecciona en que cuenta deseas recibirlo
              </div>
            </div>
          </div>

          <div
            className="col-sm-6 col-md-4 col-lg-4 pb-xs-20 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="alt-features-item align-center">
              <div className="alt-features-icon transfiere"> </div>
              <h3 className="orange bold mb-10">Transfiere a Movi</h3>
              <div className="alt-features-descr">
                Transfiere
                <span className="bold">
                  desde tu banca online a la cuenta Movi
                </span>
                indicada y conserva el comprobante
              </div>
            </div>
          </div>

          <div
            className="col-sm-6 col-md-4 col-lg-4 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="alt-features-item align-center">
              <div className="alt-features-icon recibe"> </div>
              <h3 className="orange bold mb-10">Recibe tu cambio</h3>
              <div className="alt-features-descr">
                <span className="bold">Verifica tu operación</span> ingresando
                el número de comprobante y recibe el dinero en tu cuenta
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Function;
