---
title: 'Python'
description: ''
date: 2025-07-19 10:00:00
image: './image/5.jpg'
---
# Python

## linux安装python3.10.16

```bash
wget [https://www.python.org/ftp/python/3.10.16/Python-3.10.16.tgz](https://www.python.org/ftp/python/3.10.x/Python-3.10.0.tgz)

tar -xvf Python-3.10.16.tgz -C /usr/local/

cd /usr/local/Python-3.10.16

./configure --prefix=/usr/local/python3.10

make

sudo make install
```

## 函数

```python
***if***

name=input()
if name=="zhangsan":
    print('good')
else:
    print('xxx')
```

```python
***elif*

name='lisi'
age=12
if name=='zhangsan':
    print('hello')
elif age==12:
    print('good')**
```

### while

```python
age=13
count=1
while age<=19:
    print("xx"+str(count))
    age=age+1
    count=count+1
    

while True:
    print('qingshuru ')
    name=input()
    if name == 'zhangsan':
        break
print("good")     

while True:
    a=input("请输入")
    if a!='zs':
        continue
    print('ok')
    password=input('请输入密码')
    if password=='1':
        break
print('login')
      
```

### for

```python
for i in range(0, 10,2):------------->从0开始到8,间隔为2
    print(i)
for i in range(10 ,-1 ,-1):
    print(i) 
```

## print()函数

```python
print('hello',end='')
print('world')
helloworld
```

## global语句

```python
**global a  声明一个全局变量,不能用这个名字创建局部变量**
```

## 异常处理

```python
try:
    1/0
except ZeroDivisionError:
    print('zero division error')
```

### MySQL

```python
import pymysql

try:
    conn = pymysql.connect(host='localhost', port=3306, user='root', password='1234', database='booksdb', charset='utf8mb4')
    cursor = conn.cursor()

    # 执行 SQL 查询
    sql = "SELECT * FROM userinfo"  # 替换为你的表名
    cursor.execute(sql)

    # 获取查询结果
    results = cursor.fetchall()
    for row in results:
        print(row)

except pymysql.Error as e:
    print(f"数据库操作失败：{e}")

finally:
    if 'conn' in locals() and conn.open:
        conn.close()
```

### 列表

```python
spam=[['zhangsan'],['a','b','c']]
print(spam[1][1])

spam[1][-1]--------->表示倒数第一个元素

 
**列表切片
spam[1,3]------------>从第一个开始到第四个,不包括第四个

列表删除值
del spam[1]

in 和 not in**

***快速赋值***
spam=['1','2','3']
a,b,c=spam 

***enumerate()------------>列表中表项本身以及索引***
spam=['1','2','3']
for  i, item in enumerate(spam):
    print(item)

**random.shuffle() 
random.shuffle(spam)
就地将修改列表,重新排序

方法:index() remove() append() sort()排序spam.sort(key=str.lower) reverse()反转列表值
sort和reverse都不返回列表
spam.index('xxx')--------->返回索引**

  
spam=['1','2','3']
print(spam.index('3'))
spam.append('good')
print(spam)
spam.insert(1,'sss')
print(spam)
spam.remove('sss')
print(spam)

2
['1', '2', '3', 'good']
['1', 'sss', '2', '3', 'good']
['1', '2', '3', 'good']
    
    
    
list=['6','-2','3','1']
list.sort()
print(list)
spam=['a','b','A','d']
spam.sort(key=str.lower)
print(spam)
spam.reverse()
```

 

## 字符串(不可变数据类型)

```python
name1=name[0:5]+'the'+name[6:10]
```

## 元组数据类型(像字符串一样是不可变的)

```python
**list和tuple()
print(list('hello'))
['h', 'e', 'l', 'l', 'o']**
```

## 引用

spam=42 —————→创建一个42,把地址给spam

aaa=spam——————→将指向42的地址给aaa

spam=100————————>将100的地址给spam,不影响aaa的值

但是列表是可变的

spam=[’1’,’2’,’3’]

bbb=spam

