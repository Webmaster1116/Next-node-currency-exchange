import React from "react";
import Dashboard from "../../components/Admin/dashboard";
import SideNavbar from "../../components/Admin/sideNavbar";
import Layout from "../../components/Admin/Layout";

const admin_dashboard = () => {
  return (
    <Layout>
      <SideNavbar />
      <Dashboard />
    </Layout>
  );
};

export default admin_dashboard;
