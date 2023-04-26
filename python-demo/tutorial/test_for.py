# 列表推导式
list = [i*i for i in range(1, 11) if i % 2 == 0]
print(list)

constellations = ('水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座',
                  '处女座', '天秤座', '天蝎座', '射手座', '摩羯座')
# 字典推导式
constellationsMap = {i: 0 for i in constellations}
print(constellationsMap)
