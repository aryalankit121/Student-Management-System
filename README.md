# Student Management System

A modular command-line **Student Management System** built with **Python** and **SQLite** that demonstrates object-oriented programming, database design, SQL operations, and clean software architecture.

This project was developed as a backend learning project to strengthen my understanding of databases, CRUD operations, input validation, exception handling, and modular application design.

---

## Features

- Add new students to a SQLite database
- View all students
- Search students by **Student ID** or **Name**
- Update any student field through a dynamic SQL update system
- Delete students with confirmation prompts
- View students sorted by GPA using SQL `ORDER BY`
  - Ascending
  - Descending
- View a **Database Statistics Dashboard**, including:
  - Total students
  - Total unique majors
  - Average GPA
  - Highest GPA
  - Lowest GPA
  - Student distribution by major
- Export all student records to a CSV file
- Robust input validation:
  - Email validation using Regular Expressions (Regex)
  - GPA range validation (0.0–4.0)
  - Numeric type checking
- Prevent duplicate Student IDs
- Interactive command-line interface
- Object-oriented design using a `Student` class
- Modular project architecture with reusable utility functions

---

## Technologies Used

- Python 3
- SQLite3
- SQL
- Regular Expressions (`re`)
- CSV (`csv`)
- Git
- GitHub

---

## Project Structure

```text
Student-Management-System/
│
├── main.py          # Program entry point
├── menu.py          # Command-line user interface
├── database.py      # Database operations and SQL queries
├── student.py       # Student class
├── utils.py         # Helper validation functions
├── students.db      # SQLite database (generated at runtime)
├── students.csv     # Exported student records (generated on demand)
└── README.md
```

---

## Current Progress

- ✅ Designed the `Student` class using Object-Oriented Programming
- ✅ Designed a relational SQLite database for persistent storage
- ✅ Implemented complete CRUD functionality
  - Create student records
  - Read student records
  - Update student information
  - Delete student records
- ✅ Implemented student search by Student ID and Name
- ✅ Built an interactive command-line interface
- ✅ Converted SQL records into Python `Student` objects
- ✅ Organized the project into separate modules
- ✅ Added robust input validation and exception handling
- ✅ Implemented GPA sorting using SQL `ORDER BY`
- ✅ Built a Database Statistics Dashboard
- ✅ Added CSV export functionality with file error handling

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

### 3. Run the application

```bash
python main.py
```

The SQLite database will automatically be created the first time the application is run if it does not already exist.

---

## Skills Demonstrated

This project helped me gain practical experience with:

- Object-Oriented Programming (OOP)
- SQL and relational databases
- SQLite integration with Python
- CRUD application development
- Modular software architecture
- Input validation
- Regular Expressions (Regex)
- CSV file handling
- Exception handling
- Git version control
- GitHub workflow

---

## Planned Improvements

- Unit testing with `pytest`
- Advanced search filters
  - Major
  - Graduation Year
  - GPA range
- REST API using Flask
- Authentication/Login system
- Web interface

---

## Screenshots

Screenshots and demonstrations of the application will be added as development progresses.

---

## Author

**Ankit Aryal**

Computer Science Student  
Catawba College

GitHub: **https://github.com/aryalankit121**
