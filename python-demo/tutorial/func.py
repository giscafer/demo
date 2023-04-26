def func(a, b, c):
    print("a=%s" % a)
    print("b=%s" % b)
    print("c=%s" % c)


# 关键字参数
func(1, b=2, c=3)

# 可变长参数


def howLong(first, *other):
    return 1 + len(other)


print(howLong(1, 2, 3, 4))
