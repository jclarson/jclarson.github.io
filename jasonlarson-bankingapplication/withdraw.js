function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [status, setStatus]         = React.useState('');
  const [email, setEmail]           = React.useState('');
  const [show, setShow]             = React.useState(true);
  const [balance, setBalance]       = React.useState(0);
  const [user, setUser]             = React.useState({});
  const [withdrawal, setWithdrawal] = React.useState(0);
  
  React.useEffect(() => {
    getLoggedInUser();
    if (show) {
      console.log(`in useeffect: user is: ${user.email}`);
    }
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
      setWithdrawal(0)
      return false;
    }
    if (!parseFloat(field.value)) {
      setStatus(`Error: value entered (${field.value}) was not a number`);
      field.value = ''
      setWithdrawal(0);
      return false;
    }
    if (parseFloat(field.value) < 0) {
      setStatus(`Error: value entered (${field.value}) was a negative number.  Perhaps you should try the Deposit page?`);
      field.value = ''
      setWithdrawal(0);
      return false;
    }
    if (parseFloat(field.value) > user.balance) {
      setStatus(`Error: Withdrawal amount (${field.value}) exceeds balance`)
      field.value = ''
      setWithdrawal(0);
      return false;
    }
    return true;
  }

  function handleWithdrawal() {
    if (!validate(withdrawField, 'withdraw')) return;
    let wdAmount = withdrawField.value;
    console.log(`handling Withdrawal for ${user.email}: initial balance: ${user.balance}, withdrawal amount: ${wdAmount}`);
    setWithdrawal(wdAmount);
    user.balance = parseFloat(user.balance) - parseFloat(wdAmount);
    setStatus(`Successfully withdrew $${wdAmount}`);
    user.transactions.push({date: (new Date()).toLocaleDateString(), type:"Withdrawal", amount:wdAmount})
    console.log(`new balance is ${user.balance}`);
    withdrawField.value = '';
    setWithdrawal(0)
    //setShow(false);
  }    

  return (
    <Card
      bgcolor="powderblue"
      txtcolor="black"
      header="Withdraw"
      status={status}
      body={show ? (  
        <>
          Logged In User: {user.email}<br/>
          Balance: ${user.balance}<br/>
          Withdrawal Amount
          <input type="input" className="form-control" id="withdrawField" placeholder="Withdrawal Amount" onChange={e => setWithdrawal(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" onClick={handleWithdrawal} disabled={!withdrawal}>Withdraw</button>
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