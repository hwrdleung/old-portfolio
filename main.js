console.log('main.js');

//Squares
var qaSquare = document.querySelector('#qa-square');
var skillsetSquare = document.querySelector('#skillset-square');
var weatherSquare = document.querySelector('#weather-square');
var currentDate = document.querySelector('#current-date');
//Views
var aboutView = document.querySelector('#about-view');
var projectsView = document.querySelector('#projects-view');
var currentView = "about";
//Clocks
var userClock = document.querySelector('#user-clock');
var hawaiiClock = document.querySelector('#hawaii-clock');
var userLocation = document.querySelector('#user-location');
//nav-btn
var floatingNavBtn = document.querySelector('#floating-nav-btn');

var month = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

var skillContent = document.querySelector('#skill-content');
var skillSlides = [
    '<h2>Skillset:</h2><ul id="skills-ul"><li>HTML5</li><li>CSS3</li><li>JAVASCRIPT</li><li>JQUERY</li><li>BOOTSTRAP</li><li>NODEJS</li><li>EXPRESSJS</li><li>MONGODB</li><li>ANGULAR</li><li>GIT</li><li>GITHUB</li><li>NODEJS</li></ul>',

    '<i class="fas fa-desktop fa-4x"></i> <i class="fas fa-mobile-alt fa-2x"></i><br><p class="skill-text">Responsive layouts automatically adjust to look great on any screen size, from mobile devices to desktop monitors.</p>',

    '<i class="fas fa-thumbs-up fa-4x"></i><br><p class="skill-text">Effective designs with seamless functionality provides users with a positive web-viewing experience.</p>',

    '<i class="fas fa-code fa-4x"></i><br><p class="skill-text">Well-documented and readable code means that it can be easily maintained by any developer, which helps to ensure that your website always stays up-to-date.</p>'
];

var GOOGLE_TIME_ZONE_API_KEY = "AIzaSyAdcSvvNlWuVrks8z6hqQqr0gjqXVtfAMU";
var newDate = new Date();
var utc = newDate.getTime(); //milliseconds since Jan 1, 1970

//Display current date in weather square
var today = new Date();
var day = today.getDate();
var monthIndex = today.getMonth(); //0 index
var year = today.getFullYear();
var fullDate = month[monthIndex] + " " + day + ", " + year;
currentDate.innerHTML = fullDate;

//Calculate Hawaii time
var RAW_OFFSET_HAWAII = -36000;
var hawaiiDate = new Date(utc + RAW_OFFSET_HAWAII);
var hawaiiHours = hawaiiDate.getHours().toString();
var hawaiiMinutes = hawaiiDate.getMinutes().toString();

getLocation();
//Get user's city name from lat and long
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocalTime);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function setLocalTime(position) {
    var localLatitude = position.coords.latitude;
    var localLongitude = position.coords.longitude;
    console.log(localLatitude, localLongitude);
    //Calculate user's Local time from lat and long and display to UI
    var GOOGLE_TIME_ZONE_API_URL = 
    'https://maps.googleapis.com/maps/api/timezone/json?location='
     + localLatitude + ','
     + localLongitude
     + '&timestamp=1521590400&key='
     + GOOGLE_TIME_ZONE_API_KEY

    $.getJSON(GOOGLE_TIME_ZONE_API_URL, function(data) {
        console.log(data);  
        console.log(data.rawOffset);  

        var localDate = new Date(utc + data.rawOffset);
        console.log('localDate', localDate);
        var localHours = localDate.getHours().toString();
        var localMinutes = localDate.getMinutes().toString();

        //Prepend 0 if length === 1
        if(localHours.length === 1){
            localHours = "0" + localHours;
        }
        if(localMinutes.length === 1){
            localMinutes = "0" + localMinutes;
        }

        var localDisplayTime = localHours + ":" + localMinutes;
        console.log('localDisplayTime', localDisplayTime);
        userClock.innerHTML = localDisplayTime;
   });

   //Get user's city name from lat and long and display to UI
   var GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyBtsKDAx9hdSnkdC7HyA_yyr3GaBGvf45s';
   var GOOGLE_GEOLOCATION_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
   + localLatitude + ','
   + localLongitude + '&key='
   + GOOGLE_GEOLOCATION_API_KEY;

   $.getJSON(GOOGLE_GEOLOCATION_API_URL, function(data) {

    var formattedAddress = data.results[3]['formatted_address'];
    localCity = formattedAddress.split(',')[0];
    localState = formattedAddress.split(',')[1];

    var location = localCity + ", " + localState;
    userLocation.innerHTML = location;
});
}

