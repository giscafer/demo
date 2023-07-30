# 迭代器

list = [1, 2, 4]
iterator = iter(list)
print(next(iterator))
print(next(iterator))

# 生成器

# yield 构建一个迭代器


def frange(start, stop, step):
    x = start
    while x < stop:
        yield x
        x = x+step


for i in frange(10, 20, 1.5):
    print(i)
