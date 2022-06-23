#!/usr/bin/env/ node

const inquirer = require('inquirer');
const fs = require('fs');

const createDirectoryContents = require('./createDirectoryContents');

const CURRENT_DIR = process.cwd();
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name: ',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      return 'Project name may only includes letter, numbers, underscores and hashes.';
    }
  }
]

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURRENT_DIR}/${projectName}`);

  createDirectoryContents(templatePath, projectName);
});
