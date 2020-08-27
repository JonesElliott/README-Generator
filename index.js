// Variable Declarations
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const Choices = require("inquirer/lib/objects/choices");
const Choice = require("inquirer/lib/objects/choice");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
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
    contributions: [],
    tests: [],
    support: [],
    license: []
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
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ description, choice }){
            userParams.description.push(description);
            pNum++;
            if (choice === "Yes") {
                getDescription();
            } else {
                pNum = 1;
                getInstallation();
            }
        })
}

// Request installation paragraph(s)
function getInstallation() {
    inquirer
      .prompt([
        {
            message: "Installation | Paragraph #" + pNum + ": ",
            name: "installation"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ installation, choice }){
            userParams.installation.push(installation);
            pNum++;
            if (choice === "Yes") {
                getInstallation();
            } else {
                pNum = 1;
                getUsage();
            }
        })
}

// Request usage paragraph(s)
function getUsage() {
    inquirer
      .prompt([
        {
            message: "Usage | Paragraph #" + pNum + ": ",
            name: "usage"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ usage, choice }){
            userParams.usage.push(usage);
            pNum++;
            if (choice === "Yes") {
                getUsage();
            } else {
                pNum = 1;
                getContributions();
            }
        })
}

// Request contribution paragraph(s)
function getContributions() {
    inquirer
      .prompt([
        {
            message: "Contributions | Paragraph #" + pNum + ": ",
            name: "contributions"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ contributions, choice }){
            userParams.contributions.push(contributions);
            pNum++;
            if (choice === "Yes") {
                getContributions();
            } else {
                pNum = 1;
                getTests();
            }
        })
}

// Request test paragraph(s)
function getTests() {
    inquirer
      .prompt([
        {
            message: "Tests | Paragraph #" + pNum + ": ",
            name: "tests"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ tests, choice }){
            userParams.usage.push(tests);
            pNum++;
            if (choice === "Yes") {
                getTests();
            } else {
                pNum = 1;
                getSupport();
            }
        })
}

// Request support paragraph(s)
function getSupport() {
    inquirer
      .prompt([
        {
            message: "Support | Paragraph #" + pNum + ": ",
            name: "support"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ support, choice }){
            userParams.usage.push(support);
            pNum++;
            if (choice === "Yes") {
                getSupport();
            } else {
                pNum = 1;
                getLicense();
            }
        })
}

// Request license information
function getLicense() {
    inquirer
      .prompt([
        {   // This gives the user preset license options 
            type: 'list',
            message: "Select a license:",
            choices: [
            "MIT", 
            "GNU-GPLv3", 
            "Mozilla", 
            "Apache", 
            "Boost", 
            "Unlicense", 
            "I'll input my own",
            ],
            name: "licenseChoice"
        }]).then(function({ licenseChoice }){
            if (licenseChoice === "I'll input my own") {
                // Get user defined license
                getLicenseInput(); 
            } else {
                // Set predefined license
                readLicense(licenseChoice);
            }
        })
}

// retrieve the selected license
async function readLicense(licenseChoice) {
    try {
      // Read from each file
      const licenseData = await readFileAsync('./license-options/' + licenseChoice + '.txt', 'utf8');
      userParams.license = licenseData;
    } catch(error) {
      console.log(error);
    }
  }

// Request user defined license
function getLicenseInput() {
    inquirer
      .prompt([
        {
            message: "License | Paragraph #" + pNum + ": ",
            name: "license"
        },
        {   // This gives the user an option to add another paragraph or continue
            type: 'list',
            message: "Add another paragraph?",
            choices: ["Yes", "No"],
            name: "choice"
        }]).then(function({ license, choice }){
            userParams.usage.push(license);
            pNum++;
            if (choice === "Yes") {
                getLicenseInput();
            } else {
                pNum = 1;
                // Move on
            }
        })
}

  