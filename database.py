import sqlite3
from student import Student

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

    rows = cursor.fetchall()
    connection.close()
    
    all_students = []

    for row in rows:
        student = Student(
            row[1],
            row[2],
            row[0],
            row[3],
            row[4],
            row[5],
            row[6]
            )
        all_students.append(student)


    return all_students


def get_student_by_id(student_id):
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM students WHERE student_id = ?",(student_id,)
    )
    
    row = cursor.fetchone()
    connection.close()
    if row is None:
        return None
    student = Student(
    row[1],
    row[2],
    row[0],
    row[3],
    row[4],
    row[5],
    row[6]
)

    return student

def get_students_by_name(search_term):
    connection = sqlite3.connect("students.db")
    cursor = connection.cursor()

    query = "SELECT * FROM students WHERE first_name LIKE ? OR last_name LIKE ?"
    
    cursor.execute(query, (f"%{search_term}%", f"%{search_term}%"))

    rows = cursor.fetchall()
    connection.close()

    found_students = []

    for row in rows:
        student = Student(
            row[1],
            row[2],
            row[0],
            row[3],
            row[4],
            row[5],
            row[6]
        )
        found_students.append(student)
        
    return found_students

def update_student_field(student_id, column_name, new_value):
    connection = sqlite3.connect("students.db")
    cursor = connection.cursor()

    # We use an f-string for the column_name, but we still use '?' for the value to keep it safe!
    query = f"UPDATE students SET {column_name} = ? WHERE student_id = ?"
    
    cursor.execute(query, (new_value, student_id))

    connection.commit()
    connection.close()
    
def delete_student(student_id):
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM students WHERE student_id = ?",(student_id,)
    )

    connection.commit()
    connection.close()

def does_student_exist(student_id):
    if (get_student_by_id(student_id) is None):
        return False
    else:
        return True