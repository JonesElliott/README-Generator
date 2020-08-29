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
    contributions: [],
    tests: [],
    support: [],
    license: ""
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
            userParams.tests.push(tests);
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
            userParams.support.push(support);
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
            "GNU GPLv3", 
            "Mozilla Public License 2.0", 
            "Apache License 2.0", 
            "MIT License", 
            "Boost Software License 1.0", 
            "The Unlicense", 
            "I'll input my own",
            ],
            name: "licenseChoice"
        }]).then(function({ licenseChoice }){
            if (licenseChoice === "I'll input my own") {
                // Get user defined license
                getLicenseInput(); 
            } else {
                // Set predefined license
                userParams.license = licenseChoice;
                getLicenseBadge(licenseChoice);
                buildFile();
            }
        })
}

// Sets badge based on user chosen license
function getLicenseBadge(licenseChoice) {
    switch (licenseChoice) {
        case "GNU GPLv3":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-GNU%20GPLv3-blue)');
            break;
        case "Mozilla Public License 2.0":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-Mozilla%20Public%202.0-blue)');
            break;
        case "Apache License 2.0":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-Apache%202.0-blue)');
            break;
        case "MIT License":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-MIT-green)');
            break;
        case "Boost Software License 1.0":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-Boost%20Software%201.0-blue)');
            break;
        case "The Unlicense":
            userParams.badge.push('![shields.io badge](https://img.shields.io/badge/License-The%20Unlicense-blue)');
            break;
        default:
            console.log('No license was chosen');
            break;
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
            userParams.license.push(license);
            pNum++;
            if (choice === "Yes") {
                getLicenseInput();
            } else {
                pNum = 1;
                buildFile();
            }
        })
}

// Check if the user entered parameters and format code accordingly
function checkEmptyParams() {
    // Deployed URL
    if (userParams.deployedURL.length > 0) {
        deployedSite = "[Deployed Site](" + userParams.deployedURL + ")";
    } else {
        deployedSite = "";
    }

    // Description
    if (userParams.description.length > 0) {
        description = `
## Description

${userParams.description.join('\n\n')}
        `;
    } else {
        description = "";
    }

    // Installation
    if (userParams.installation.length > 0) {
        installation = `
## Installation

${userParams.installation.join('\n\n')}
        `;
    } else {
        installation = "";
    }

    // Usage
    if (userParams.usage.length > 0) {
        usage = `
## Usage

${userParams.usage.join('\n\n')}
        `;
    } else {
        usage = "";
    }

    // Contributing
    if (userParams.contributions.length > 0) {
        contributing = `
## Contributing

${userParams.contributions.join('\n\n')}
        `;
    } else {
        contributing = "";
    }

    // Tests
    if (userParams.tests.length > 0) {
        tests = `
## Tests

${userParams.tests.join('\n\n')}
        `;
    } else {
        tests = "";
    }

    // Support
    if (userParams.support.length > 0) {
        support = `
## Support

${userParams.support.join('\n\n')}
        `;
    } else {
        support = "";
    }
}

// Build the file with user parameters
function buildFile() {
    var deployedSite = "";
    var description = "";
    var installation = "";
    var usage = "";
    var contributing = "";
    var tests = "";
    var support = "";
    // var toc = [];

    checkEmptyParams();
    

    const newReadMe = `
# ${userParams.title}

${deployedSite}

${userParams.badge.join(' ')}

${description}

## Table of Contents

[Installation](#installation)
[Usage](#usage)
[Contributing](#contributing)
[Tests](#tests)
[Support](#support)
[License](#license)

${installation}

${usage}

${contributing}

${tests}

${support}

## License

This project is licensed under the ${userParams.license}.
`
    // Writing the file
    fs.writeFile("./Generated-Files/README.md", newReadMe, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(`
=================================================================================
                    README has succesfully been created!
    You can find your file here ./README-Generator/Generated-Files/README.md
=================================================================================
`);
    });
}