const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file

function init() {
    // Team manager
    function createManager() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is your managerName?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is your manager Id?'
            },

            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is your managerEmail?'
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'What is your managerOfficeNumber?'
            },

        ])
            .then(answers => {
                const manager = new Manager(answers.managerName, answers.managerId,answers.managerEmail,answers.managerOfficeNumber)
                teamMembers.push(manager)
                createTeam()
            })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'userChoice',
                message: 'What type of teame member would you like to add?',
                choices: [
                    "Engineer",
                    "Intern",
                    "I'm done"
                ]
            },

        ])
            .then(answers => {
                switch (answers.userChoice) {
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    default:
                        buildTeam();
                }
            })
    }
    function createEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engName',
                message: 'What is your engineer name?'
            },
            {
                type: 'input',
                name: 'engId',
                message: 'What is your engineer Id?'
            },

            {
                type: 'input',
                name: 'engEmail',
                message: 'What is your engineer Email?'
            },
            {
                type: 'input',
                name: 'engGitHub',
                message: 'What is your engineer GitHub?'
            },

        ])
            .then(answers => {
                const engineer = new Engineer(answers.engName, answers.engId,answers.engEmail,answers.engGitHub)
                teamMembers.push(engineer)
                createTeam()
            })
    }
    function createIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is your internName?'
            },
            {
                type: 'input',
                name: 'internId',
                message: 'What is your  intern Id?'
            },

            {
                type: 'input',
                name: 'internEmail',
                message: 'What is your  intern Email?'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What is your interns School?'
            },

        ])
            .then(answers => {
                const intern = new Intern(answers.internName, answers.internId,answers.internEmail,answers.internSchool)
                teamMembers.push(intern)
                createTeam()
            })
    }
    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers),"utf-8" );
        console.log(`Data has been written to the file successfully to index.html`); 
    } 

    createManager()
}
init() 