bbb[1]=’aaa’——-→spam————→[’1’,’aaa’,’3’]

## COPY

```python

import copy
spam=['a','b','c']
chess=copy.copy(spam)
chess[1]=11
print(chess)
print(spam)

列表中包含列表，用deepcopy（）
['a', 11, 'c']
['a', 'b', 'c']
```

## 字典k-v（不排序）

```python
cat={'key':'v'}
print(cat['key'])
v

cat={'key':'v','a':1,'b':12}
for key in cat.values():
    print(key)

for item in cat.items():
    print(item)
for key in cat.keys():   
    print(key)
    
cat={'key':'v','a':1,'b':12}
print(cat.get('s',"xxx"))----------->没有s就用xxx代替

cat={'key':'v','a':1,'b':12}
cat.setdefault("aaa",1234)------------>没有就设置值
print(cat)    
```

## 字符串

转义字符

\’—————>单引号

\”—————>双引号

\t—————>制表符

\n—————>换行

\\—————>反斜杠

`print(r'this is"" a \1str')`--→加上r,使它变为原始字符串
`print(f'test is {a},sss is {b}')`---→加上f变为插值

```python
str='\'HeLLo world'
print(str.upper())----------->返回新字符串变为大写
print(str.lower())----------->返回新字符串,变为小写
'HELLO WORLD
'hello world
返回的为新字符串,没有改变原来字符串

print(str.isalnum())-------------->是否只包含数字和字母,且非空
print(str.isalpha())--------------->是否只包含字母,且非空
print(str.isspace())--------------->只包含空格,制表符和换行符,且非空
print(str.istitle())------------->驼峰( This Is Title)

str.startswith('hello')
str.endswith('world')

```

```python
spam=['1','2','3']
a='+'.join(spam)---------------------->拼接字符串列表
print(a)--------------------->1+2+3
b=a.split('+')----------------->分割字符串
print(b)------------------->['1', '2', '3']

s='hello world sssss'
b=s.partition('world')----------------->分隔符
print(b)---------------------->('hello ', 'world', ' sssss')

s='hello world sssss'
b=s.rjust(50,'1')
c=s.ljust(100,'=')
s.center(20)
print(b)------------------->111111111111111111111111111111111hello world sssss
print(c)------------------->hello world sssss================

s.strip() ---->返回一个新字符串开头和末尾都没有空白字符(lstrip() 和rstrip())
s.strip('AMP')--------------->删除两端出现的AMP                   
```

```python
print(ord('A'))----------------->65
print(chr(66))------------------>B
```

```python
import pyperclip
pyperclip.copy("helooo")
b=pyperclip.paste()
print(b)
```

## 正则表达式

\d： 0~9的数字

\d{3}  0~9三次

\D  除了0~9以外任何字符

\w  字母数字下划线

\W 除字母数字下划线

\s  空格 制表符 换行符

字符集[a-zA-Z0-9]匹配所有的大小写字母和数字

$ 表示以这个结束

^ 表示以这个开始

.  匹配除了换行符之外的所有字符

.* 匹配所有的  reg=re.compile(r’.*’,re.DOTALL)=⇒匹配所有的,包括换行符

```python
    reg = re.compile(r'(\d{4})-(\d{4})')
    match = reg.search('my phone is 1234-5678')
    print(match.group())------------->1234-5678
	  match.group(1)------------------>1234 
    match.group(2)-------------->5678
    match.groups()------>('1234', '5678')-------------->获取所有分组
    
    
    
    reg=re.compile(r'good|job')----------------->匹配good或job
m=reg.search('this is a good job.')
m.group()-------------------------------->返回匹配的第一个
reg1=re.compile(r'Bat(man|bat)')---------------------->匹配Bat开头的

**? 表示可选**
reg=re.compile(r'(\d{3})?\d{4}')------------>表示(\d{3})可有可无

***表示零次或者多次**
reg=re.compile(r'(wo)*')------------>匹配wowowo  wo 

**+表示一次或者多次
reg=re.compile(r'(wo)+')------------>至少一次wo

{}表示多次 (ha){3,5}-------------------->匹配hahaha hahahahaha

贪心**
reg=re.compile(r'(ha){3,5}?')--------------->最后加上?表示非贪心,返回hahaha
print(reg.search('hahahahaha').group())

**findall
reg=re.compile(r'\d\d\d')
print(reg.findall('this is123and 456 and 789'))------------>['123', '456', '789']**
```

