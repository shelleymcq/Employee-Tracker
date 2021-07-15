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

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // run function on connection
    // createEmployee();
  });


