const fs = require("fs");
// const axios = require("axios");
const inquirer = require("inquirer");

// Kick off the program
getTitle();

var userParams = {
    title: "",
    badge: [],
    description: "",
    installation: "",
    usage: "",
    license: "",
    contributions: "",
    tests: "",
    support: ""
}

// Request title
function getTitle() {
    inquirer
      .prompt([
        {
            message: "Enter project Title: ",
            name: "title"
        }]).then(function({ title }) {
            userParams.title = title;
            console.log(title);
            console.log(userParams.title);
            getBadge();
        });
}

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
            name: "choiceBadge"
        }]).then(function({ badge, choiceBadge }){
            userParams.badge.push(badge);
            if (choiceBadge === "Yes") {
                console.log(badge);
                console.log("Do it again...");
                getBadge();
            } else {
                console.log(badge);
                console.log(userParams.badge);
                console.log("Done... Yo It worked!");
            }
        })
}





