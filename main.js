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
var localClock = document.querySelector('#local-clock');
var hawaiiClock = document.querySelector('#hawaii-clock');
var hawaiiTemp = document.querySelector('#hawaii-temp');
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

    '<i class="fas fa-thumbs-up fa-4x"></i><br><p class="skill-text">Elegant design and seamless functionality provides users with a positive web-viewing experience.</p>',

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
    var projectsDeg = "90deg";

    if(currentView === "about"){
        projectsView.classList.remove('hide');
        currentView = "projects";
        floatingNavBtn.style.transform = "rotate(" + projectsDeg + ")"
    }else if(currentView === "projects"){
        projectsView.classList.add('hide');
        currentView = "about";
        floatingNavBtn.style.transform = "rotate(" + aboutDeg + ")"
    }
}