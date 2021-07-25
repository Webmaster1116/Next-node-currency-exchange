import React from "react";
import Layout from "../components/Layout";
import History from "../components/Operation/History";
import TopNav from "../components/Operation/TopNav";

const history = () => {
  return (
    <>
      <Layout>
        {/* <div className="appear-animate"> */}
        <div className="appear-animate">
          <TopNav />
          <History />
        </div>

        <style jsx>{`
          //   div,
          //   section {
          //     background: white;
          //   }
        `}</style>
        {/* </div> */}
      </Layout>
    </>
  );
};
export default history;
