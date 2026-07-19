import pytest

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

SAMPLE_STUDENT_INVALID_FIRST_NAME = {
    "first_name": 1111,
    "last_name": "Khatiwada",
    "student_id": 12346,
    "major": "Sociology",
    "year": 2014,
    "gpa": 3.85,
    "email": "shovana@example.com"
}

SAMPLE_STUDENT_INVALID_LAST_NAME = {
    "first_name": "Shovana",
    "last_name": 1111,
    "student_id": 12346,
    "major": "Sociology",
    "year": 2014,
    "gpa": 3.85,
    "email": "shovana@example.com"
    }

SAMPLE_STUDENT_INVALID_GPA = {
    "first_name": "Shovana",
    "last_name": "Khatiwada",
    "student_id": 12346,
    "major": "Sociology",
    "year": 2014,
    "gpa": 8,
    "email": "shovana@example.com"
    }

SAMPLE_STUDENT_INVALID_EMAIL ={
    "first_name": "Shovana",
    "last_name": "Khatiwada",
    "student_id": 12346,
    "major": "Sociology",
    "year": 2014,
    "gpa": 3.85,
    "email": "abcd1234"
}

SAMPLE_STUDENT_INVALID_YEAR ={
    "first_name": "Shovana",
    "last_name": "Khatiwada",
    "student_id": 12346,
    "major": "Sociology",
    "year": "abcd1234",
    "gpa": 3.85,
    "email": "shovana@example.com"
}

@pytest.fixture
def client(test_db):
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client

# ==========================================================
# GET /
# ==========================================================

def test_get_home(client):
    response = client.get("/")

    assert response.status_code == 200

    retrieved = response.get_json()

    assert retrieved["project"] == "Student Management System API"
    assert retrieved["version"] == "1.0"
    assert retrieved["status"] == "running"

# ==========================================================
# GET /students
# ==========================================================

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

# ==========================================================
# GET /students/<student_id>
# ==========================================================

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

# ==========================================================
# DELETE /students/<student_id>
# ==========================================================

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

# ==========================================================
# GET /students/statistics
# ==========================================================

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

# ==========================================================
# GET /students/search
# ==========================================================

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

# ==========================================================
# GET /students/sorted
# ==========================================================

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

# ==========================================================
# POST /students
# ==========================================================

def test_create_student(client):
    response = client.post("/students", json=SAMPLE_STUDENT)

    assert response.status_code == 201
    assert response.get_json()["message"] == "Student added successfully"
    assert response.get_json()["student"] == SAMPLE_STUDENT

def test_create_student_invalid_gpa(client):
    response = client.post("/students", json=SAMPLE_STUDENT_INVALID_GPA)

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid GPA"

def test_create_student_invalid_first_name(client):
    response = client.post("/students", json=SAMPLE_STUDENT_INVALID_FIRST_NAME)

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid First Name"

def test_create_student_invalid_last_name(client):
    response = client.post("/students", json=SAMPLE_STUDENT_INVALID_LAST_NAME)

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid Last Name"

def test_create_student_invalid_email(client):
    response = client.post("/students", json=SAMPLE_STUDENT_INVALID_EMAIL)

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid email format"

def test_create_student_invalid_year(client):
    response = client.post("/students", json=SAMPLE_STUDENT_INVALID_YEAR)

    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid Year"

def test_create_student_missing_field(client):
    response = client.post("/students", json={
        "first_name": "Shovana",
        "last_name": "Khatiwada",
        "student_id": 12346,
        "major": "Sociology",
        "year": 2014,
        "gpa": 3.85,
    })

    assert response.status_code == 400
    assert response.get_json()["error"] == "Missing required field: email"

def test_create_student_duplicate_id(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 409
    assert response.get_json()["error"] == "Student ID already exists."

def test_create_student_no_json(client):
    response = client.post("/students", json={})

    assert response.status_code == 400
    assert response.get_json()["error"] == "Malformed or missing JSON payload"

# ==========================================================
# PUT /students/<student_id>
# ==========================================================

def test_update_student(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.put("/students/12345", json={
        "last_name": "Sharma",
        "year": 2009
    })

    assert response.status_code == 200
    assert response.get_json()["message"] == "Student updated successfully"
    assert response.get_json()["student"] == {
        "first_name": "Ankit",
        "last_name": "Sharma",
        "student_id": 12345,
        "major": "Computer Science",
        "year": 2009,
        "gpa": 4.0,
        "email": "ankit@example.com"
    }

def test_update_student_invalid_field(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.put("/students/12345", json={
        "middle_name": "Sharma",
        "year": 2009
    })
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid field: middle_name"

def test_update_student_invalid_first_name(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.put("/students/12345", json={
        "first_name": 1111
    })
    
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid First Name"

def test_update_student_invalid_last_name(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201
    
    response = client.put("/students/12345", json={
        "last_name": 1111
    })
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid Last Name"

def test_update_student_invalid_year(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201
    
    response = client.put("/students/12345", json={
        "year": "abcd1234"
    })
    
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid Year"

def test_update_student_invalid_gpa(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201
    
    response = client.put("/students/12345", json={
        "gpa": 8
    })
    
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid GPA"

def test_update_student_invalid_email(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201
    
    response = client.put("/students/12345", json={
        "email": "abcd1234"
    })
    assert response.status_code == 400
    assert response.get_json()["error"] == "Invalid email format"

def test_update_student_not_found(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.put("/students/12346", json={
        "email": "abcd1234"
    })
    assert response.status_code == 404
    assert response.get_json()["error"] == "Student not found"

def test_update_student_no_json(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.put("/students/12345", json={})
    assert response.status_code == 400
    assert response.get_json()["error"] == "Malformed or missing JSON payload"

# ==========================================================
# GET /students/export
# ==========================================================

def test_export_to_csv(client):
    response = client.post("/students", json=SAMPLE_STUDENT)
    assert response.status_code == 201

    response = client.get("/students/export")
    assert response.status_code == 200
    assert response.get_json()["message"] == "Students successfully exported to CSV."

def test_export_to_csv_empty_database(client):
    response = client.get("/students/export")
    assert response.status_code == 400
    assert response.get_json()["error"] == "No students available to export."

