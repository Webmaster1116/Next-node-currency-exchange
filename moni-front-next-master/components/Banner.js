import React from "react";

const Banner = () => {
  return (
    <section id="clients" className="clients section-bg">
      <div className="container-fluid d-none d-md-block">
        <div className="row clients-wrap clearfix wow ml-5 mr-5 ">
          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo">
              <img
                src={require("../Data/img/Banbif.png")}
                className="img-fluid banner"
                alt="asdsa"
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo ">
              <img
                src={require("../Data/img/BBVA.png")}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo ">
              <img
                src={require("../Data/img/Bcp.png")}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo ">
              <img
                src={require("../Data/img/Scotiabank.png")}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo ">
              <img
                src={require("../Data/img/Transferencia-24min.png")}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-6">
            <div className="client-logo ">
              <img
                src={require("../Data/img/Transferencia-15min.png")}
                className="img-fluid"
                alt=""
                height="70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
