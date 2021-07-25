import React from "react";

const Subscribe = (props) => {
  return (
    <section className="home-newsletter">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="single">
              <h2>Subscribe to our Newsletter</h2>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <span className="input-group-btn">
                  <button className="btn outline-btn" type="submit">
                    Subscribe
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .home-newsletter {
          padding: 80px 0;
          background: #071127;
        }

        .home-newsletter .single {
          max-width: 650px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .home-newsletter .single h2 {
          font-size: 22px;
          color: white;
          text-transform: uppercase;
          margin-bottom: 40px;
        }
        .home-newsletter .single .form-control {
          height: 50px;
          background: #d8dcdf;
          border-color: #77cfeb;
          border-width: 2px;
          border-radius: 20px 0 0 20px;
        }
        .home-newsletter .single .form-control:focus {
          box-shadow: none;
          border-color: #243c4f;
        }
        .home-newsletter .single .btn {
          min-height: 50px;
          border-radius: 0 20px 20px 0;
          background: #243c4f;
          color: #fff;
        }
      `}</style>
    </section>
  );
};

export default Subscribe;
