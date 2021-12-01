function Balance() {
  const ctx = React.useContext(UserContext);
  const [show, setShow]         = React.useState(true);
  const [user, setUser]         = React.useState({});
  
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

  return (
    <Card
      bgcolor="lightpurple"
      txtcolor="black"
      header="Balance"
      body={show ? (  
        <>
          Logged In User: {user.email}<br/>
          Balance: ${user.balance}<br/>
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