import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <BarLoader
          css={override}
          size={10}
          color={"#77cfeb"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default AwesomeComponent;