//Prepend 0 if length === 1
if(hawaiiHours.length === 1){
    hawaiiHours = "0" + hawaiiHours;
}
if(hawaiiMinutes.length === 1){
    hawaiiMinutes = "0" + hawaiiMinutes;
}

var hawaiiDisplayTime = hawaiiHours + ":" + hawaiiMinutes;
hawaiiClock.innerHTML = hawaiiDisplayTime;


//Get Aiea Weather data
var OPENWEATHER_API_KEY = 'c348dc80fa7c6ade6308b4244680e6cd';
var OPENWEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=aiea&id=524901&APPID=' 
     + OPENWEATHER_API_KEY;

// $.getJSON(OPENWEATHER_API_URL, function(data){
//     console.log(data);
//     console.log(data.main.temp);
//     var kelvins = data.main.temp;
//     var fahrenheight = kelvins * (9/5) - 459.67;
//     hawaiiTemp.innerHTML = fahrenheight.toFixed() + "&#176;F";
// });

//skill square slide transitions
var skillIndex = 0;
var skillSlideShow = setInterval(function nextSkillSlide(){
    if(skillIndex > skillSlides.length-1){
        skillIndex = 0
    }
    skillContent.innerHTML = skillSlides[skillIndex];
    skillIndex++;
}, 6000);

//qaSquare animations
var animationText = [
    "Already have a design in mind?",
    "Awesome. <br> Tell me your ideas.<br>We'll turn them into reality.",
    "No ideas for your website yet?",
    "No problem.<br> We'll figure out a solution <br>that fits your needs."
];
var animationColor = [
    "orange",
    "teal",
    "red",
    "lightblue"
];
var currentIndex = 0;
var qaSquareTimer = setInterval(function(){
    if(currentIndex > animationText.length-1){
        currentIndex = 0;
    }

    qaSquare.style.color = animationColor[currentIndex];
    qaSquare.innerHTML = "<h1>" + animationText[currentIndex] + "</h1>";
    currentIndex++;
}, 3000);

//This function handles the floating nav button by 
//adding and removingAl the 'hide' class to/from the projects view.
function switchViews(){
    var aboutDeg = "0deg";
    var projectsDeg = "180deg";
    var aboutView = document.querySelector('#about-view');

    if(currentView === "about"){
        projectsView.classList.remove('hide');
        currentView = "projects";
        floatingNavBtn.style.transform = "rotate(" + projectsDeg + ")"
        var overflowTimer = setTimeout(function(){
            aboutView.classList.add('no-overflow');
        }, 500);
        //make sure this time is the same duration as anim time in css
    }else if(currentView === "projects"){
        projectsView.classList.add('hide');
        currentView = "about";
        floatingNavBtn.style.transform = "rotate(" + aboutDeg + ")"
        var overflowTimer = setTimeout(function(){
            aboutView.classList.remove('no-overflow');
        }, 500);
    }


}

// ------------------------------------------------------
//                     PROJECTS VIEW
// ------------------------------------------------------

