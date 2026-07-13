import re

def get_valid_integer(prompt_text, error_message):
    while True:
        try:
            return int(input(prompt_text))
        except ValueError:
            print(f"\033[91m{error_message}\033[0m\n")

def get_valid_float(prompt_text, error_message, min_value=None, max_value=None):
    while True:
        try:
            value = float(input(prompt_text))

            if min_value is not None and value < min_value:
                print(f"\033[91mValue must be at least {min_value}.\033[0m\n")
                continue

            if max_value is not None and value > max_value:
                print(f"\033[91mValue must be at most {max_value}.\033[0m\n")
                continue

            return value

        except ValueError:
            print(f"\033[91m{error_message}\033[0m\n")

def get_valid_email(prompt_text, error_message):
    while True:
        email = input(prompt_text).strip()

        pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

        if re.fullmatch(pattern, email):
            return email
        
        print(f"\033[91m{error_message}\033[0m\n")