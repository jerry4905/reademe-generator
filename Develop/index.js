// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions1 = [
    {
        type: "input",
        message: "What is your Github username?",
        name: "userName"
    },
    {
        type: "input",
        message: "What Github repo would you like this README to be for?",
        name: "repoName"
    },
    {
        type: "input",
        message: "What is your README Project Title?",
        name: "title"
    },
    {
        type: "input",
        message: "Please enter a description for your project.",
        name: "description"
    },
    {
        type: "confirm",
        message: "Would you like to add installation steps?",
        name: "installation"
    },
];

const questions2 = [
    {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "usage"
    },
    {
        type: "input",
        message: "What licenses are used for this project?",
        name: "license"
    },
    {
        type: "input",
        message: "who contributed to the project?",
        name: "contributing"
    },
    {
        type: "input",
        message: "Include any tests for this application and how to run them.",
        name: "tests"
    },
    {
        type: "input",
        message: "What is your contact email address?",
        name: "email"
    }
];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }

        console.log("completed!");
    })
}


let questionsObject = {};
let allData = {};
let installStepCount = 1;
let installStepsObject = {};
let installArray = [];
let install = '';
let contributing = '';

// TODO: Create a function to initialize app
//function init() {}
async function init() {

    await inquirer.prompt(questions1).then(async function (response) {
        const queryUrl = `https://api.github.com/users/${response.userName}/events/public?per_page=1`;

        questionsObject = response;

        const stepPrompts = (confirmValue, inputName, confirmName) => {

            // Each time the stepPrompts function is called, the installStepCount is increased by one.
            installStepCount++;

            // Theses are the base install questions. The step message is incremented by 1 to let the user known which step they are adding
            const installQuestions = [
                {
                    type: "input",
                    message: `Step ${installStepCount - 1}:`,
                    name: inputName
                },
                {
                    type: "confirm",
                    message: "Would you like to add another step?",
                    name: confirmName
                },
            ];
            if (confirmValue) {
                inquirer.prompt(installQuestions).then(function (response) {
                    // These push each installation step key and value to the questionsObject as well as the installStepsObject(which is used to later append the steps to the markdown)
                    questionsObject[inputName] = response[inputName];
                    installStepsObject[inputName] = response[inputName];

                    // This continues the installation steps sequence. As long as the user is pressing yes, it will pass a true to the confirmValue parameter on the function, thus initiating more step requests.
                    confirmValue = response.stepConfirm;

                    // using the installStepCount variable, we are able to the keys of the installation step increment by one.
                    stepPrompts(confirmValue, `step${installStepCount}`, `stepConfirm`);
                });
            } else {
                inquirer.prompt(questions2).then(function (response2) {
                    // this combines all of the data from the first set of questions and the second set of questions
                    allData = {
                        ...questionsObject,
                        ...response2
                    }

                    // This sets the install variable to a string of all the values of the installation steps, each preceded by a \n*. This is carried over to the generatedMarkdown.js function to append it to the Installation section of the readme.
                    Object.entries(installStepsObject).forEach(item => installArray.push('\n* ' + item[1]));
                    install = installArray.join('');

                    // This gives the user the ability to add the contributor covenant to their readme. It does a fs.readFile to capture the contributorCovenant.md text
                    if (allData.contributing) {
                        fs.readFile('contributorCovenant.md', 'utf8', function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            contributing = data;
                            writeToFile("README.md", generateMarkdown(allData, install, contributing));
                        })
                    } else {
                        writeToFile("README.md", generateMarkdown(allData, install, ''));
                    }

                });
            }
        }

        // the response.installation sets 
        stepPrompts(response.installation, `step${installStepCount}`, `stepConfirm`);

    });

}

// Function call to initialize app
init();
