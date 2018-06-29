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
    '<h2>Skillset:</h2>' + 
        '<ul id="skills-ul">' + '<li>HTML5</li>' + '<li>CSS3</li>' + '<li>JAVASCRIPT</li>' + '<li>JQUERY</li>' + '<li>BOOTSTRAP</li>' + '<li>NODEJS</li>' + '<li>EXPRESSJS</li>' + '<li>MONGODB</li>' + '<li>ANGULAR</li>' + '<li>GIT</li>' + '<li>GITHUB</li>' + '<li>NODEJS</li>' + 
    '</ul>',

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
    //Calculate user's Local time from lat and long and display to UI
    var GOOGLE_TIME_ZONE_API_URL =
        'https://maps.googleapis.com/maps/api/timezone/json?location='
        + localLatitude + ','
        + localLongitude
        + '&timestamp=1521590400&key='
        + GOOGLE_TIME_ZONE_API_KEY

    $.getJSON(GOOGLE_TIME_ZONE_API_URL, function (data) {
        var localDate = new Date(utc + data.rawOffset);
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

//Format time.  Prepend 0 if length === 1
if (hawaiiHours.length === 1) {
    hawaiiHours = "0" + hawaiiHours;
}
if (hawaiiMinutes.length === 1) {
    hawaiiMinutes = "0" + hawaiiMinutes;
}

var hawaiiDisplayTime = hawaiiHours + ":" + hawaiiMinutes;
hawaiiClock.innerHTML = hawaiiDisplayTime;

//skill square slide transitions
var skillIndex = 0;
var skillSlideShow = setInterval(function nextSkillSlide() {
    if (skillIndex > skillSlides.length - 1) {
        skillIndex = 0
    }
    skillContent.innerHTML = skillSlides[skillIndex];
    skillIndex++;
}, 8000);

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
}, 4000);

//This function handles the floating nav button by 
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

// The following projects object holds all data for all projects to be diplayed to the DOM
// Each image index corresponds to its respective descriptions index.  
// For example: image[0] is the image for descriptions[0].
// Changing the name here for a project will automatically change the DOM project title and nav menu title.
// Including a link for codepen, github, or heroku wll display its respective icon.
// No icon will show if no link is provided.

var projects = {
    project01: {
        name: 'GameTrader',
        currentSlide: 0,
        codepenLink: '',
        githubLink: 'https://github.com/hwrdleung/gametrade',
        herokuLink: 'https://gametrader.herokuapp.com/',
        images: [
            "./images/gametrader01.png",
            "./images/gametrader02.png",
            "./images/gametrader03.png",
            "./images/gametrader03.png"

        ],
        descriptions: [
            `
            <p>Gametrader is a personal project that I created to practice full-stack web development.  It's a web application that manages a mock video game trading club and was designed to connect gamers with other gamers.  Its users can view other users' video game collections, initiate trade requests, and post reviews on other users' public profile pages.</p>
            `,
            `
            <p>Gametrader has a simple and intuitive UI that is easy to use.  Its layout is responsive and automatically adjusts itself to look and function perfectly on all devices.  The design is minimalist with a consistent theme throughout the app.  
            </p>
            `,
            `
            <p>Gametrader has a fully functioning registration and login system with form validation messages, which contributes to the user experience.  Form validation messages helps the user along as the forms are being filled out while also ensuring that the data being sent to the server is formatted properly.  Once registered, users are able to edit their account information and privacy options in their account settings.</p>
            `,
            `
            <p>Gametrader creates a profile page for all registered users, which displays their public user information, reviews posted by other users, and video games that they have added to their collection.  Users can view each others profile pages and initiate trade requests for games that they want to play, which can then be either accepted or denied.</p>
            `
        ]
    },
    project02: {
        name: 'Twitch Streamers',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/EbxgqB/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/twitch01.jpg",
            "./images/twitch02.jpg"

        ],
        descriptions: [
            `<p>Twitch Streamers is a personal project that I created for the front end web development curriculum  on freecodecamp.org.  It uses JQuery to fetch data from twitch.com's API, and displays that data in a user-friendly interface with HTML and CSS. (Twitch is a website where gamers can broadcast their gameplay as a live stream).</p>`,

            `<p>The UI allows its users to sort streamers by online, offline, or both.  Users can also get updated information by clicking the 'refresh' button. Clicking on a streamer's username opens that streamer's twitch channel in a new browser tab.<p>`
        ]
    },
    project03: {
        name: 'Javascript Calculator',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/qovaLb/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/calculator01.jpg"
        ],
        descriptions: [
            "<p>Javascript Calculator is a personal project that I created for the front end web development curriculum  on freecodecamp.org. It's a basic calculator that was created from scratch with HTML, CSS, and Javascript.  It has all the functionalities of a typical calculator: add, subtract, multiply, divide, decimals, and negatives.  It also has a responsive UI and switches into full-screen mode when viewed on a mobile device. </p>"
        ]
    },
    project04: {
        name: 'Recreate Simon',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/JOZxxo/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/simon01.jpg",
            "./images/simon01.jpg"
        ],
        descriptions: [
            `<p>Test your memory by repeating the color sequence that Simon shows you!  Each new level adds another color to the sequence.  Be careful in strict mode--mistakes will bring you back to level 1!  Make it to level 20 to beat the game.  Recreate Simon is a personal project that I created for the front end web development curriculum on freecodecamp.org.  It was coded from scratch in HTML, CSS, and Javascript.<p>`
        ]
    },
    project05: {
        name: 'Pomodoro Clock',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/Zxoxwy/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/pomodoro01.jpg"
        ],
        descriptions: [
            "<p>Pomodoro Clock is a personal project coded from scratch in HTML, CSS, and Javascript.  It functions just like a pomodoro timer--25 minute sessions with 5 minute breaks in between sessions.  Users can change the duration of breaks and sessions with the arrow buttons, and increase or decrease the alarm's volume with the slider.</p>"
        ]
    }
}
//Initialize all projects to display:
//Projectname, its first image, and its first desciption.
var allProjects = Object.keys(projects);
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
var slideIndicatorId; //This will be unique for each project
var slideIndicator;

