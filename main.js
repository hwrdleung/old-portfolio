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

//The following projects object holds all data for all projects to be diplayed to the DOM
//Each image index corresponds to its respective descriptions index.  
//For example: image[0] is the image for descriptions[0].
//Changing the name here for a project will automatically change the DOM project title and nav menu title.
//Includina a link for codepen, github, or heroku wll display its respective icon.

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
            "./images/gametrader03.png"
        ],
        descriptions: [
            `
            <p>Gametrader is a personal project that I created as a part of the curriculum on freecodecamp.org.  It's a full stack web application that manages a video game trading club.  It was designed to connect gamers with other gamers by serving as a platform through which its users can view other users' video game collections, initiate trade requests, and post reviews on other users' public profile pages.</p>
            `,
            `
            <p>Design:</p>
            <ul>
            <li>I designed the UI to be as simplistic and intuitive to use as possible.</li>
            <li>It has a responsive layout that adjusts itself to fit tablet and mobile screen sizes.</li>
            <li>A consistent color scheme is used throughout the app.</li>
            </ul>
            `,
            `
            <p>Function:</p>
            <ul>
            <li>Users can search for game titles and add them to their collections.</li>
            <li>Users can initiate trade requests with other users, who can then accept or deny the request.</li>
            <li>All users have a profile which other users can view.  It showcases their video game collections as well as reviews that other users have posted.</li>
            </ul>
            `
        ]
    },
    project02: {
        name: 'Nitelife',
        currentSlide: 0,
        codepenLink: '',
        githubLink: 'https://github.com/hwrdleung/nightlife',
        herokuLink: 'https://noodlesnitelife.herokuapp.com/',
        images: [
            "./images/nitelife01.jpg",
            "./images/nitelife02.jpg",
            "./images/nitelife03.jpg",
            "./images/nitelife03.jpg",
        ],
        descriptions: [
            "<p>Nitelife is a web application that allows users to pull up a list of bars in their area and quickly see which venues their friends and other users will be at tonight.  Users can also create an account and RSVP to venues themselves.  </p>",

            '<ul>' +
                '<li>Nitelife has a fully functioning user registration and login system.</li>' +
                "<li>Registered users can see their account information, change their password, and view a list of all the bars they are attending in the user dashboard.</li>" +
                "<li>Nitelife remembers each user's last searched location and automatically displays search results for their area the next time they log in.</li>" +
            "</ul>",

            "<ul>" +
                "<li>Search results are provided by Yelp, one of the most extensive and widely used business directories on the internet.</li>" +
                "<li>Using a popular business directory helps to ensure that the data being displayed to users is up-to-date and pertinent.</li>" + 
                "<li>Search results are dislayed in a simple and organized layout so that users can quickly locate the information that they need at a glance.</li>" +
            "</ul>",

            "<ul>" +
                "<li>Nitelife is a personal project that I created for the web development curriculum on freecodecamp.org.</li>" +
                "<li>It's a full-stack web applicaton with basic CRUD functionality--create, read, update, and delete.</li>" +
                "<li>Nitelife was built with the MEAN stack.  The back-end was built with NodeJS, ExpressJS, and MongoDB database, and the front-end was built with Angular.</li>" +
            "</ul>"
        ]
    },
    project03: {
        name: 'Stock Chart',
        currentSlide: 0,
        codepenLink: '',
        githubLink: 'https://github.com/hwrdleung/stocks2',
        herokuLink: 'https://noodlestocks.herokuapp.com/',
        images: [
            "./images/stocks01.jpg",
            "./images/stocks01.jpg"

        ],
        descriptions: [
            "<p>Stock Chart is an application that allows users to view stock data in real-time along with other users.  When any user adds or removes a stock, the UI is also updated for all other users that are on the app.  Use the icons below to view the source code or to checkout the full project!</p>", 
            
            "<p>Stock Chart is an example of a full-stack single-page web application, which allows the UI to update without requiring the browser to refresh the page.  This results in a smooth and seamless user experience.  The front-end was built in Angular, and the back-end was built with MongoDB, Express, and NodeJS.</p>"
        ]
    },
    project04: {
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
            "<p>This project that shows the current status of Twitch streamers.  (Twitch is a website where gamers can broadcast their gameplay as a live stream).  Users can sort streamers by online streamers, offline streamers, or by all streamers.  Users can also get updated information by clicking on the 'refresh' button. Clicking on a streamer's username opens up a new tab and directs the user to that streamer's Twitch channel.</p>",

            "<ul>" +
                "<li>Twitch Streamers is a personal project, created with HTML, CSS, Javascript, and JQuery.</li>" +
                "<li>This project is a front-end web page that uses JQuery to fetch data from Twitch's servers and display that data in an organized manner on the UI.</li>" +
                "<li>It shows each streamer's channel name, channel logo,  online/offline status, and current stream.  </li>" +
            "</ul>"
        ]
    },
    project05: {
        name: 'Javascript Calculator',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/qovaLb/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/calculator01.jpg"
        ],
        descriptions: [
            "<p>This was a fun personal coding project that I did for the curriculum on freecodecamp.org. It's a basic calculator that was created from scratch with HTML, CSS, and Javascript.  It has all the functionalities of a typical calculator: add, subtract, multiply, divide, decimals, and negatives.  It also has a responsive UI and adjusts itself to fit devices with smaller screen widths.  </p>"
        ]
    },
    project06: {
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
            "<p>Test your memory by repeating the color sequence that Simon shows you!  Each new level adds another color to the sequence.  Be careful in strict mode--mistakes will bring you back to level 1!  Make it to level 20 to beat the game.</p>",
            
            "<ul>" + 
                "<li>Recreate Simon is a personal coding project that I completed for the curriculum on freecodecamp.org.</li>" + 
                "<li>I used HTML, SCSS, and Javascript for this project.</li>" +
            "</ul>"
        ]
    },
    project07: {
        name: 'Tic Tac Toe',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/YExjWw/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/tictactoe01.jpg"
        ],
        descriptions: [
            "<p>Play tic tac toe against a friend, or the computer!</p>" + 
                "<ul>" +
                    "<li>This was a personal project created with HTML, CSS and Javascript.</li>" +
                    "<li>It has a responsive design that allows for comfortable viewing and gameplay on mobile screen sizes as well as desktop monitors.</li>" +
                "</ul>"
        ]
    },
    project08: {
        name: 'Pomodoro Clock',
        currentSlide: 0,
        codepenLink: 'https://codepen.io/noodles01/full/Zxoxwy/',
        githubLink: '',
        herokuLink: '',
        images: [
            "./images/pomodoro01.jpg"
        ],
        descriptions: [
            "<p>This personal project is a Pomodoro Clock created in HTML, CSS, and Javascript.  It functions just like a pomodoro timer--25 minute sessions with 5 minute breaks in between.  Users can  increase or decrease the duration of breaks and sessions as well as the alarm's volume.  It has a simple design that's easy to use and adjusts to fit smaller screen sizes.</p>"
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