import React from "react";

const Steps = (props) => {
  return (
    <div>
      <section
        id="steps"
        className="py-80px text-center demo-multibackground p-5 text-white"
      >
        <div className="container mb-5 mt-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-st-3 text-center mb-5">
                <h2 className="">How It Works</h2>
                <hr className="hr" />
              </div>
            </div>
            <div className="col-lg-4 mt-3">
              <div className="step-box bg-darken-second-color p-40px text-center rd-5 mb-md-30px mb-sm-30px mb-xs-30px">
                <i className="fa fa-user-circle fs-3 text-first-color d-block mb-20px"></i>
                <h4 className="text-white fw-500 mb-20px">
                  <span className="fs-2">1. </span>Verify Your ID
                </h4>
                <p className="text-first-color">
                  Sit amet, consectetur adipiscing elit. Quisque lobortis non.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mt-3">
              <div className="step-box bg-darken-second-color p-40px text-center rd-5 mb-md-30px mb-sm-30px mb-xs-30px">
                <i className="fa fa-money fs-3 text-first-color d-block mb-20px"></i>
                <h4 className="text-white fw-500 mb-20px">
                  <span className="fs-2">2. </span>Make A Payment
                </h4>
                <p className="text-first-color">
                  Sit amet, consectetur adipiscing elit. Quisque lobortis non.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mt-3">
              <div className="step-box bg-darken-second-color p-40px text-center rd-5 mb-md-30px mb-sm-30px mb-xs-30px">
                <i className="fa fa-unlock fs-3 text-first-color d-block mb-20px"></i>
                <h4 className="text-white fw-500 mb-20px">
                  <span className="fs-2">3. </span>Buy or Sell Orders
                </h4>
                <p className="text-first-color">
                  Sit amet, consectetur adipiscing elit. Quisque lobortis non.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        #steps {
          background-image: url("../Data/img/bg.jpg");
          background-image: url("https://tahastudio.dev/site-templates/bcoin/assets/img/img-bg-1.jpg");
          // background: #d8dcdf;
        }
        .p-40px {
          padding: 40px;
        }
        .bg-darken-second-color {
          background-color: #153154 !important;
        }
        .mb-40px {
          margin-bottom: 40px;
        }
        container {
          position: relative;
        }
        .fs-3 {
          font-size: 3rem !important;
        }
        .text-first-color {
          color: #77cfeb !important;
        }
        .fw-500 {
          font-weight: 500;
        }
        .hr {
          margin-top: 0px;
          border: 2px #77cfeb solid;
          width: 5%;
        }
      `}</style>
    </div>
  );
};

export default Steps;