## 文件读写

```python
file=open("D:\\py-project\\fastApiProject\\test.txt",'a')------------->添加
file.write('wo')
file.close()

file=open("D:\\py-project\\fastApiProject\\test.txt",'w')----------->覆盖
file.write('wo11')
file.close()
```

## 利用shelve保存

```python
import shelve
shelvefile=shelve.open('mydata')
cat=['zhangsan','lisi','wangwu']
shelvefile['cat']=cat
shelvefile.close()
```

## 利用pprint 的pformat

```python
import pprint
cat=[{"name":"zhangsan",'age':22},{"name":"l;isi",'age':22}]
pprint.pformat(cat)
f=open('pprint.py','w')
f.write('cat'+pprint.pformat(cat)+'\n')
f.close()
```

## 将下载的文件保存到硬盘

```python
import requests
response=requests.get('url')
response.raise_for_status()
file=open('test.txt','wb')
for chunk in response.iter_content(10000):
    file.write(chunk)     
```

## 使用bs4解析Html

soup.select(’div’)———————>查询所有div的元素

soup.select(’div span’)———————>查询div元素之内的span的元素

soup.select(’input[name]’)———————>查询名为<input>,并且有一个name属性

```python
import requests,bs4
res=requests.get('https://yyp123.xyz/')
res.raise_for_status()
soup=bs4.BeautifulSoup(res.text,'lxml')
print(soup.select('div img'))
```

## 处理excel

```python
import openpyxl
wb=openpyxl.load_workbook('./test.xlsx')
print(wb.sheetnames)
sheet1=wb['Sheet1']
print(sheet1.cell(row=2, column=1).value)

from openpyxl.utils import get_column_letter,column_index_from_string
字母---->数字openpyxl.utils.column_index_from_string
数字---->字母openpyxl.utils.get_column_letter
```

### 获取行和列

```python
import openpyxl
from openpyxl.utils import get_column_letter,column_index_from_string
wb=openpyxl.load_workbook('./test.xlsx')
print(wb.sheetnames)
ws=wb['Sheet1']
for e in ws['A1':'C3']:
    for iner in e:
        print("this is coordinate"+iner.coordinate,"this is value"+iner.value)
    print('end ')
```

```python
import openpyxl
from openpyxl.utils import get_column_letter,column_index_from_string
wb=openpyxl.load_workbook('./test.xlsx')
print(wb.sheetnames)
ws=wb['Sheet1']
print(list(ws.columns)[0])
----------------->(<Cell 'Sheet1'.A1>, <Cell 'Sheet1'.A2>, <Cell 'Sheet1'.A3>)
```

## 创建excel

```python
import openpyxl
wb=openpyxl.Workbook()
sheet=wb.active
sheet.title='this is a title'
wb.save('test1.xlsx')

import openpyxl
wb=openpyxl.load_workbook('test1.xlsx')
wb.create_sheet('this is new sheet')----------------->创建新工作表
print(wb.sheetnames)

del wb['this is new sheet']-------------->删除工作表

***公式***
import openpyxl
wb=openpyxl.load_workbook('./test.xlsx')
sheet=wb['Sheet1']
sheet['A1']='=sum(A2:A3)'
wb.save('test.xlsx')

**行高**
sheet.row_dimensions[1].height=100
sheet.column_dimensions['B'].width=100

**冻结窗口**
sheet.freeze_panes=None ------------>'A1'

```

## PDF

```python
import PyPDF2
pdf=open('test.pdf', 'rb')
PdfReader = PyPDF2.PdfFileReader(pdf)
print(PdfReader.numPages)
print(PdfReader.getPage(51).extractText())
pdf.close()
```