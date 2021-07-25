import React from "react";

const Footer2 = () => {
  return (
    <footer className="small-section bg-morado footer pb-20 pt-20">
      <div className="container">
        <div className="row align-left">
          <div className="col-sm-6 col-lg-3 col-md-3 col-xs-6 col-sm-3">
            <div className="widget">
              <h5 className="bold white mb-10">Empresa</h5>
              <div className="widget-body">
                <ul className="clearlist widget-menu">
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/nostros";
                      }}
                      title=""
                    >
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/faq";
                      }}
                      title=""
                    >
                      Como funciona
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/location";
                      }}
                      title=""
                    >
                      Operación
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/faq";
                      }}
                      title=""
                    >
                      Preguntas frecuentes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 col-xs-6 col-md-3 col-sm-3">
            <div className="widget">
              <h5 className="bold white mb-10">Legal</h5>
              <div className="widget-body">
                <ul className="clearlist widget-menu">
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/faq";
                      }}
                      title=""
                    >
                      Términos y Condiciones
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/faq";
                      }}
                      title=""
                    >
                      Políticas de Privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.href = "/faq";
                      }}
                      title=""
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 col-xs-12 col-md-3 col-sm-3">
            <div className="widget">
              <h5 className="bold white mb-10">Contacto</h5>
              <div className="widget-body">
                <ul className="clearlist widget-posts">
                  <li className="clearfix">
                    <div className="widget-posts-descr">
                      <i className="fa fa-map-marker"></i>&nbsp;&nbsp;C/
                      República de Chile 38
                      <br /> 15073 Lima (Perú)
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="widget-posts-descr">
                      <i className="fa fa-envelope"></i>
                      &nbsp;&nbsp;contacto@movi.pe
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="widget-posts-descr">
                      <i className="fa fa-phone"></i>&nbsp;&nbsp;+51 (1) 7085120
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 col-xs-12 col-md-3 col-sm-3">
            <div className="widget">
              <h5 className="bold white mb-10">Síguenos en</h5>
              <div className="footer-social-links mt-20 mb-110 mb-xs-60">
                <a
                  onClick={() => {
                    window.location.href = "https://facebook.com";
                  }}
                  title="Facebook"
                  target="_blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  onClick={() => {
                    window.location.href = "https://twitter.com";
                  }}
                  title="Twitter"
                  target="_blank"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  onClick={() => {
                    window.location.href = "https://linkedin.com";
                  }}
                  title="Linkedin"
                  target="_blank"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
                <a
                  onClick={() => {
                    window.location.href = "https://instagram.com";
                  }}
                  title="Instagram+"
                  target="_blank"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-lg-12 col-xs-12 col-md-12 align-center mt-20">
            <div className="widget">
              <div
                className="local-scroll mb-30 wow fadeInUp"
                data-wow-duration="1.5s"
                style={{
                  visibility: "visible",
                  animationDuration: 1.5,
                  animationName: "fadeInUp",
                }}
              >
                <a
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <img
                    src="images/logo-footer.png"
                    alt=""
                    width="150"
                    height="36"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-text">
          <h6 className="white">
            © 2020 <a>moni.pe</a> Todos los derechos reservados
          </h6>
        </div>
      </div>
      <div className="local-scroll">
        <a href="#top" className="link-to-top">
          <i className="fa fa-chevron-circle-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer2;
