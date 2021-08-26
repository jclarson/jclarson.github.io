addFooterInfo();
let menuDiv = document.querySelector('.flex-menu');

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
  let pageName = getPageName();
  let pageTitle = document.title.toLowerCase();
  link.href = `${id.toLowerCase()}.html`;
  link.innerText = id;
  div.className = 'menuchoice'
  div.id = id.toLowerCase();
  if ((pageName.toLowerCase() == id.toLowerCase()) || (pageTitle == 'portfolio for jason larson' && (id.toLowerCase() == 'home')) || ((pageName.toLowerCase() == 'index') && (id.toLowerCase() == 'home'))) {
    div.className += ' active'
  }
  if (id == 'Home') link.href = 'index.html';
  div.appendChild(link);
  menuDiv.appendChild(div);
}

function addFooterInfo() {
  let footer = document.querySelector(".flex-footer");
  footer.textContent = 'Contact me:';
  let link = createLink('https://www.linkedin.com/in/jason-larson-711284123')
  footer.appendChild(link)
  let linktxt = '<svg class="smicon" xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">';
  linktxt += '<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0';
  linktxt += ' 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822';
  linktxt += ' 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0';
  linktxt += ' 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1';
  linktxt += ' .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>';
  link.innerHTML = linktxt;
  addLink('https://www.facebook.com/JasonCLarson','./f_logo_RGB-Blue_58.png', 'facebook logo');
  addLink('https://github.com/jclarson', './github.png', 'github logo')
  
}

function addLink(href, imgsrc, imgalt) {
  let footer = document.querySelector(".flex-footer");
  let link = createLink(href);
  footer.appendChild(link);
  createImg(imgsrc, imgalt, link);
}

function createLink(href) {
  let link = document.createElement('a');
  link.href = href;
  return link;
}

function createImg(src, alt, link) {
  let img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = 'smicon';
  link.appendChild(img);
}