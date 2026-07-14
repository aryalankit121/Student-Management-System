import os
import pytest
import database
import sqlite3
import csv

from student import Student

@pytest.fixture
def test_db():
    original_db = database.DB_NAME
    database.DB_NAME = "test_students.db"
    database.setup_database()

    try:
        yield
    finally:
        database.DB_NAME = original_db
        if os.path.exists("test_students.db"):
            os.remove("test_students.db")
        
        if os.path.exists("students.csv"):
            os.remove("students.csv")

def test_add_and_retrieve_student(test_db):
    """
    Verifies that a student can be successfully written to the database
    and pulled back out matching the exact data attributes.
    """
    # Arrange: Create a sample student instance
    sample_student = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit@example.com"
    )
    
    # Act: Add to database and look them back up
    database.add_student(sample_student)
    retrieved = database.get_student_by_id(12345)
    
    # Assert: Verify the data matches perfectly
    assert retrieved is not None
    assert retrieved.student_id == 12345
    assert retrieved.first_name == "Ankit"
    assert retrieved.last_name == "Aryal"
    assert retrieved.major == "Computer Science"
    assert retrieved.year == 2026
    assert retrieved.gpa == 4.0
    assert retrieved.email == "ankit@example.com"

def test_update_student(test_db):
    """
    Verifies that updating a student's GPA changes only the GPA
    while leaving all other student attributes unchanged.
    """
    sample_student = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit@example.com"
    )

    database.add_student(sample_student)
    database.update_student_field(12345, "gpa", 3.8)
    retrieved = database.get_student_by_id(12345)

    assert retrieved is not None
    assert retrieved.student_id == 12345
    assert retrieved.first_name == "Ankit"
    assert retrieved.last_name == "Aryal"
    assert retrieved.major == "Computer Science"
    assert retrieved.year == 2026
    assert retrieved.gpa == 3.8
    assert retrieved.email == "ankit@example.com"

def test_delete_student(test_db):
    """
    Verifies that deleting a student removes the record
    from the database completely.
    """
    sample_student = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit@example.com"
    )
    
    database.add_student(sample_student)
    database.delete_student(12345)
    retrieved = database.get_student_by_id(12345)

    assert retrieved is None

def test_get_students_by_name(test_db):
    """
    Verifies that searching by name returns all matching students
    regardless of result order.
    """
    sample_student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    sample_student_2 = Student(
        first_name="Ankit",
        last_name="Sharma",
        student_id=12346,
        major="Computer Engineering",
        year=2026,
        gpa=3.9,
        email="ankit2@example.com"
    )

    database.add_student(sample_student_1)
    database.add_student(sample_student_2)

    retrieved = database.get_students_by_name("Ankit")

    returned_ids = {student.student_id for student in retrieved}
    returned_last_names = {student.last_name for student in retrieved}

    assert len(retrieved) == 2
    assert returned_ids == {12345, 12346}
    assert returned_last_names == {"Aryal", "Sharma"}

def test_does_student_exist(test_db):
    """
    Verifies that does_student_exist() correctly identifies
    whether a student record exists in the database.
    """
    sample_student = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    database.add_student(sample_student)

    exists = database.does_student_exist(12345)
    does_not_exist = database.does_student_exist(12346)

    assert exists  is True
    assert does_not_exist  is False

def test_get_all_students(test_db):
    """
    Verifies that get_all_students() returns all stored students
    regardless of retrieval order.
    """
    sample_student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    sample_student_2 = Student(
        first_name="Rajiv",
        last_name="Sharma",
        student_id=12346,
        major="Computer Engineering",
        year=2027,
        gpa=3.9,
        email="ankit2@example.com"
    )

    database.add_student(sample_student_1)
    database.add_student(sample_student_2)

    retrieved = database.get_all_students()

    returned_ids = {student.student_id for student in retrieved}
    returned_first_names = {student.first_name for student in retrieved}
    returned_last_names = {student.last_name for student in retrieved}
    returned_majors = {student.major for student in retrieved}
    returned_years = {student.year for student in retrieved}
    returned_gpas = {student.gpa for student in retrieved}
    returned_emails = {student.email for student in retrieved}

    assert len(retrieved) == 2
    assert returned_ids == {12345, 12346}
    assert returned_first_names == {"Ankit", "Rajiv"}
    assert returned_last_names == {"Aryal", "Sharma"}
    assert returned_majors == {"Computer Science", "Computer Engineering"}
    assert returned_years == {2026, 2027}
    assert returned_gpas == {4.0, 3.9}
    assert returned_emails == {"ankit1@example.com", "ankit2@example.com"}

