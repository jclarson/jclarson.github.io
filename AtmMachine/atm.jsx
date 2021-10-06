const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid, errorMessage }) => {
  //console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      {
        atmMode && <div>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
        </div>
      }
      {
        !isValid && <div className="error">{errorMessage}</div>
      }
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  let status = `Account Balance $${totalState} `;
  //console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    //console.log(`handleChange ${event.target.value}`);
    if (event.target.value <= 0) {
      setErrorMessage("Amount must be a positive number.  Perhaps you were attempting to perform a different action?")
      setValidTransaction(false);
      return;
    }
    if (atmMode == "Cash Back" && event.target.value > totalState) {
      setErrorMessage(`Cash Back amount too high.  You only have $${totalState} in your account.`);
      setValidTransaction(false);
      return
    }
    setValidTransaction(true);
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    //setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    if (event.target.value == "Deposit") setIsDeposit(true);
    if (event.target.value == "Cash Back") setIsDeposit(false);
    setAtmMode(event.target.value);
//    console.log(`selection is ${event.target.value}`);
//    console.log(`atmMode is ${atmMode}`);
//    console.log(`isDeposit is set to ${isDeposit}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <p>Select an action below to continue.</p>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={validTransaction} errorMessage={errorMessage}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
