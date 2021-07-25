import React from "react";
import Layout from "../components/Layout";
import ProfileView from "../components/Operation/ProfileView";
import TopNav from "../components/Operation/TopNav";

const profile = () => {
  return (
    <>
      <Layout>
        {/* <div className="appear-animate"> */}
        <div className="appear-animate">
          <TopNav />
          {/* <NewOperation data={props} /> */}
          <ProfileView />
        </div>

        <style jsx>{`
          div,
          section {
            background: white;
          }
        `}</style>
        {/* </div> */}
      </Layout>
    </>
  );
};

export default profile;
