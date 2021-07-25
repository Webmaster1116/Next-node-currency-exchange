import React, { useState, useEffect } from "react";
import { FcRefresh } from "react-icons/fc";
import { Dropdown } from "react-bootstrap";

// import "../../Style/Convertor.css";
// import "../../Style/Button.css";

const Convertor = (props) => {
  const [exchangeRate, setExchangeRate] = useState(props.data.soles); // props.data.bpi.USD.rate_float
  const [fromCurrency, setFromCurrency] = useState("Dollars");
  const [toCurrency, setToCurrency] = useState("Soles");

  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    if (fromCurrency == "Dollars" && toCurrency == "Soles") {
      setExchangeRate(props.data.soles);
    }
    if (fromCurrency == "Dollars" && toCurrency == "Bitcoin") {
      setExchangeRate(1 / props.data.bpi.USD.rate_float);
    }
    if (fromCurrency == "Dollars" && toCurrency == "Dollars") {
      setExchangeRate(1);
    }
    if (fromCurrency == "Soles" && toCurrency == "Soles") {
      setExchangeRate(1);
    }
    if (fromCurrency == "Soles" && toCurrency == "Bitcoin") {
      setExchangeRate(
        (1 / props.data.bpi.USD.rate_float) * (1 / props.data.soles)
      );
    }
    if (fromCurrency == "Soles" && toCurrency == "Dollars") {
      setExchangeRate(1 / props.data.soles);
    }
    if (fromCurrency == "Bitcoin" && toCurrency == "Soles") {
      setExchangeRate(props.data.soles * props.data.bpi.USD.rate_float);
    }
    if (fromCurrency == "Bitcoin" && toCurrency == "Bitcoin") {
      setExchangeRate(1);
    }
    if (fromCurrency == "Bitcoin" && toCurrency == "Dollars") {
      setExchangeRate(props.data.bpi.USD.rate_float);
    }
  }, [fromCurrency, toCurrency]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
      setAmountInFromCurrency(true);
    }
  }

  function handleToAmountChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
      setAmountInFromCurrency(false);
    }
  }

  return (
    <div className="converter w-100">
      <div className="col-3" />
      <input
        className="converter-input p-2"
        name=""
        value={fromAmount}
        type="text"
        onChange={handleFromAmountChange}
      />
      <Dropdown className="drop btn convertor-btn">
        <Dropdown.Toggle id="dropdown-basic">{fromCurrency}</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setFromCurrency("Dollars")}
          >
            Dollars
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setFromCurrency("Soles")}
          >
            Soles
          </Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>

      <div className="col-3" />
      <input
        className="converter-input p-2"
        name=""
        value={toAmount}
        type="text"
        onChange={handleToAmountChange}
      />

      <Dropdown className="drop btn convertor-btn">
        <Dropdown.Toggle id="dropdown-basic">{toCurrency}</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setToCurrency("Soles")}
          >
            Soles
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setToCurrency("Dollars")}
          >
            Dollars
          </Dropdown.Item>

          
        </Dropdown.Menu>
      </Dropdown>
      {/* </div> */}

      <button className="mt-5 btn outline-btn text-uppercase">
        Inicia tu operación
      </button>
      <style jsx>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .converter {
          margin-top: 150px;
          background: transparent;
          padding: 30px;
          min-width: 320px;
          border-radius: 25px;
          text-align: center;
        }
        .outline-btn {
          width: 300px;
          color: white;
        }

        label {
          padding: 10px;
          font-weight: 700;
        }
        .converter-input {
          color: black;
          background: #d8dcdf;
          border: none;
          border-bottom: 2px teal solid;
          margin-bottom: 20px;
          margin-top: 10px;
          width: 100px;
          border-radius: 0px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          width: 200px;
        }

        input::placeholder {
          color: black;
        }

        button {
          border-radius: 20px;
          color: white;
          background-color: teal;
        }
        button:hover {
          background-color: #47b0b0;
          color: white;
        }

        .btn-success {
          background-color: #0d1350 !important;
          border-color: #25bcbe !important;
        }

        .convertor-btn {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export default Convertor;