def test_get_students_sorted_by_gpa(test_db):
    """
    Verifies that students are returned in the correct
    ascending and descending GPA order.
    """
    sample_student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    sample_student_2 = Student(
        first_name="Rajiv",
        last_name="Sharma",
        student_id=12346,
        major="Computer Engineering",
        year=2027,
        gpa=3.9,
        email="ankit2@example.com"
    )
    database.add_student(sample_student_1)
    database.add_student(sample_student_2)

    descending_students = database.get_students_sorted_by_gpa()

    assert len(descending_students) == 2
    assert descending_students[0].student_id == 12345
    assert descending_students[0].gpa == 4.0
    assert descending_students[1].student_id == 12346
    assert descending_students[1].gpa == 3.9

    ascending_students = database.get_students_sorted_by_gpa(descending=False)
    
    assert len(ascending_students) == 2
    assert ascending_students[0].student_id == 12346
    assert ascending_students[0].gpa == 3.9
    assert ascending_students[1].student_id == 12345
    assert ascending_students[1].gpa == 4.0

def test_get_database_statistics(test_db):
    """
    Verifies that database statistics are calculated correctly,
    including enrollment totals, GPA metrics, and major distributions.
    """
    sample_student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    sample_student_2 = Student(
        first_name="Rajiv",
        last_name="Sharma",
        student_id=12346,
        major="Computer Engineering",
        year=2027,
        gpa=3.9,
        email="ankit2@example.com"
    )
    database.add_student(sample_student_1)
    database.add_student(sample_student_2)

    retrieved = database.get_database_statistics()

    assert retrieved['total_students'] == 2
    assert retrieved['avg_gpa'] == 3.95
    assert retrieved['max_gpa'] == 4.0
    assert retrieved['min_gpa'] == 3.9
    assert retrieved['total_majors'] == 2

    major_counts_dict = dict(retrieved['major_counts'])

    assert len(major_counts_dict) == 2
    assert major_counts_dict["Computer Science"] == 1
    assert major_counts_dict["Computer Engineering"] == 1


def test_prevent_duplicate_student_id(test_db):
    """
    Verifies that trying to add two students with the same ID
    correctly raises an IntegrityError.
    """
    # Arrange: Create two different students with the EXACT same ID
    student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=99999,  # Same ID
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit@example.com"
    )
    
    student_2 = Student(
        first_name="John",
        last_name="Doe",
        student_id=99999,  # Same ID
        major="Mathematics",
        year=2025,
        gpa=3.5,
        email="john@example.com"
    )

    # Act: Add the first student successfully
    database.add_student(student_1)

    # Assert: Try to add the second student and make sure it raises an IntegrityError
    with pytest.raises(sqlite3.IntegrityError):
        database.add_student(student_2)

def test_export_empty_database(test_db):
    """
    Verifies that exporting an empty database returns False.
    """
    success = database.export_students_to_csv()

    assert success is False
    assert not os.path.exists("students.csv")

def test_export_students_to_csv(test_db):
    """
    Verifies that student records are correctly exported
    to a CSV file with the expected header and contents.
    """
    sample_student_1 = Student(
        first_name="Ankit",
        last_name="Aryal",
        student_id=12345,
        major="Computer Science",
        year=2026,
        gpa=4.0,
        email="ankit1@example.com"
    )

    sample_student_2 = Student(
        first_name="Rajiv",
        last_name="Sharma",
        student_id=12346,
        major="Computer Engineering",
        year=2027,
        gpa=3.9,
        email="ankit2@example.com"
    )
    database.add_student(sample_student_1)
    database.add_student(sample_student_2)

    success = database.export_students_to_csv()
    assert success is True
    assert os.path.exists("students.csv")

    with open("students.csv","r",newline="") as file:
        reader = csv.reader(file)

        rows = list(reader)

        assert len(rows) == 3

        assert rows[0] == [
            "Student ID",
            "First Name",
            "Last Name",
            "Major",
            "Year",
            "GPA",
            "Email"
        ]

        assert rows[1] == [
            "12345",
            "Ankit",
            "Aryal",
            "Computer Science",
            "2026",
            "4.0",
            "ankit1@example.com"
        ]

        assert rows[2] == [
            "12346",
            "Rajiv",
            "Sharma",
            "Computer Engineering",
            "2027",
            "3.9",
            "ankit2@example.com"
        ]

