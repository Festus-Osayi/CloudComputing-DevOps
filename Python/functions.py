# Modules
import random


def sum_num(args):
    x = 0
    for i in args:
        x += i
    return x


def activities(*args, **kwargs):
    sums = sum_num(args) + random.randint(0, 60)
    choices = random.choice(list(kwargs.keys()))
    print(f"You need to spend {sums} minutes for {kwargs[choices]}")


activities(10, 20, 30, hobbies="Singing", fun="cooking", sport="football", weekend="hangout with friends")
