
try:
    year = int(input('input year:'))
    print('year: %d' % year)
except ValueError:
    print('年份要输入数字！')


try:
    a = open('story.txt')
except Exception as e:
    print(e)
finally:
    a.close()
