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

    $.getJSON(GOOGLE_TIME_ZONE_API_URL, function (data) {
        console.log(data);
        console.log(data.rawOffset);

        var localDate = new Date(utc + data.rawOffset);
        console.log('localDate', localDate);
        var localHours = localDate.getHours().toString();
        var localMinutes = localDate.getMinutes().toString();

        //Prepend 0 if length === 1
        if (localHours.length === 1) {
            localHours = "0" + localHours;
        }
        if (localMinutes.length === 1) {
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

    $.getJSON(GOOGLE_GEOLOCATION_API_URL, function (data) {

        var formattedAddress = data.results[3]['formatted_address'];
        localCity = formattedAddress.split(',')[0];
        localState = formattedAddress.split(',')[1];

        var location = localCity + ", " + localState;
        userLocation.innerHTML = location;
    });
}

//Prepend 0 if length === 1
if (hawaiiHours.length === 1) {
    hawaiiHours = "0" + hawaiiHours;
}
if (hawaiiMinutes.length === 1) {
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
var skillSlideShow = setInterval(function nextSkillSlide() {
    if (skillIndex > skillSlides.length - 1) {
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
var qaSquareTimer = setInterval(function () {
    if (currentIndex > animationText.length - 1) {
        currentIndex = 0;
    }

    qaSquare.style.color = animationColor[currentIndex];
    qaSquare.innerHTML = "<h1>" + animationText[currentIndex] + "</h1>";
    currentIndex++;
}, 3000);

//This function handles the floating nav button by 
//adding and removingAl the 'hide' class to/from the projects view.
function switchViews() {
    var aboutDeg = "0deg";
    var projectsDeg = "180deg";
    var aboutView = document.querySelector('#about-view');

    var projectsNavTitleContainer = document.querySelector('#projects-nav-title-container');
    var projectsMenu = document.querySelector('#projects-menu');

    if (currentView === "about") {
        projectsView.classList.remove('hide');
        currentView = "projects";
        floatingNavBtn.style.transform = "rotate(" + projectsDeg + ")";
        $('html,body').scrollTop(0);

        projectsNavTitleContainer.style.display = "grid";
        projectsMenu.style.display = "inline";

        var overflowTimer = setTimeout(function () {
            aboutView.classList.add('no-overflow');
        }, 500);
        //make sure this time is the same duration as anim time in css
    } else if (currentView === "projects") {
        projectsView.classList.add('hide');
        currentView = "about";
        floatingNavBtn.style.transform = "rotate(" + aboutDeg + ")"

        projectsNavTitleContainer.style.display = "none";
        projectsMenu.style.display = "none";

        var overflowTimer = setTimeout(function () {
            aboutView.classList.remove('no-overflow');
        }, 500);
    }
}


// ------------------------------------------------------
//                     PROJECTS VIEW
// ------------------------------------------------------

//projects object holds all data for all projects to be diplayed to the DOM
//Each image index corresponds to its respective descriptions index.  
//For example: image[0] is the image for descriptions[0].
//Changing the name here for a project will automatically change the DOM project title and menu title.

var projects = {
    project01: {
        name: 'Nitelife Coordination App',
        currentSlide: 0,
        codepenLink: '',
        githubLink: 'https://github.com/hwrdleung/nightlife',
        images: [
            "./images/nitelife01.jpg",
            "./images/nitelife02.jpg",

        ],
        descriptions: [
            "This is a full-stack MEAN application." ,
            "Features registration and login system with data and form validations, and a user dashboard that remembers the user's last-searched location."
        ]
    },
    project02: {
        name: 'Javascript Calculator',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/pen/gXaddJ',
        githubLink: '',
        images: [
            "./images/calculator01.jpg"
        ],
        descriptions: [
            "This is a Javascript calcalutor built from scratch."
        ]
    },
    project03: {
        name: 'Random Quote Generator',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/pen/JrzoWM',
        githubLink: '',
        images: [
            "./images/quotes01.jpg"
        ],
        descriptions: [
            "This is a random quote generator that makes use of an external API."
        ]
    },
    project04: {
        name: 'Twitch Viewer',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/pen/EbxgqB',
        githubLink: '',
        images: [
            "./images/twitch01.jpg"
        ],
        descriptions: [
            "This is an app that makes use of the Twitch API to display the current status of Twitch streamers."
        ]
    },
    project05: {
        name: 'Pomodoro Clock',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/pen/qVZwJm',
        githubLink: '',
        images: [
            "./images/pomodoro01.jpg"
        ],
        descriptions: [
            "This is a pomodoro clock.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
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

var circle = '<i class="far fa-circle"></i>';
var circleFilled = '<i class="fas fa-circle"></i>';
var slideIndicatorId;
var slideIndicator;

for (var i = 0; i < allProjects.length; i++) {
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
    projectMenuTitle.innerHTML = '<h3>' + projects[allProjects[i]].name + '<h3>';
    //Draw correct number of circles for slide indicator
    slideIndicatorId = '#' + allProjects[i] + '-slide-indicator';
    for (var j = 0; j < projects[allProjects[i]].descriptions.length; j++) {
        if (j === 0) {
            $(slideIndicatorId).append(circleFilled);
        } else {
            $(slideIndicatorId).append(circle);
        }
    }
}

//User clicks left arrow button on a project
function projectNavLeft(project) {
    console.log('projectNavLeft() for ', project);

    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var slideIndicatorId = '#' + project + '-slide-indicator';
    var projectImg = document.querySelector(imgId);
    var projectDescription = document.querySelector(descriptionId);

    //Set currentSlide to correct index
    projects[project].currentSlide--;
    if (projects[project].currentSlide < 0) {
        projects[project].currentSlide = projects[project].descriptions.length - 1;
    }

    //Change dom element to images[currntSlide] and desciptions[currentSlide]
    var currentSlide = projects[project].currentSlide;
    projectImg.src = projects[project].images[currentSlide];
    projectDescription.innerHTML = projects[project].descriptions[currentSlide];

    //Change slide Indicator to match current Slide
    $(slideIndicatorId).html('');
    for (var j = 0; j < projects[project].descriptions.length; j++) {
        if (j === currentSlide) {
            $(slideIndicatorId).append(circleFilled);
        } else {
            $(slideIndicatorId).append(circle);
        }
    }
}

//User clicks right arrow button on a project
function projectNavRight(project) {
    console.log('projectNavRight() for ', project);
    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var slideIndicatorId = '#' + project + '-slide-indicator';
    var projectImg = document.querySelector(imgId);
    var projectDescription = document.querySelector(descriptionId);

    //Set currentSlide to correct index
    projects[project].currentSlide++;
    if (projects[project].currentSlide > projects[project].descriptions.length - 1) {
        projects[project].currentSlide = 0;
    }

    //Change dom element to images[currntSlide] and desciptions[currentSlide]
    var currentSlide = projects[project].currentSlide; //For readability
    projectImg.src = projects[project].images[currentSlide];
    projectDescription.innerHTML = projects[project].descriptions[currentSlide];

    //Change slide Indicator to match current Slide
    $(slideIndicatorId).html('');
    for (var j = 0; j < projects[project].descriptions.length; j++) {
        if (j === currentSlide) {
            $(slideIndicatorId).append(circleFilled);
        } else {
            $(slideIndicatorId).append(circle);
        }
    }
}

var hidden = false;
var projectsMenu = document.querySelector('#projects-menu');

function hamburger() {
    console.log('hamburger', hidden);
    if (hidden) {
        //remove 'hide' class from #proejcts-menu
        projectsMenu.style.top = "0";
        hidden = false;
    } else if (!hidden) {
        //add 'hide' class to #projects-menu
        projectsMenu.style.top = "-100vh";
        hidden = true;
    }
}

function hideMenu() {
    projectsMenu.style.top = "-100vh";
    hidden = true;
}