function AllData() {
  const ctx = React.useContext(UserContext);
  const [body, setBody] = React.useState('');

  // React.useEffect(() => {
  //   getBody();
  // })

  // function getTransactions(ut) {
  //   if (!ut.length) return " None";
  //   let html = '<li>';
  //   for (let trans of ut) {
  //     html += `Date: ${trans.date}<br />`;
  //   }
  //   html += '</li>';
  //   return html;
  // }

  function getHeader(user) {
    return `Transactions for ${user.email}`
  }

  //{JSON.stringify(ctx)};
  return (
    <div>
    <Card
      maxwidth='80%'
      info="alldata"
      bgcolor="secondary"
      header="All User Data"
      body={
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Logged In</th>
          </tr>
          </thead>
          <tbody>
          {ctx.users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>${user.balance}</td>
              <td>{user.loggedIn ? "Yes" : "No"}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      }
    />
        {ctx.users.map((user, i) => (
    <Card
      maxwidth='25rem'
      bgcolor="info"
      txtcolor="dark"
      header={getHeader(user)}
      key = {i}
      body={
      <>
        Balance: ${user.balance}<br/>
        Transactions:
        <table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            {user.transactions.map((trans, j) => (
            <tr key={j}>
              <td>{trans.date}</td>
              <td>{trans.type}</td>
              <td>${trans.amount}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </>
      }
    />
    ))};  
    </div>
  )
}
// {user.transactions.map((t, j) => (
//   <li key={j}>
//     Date: {t.date}<br/>
//     Type: {t.type}<br/>
//     Amount: {t.amount}<br/>
//   </li>
// ))}
