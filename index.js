import { query } from "./query.js";
import { API_KEY } from "./accessToken.js";



const data = { query };



const profileBtn = document.querySelector('.profile-btn')
const createNewBtn = document.querySelector('.create-btn')
const createDropdown = document.querySelector("#create-new")
const profileDropdown = document.querySelector("#profile")
const profileImage = document.querySelector(".avatar");
const name = document.querySelector(".side-section__name")
const userName = document.querySelector(".side-section__username");
const bio = document.querySelector(".side-section__bio");
const number = document.querySelector(".number");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const repoList = document.querySelector(".main-section__repolist");
const navbar = document.querySelector("#navbar");
const secondaryNavbar = document.querySelector(".secondary-nav");
const bigAvatar = document.querySelector(".avatar-holder")
const stickyInfo = document.querySelector(".sticky-info__hidden")
const stickyNav = navbar.offsetTop;
const stickyAvatar = bigAvatar.offsetTop;
 


window.onscroll = function() {
  stickIt(stickyInfo,23*stickyAvatar,"sticky-avatar","sticky-info","sticky-info__hidden");
  stickIt(navbar,stickyNav,"sticky-nav",'secondary-nav-offset','secondary-nav')
}



// Add the sticky class to the navbar when it reaches its scroll position. Remove "sticky" when it leaves the scroll position
function stickIt(elementToStick,offsetPosition,classToAdd,nextClassToAdd,classToRemove) {
  if (window.pageYOffset >= offsetPosition) {
    elementToStick.classList.add(classToAdd);
    elementToStick.classList.remove(classToRemove);
    elementToStick.classList.add(nextClassToAdd)
    
  } else {
    elementToStick.classList.remove(classToAdd);
    elementToStick.classList.add(classToRemove)
    elementToStick.classList.remove(classToAdd);
  }
}



fetch(`https://api.github.com/graphql`, {
  method: "POST",
  headers: {
    "Authorization": `bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => {


    removeAllChildNodes(repoList);

    let apiResponse = data.data.viewer;
   

    profileImage.setAttribute("src", apiResponse.avatarUrl);
    name.textContent = apiResponse.name;
    userName.textContent = apiResponse.login;
    bio.textContent = apiResponse.bio;
    number.textContent=apiResponse.repositories.nodes.length


    apiResponse.repositories.nodes.forEach(
      (repo) => addChildNode(repo)
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const addChildNode = (repo) => {
  var repository = document.createElement("div");
  repository.className = "repo-content";

  var left = document.createElement("div");
  left.className = "repo-left";

  var right = document.createElement("div");
  right.className = "repo-right";

  var h2 = document.createElement("h2");
  h2.className = "repo-name";
  var h2TextNode = document.createTextNode(repo.name);
  h2.appendChild(h2TextNode);

  var p = document.createElement("p");
  p.className = "repo-summary";
  var pTextNode = document.createTextNode(repo.description ?? "");
  p.appendChild(pTextNode);

  var small = document.createElement("small");
  small.className = "update";
  var smallTextNode = document.createTextNode('Updated on ' + getDate(repo.updatedAt));
  small.appendChild(smallTextNode);
  
  var tool = document.createElement('span');
  tool.className = "tool";
  var toolTextNode = document.createTextNode(repo.languages.nodes[0] == undefined ? "JavaScript": repo.languages.nodes[0].name)
  tool.appendChild(toolTextNode) 

  
  var toolColor = document.createElement('div');
  toolColor.className = "circle";
  toolColor.style.backgroundColor = repo.languages.nodes[0] == undefined ? "#f1e05a" : repo.languages.nodes[0].color;



  var star = document.createElement("img")
  star.src="./images/star.svg"
  star.className = "repo-icon";

  var btn = document.createElement("button");
  btn.className = "star";
  var btnTextNode = document.createTextNode(` Star`);
  btn.appendChild(star);
  btn.appendChild(btnTextNode);

  left.appendChild(h2);
  left.appendChild(p);
  left.appendChild(toolColor)
  left.appendChild(tool)
  left.appendChild(small);
  

  right.appendChild(btn);

  repository.appendChild(left);
  repository.appendChild(right);

  repoList.appendChild(repository);
}

const getDate = (dateString) => {
  var targetDate = new Date(dateString).toDateString();
  return targetDate.split(' ').slice(1,3).join(' ')
  
} 

hamburgerMenu.addEventListener('click',()=>{
dropdown(mobileMenu)
})

const dropdown = (button) =>{
  if(button.style.display === "none"){
    button.style.display = "block";
  }
  else{
    button.style.display = "none";
  }
}

profileBtn.addEventListener('click',()=>{
  dropdown(profileDropdown)
})
createNewBtn.addEventListener('click',()=>{
  dropdown(createDropdown)
})