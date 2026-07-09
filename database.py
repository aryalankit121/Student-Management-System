import sqlite3

def setup_database():
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
    student_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    major TEXT,
    year INTEGER,
    gpa REAL,
    email TEXT
    )
    """)
    connection.commit()
    connection.close()

def add_student(student):
    connection = sqlite3.connect("students.db")

    try:
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO students VALUES (?,?,?,?,?,?,?)",
            (
                student.student_id,
                student.first_name,
                student.last_name,
                student.major,
                student.year,
                student.gpa,
                student.email,
            ),
        )

        connection.commit()

    finally:
        connection.close()

def get_all_students():
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM students"
    )
    all_students = cursor.fetchall()

    connection.close()

    return all_students

def get_student_by_id(student_id):
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM students WHERE student_id = ?",(student_id,)
    )
    student = cursor.fetchone()
    connection.close()

    print(student)
    

