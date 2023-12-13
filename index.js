// importing package files
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Encryption for env file
require("dotenv").config();

// Dotenv variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;