import React from "react";

const Data = () => {
  return (
    <section className="split-section bg-gray-lighter">
      <div className="clearfix relative">
        <div className="split-section-headings right pt-60 pb-0 pt-sm-50 pb-sm-50">
          <div className="split-section-wrapper alig-left">
            <div className="text black">
              <div className="count-wrapper mb-0 mb-sm-60">
                <div className="row">
                  <div className="row col-lg-6 col-sm-12 col-1600">
                    <div className="col-xs-6 col-sm-6 col-lg-12 mb-60 mb-sm-20 mb-xs-10 mb-md-0 mt-0 mt-xs-0 mt-sm-0">
                      +<div className="count-number">84</div> mil
                      <div className="count-descr font-alt">
                        <span className="count-title bold orange">
                          USUARIOS REGISTRADOS
                        </span>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-12 mb-60 mb-sm-20 mb-xs-10">
                      <div className="count-number">3400</div>
                      <div className="count-descr font-alt">
                        <span className="count-title bold orange">
                          OPERACIONES REGISTRADAS
                        </span>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-12 mb-60 mb-sm-20 mb-xs-10">
                      + $<div className="count-number bold">36</div> millones
                      <div className="count-descr font-alt">
                        <span className="count-title bold orange">
                          CAMBIADOS
                        </span>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-12 mb-60 mb-sm-20 mb-xs-10">
                      + $<div className="count-number">6</div> millones
                      <div className="count-descr font-alt">
                        <span className="count-title bold orange">
                          AHORRADOS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row col-lg-6 col-sm-12 mb-xs-30  mb-sm-40 hidden-lg hidden-1600">
                    <img src="images/bkg-movil.png" widt="400px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="split-section-content small-section pt-100 pb-90 pt-sm-50 pb-sm-50 bg-degradado"
          style={{ height: "auto" }}
        >
          <div className="split-section-wrapper">
            <div className="text white">
              <h2 className="mt-0 mb-0 mb-xxs-20 white bold">Revolucionamos</h2>
              <h3 className="white bold mt-0">tu forma de cambiar dinero</h3>
              <h5 className="white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                <span className="bold">
                  eiusmod tempor incididunt ut labore et
                </span>
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Excepteur sint occaecat cupidatat non proidents.
                Eaque ipsa quae ab illo inventore veritatis et quasi.
              </h5>
              <h5 className="white">
                Architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur
                <span className="bold">
                  magni dolores eos qui ratione voluptatem sequi
                </span>
                nesciunt. Neque porro quisquam est, qui dolorem.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data;
