# 使用圆括号创建元组
my_tuple = (1, 'hello', 3.14)
print(my_tuple)  # 输出：(1, 'hello', 3.14)

# 使用 tuple 关键字创建元组
my_tuple2 = tuple([1, 2, 3])
print(my_tuple2)  # 输出：(1, 2, 3)

my_tuple1 = (1, 'hello', 3.14, 'python', 2021)
print(my_tuple1[:3])  # 输出：(1, 'hello', 3.14)
print(my_tuple1[3:])  # 输出：('python', 2021)

my_tuple2 = (1, 'hello', 3.14, 'python', 2021)
print(my_tuple2[:3])  # 输出：(1, 'hello', 3.14)
print(my_tuple2[3:])  # 输出：('python', 2021)

a = (1, 2, 3)
b = ('a', 'b', 'c')
c = a + b
print(c)  # 输出：(1, 2, 3, 'a', 'b', 'c')

my_tuple3 = (1, 2, 3, 2, 4, 2)
print(my_tuple3.count(2))  # 输出：3
print(my_tuple3.index(2))  # 输出：1
