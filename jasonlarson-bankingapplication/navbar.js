function NavBar(){
  function makeActive(e) {
    let activeNavLink = document.querySelector('#navbarNav a.active');
    activeNavLink.classList.remove('active');
    e.currentTarget.classList.add('active');
  }

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BadBank</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <a className="nav-item nav-link active" id="homelink" href="#" onClick={makeActive}>Home</a>
            <a className="nav-item nav-link" id="createlink" href="#/CreateAccount/" onClick={makeActive}>Create Account</a>
            <a className="nav-item nav-link" id="loginlink" href="#/Login/" onClick={makeActive}>Login</a>
            <a className="nav-item nav-link" id="depositlink" href="#/Deposit/" onClick={makeActive}>Deposit</a>
            <a className="nav-item nav-link" id="withdrawlink" href="#/Withdraw/" onClick={makeActive}>Withdraw</a>
            <a className="nav-item nav-link" id="alldatalink" href="#/AllData/" onClick={makeActive}>All Data</a>
          </div>
        </div>
      </nav>
    </>
  );
}