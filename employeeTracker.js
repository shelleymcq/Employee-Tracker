const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const inquirer = require('inquirer');

const app = express();
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees',
});

const init = () => {
    inquirer.prompt(
        {
            name: 'selectOption',
            type: 'rawlist',
            message: 'Enter new Department, Role, or Employee',
            choices: ['Department', 'Role', 'Employee', 'EXIT']
    })
    .then((answer) => {
        if (answer.selectOption === 'Department') {
            console.log('dept');
            init();
        } else if (answer.selectOption === 'Role') {
            console.log('role');
            init();
        } else if (answer.selectOption === 'Employee') {
            console.log('emp');
            init();
        } else {
            connection.end();
        }
    })
}






connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // run function on connection
    init();
  });


