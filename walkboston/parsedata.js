let html = '';
let container = document.getElementById('container');
let allEmployeesContainer;

addDiv('sixFigures');
addDiv('topEarners');
addDiv('allEmployees');

allEmployeesContainer = document.getElementById('allEmployees');

function renderData(city, sixFigures) {
  let people = city.data;
  let topFiveEarners = [];
  let topEarnersData = '';
  let topEarnerHtml = '';
  let topEarners = [];
  let topEarnersDiv;
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  function checkSalary(person) {
    return person[11] > 100000;
  }

  topEarners = people.filter(checkSalary);
  for (let earner of topEarners) {
    let salary = formatter.format(earner[11]);
    let totalEarnings = formatter.format(earner[18]);
    let splitName = earner[8].split(',');
    let earnerName = splitName[1] + ' ' + splitName[0];
    html += '<tr><td>' + earnerName + '</td>' +
      '<td>' + salary + '</td>' +
      '<td>' + totalEarnings + '</td></tr>';
  }

  sixFigures.innerHTML = '<h1>Number of people working in Boston earning over $100,000 is ' + topEarners.length + '.</h1>';
  topEarners.sort((a,b) => {return (Number(b[11]) + Number(b[14])) - (Number(a[11]) + Number(a[14]))});
  topFiveEarners = topEarners.slice(0,5);

  for (let earning of topFiveEarners) {
    let earned = formatter.format(Number(earning[11]) + Number(earning[14]));
    let splitName = earning[8].split(',');
    let earnerName = splitName[1] + ' ' + splitName[0];
    topEarnerHtml += '<tr><td>' + earnerName + '</td><td>' + earned + '</td></tr>';
  }

  topEarnersData = '<h2>Top 5 Earners:</h2><table><tr><th>Name</th><th>Total Earned</th></tr>' + topEarnerHtml + '</table>';
  topEarnersDiv = document.getElementById('topEarners');
  topEarnersDiv.innerHTML = topEarnersData;
  }
  
renderData(boston, document.getElementById('sixFigures'));

function addDiv(id) {
  let div = document.createElement('div');
  div.id = id;
  document.getElementsByTagName('body')[0].appendChild(div);
}

function hideAllEarnings() {
allEmployeesContainer.innerHTML = '<br><table><tr><td style = "font-size: 24px"><b>All Employee Earnings:</b></td>' +
  '<td style = "vertical-align:middle" onclick = showAllEarnings()>Click here to show</td></tr></table>';
}

function showAllEarnings() {
allEmployeesContainer.innerHTML = '<br><table><tr><td style = "font-size: 24px"><b>All Employee Earnings:</b></td>' +
  '<td style = "vertical-align:middle" onclick = hideAllEarnings()>Click here to hide</td></tr></table>' + 
  '<table><tr><th>Name</th><th>Regular Salary</th><th>Total Earnings</th></tr>' + html + '</table>';
}
  
hideAllEarnings();