for (var i = 0; i < allProjects.length; i++) {
    //set id's for dom elements in projects view
    titleId = '#' + allProjects[i] + '-title';
    imageId = '#' + allProjects[i] + '-img';
    descriptionId = '#' + allProjects[i] + '-description';
    githubId = '#' + allProjects[i] + '-github';
    codepenId = '#' + allProjects[i] + '-codepen';
    iconContainer = '#' + allProjects[i] + '-icon-container';

    projectTitle = document.querySelector(titleId);
    projectImage = document.querySelector(imageId);
    projectDescription = document.querySelector(descriptionId);
    projectGithub = document.querySelector(githubId);
    projectCodepen = document.querySelector(codepenId);
    projectIconContainer = document.querySelector(iconContainer);
    //Set all project DOM elements to first slide
    projectTitle.innerHTML = projects[allProjects[i]].name;
    projectImage.src = projects[allProjects[i]].images[0];
    projectDescription.innerHTML = projects[allProjects[i]].descriptions[0];
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
    //Check for Gihub, Codepen, and Heroku links
    var aTag =  '';
    if(projects[allProjects[i]].githubLink){
        //append github a tag with fontawesome icon
        aTag = '<div><a id="' + allProjects[i] + '-github" class="project-link" href="' + 
        projects[allProjects[i]].githubLink + '" target="_blank" title="View source code in Github"><i class="fab fa-github fa-3x"></i></a><p>View source code</p></div>';

        $(iconContainer).append(aTag);
    }

    if(projects[allProjects[i]].codepenLink){
        //append codepen a tag with fontawesome icon
        aTag = '<div><a id="' + allProjects[i] + '-github" class="project-link" href="' + 
        projects[allProjects[i]].codepenLink + '" target="_blank" title="View full project in Codepen."><i class="fab fa-codepen fa-3x"></i></a><p>View full project</p></div>';

        $(iconContainer).append(aTag);
    }

    if(projects[allProjects[i]].herokuLink){
        //append heroku a tag with fontawesome icon
        aTag = '<div><a id="' + allProjects[i] + '-github" class="project-link" href="' + 
        projects[allProjects[i]].herokuLink + '" target="_blank" title="View full project deployed to Heroku"><i class="icon-heroku" style="font-size: 3em;"></i></a><p>View full project</p></div>';

        $(iconContainer).append(aTag);
    }
    
}

//User clicks left arrow button on a project
function projectNavLeft(project) {
    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var slideIndicatorId = '#' + project + '-slide-indicator';
    var projectImg = document.querySelector(imgId);
    var projectDescription = document.querySelector(descriptionId);

    //Change currentSlide index
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
    //Identify DOM Elements to change
    var imgId = '#' + project + '-img';
    var descriptionId = '#' + project + '-description';
    var slideIndicatorId = '#' + project + '-slide-indicator';
    var projectImg = document.querySelector(imgId);
    var projectDescription = document.querySelector(descriptionId);

    //Change currentSlide index
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

// Slide mobile menu into and out of view
function hamburger() {
    if (hidden) {
        projectsMenu.style.top = "0";
        hidden = false;
    } else if (!hidden) {
        projectsMenu.style.top = "-100vh";
        hidden = true;
    }
}

function hideMenu() {
    projectsMenu.style.top = "-100vh";
    hidden = true;
}