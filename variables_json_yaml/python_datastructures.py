# List (array)
tools1 = ["Jenkins", "K8s", "Docker", "Terraform"]
print(tools1)

# Retrieving item form a list
print("List....")
print(tools1[0])  # Retrieve an item with the index number
print(tools1[1])  # Retrieve an item with the index number

# Slicing
print("Slicing....")
print(tools1[0:3])  # Slice from 0 -3, without including index (3)
print(tools1[::-1])  # Reverse the list

print("Tuple....")
tools2 = ("Python", "Bash", "Ansible", "AWS")
print(tools2)

# Retrieving item form a Tuple
print(tools2[1])  # Retrieve an item with the index number
print(tools2[-1])  # Retrieve an item with the index numbe

# Dictionary
print("Dictionary....")
tools3 = {"skill": "Devops", "Year": 2023, "Tech": "Software Development"}
print(tools3)

# Retrieving item form a Dictionary
print(tools3["skill"])  # Retrieve an item with the key name
