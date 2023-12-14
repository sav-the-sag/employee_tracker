// importing package files
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Encryption for env file
require("dotenv").config();

// Dotenv variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

async function dbConnection(select) {
    try {
        const db = await mysql.createConnection({
            host: "localhost",
            user: dbUser,
            password: dbPassword,
            database: dbName,
        });
        // empty variables for query returns and prompt responses
        let returnedRowsFromDb = [];
        let returnedOutputFromInq = [];
        // switch for all user input cases
        switch (select) {
            // id, name
            case "View All Departments":
                returnedRowsFromDb = await db.query("SELECT * FROM department");
                console.table(returnedRowsFromDb[0]); // needs to be part of array?
                break;

            // role id, job title, department value, salary value
            case "View All Roles":
                returnedRowsFromDb = await db.query(`
                  SELECT
                      role.id,
                      role.title,
                      role.salary,
                      department.name AS department
                  FROM role
                  JOIN department ON role.department_id = department.id
                  `);
                console.table(returnedRowsFromDb[0]);
                break;
            // employee id, first name, last name, job title, department, salary and manager
            case "View All Employees":
                returnedRowsFromDb = await db.query(`
                SELECT
                    employee.id,
                    employee.first_name,
                    employee.last_name,
                    role.title AS title,
                    department.name AS department,
                    role.salary AS salary,
                    CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                JOIN employee manager_table ON employee.manager_id = manager_table.id
                `);
                console.table(returnedRowsFromDb[0]);
                break;
        }
    }
    catch (err) {
        console.log(err);

    }
}