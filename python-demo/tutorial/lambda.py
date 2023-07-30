# JavaScript

"""
const numbers = [2, 5, 7, 10]
const result = numbers.filter(x= > x % 2 == = 0)
console.log(result)
"""

numbers = [2, 5, 7, 10]
# python lambda 函数就相当于js的箭头函数，用来定义函数，可作为函数的参数
result = list(filter(lambda x: x % 2 == 0, numbers))
print(result)


def multiply(x, y): return x*y


print(multiply(2, 3))
