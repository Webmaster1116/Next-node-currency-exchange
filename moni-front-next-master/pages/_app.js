import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Provider as LoginProvider } from "../context/LoginContext";
import { Provider as UserContext } from "../context/UserContext";
import { Provider as AdminProvider } from "../context/AdminContext";
import { Provider as AgentProvider } from "../context/AgentContext";
import AlertState from "../context/alert/AlertState";
import cookies from "next-cookies";
import Login from "./login.js";
import AdminLogin from "./admin_login.js";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "react-notifications/lib/notifications.css";
// import "../Style/Button.css";
// import "../Style/Card.css";
// import "../Style/Navbar.css";
// import "../Style/Home.css";
// import "../Style/Footer.css";
// import "../Style/Features.css";
// import "../Style/Convertor.css";
// import "../Style/Contact.css";
// import "../Style/Faq.css";
// import "../Style/Banner.css";
// import "../Style/Login.css";
// import "../Style/Transfer.css";
// import "../Style/Form.css";
// import "../Style/Operation.css";
// import "../Style/AdminSidenav.css";
// import "../Style/Button.css";
// import "../Style/Popup.css";
// import "../Style/Alert.css";

import "../Style/css/style.css";
import "../Style/css/style-responsive.css";
import "../Style/css/animate.min.css";
import "../Style/css/font-awesome.min.css";
import "../Style/css/vertical-rhythm.min.css";
import "../Style/css/et-line.css";
import "../Style/css/popup.css";
import "../Style/css/dropdown.css";
// import "../Style/magnific-popup.css";

const MyApp = ({ Component, pageProps, role }) => {
  const router = useRouter();
  let allowed = true;
  // if (router.pathname.startsWith("/admin/") && role !== "admin") {
  //   allowed = false;
  // }

  // if (router.pathname.startsWith("/login") && !role) {
  //   allowed = false;
  // }

  // if (router.pathname.startsWith("/operation") && role !== "user") {
  //   allowed = false;
  // }

  const ComponentToRender = allowed ? Component : Login;
  return (
    <AlertState>
      <AdminProvider>
        <AgentProvider>
          <LoginProvider>
            <UserContext>
              <ComponentToRender {...pageProps} />
            </UserContext>
          </LoginProvider>
        </AgentProvider>
      </AdminProvider>
    </AlertState>
  );
};

MyApp.getInitialProps = async function (ctx) {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps, role: cookies(ctx).type || "" };
};

export default MyApp;
