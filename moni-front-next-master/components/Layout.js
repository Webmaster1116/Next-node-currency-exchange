import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Alerts from "./Alerts";
import Footer from "./Footer";
const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wowjs") : null;

const Layout = (props) => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <>
      <Head>
        <title>Moni</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="shortcut icon" href="images/favicon.png" />
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="images/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="images/apple-touch-icon-114x114.png"
      />
      </Head>
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/style-responsive.css" />
      <link rel="stylesheet" href="css/animate.min.css" />
      <link rel="stylesheet" href="css/vertical-rhythm.min.css" />
      <link rel="stylesheet" href="css/magnific-popup.css" />
      <Alerts />
      <div className="appear-animate">{props.children}</div>

      <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
      <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
      <script type="text/javascript" src="js/bootstrap.min.js"></script>
      <script type="text/javascript" src="js/SmoothScroll.js"></script>
      <script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
      <script
        type="text/javascript"
        src="js/jquery.localScroll.min.js"
      ></script>
      <script type="text/javascript" src="js/jquery.viewport.mini.js"></script>
      <script type="text/javascript" src="js/jquery.countTo.js"></script>
      <script type="text/javascript" src="js/jquery.appear.js"></script>
      <script type="text/javascript" src="js/jquery.sticky.js"></script>
      <script type="text/javascript" src="js/jquery.parallax-1.1.3.js"></script>
      <script type="text/javascript" src="js/jquery.fitvids.js"></script>
      <script type="text/javascript" src="js/owl.carousel.min.js"></script>
      <script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
      <script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
      <script
        type="text/javascript"
        src="js/jquery.magnific-popup.min.js"
      ></script>
      <script type="text/javascript" src="js/wow.min.js"></script>
      <script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
      <script type="text/javascript" src="js/all.js"></script>
      <script type="text/javascript" src="js/main.js"></script>
    </>
  );
};

export default Layout;
