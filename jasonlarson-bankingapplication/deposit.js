function Deposit() {
  const ctx = React.useContext(UserContext);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [show, setShow]         = React.useState(true);
  const [balance, setBalance]   = React.useState(0);
  const [user, setUser]         = React.useState({});
  const [deposit, setDeposit]   = React.useState(0);
  
  React.useEffect(() => {
    getLoggedInUser();
  })

  function getLoggedInUser(){
    for (let i = 0; i < ctx.users.length; i++) {
      if (ctx.users[i].loggedIn) {
          setUser(ctx.users[i]);
          console.log(`ID of logged in user: ${i}`);
          setShow(true);
          return;
      }
    }
    console.log('no logged in user');
    setShow(false);
}

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      setDeposit(0);
      return false;
    }
    if (!parseFloat(field.value)) {
      setStatus(`Error: value entered (${field.value}) was not a number`);
      field.value = ''
      setDeposit(0);
      return false;
    }
    if (parseFloat(field.value) < 0) {
      setStatus(`Error: value entered (${field.value}) was a negative number.  Perhaps you should try the Withdraw page?`);
      field.value = ''
      setDeposit(0);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(depositField, 'deposit')) return;
    console.log(`handling Deposit for ${user.email}: initial balance: ${user.balance}, deposit amount: ${depositField.value}`);
    user.balance = parseFloat(user.balance) + parseFloat(depositField.value);
    setBalance(user.balance);
    setStatus(`Successfully deposited $${depositField.value}`);
    user.transactions.push({date:(new Date()).toLocaleDateString(), type:"Deposit", amount:depositField.value})
    console.log(`new balance is ${user.balance}`);
    depositField.value = '';
    setDeposit(0);
    //setShow(false);
  }    

  // function handleChange(e) {
  //   setDeposit(depositField.value);
  // }

  // function clearForm() {
  //   setEmail('');
  //   setPassword('');
  //   setShow(true);
  // }

  return (
    <Card
      bgcolor="chartreuse"
      txtcolor="black"
      header="Deposit"
      status={status}
      body={show ? (  
        <>
          Logged In User: {user.email}<br/>
          Balance: ${user.balance}<br/>
          Deposit Amount
          <input type="input" className="form-control" id="depositField" placeholder="Deposit Amount" onChange={e => setDeposit(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" id="depositButton" onClick={handleDeposit} disabled={!deposit}>Deposit</button>
        </>
      ):(
        <>
          <h5>No user logged in</h5>
          <a className="btn btn-light" href="#/Login/">Go to Login</a>
        </>
      )}
    />
  )
}