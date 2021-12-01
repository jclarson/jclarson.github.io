function Spa() {
  return (
    <>
    <NavBar/>
    <HashRouter>
      <UserContext.Provider value={{users:[{name: 'Abel Sanchez', email: 'abel@mit.edu', password: 'secret12', balance: 100, loggedIn: false, transactions: [{"date":"11/20/2021","type":"Gift","amount":"100"}]},
                                           {name: 'Jason L', email: 'j@mit.edu', password: '12345678', balance: 200, loggedIn: false, transactions: [{"date":"12/1/2021","type":"Gift","amount":"100"},{"date":"12/1/2021","type":"Deposit","amount":"150"},{"date":"12/1/2021","type":"Withdrawal","amount":"50"}]},
                                           {name: 'John Doe', email: 'jd@email.com', password: 'password', balance: 425, loggedIn: false, transactions: [{"date":"11/29/2021","type":"Gift","amount":"100"},{"date":"11/29/2021","type":"Deposit","amount":"400"},{"date":"11/30/2021","type":"Withdrawal","amount":"25"},{"date":"12/1/2021","type":"Withdrawal","amount":"50"}]}]
                                  }}>
        <Route path="/" exact component={Home} />
        <Route path="/CreateAccount/" component={CreateAccount} />
        <Route path="/login/" component={Login} />
        <Route path="/deposit/" component={Deposit} />
        <Route path="/withdraw/" component={Withdraw} />
        <Route path="/balance/" component={Balance} />
        <Route path="/alldata/" component={AllData} />
      </UserContext.Provider>
    </HashRouter>
    </>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
