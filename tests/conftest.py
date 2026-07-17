import os
import pytest
import database

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