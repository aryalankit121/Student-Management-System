# Student Management System

A command-line **Student Management System** built with **Python** and **SQLite** that demonstrates object-oriented programming, database design, SQL operations, and clean software architecture. This project was developed as a backend learning project to strengthen my understanding of databases, CRUD operations, data validation, and modular application design.

---

## Features

* Add new students to a SQLite database
* View all students
* Search students by **Student ID** or **Name**
* Update any student field through a dynamic SQL update system
* Delete students with confirmation prompts
* View students sorted by GPA using SQL `ORDER BY` (Ascending/Descending)
* Export all student records to a CSV file
* Validate user input with:

  * Regular Expressions (Regex) for email formatting
  * GPA range validation (0.0–4.0)
  * Numeric type checking
* Prevent duplicate Student IDs
* Interactive command-line interface
* Object-oriented design using a `Student` class
* Modular project architecture

---

## Technologies Used

* Python 3
* SQLite3
* SQL
* Regular Expressions (`re`)
* CSV File Handling (`csv`)
* Git & GitHub

---

## Project Structure

```text
Student-Management-System/
│
├── main.py          # Program entry point
├── menu.py          # Command-line user interface
├── database.py      # Database operations and SQL queries
├── student.py       # Student class
├── utils.py         # Helper functions
├── students.db      # SQLite database (ignored by Git)
└── README.md
```

---

## Current Progress

* ✅ Designed the `Student` class using Object-Oriented Programming
* ✅ Designed a relational SQLite database for persistent storage
* ✅ Implemented complete CRUD functionality

  * Create students
  * Read student records
  * Update every student field
  * Delete students
* ✅ Implemented student search by ID and Name
* ✅ Built an interactive command-line interface
* ✅ Converted SQL records into Python `Student` objects
* ✅ Organized the project into separate modules
* ✅ Added robust input validation and error handling
* ✅ Implemented GPA sorting using SQL `ORDER BY`
* ✅ Added CSV export functionality

---

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/aryalankit121/Student-Management-System.git
```

### 2. Navigate into the project

```bash
cd Student-Management-System
```

### 3. Run the program

```bash
python main.py
```

The SQLite database will automatically be created the first time the application is run if it does not already exist.

---

## Planned Improvements

* Database statistics dashboard
* Unit testing with `pytest`
* REST API using Flask
* Web interface
* Authentication/Login system
* Advanced search filters (Major, Graduation Year, GPA)

---

## Learning Objectives

This project has helped me gain practical experience with:

* Object-Oriented Programming (OOP)
* SQL and relational databases
* SQLite integration with Python
* CRUD operations
* Modular software architecture
* Data validation
* Regular Expressions (Regex)
* CSV file handling
* Error handling
* Version control with Git and GitHub

---

## Screenshots

*Screenshots of the application will be added as development progresses.*

---

## Author

**Ankit Aryal**

Computer Science Student
Catawba College
