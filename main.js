console.log('main.js');

var aboutView = document.querySelector('#about-view');
var projectsView = document.querySelector('#projects-view');
var currentView = "about";

function switchViews(){
    console.log('switchViews');
    if(currentView === "about"){
        projectsView.classList.remove('hide');
        currentView = "projects";
    }else if(currentView === "projects"){
        projectsView.classList.add('hide');
        currentView = "about";
    }
}