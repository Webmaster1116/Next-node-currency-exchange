import React from "react";
import Layout from "../../components/Admin/Layout";
import AgentView from "../../components/Agents/AgentView";
import TopNav from "../../components/Admin/topNavbar";

const profile = () => {
  return (
    <>
      <Layout>
        <div className="appear-animate">
          <TopNav />
          <AgentView />
        </div>

        <style jsx>{`
          div,
          section {
            background: white;
          }
          .min-section {
            // min-height: 83vh;
            background: white;
            background-image: url("../images/bkg-neutro.jpg") !important;
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .btn {
            background: white;
            margin: 0px;
            padding: 0px;
          }
          .min-section {
            max-height: 900vh;
            min-height: 80vh;
            overflow: auto;
            white-space: nowrap;
          }
          .page-section {
            max-height: 100vh;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default profile;
