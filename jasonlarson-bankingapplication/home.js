function Home(){
  const ctx = React.useContext(UserContext);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [show, setShow]         = React.useState(false);
  const [user, setUser]         = React.useState({});
  
  React.useEffect(() => {
    getLoggedInUser();
  })

  function getLoggedInUser(){
    for (let i = 0; i < ctx.users.length; i++) {
      if (ctx.users[i].loggedIn) {
          setUser(ctx.users[i]);
          setStatus(`Current user: ${ctx.users[i].email}`);
          setShow(true);
          return;
      }
    }
    setStatus('no user is currently logged in');
    setShow(false);
}

// function makeActive(e) {
//   let activeNavLink = document.querySelector('nav a.active');
//   if (activeNavLink) activeNavLink.classList.remove('active');
//   let page = `#${e.value}link`
//   let newActiveNavLink = document.querySelector(page);
//   if (newActiveNavLink) newActiveNavLink.classList.add('active');
// }

return (
    <Card
      status={status}
      bgcolor="primary"
      txtcolor="white"
      header="BadBank Landing Page"
      title="Welcome to Bad Bank"
      text="We are Bad to the bone!"
      body={show ? (
        <>
          Welcome back, {user.name}!
          <img src="bank.png" className="img-fluid" alt="Responsive image" />
        </>
        ) : (
        <>
          <a href="#/Login/" className="cardlink" value="login">Login</a> or <a href="#/CreateAccount/" className="cardlink">Create a new Account!</a>
          <img src="bank.png" className="img-fluid" alt="Responsive image" />
        </>
      )}
    />
    // <h1>Home<br/>
    //   {JSON.stringify(ctx)};
    // </h1>
  );  
}
