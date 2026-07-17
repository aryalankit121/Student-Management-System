import os
import pytest
import database

from app import app

SAMPLE_STUDENT = {
    "first_name": "Ankit",
    "last_name": "Aryal",
    "student_id": 12345,
    "major": "Computer Science",
    "year": 2026,
    "gpa": 4.0,
    "email": "ankit@example.com"
}

SAMPLE_STUDENT_2 = {
    "first_name": "Shovana",
    "last_name": "Khatiwada",
    "student_id": 12346,
    "major": "Sociology",
    "year": 2014,
    "gpa": 3.85,
    "email": "shovana@example.com"
}

@pytest.fixture
def client(test_db):
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client

def test_get_home(client):
    response = client.get("/")

    assert response.status_code == 200

    retrieved = response.get_json()

    assert retrieved["project"] == "Student Management System API"
    assert retrieved["version"] == "1.0"
    assert retrieved["status"] == "running"

def test_get_students(client):
    client.post("/students", json=SAMPLE_STUDENT)

    response = client.get("/students")

    assert response.status_code == 200

    students = response.get_json()

    assert len(students) == 1
    assert students[0]["student_id"] == 12345
    assert students[0]["first_name"] == "Ankit"
    assert students[0]["last_name"] == "Aryal"
    assert students[0]["major"] == "Computer Science"
    assert students[0]["year"] == 2026
    assert students[0]["gpa"] == 4.0
    assert students[0]["email"] == "ankit@example.com"

def test_get_students_empty_database(client):
    response = client.get("/students")

    assert response.status_code == 200
    assert response.get_json() == []

def test_get_student_by_id(client):
    client.post("/students", json=SAMPLE_STUDENT)

    response = client.get("/students/12345")

    assert response.status_code == 200

    student = response.get_json()

    assert student["student_id"] == 12345
    assert student["first_name"] == "Ankit"
    assert student["last_name"] == "Aryal"
    assert student["major"] == "Computer Science"
    assert student["year"] == 2026
    assert student["gpa"] == 4.0
    assert student["email"] == "ankit@example.com"

def test_get_student_by_id_not_found(client):
    response = client.get("/students/99999")

    assert response.status_code == 404

    assert response.get_json()["error"] == "Student not found"

def test_delete_student_by_id(client):
    client.post("/students", json=SAMPLE_STUDENT)

    response = client.delete("/students/12345")

    assert response.status_code == 200

    data = response.get_json()

    assert data["message"] == "Student successfully deleted"
    
    assert data["student"] == SAMPLE_STUDENT

def test_no_student_to_delete(client):
    response = client.delete("/students/12345")

    assert response.status_code == 404
    assert response.get_json()["error"] == "Student not found"

def test_get_students_statistics(client):
    client.post("/students", json=SAMPLE_STUDENT)

    response = client.get("/students/statistics")

    assert response.status_code == 200

    data = response.get_json()

    assert data["message"] == "Student statistics successfully loaded"

    statistics = data["statistics"]

    assert statistics["total_students"] == 1
    assert statistics["avg_gpa"] == 4.0
    assert statistics["max_gpa"] == 4.0
    assert statistics["min_gpa"] == 4.0
    assert statistics["total_majors"] == 1

    major_counts_dict = {
        item["major"]: item["count"]
        for item in statistics["major_counts"]
    }
    
    assert len(major_counts_dict) == 1
    assert major_counts_dict["Computer Science"] == 1

def test_get_students_statistics_empty_database(client):
    response = client.get("/students/statistics")

    assert response.status_code == 404
    assert response.get_json()["error"] == "No Students in the database"

def test_get_students_by_name(client):
    client.post("/students", json=SAMPLE_STUDENT)

    response = client.get("/students/search?name=Ankit")
    
    assert response.status_code == 200

    students = response.get_json()

    assert len(students) == 1
    assert students[0]["student_id"] == 12345
    assert students[0]["first_name"] == "Ankit"
    assert students[0]["last_name"] == "Aryal"
    assert students[0]["major"] == "Computer Science"
    assert students[0]["year"] == 2026
    assert students[0]["gpa"] == 4.0
    assert students[0]["email"] == "ankit@example.com"

def test_get_students_by_name_not_found(client):
    response = client.get("/students/search?name=Ankit")
    assert response.status_code == 404
    assert response.get_json()["error"] == "No students found"

def test_get_students_by_invalid_name(client):
    response = client.get("/students/search?name=333")
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid Name format"

def test_sort_students_ascending(client):
    client.post("/students", json=SAMPLE_STUDENT)
    client.post("/students", json=SAMPLE_STUDENT_2)

    response = client.get("/students/sorted?order=asc")

    assert response.status_code == 200

    students = response.get_json()

    assert len(students) == 2
    assert students[0] == SAMPLE_STUDENT_2
    assert students[1] == SAMPLE_STUDENT

def test_sort_students_descending(client):
    client.post("/students", json=SAMPLE_STUDENT)
    client.post("/students", json=SAMPLE_STUDENT_2)

    response = client.get("/students/sorted?order=desc")

    assert response.status_code == 200

    students = response.get_json()

    assert len(students) == 2
    assert students[0] == SAMPLE_STUDENT
    assert students[1] == SAMPLE_STUDENT_2

def test_sort_invalid_order(client):
    response = client.get("/students/sorted?order=111")

    assert response.status_code == 400

    assert response.get_json()["error"] == "Invalid order. Use 'asc' or 'desc'."

def test_sort_empty_database(client):
    response = client.get("/students/sorted?order=asc")

    assert response.status_code == 200
    assert response.get_json() == []