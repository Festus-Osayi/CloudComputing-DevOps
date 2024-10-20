'''
Loops in Python
Python has the following loops:
for loop
while loop
'''
# for loop
arr = ["Jenkins", "Ansible", "Puppet", "Vagrant"]
for i in arr:
    print(i) # Output: Jenkins Ansible Puppet Vagrant
    
for num in range(1, 10):
    print(num) # Output: 1 2 3 4 5 6 7 8 9
    
# while loop
num = 0
while num < 5:
    print(num)
    num += 1 # Output: 0 1 2 3 4 # without this statement (infinite loop)
    
# Nested loops
for i in range(1, 4):
    for j in range(1, 4):
        print(i, j)