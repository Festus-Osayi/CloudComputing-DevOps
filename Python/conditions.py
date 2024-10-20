"""
Conditions in Python
Python has the following conditional statements:
if statement
if else statement
if elif else statement
"""

num1 = 2
num2 = 3

# if statement
if num1 < num2:
    print("num1 is less than num2")  # Output: num1 is less than num2

# if else statement
if num1 > num2:
    print("num1 is greater than num2")
else:
    print("num1 is less than num2")

arr = ["Jenkins", "Ansible", "Puppet", "Vagrant"]

# if elif else statement
if "Jenkins" in arr:
    print("Jenkins is in the list")
elif "Ansible" in arr:
    print("Ansible is in the list")
else:
    print("None of the elements are in the list")
