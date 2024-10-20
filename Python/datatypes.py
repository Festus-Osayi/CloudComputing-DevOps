# Datatypes in Python

# Python has the following data types built-in by default, in these categories:
# 1. Numeric Types: int, float
# 2. Sequence Types: list, tuple, range
# 3. Text Type: str
# 4. Mapping Type: dict
# 6. Boolean Type: bool

# Numeric types
num = 10 # Integer
print(num)
print(type(num)) # Output: <class 'int'>

price = 15.5 # Float
print(price) 
print(type(price))  # Output: <class 'float'>

# Sequence Types
technologies = ["JavaScript, HTML, CSS, Ansible, Jenkins"]
print(technologies)
print(type(technologies)) # Output: <class 'list'>

databases = ("Oracle", "MongoDB", "Firebase", "PostgreSQL")
print(databases)
print(type(databases)) # Output: <class 'tuple'>\
    
numbers = range(10)
print(numbers)
print(type(numbers)) # Output: <class 'range'>

name = "John Doe"
print(name)
print(type(name)) # Output: <class 'str'>

user = {
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "age": 30
}
print(user)
print(type(user)) # Output: <class 'dict'>

bool1 = False
bool2 = True
print(bool1)
print(bool2)
print(type(bool1)) # Output: <class 'bool'>
print(type(bool2)) # Output: <class 'bool'>

