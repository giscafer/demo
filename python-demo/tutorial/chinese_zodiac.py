# 记录生肖，根据年份来判断生肖
chinese_zodiac = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
print(chinese_zodiac[0:4])
print(chinese_zodiac[-1])

year = 2023

print(year % 12)
print(chinese_zodiac[year % 12])
print('豹子' not in chinese_zodiac)
print(chinese_zodiac[1]+chinese_zodiac[2])
