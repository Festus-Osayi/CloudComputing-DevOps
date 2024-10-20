'''
# break - Breaks out of the loop, when it hits the statement
Continues to the next iteration of the loop, when it hits the statement
'''

# break - Breaks out of the loop, when it hits the statement
for i in range(1, 10):
    if i == 5:
        break
    print(i)  # Output: 1 2 3 4

# continue - Skips the current iteration of the loop, when it hits the statement
for i in range(1, 10):
    if i == 5:
        continue
    print(i)  # Output: 1 2 3 4 6 7 8 9
