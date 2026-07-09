from student import Student
import database

def print_menu():
    print()
    print("1. Add a Student")
    print("2. View All Students")
    print("3. Search for a Student")
    print("4. Update a Student's data")
    print("5. Delete a Student")
    print("6. Exit ")
    print()

def start():
    print("---------Welcome to the Student-Management-System---------")
    print()

    while True:
        #menu
        print()
        print("Here's the menu:")
        print_menu()
        choice = int(input("Enter a number (1-6) that aligns with your choice: "))
        if choice == 1:
            first_name = input("Enter the First name: ")
            last_name = input("Enter the Last name: ")
            student_id = int(input("Enter the Student ID: "))
            major = input("Enter the Major: ")
            year = int(input("Enter the Year of Graduation: "))
            gpa = float(input("Enter the GPA: "))
            email = input("Enter the email address: ")
            student = Student(first_name,last_name,student_id,major,year,gpa,email)
            database.add_student(student)

        elif choice == 2:
            students = database.get_all_students()
            for student in students:
                student.display()
        
        elif choice == 3:
            student_id = int(input("What is the Student ID of the Student that you would like to search for: "))
            student = database.get_student_by_id(student_id)
            if student is None:
                print("\nStudent not found.")
            else:
                student.display()
            
        
        elif choice == 4:
            student_id = int(input("What is the Student ID of the Student that you would like to Update : "))
            print("//Considering an update of GPA since we don't have the function for others yet//")
            if (database.does_student_exist(student_id)):
                new_gpa = float(input("What is the updated GPA: "))
                database.update_student_gpa(student_id,new_gpa)
            else:
                print("\nStudent not found.")

        elif choice == 5:
            student_id = int(input("What is the Student ID of the Student that you would like to Delete : "))
            if(database.does_student_exist(student_id)):
                database.delete_student(student_id)
            else:
                print("\nStudent not found.")
        
        elif choice == 6:
            print("You chose to quit the Program. Have a great day. Exiting....")
            break
        
        else:
            print("Invalid choice! Please choose a number (1-6) from menu...")

