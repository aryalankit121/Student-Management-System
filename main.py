import database
import sqlite3
from student import Student

database.setup_database()

print("Students")

s1 = Student("Ankit", "Aryal",1001,"CS",2028,4.0,"aryalankit@gmail.com")
s1.display()
try:
    database.add_student(s1)
except sqlite3.IntegrityError:
    print("Student already exists.")

s2 = Student("Ram", "Paudel",1002,"Biology",2028,3.85,"rampaudel@gmail.com")
s2.display()
try:
    database.add_student(s2)
except sqlite3.IntegrityError:
    print("Student already exists.")

s3 = Student("Sita", "Khanal", 1003,"Electrical Engineer", "2029", "3.9", "sitakumari@gmail.com")
s3.display()
try:
    database.add_student(s3)
except sqlite3.IntegrityError:
    print("Student already exists.")

students = database.get_all_students()
for student in students:
    print(student)

print("checking is the get_student_by_id function works")
database.get_student_by_id(1002)