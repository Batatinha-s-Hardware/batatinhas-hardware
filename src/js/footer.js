/* #4527a0 */

/* Creators informations */
const creatorsNames = [
    "Caio Valdoveste", 
    "Lucas Zanesco", 
    "Rafael Santos", 
    "Ricardo Felix"
];

const creatorsgitImg = [
    "https://avatars2.githubusercontent.com/u/62577482?s=460&u=9cd418ac4c3ff1b1817567f32848c642fc5c4976&v=4",
    "Lucas Zanesco",
    "https://avatars0.githubusercontent.com/u/64908399?s=460&u=cb6bc7163c5cbf01cbe06bca0237975c0d5e2928&v=4",
    "https://avatars3.githubusercontent.com/u/68129713?s=460&u=6a039f994ea8301c13882d58a490b975eece3585&v=4"
];

const creatorsGit = [
    "https://github.com/Valdoveste", 
    "https://github.com", 
    "https://github.com/RafaelSantos1234", 
    "https://github.com/technical-student-Ricardo-Felix"
];

const containerPersonal = document.getElementById("git-collaborators-list");

var gitUsername, gitAnchor, gitImage, gitLogo; // Git variables

var containerProfile, classProfile, idProfile, contentProfile, imageProfile, nameProfile; // Profile variables

var checkbox, clock, stateCounter = 0; // Animation variables

for(let i = 0; i < 4; i++){
    /* 
        This code creates all elements 
        that will be needed, to show all 
        collaborators of the project. 
    */
    containerProfile = document.createElement("div");
    gitAnchor = document.createElement("a");
    gitImage = document.createElement("img");
    gitUsername = document.createElement("p");

    /* 
        Setting the hyper-link, image source and 
        the name of each collaborator.
    */
    gitAnchor.href = creatorsGit[i];
    gitUsername.innerText = creatorsNames[i];
    gitImage.src = creatorsgitImg[i];

    containerProfile.setAttribute("class", "collaborators");
    /* 
        Here I added id for each element,
        cuz this will be easier to create 
        the animations of fade and scale-out & in.
    */
   for(let k = 0; k < 5; k++){
       containerProfile.setAttribute("id", i);   
       gitUsername.setAttribute("id", i); 
       gitAnchor.setAttribute("id", i);   
       gitImage.setAttribute("id", i);  
    }
    
    /* Inserting the elements in the anchor and the anchor on the container. */
    gitAnchor.appendChild(gitImage);
    gitAnchor.appendChild(gitUsername);
    containerProfile.appendChild(gitAnchor);
    
    containerPersonal.appendChild(containerProfile);
}

/* Selecting all the elements I'll need. */
contentProfile = document.querySelectorAll(".collaborators a");
classProfile = document.querySelectorAll(".collaborators");
imageProfile = document.querySelectorAll(".collaborators a img");
nameProfile = document.querySelectorAll(".collaborators a p");

for(let items of classProfile){
    items.addEventListener("mouseover", (event) => {
        
        idProfile = event.target.id; // Catch the id that mouse's over.

        /* Verify if one of the contentProfile need a display change. */
        for(let items of contentProfile){
            items.addEventListener("transitionend", event => {
                if(items.offsetWidth == 35){
                    nameProfile[idProfile].style.display="none"; 
                }else if(items.offsetWidth == 180){ 
                    nameProfile[idProfile].style.display="flex";

                }
            });

            /* While the transition in running the display must be none. */ 
            items.addEventListener("transitionrun", event => { 
                for(let i = 0; i < 4; i++){
                    nameProfile[i].style.display="none";
                } 
            });
            
        }

    });
}

checkbox = document.getElementById("checkGit"); 
gitLogo = document.querySelectorAll("label[for='checkGit'] img")[0]; 

checkbox.addEventListener("click", (event) => {

    /* This part just make hover works better. */
    gitLogo.addEventListener("mouseout", eventOpacityout => { opacityChanger("0.5"); });
    gitLogo.addEventListener("mouseover", eventOpacityover => { opacityChanger("1"); });

    function opacityChanger(value){
        if(!event.target.checked && stateCounter == 0){ gitLogo.style.opacity = value; }
    }

    if(event.target.checked && stateCounter == 0){
        clock = setInterval(animationStart, 500); 
        gitLogo.style.opacity="1";
        animationStart();
    }else if(!event.target.checked && stateCounter == 4){
        clock = setInterval(animationEnd, 500);
        animationEnd(); 
    }

    /* Animation scale to 1 of each element. */
    function animationStart(){
        if(stateCounter > 3){
            clearInterval(clock);
        }else{
            contentProfile[stateCounter].style.transform = "scale(1)";
            stateCounter++;
        }
    }
        
    /* Animation scale to 0 of each element. */
    function animationEnd(){
        if(stateCounter <= 0){
            clearInterval(clock);
            gitLogo.style.opacity="0.5";
        }else{
            stateCounter--;
            contentProfile[stateCounter].style.transform = "scale(0)";
        }
    }
});

defaultState()

function defaultState(){
    checkbox.checked = false;
}



 