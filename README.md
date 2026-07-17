# Student Management System

A modular **Student Management System** built with **Python**, **SQLite**, and **Flask** that demonstrates object-oriented programming, relational database design, REST API development, SQL operations, automated testing, and clean software architecture.

This project was developed as a backend learning project to strengthen my understanding of databases, CRUD operations, input validation, exception handling, software testing, API development, and modular software design.

---

## Features

### Command-Line Application

* Add new students to a SQLite database
* View all students
* Search students by **Student ID** or **Name**
* Update any student field through a dynamic SQL update system
* Delete students with confirmation prompts
* View students sorted by GPA using SQL `ORDER BY`

  * Ascending
  * Descending
* View a **Database Statistics Dashboard**, including:

  * Total students
  * Total unique majors
  * Average GPA
  * Highest GPA
  * Lowest GPA
  * Student distribution by major
* Export all student records to a CSV file

### REST API

* Retrieve all students
* Retrieve a student by Student ID
* Search students by name
* Retrieve students sorted by GPA (ascending or descending)
* Retrieve database statistics
* Export student records to CSV
* Create new students
* Update existing student records
* Delete student records
* JSON request and response handling
* Proper HTTP status codes
* Robust request validation
* Duplicate Student ID protection

### Validation & Software Design

* Email validation using Regular Expressions (Regex)
* GPA validation (0.0–4.0)
* Graduation year validation
* Student name validation
* Prevent duplicate Student IDs
* Object-oriented design using a `Student` class
* Modular project architecture with reusable utility functions

### Testing

* Comprehensive automated database unit tests using **pytest**
* Manual REST API testing using **Thunder Client**

---

## Technologies Used

* Python 3
* Flask
* SQLite3
* SQL
* Pytest
* Regular Expressions (`re`)
* CSV (`csv`)
* Git
* GitHub

---

## Project Structure

```text
Student-Management-System/
│
├── app.py                  # Flask REST API
├── main.py                 # Command-line application
├── menu.py                 # Command-line user interface
├── database.py             # Database operations and SQL queries
├── student.py              # Student class
├── utils.py                # Validation helper functions
├── tests/
│   └── test_database.py    # Automated database test suite
├── students.db             # SQLite database (generated at runtime)
├── students.csv            # Exported CSV file (generated on demand)
├── README.md
└── LICENSE
```

---

## REST API Endpoints

| Method | Endpoint                       | Description                           |
| ------ | ------------------------------ | ------------------------------------- |
| GET    | `/`                            | API status                            |
| GET    | `/students`                    | Retrieve all students                 |
| GET    | `/students/<student_id>`       | Retrieve a student by Student ID      |
| GET    | `/students/search?name=<name>` | Search students by first or last name |
| GET    | `/students/sorted?order=asc`   | Retrieve students sorted by GPA       |
| GET    | `/students/statistics`         | Retrieve database statistics          |
| GET    | `/students/export`             | Export all students to CSV            |
| POST   | `/students`                    | Create a new student                  |
| PUT    | `/students/<student_id>`       | Update an existing student            |
| DELETE | `/students/<student_id>`       | Delete a student                      |

---

## Project Evolution

* ✅ Command-line Student Management System
* ✅ SQLite database integration
* ✅ Complete CRUD functionality
* ✅ Database Statistics Dashboard
* ✅ CSV export
* ✅ Modular software architecture
* ✅ Automated database testing with **pytest**
* ✅ Complete Flask REST API
* ✅ Manual REST API testing with **Thunder Client**
* ⬜ Automated REST API testing
* ⬜ Authentication/Login system
* ⬜ Web frontend

---

## Current Progress

* ✅ Designed the `Student` class using Object-Oriented Programming
* ✅ Designed a relational SQLite database for persistent storage
* ✅ Implemented complete CRUD functionality

  * Create student records
  * Read student records
  * Update student information
  * Delete student records
* ✅ Implemented student search by Student ID and Name
* ✅ Built an interactive command-line interface
* ✅ Converted SQL records into Python `Student` objects
* ✅ Organized the project into modular components
* ✅ Added robust input validation and exception handling
* ✅ Implemented GPA sorting using SQL `ORDER BY`
* ✅ Built a Database Statistics Dashboard
* ✅ Added CSV export functionality
* ✅ Implemented automated database unit testing using **pytest**

  * CRUD operations
  * Student lookup
  * Student search
  * GPA sorting
  * Database statistics
  * Duplicate ID handling
  * CSV export
  * Isolated test database with automatic cleanup
* ✅ Developed a complete REST API using **Flask**

  * GET endpoints
  * POST endpoint
  * PUT endpoint
  * DELETE endpoint
  * Search endpoint
  * GPA sorting endpoint
  * Statistics endpoint
  * CSV export endpoint
  * JSON serialization
  * Proper HTTP status codes
  * Request validation
* ✅ Manually tested all REST API endpoints using **Thunder Client**

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

### 3. Install dependencies

```bash
pip install flask pytest
```

---

### Run the Command-Line Application

```bash
python main.py
```

---

### Run the Flask REST API

```bash
python app.py
```

The SQLite database will automatically be created the first time the application is run if it does not already exist.

---

## Running the Database Test Suite

Execute the automated tests with:

```bash
pytest -v
```

Current test coverage includes:

* Student creation
* Student retrieval
* Student updates
* Student deletion
* Duplicate ID protection
* Search by name
* Retrieve all students
* GPA sorting
* Database statistics
* CSV export
* Empty database export handling

---

## Skills Demonstrated

This project helped me gain practical experience with:

* Object-Oriented Programming (OOP)
* SQL and relational databases
* SQLite integration with Python
* CRUD application development
* REST API development
* RESTful API design
* Flask
* JSON serialization
* HTTP request handling
* HTTP methods (GET, POST, PUT, DELETE)
* Query parameter handling
* Modular software architecture
* Input validation
* Regular Expressions (Regex)
* CSV file handling
* Exception handling
* Automated testing with **pytest**
* Manual API testing using **Thunder Client**
* Git version control
* GitHub workflow

---

## Planned Improvements

* Automated REST API testing with **pytest**
* Authentication/Login system
* Web frontend using HTML/CSS/JavaScript or React
* Advanced search filters

  * Major
  * Graduation Year
  * GPA range

---

## Screenshots

Screenshots and demonstrations of both the command-line application and the REST API will be added as development progresses.

---

## Author

**Ankit Aryal**

Computer Science Student
Catawba College

GitHub: https://github.com/aryalankit121

---

## License

This project is licensed under the MIT License. See the **LICENSE** file for details.
