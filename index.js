// Variable Declarations
const fs = require("fs");
const inquirer = require("inquirer");
var pNum = 1; // to display paragraph numbers

// Kick off the program
getTitle();

// Object to store all user entered data for easy access
var userParams = {
    title: "",
    deployedURL: "",
    badge: [],
    description: [],
    installation: [],
    usage: [],
    license: [],
    contributions: [],
    tests: [],
    support: []
}

// Request project's title
function getTitle() {
    inquirer
      .prompt([
        {
            message: "Enter the project's Title: ",
            name: "title"
        }]).then(function({ title }) {
            userParams.title = title;
            getDeployedURL();
        });
}

// Request deployed URL for project
function getDeployedURL() {
    inquirer
      .prompt([
        {
            message: "Enter the Deployed URL: ",
            name: "deployedURL"
        }]).then(function({ deployedURL }){
            userParams.deployedURL = deployedURL;
            getBadge();
        })
}

// Request any badge(s)
function getBadge() {
    inquirer
      .prompt([
        {
            message: "Enter badge URL: ",
            name: "badge"
        },
        {   // This gives the user an option to add another badge or continue
            type: 'list',
            message: "Add another badge?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ badge, choice }){
            userParams.badge.push(badge);
            if (choice === "Yes") {
                getBadge();
            } else {
                getDescription();
            }
        })
}

// Request description paragraph(s)
function getDescription() {
    inquirer
      .prompt([
        {
            message: "Description | Paragraph #" + pNum + ": ",
            name: "description"
        },
        {   // This gives the user an option to add another badge or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ description, choice }){
            userParams.description.push(description);
            pNum++;
            // console.log(pNum);
            if (choice === "Yes") {
                getDescription();
            } else {
                pNum = 1;
            }
        })
}

