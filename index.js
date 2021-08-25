let menuDiv = document.querySelector('.flex-menu');
console.log(menuDiv)
let title = document.title;
let pageName = getPageName();
console.log(`pagename is ${pageName}`);
console.log(`title is ${title}`);

addMenuItem('Home');
addMenuItem('Projects');
addMenuItem('Repositories');

function getPageName() {
  let url = document.baseURI;
  let pageUrl = url.split('/');
  return pageUrl[pageUrl.length - 1].split('.')[0];
}

function addMenuItem(id) {
  let div = document.createElement('div');
  let link = document.createElement('a');
  link.href = `${id.toLowerCase()}.html`;
  link.innerText = id;
  div.className = 'menuchoice'
  div.id = id.toLowerCase();
  if ((pageName.toLowerCase() == id.toLowerCase()) || ((pageName.toLowerCase() == 'index') && (id.toLowerCase() == 'home'))) {
    div.className += ' active'
  }
  if (id == 'Home') link.href = 'index.html';
  div.appendChild(link);
  menuDiv.appendChild(div);
}