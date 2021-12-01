function Login(){
  const ctx = React.useContext(UserContext);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow]         = React.useState(true);
  const [user, setUser]         = React.useState({});
  //const [loggedIn, setLoggedIn] = React.useState(true);

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
          setShow(false);
          return;
      }
    }
    console.log('no logged in user');
    setShow(true);
}

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handleLogin(){
    console.log(`handling login for ${email} using ${password}`);
    //debugger
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    for (let user of ctx.users) {
      if (user.email == email) {
        if (user.password == password) {
          setStatus('Login Successful');
          user.loggedIn = true;
          setShow(false);
          console.log('Login Successful');
          return;
        }
        console.log('Error: bad password');
        return setStatus('Error: bad password');
      }
    }
    setStatus('Error: user not found');
    console.log('Error: user not found');
  }    

  function clearForm(){
    setEmail('');
    setPassword('');
    user.loggedIn = false;
    setUser('');
    //setLoggedIn(false);
    setShow(true);
  }

  return (
    <Card
      bgcolor="orange"
      txtcolor="black"
      header="Login to Account"
      status={status}
      body={show ? (  
        <>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
          Password<br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
        </>
      ):(
        <>
          <h5>Logged in user: {user.email}</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
        </>
      )}
    />
  )
}