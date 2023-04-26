'''
文件内建函数和方法
- open() 打开文件
- read() 输入
- readline() 输入一行
- seek() 文件移动
- write() 输出
- close() 关闭文件
'''

# 将小说的主要任务记录在文件中

""" file = open('./story.txt', 'w')
file.write('招商银行\n宁波银行\n')
file.close()


file1 = open('./story.txt', 'a')
file1.write('中国中免')
file1.close() """


file2 = open('./story.txt', 'r')
print('当前文件指针位置：%s' % file2.tell())
print('读取字符内容：%s' % file2.read(1))
file2.seek(0)
print('读取一行内容：%s' % file2.readline())
# 第一个参数代表偏移位置，第二个参数 0 表示从文件头开始偏移，1表示从当前位置开始偏移，2表示从文件结尾开始偏移
# file2.seek(1, 1)  # UnsupportedOperation: can't do nonzero cur-relative seeks
print('当前文件指针位置：%s' % file2.tell())
file2.close()
