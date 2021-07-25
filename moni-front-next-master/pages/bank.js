import React from "react";
import Layout from "../components/Layout";
import BankView from "../components/Operation/BankAccounts";
import TopNav from "../components/Operation/TopNav";

const bank = (props) => {
  return (
    <>
      <Layout>
        <div className="appear-animate">
          <TopNav />
          <BankView />
        </div>

        <style jsx>{`
          div,
          section {
            background: white;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default bank;
