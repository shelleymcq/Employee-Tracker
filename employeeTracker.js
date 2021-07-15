const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
const cTable = require('console.table');

const app = express();
dotenv.config();
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

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
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'EXIT']
    })
    .then((answer) => {
        switch(answer.selectOption) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'EXIT':
                connection.end();
                break;
            default:
                console.log(`Invalid option: ${answer.selectOption}`);
                break;
        }
    })
}

// Add department
const addDepartment = () => {
    inquirer.prompt(
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of the department?',
        })
        .then((answer) => {
            // insert new department into the db
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.newDepartment
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your department was created successfuly');
                    init();
                }
            );
    });
}

// Add role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?',
            maxLength: 30

        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary for the role?'
        },
        {
            name: 'departmentId',
            type: 'number',
            message: 'What is the department number?'
        },
    ])
    .then((answer) => {
        // insert new role into the db
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            },
            (err) => {
                if (err) throw err;
                console.log('Your role was created successfuly');
                init();
            }
        );
    });
}


// Add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the employee\'s first name?',
            maxLength: 30

        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employee\'s last name?',
            maxLength: 30
        },
        {
            name: 'roleId',
            type: 'number',
            message: 'What is the employee\'s role number?'
        },
    ])
    .then((answer) => {
        // insert new role into the db
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId
            },
            (err) => {
                if (err) throw err;
                console.log('Your employee was created successfuly');
                init();
            }
        );
    });
}
// AS used to create aliases for column titles

// View departments

const viewDepartments = () => {
    connection.query('SELECT name AS Departments FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

// View roles
const viewRoles = () => {
    connection.query('SELECT title AS Title, department_id AS Department FROM role', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

// View employees, first and last name concatenated for clarity
const viewEmployees = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) AS Employees, role_id AS JobID FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

// Update employee roles



// aliases for columns


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // run app on connection
    init();
  });


