# Slicing in Python

skill = "Cloud Computing"
print(skill[0:5])  # Cloud
print(skill[6:])  # Computing

# Slicing in list
skill_sets = ["Jenkins", "Ansible", "Puppet", "Docker", "Kubernetes", "Terraform"]

print(skill_sets[0:4])  # ['Jenkins', 'Ansible', 'Puppet', 'Docker']

# Slicing in tuple
databases = ("Oracle", "MongoDB", "Firebase", "PostgreSQL")
print(databases[1:3])  # ('MongoDB', 'Firebase')

# Slicing in range
numbers = range(10)
print(numbers[2:5])  # range(2, 5)

# Slicing in dictionary
user = {"name": "John Doe", "email": "johndoe@gmail.com", "age": 30}
print(user["name"][0:4])  # John Doe
print(user["email"])  #
print(user["age"])  # 30

