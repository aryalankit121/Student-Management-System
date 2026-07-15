from flask import Flask, request
import database
from student import Student
import sqlite3
import utils

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "project": "Student Management System API",
        "version": "1.0",
        "status": "running"
    }

@app.route("/students")
def get_students():
    students = database.get_all_students()

    return [student.to_dict() for student in students]

@app.route("/students/<int:student_id>")
def get_student_by_student_id(student_id):
    student = database.get_student_by_id(student_id)
    if student is None:
        return {"error": "Student not found"},404

    return student.to_dict()

@app.route("/students/<int:student_id>", methods=["PUT"])
def update_student_by_student_id(student_id):
    data = request.json

    if not database.does_student_exist(student_id):
        return {"error": "Student not found"},404

@app.route("/students", methods=["POST"])
def post_student():
    data = request.json

    if not data:
        return {"error": "Malformed or missing JSON payload"}, 400

    try:
        if not utils.is_valid_gpa(data["gpa"]):
            return{
                "error": "Invalid GPA"
            },400
        
        if not utils.is_valid_email(data["email"]):
            return{
                "error": "Invalid email format"
            },400

        student = Student(
            first_name=data["first_name"],
            last_name=data["last_name"],
            student_id=data["student_id"],
            major=data["major"],
            year=data["year"],
            gpa=data["gpa"],
            email=data["email"],
        )
        
        database.add_student(student)
        
        return {
            "message": "Student added successfully"
        }, 201
        
    except KeyError as e:
        return{
            "error": f"Missing required field: {e.args[0]}"
        },400
    
    except sqlite3.IntegrityError:
        return{
            "error": "Student ID already exists."
        }, 409

if __name__ == "__main__":
    database.setup_database()
    app.run(debug=True)


