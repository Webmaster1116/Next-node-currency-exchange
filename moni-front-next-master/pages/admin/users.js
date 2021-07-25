import React from "react";
import Layout from "../../components/Admin/Layout";
import Users from "../../components/Admin/users";
import Navbar from "../../components/Admin/topNavbar";

const users = () => {
  return (
    <Layout>
      <Navbar />
      <Users />
    </Layout>
  );
};

export default users;
