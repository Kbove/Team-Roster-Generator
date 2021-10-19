const inquirer = require("inquirer");
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const Manager = require('./Manager');
const generateHTML = require('../util/generateHtml');
const fs = require('fs')

const employees = []

function startApp() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the team manager's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter an employee ID number"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter a valid email address"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Please enter the office number"
        }
    ]).then(({name,id,email,officeNumber}) => {
        employees.push(new Manager(name,id,email,officeNumber))
        addEmployees();
    })
}

function addEmployees() {
    inquirer.prompt([
        {
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add engineer","Add intern","I'm done"]
        }
    ]).then(selection => {
        switch (selection.menu) {
            case "Add engineer":
                console.log("Add an engineer!")
                addEngineer();
                break;

            case "Add intern":
                console.log("Add an intern!")
                addIntern();
                break;

            default:
                finishTeam();
                console.log("Looks like we're done here!")
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the engineer's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter an employee ID number"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter a valid email address"
        },
        {
            name: "github",
            type: "input",
            message: "Please enter engineer's Github username"
        }
    ]).then(({name,id,email,github}) => {
        employees.push(new Engineer(name,id,email,github))
        addEmployees();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the intern's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter an employee ID number"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter a valid email address"
        },
        {
            name: "school",
            type: "input",
            message: "Please enter intern's school"
        }
    ]).then(({name,id,email,school}) => {
        employees.push(new Intern(name,id,email,school))
        addEmployees();
    })
}

const finishTeam = () => {
    fs.writeFile('./index.html', generateHTML(employees), (err) =>
    err ? console.log(err) : console.log('Your team roster is ready!'));
}

startApp();