//projects holds all data for all projects to be diplayed to the DOM
var projects = {
    project01:{
        name: 'project01 pomodoro clock',
        currentSlide: 0,
        codepenLink: 'http://www.codepen.io',
        githubLink: 'http://www.github.com',
        images: [
            "https://images.pexels.com/photos/127512/pexels-photo-127512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "https://images.pexels.com/photos/941195/pexels-photo-941195.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?auto=compress&cs=tinysrgb&h=350",
        ],
        descriptions: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ame",
            "description01 project01",
            "description02 project01"
        ]
    },
    project02:{
        name: 'project02 calculator',
        currentSlide: 0,
        codepenLink: 'http://www.codepen.io',
        githubLink: 'http://www.quora.com',
        images: [
            "https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/126590/pexels-photo-126590.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/134074/pexels-photo-134074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "https://images.pexels.com/photos/201101/pexels-photo-201101.jpeg?auto=compress&cs=tinysrgb&h=350"
        ],
        descriptions: [
            "description00 project02 aweawdczvnxhjtukfyutjxthdgsr",
            "description01 project02",
            "description02 project02",
            "description03 project02"
        ]
    },
    project03:{
        name: 'project03 weather app',
        currentSlide: 0,
        codepenLink: 'http://www.yahoo.io',
        githubLink: 'http://www.google.com',
        images: [
            "https://images.pexels.com/photos/295047/pexels-photo-295047.png?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/925030/pexels-photo-925030.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/935890/pexels-photo-935890.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/97905/pexels-photo-97905.jpeg?auto=compress&cs=tinysrgb&h=350"
        ],
        descriptions: [
            "description00 project03 wefghawefawefawef",
            "description01 project03",
            "description02 project03",
            "description03 project03"
        ]
    },
    project04:{
        name: 'project04 weawefafawefawep',
        currentSlide: 0,
        codepenLink: 'http://www.yahoo.io',
        githubLink: 'http://www.google.com',
        images: [
            "https://images.pexels.com/photos/295047/pexels-photo-295047.png?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/925030/pexels-photo-925030.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/935890/pexels-photo-935890.jpeg?auto=compress&cs=tinysrgb&h=350",
            "https://images.pexels.com/photos/97905/pexels-photo-97905.jpeg?auto=compress&cs=tinysrgb&h=350"
        ],
        descriptions: [
            "description00 project04 awuellfkamvnjbifewu wefghawefawefawef",
            "description01 project04 awuellfkamvnjbifewu",
            "description02 project04 awuellfkamvnjbifewu",
            "description03 project04 awuellfkamvnjbifewu"
        ]
    }
}

//Initialize all projects to display:
//Projectname, its first image, and its first desciption.
var allProjects = Object.keys(projects);
console.log('allProjects', allProjects);

var titleId;
var imageId;
var descriptionId;
var githubId;
var codepenId;
var menuId;
var projectTitle;
var projectImage;
var projectDescription;
var projectMenuTitle;

for(var i=0; i<allProjects.length; i++){
    //set id's for dom elements in projects view
    titleId = '#' + allProjects[i] + '-title';
    imageId = '#' + allProjects[i] + '-img';
    descriptionId = '#' + allProjects[i] + '-description';
    githubId = '#' + allProjects[i] + '-github';
    codepenId = '#' + allProjects[i] + '-codepen';
    projectTitle = document.querySelector(titleId);
    projectImage = document.querySelector(imageId);
    projectDescription = document.querySelector(descriptionId);
    projectGithub = document.querySelector(githubId);
    projectCodepen = document.querySelector(codepenId);
    //Set all project DOM elements to first slide
    projectTitle.innerHTML = projects[allProjects[i]].name;
    projectImage.src = projects[allProjects[i]].images[0];
    projectDescription.innerHTML = projects[allProjects[i]].descriptions[0];
    projectGithub.href = projects[allProjects[i]].githubLink;
    projectCodepen.href = projects[allProjects[i]].codepenLink;
    //Set project names for the right nav menu
    menuId = '#' + allProjects[i] + '-menu-title';
    projectMenuTitle = document.querySelector(menuId);
    projectMenuTitle.innerHTML = projects[allProjects[i]].name;
}

//User clicks left arrow button on a project
function projectNavLeft(project){
    console.log('projectNavLeft() for ', project);

    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var projectImg = document.querySelector(imgId);
    var projectDescription = document.querySelector(descriptionId);

    //Set currentSlide to correct index
    projects[project].currentSlide--;
    if(projects[project].currentSlide < 0){
        projects[project].currentSlide = projects[project].descriptions.length-1;
    }

    //Change dom element to images[currntSlide] and desciptions[currentSlide]
    var currentSlide = projects[project].currentSlide; //For readability
    projectImg.src = projects[project].images[currentSlide];
    projectDescription.innerHTML = projects[project].descriptions[currentSlide];
}

//User clicks right arrow button on a project
function projectNavRight(project){
    console.log('projectNavRight() for ', project);
    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var projectImg = document.querySelector(imgId);
    var projectDescription= document.querySelector(descriptionId);

    //Set currentSlide to correct index
    projects[project].currentSlide++;
    if(projects[project].currentSlide > projects[project].descriptions.length-1){
        projects[project].currentSlide = 0;
    }

    //Change dom element to images[currntSlide] and desciptions[currentSlide]
    var currentSlide = projects[project].currentSlide; //For readability
    projectImg.src = projects[project].images[currentSlide];
    projectDescription.innerHTML = projects[project].descriptions[currentSlide];
}