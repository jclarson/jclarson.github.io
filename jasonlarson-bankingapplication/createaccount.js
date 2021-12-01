function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if (label === 'email' && !field.includes('@')) {
      setStatus('Error: email address invalid');
      setTimeout(() => setStatus(''),3000);
      return false;
    }

    if (label === 'password' && field.length < 8) {
      setStatus('Error: password must be at least 8 characters');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    ctx.users.push({name,email,password,balance:100,loggedIn:false, transactions:[{date:(new Date()).toLocaleDateString(), type:"Gift", amount:100}]});
    setShow(false);
  }    

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  function handleChange(e) {
    if (e.currentTarget.id == 'name') {setName(e.currentTarget.value); console.log(`name is ${name}`);}
    else if (e.currentTarget.id == 'email') setEmail(e.currentTarget.value);
    else if (e.currentTarget.id == 'password') setPassword(e.currentTarget.value);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
        <>
          Name<br/>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
          Password<br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" id="create" onClick={handleCreate} disabled={!name && !email && !password}>Create Account</button>
        </>
      ):(
        <>
          <h5>Success!</h5>
          Welcome to your new banking home.<br/>
          As a special gift, we've deposited $100 into your account.<br/>
          Would you like to create another account?<br/>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
        </>
      )}
    />
  )
}