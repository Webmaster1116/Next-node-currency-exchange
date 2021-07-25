import React from "react";
import Home_data from "../Data/Home_data";
import Link from "next/link";
import Convertor from "./Convertor/Convertor";
// import "../Style/Home.css";

const Home = (props) => {
  return (
    <>
      <section id="hero">
        <div className="hero-container">
          {/* <h2>{Home_data().title}</h2> */}
          <div className="container home mb-2 pb-5">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <img
                  className="home-im"
                  src={require("../Data/img/logo.png")}
                  height="300"
                  alt="logo"
                />
                <div className="home-title text-white">
                  <h1>{Home_data().title}</h1>
                </div>
              </div>

              <div className="converter col-md-6 ml-5 col-sm-12 ml-auto">
                <Convertor data={props.data} />
              </div>
            </div>
          </div>
          <Link href="/register">
            <a className="btn outline-btn text-white text-center p-2">
              Get Started
            </a>
          </Link>
        </div>
      </section>
      <style jsx>{`
        .home-title {
          padding-top: 5px;
          padding-bottom: 20px
          text-align: center;
          font-weight: bolder;
          color: blue;
        }
        .home-im {
          margin: 0%;
          padding: 0;
        }
        // .btn-get-started {
        //   background: transparent;
        //   color: #d8dcdf;
        //   border: 2px solid rgb(76, 159, 188) !important;
        //   border-radius: 40px;
        // }
      `}</style>
    </>
  );
};

export default Home;
