const fs = require("fs");
// const axios = require("axios");
const inquirer = require("inquirer");

// Request title - This runs first
function getTitle() {
    inquirer
      .prompt([
        {
            message: "Enter project Title: ",
            name: "title"
        }]).then(function({ title }) {
            console.log(title);
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
            if (choiceBadge === "Yes") {
                console.log(badge);
                console.log("Do it again...");
                getBadge();
            } else {
                console.log(badge);
                console.log("Done... Yo It worked!");
            }
        })
}

getTitle();    



