# loop 条件语句循环
constellations = ('水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座',
                  '处女座', '天秤座', '天蝎座', '射手座', '摩羯座')

chinese_zodiac = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
# for in

for z in chinese_zodiac:
    print(z)

# for range
for n in range(1, 13):
    print('数字为%s' % (n))

len = len(chinese_zodiac)
print('长度为%s' % (len))

# while loop
while True:
    len = len-1
    if (len > 0):
        print(chinese_zodiac[len], len)
        continue
    else:
        break


for c in constellations:
    if (c == '双子座'):
        print('双子座')
