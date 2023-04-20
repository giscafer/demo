chinese_zodiac = '鼠牛虎兔龙蛇马羊猴鸡狗猪'

year = int(input('请输入你出生年份：'))

luck = chinese_zodiac[year % 12]
print(luck)
if (luck == '羊'):
    print('咩咩！')
else:
    print(year)
