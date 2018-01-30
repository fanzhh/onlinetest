# onlinetest
使用ReactJS做的在线答题的练习

将word格式的题库转为txt格式，导入至sqlite3中，使用Express.js做服务端提供json格式数据，使用React做前端获取服务端数据在线答题。做完题目提交后显示错题，再次测试时只显示错题。


## 数据导入

### 源格式

源题库为word格式，题型分别为单选、多选和判断题。

![单选题](http://upload-images.jianshu.io/upload_images/38605-2d22fd1c668500f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![多选题](http://upload-images.jianshu.io/upload_images/38605-973d038f83d950ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![判断题](http://upload-images.jianshu.io/upload_images/38605-548bba5201ad6880.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 转为txt格式

为便于读取，word格式另存为`txt`格式，文件名为`questions.txt`。

### 建立数据库

我使用的IPython来建立数据库：
```
import sqlite3
conn=sqlite3.connect('mydb.db')
c=conn.cursor()
c.execute('''create table (
                 id int primary key, // 主键 
                 description text,  // 题目
                 answer text,  // 答案
                 A text, //选择项A。判断题时，A为正确。
                 B text, //选择项B。判断题时，B为错误。
                 C text, //选择项C
                 D text, //选择项D
                 E text, //选择项E。默认最多5个选择项。
                 number int, // 排序用
             )''')
c.commit()
```
### 从txt文件中提取试题信息

`txt`题库中，每道题都以`阿拉伯数字+.`开始，形如`1.`，选择题题干中正确答案在全角括号中，形如`（ABCD）`，判断题题干行中会有`×`或`√`符合，据此提取数据。代码如下：
```
import re // 导入正则表达式模块
p1=re.compile("\d+.")  // 判断是否为新的题干的正则表达式
p2=re.compile("（(.+)）") // 提取正确答案的正则表达式
f=open('questions.txt','r') // 打开文本文件
lines=f.readlines()  // 读取全部文本
questions = [] // 建立空题库，在遍历文本中追加
description='' // 初始化题目
answer='' // 初始化答案
A='' // 初始化选项
B=''
C=''
D=''
E=''
for line in lines:
    if p1.match(s): // 该行以数字+.开始，遇到一道新题
        if description != '': // 确定题目非空
            questions.append([description,answer,answerA,   // 新题追加到题库中，
                answerB,answerC,answerD,answerE,remark])
        question=''  // 然后清空各字段
        answer=''
        answerA=''
        answerB=''
        answerC=''
        answerD=''
        answerE=''
        remark=''
        if '×' in s or '√' in line: // 这是一道判断题吗
                description=s[:s.find('（')] // 提取题目表述
                answerA='√'
                answerB='×'
                remark='2' // 为便于排序，备注中判断题标记为2
                if '×' in s:  // 答案为×
                    answer='B'
                elif '√' in s:
                    answer='A'
                continue // 判断题没有选择项，所以直接跳到下一个循环
        else: // 不是判断，那就是选择题了
                  description=s[:s.find('（')+1]+s[s.find('）'):] // 提取题目描述
                  answer=p2.search(s).group(1).strip()
                  if len(answer)>1:
                       remark='1' // 多选题标记为1
                  else:
                       remark='0' // 单选题标记为0
    else: // 该行不是以数字+.开始，是选择项
        answers = s.split() // 选择项之间以空格分开
        for an in answers:
            if an.startswith('A'): // 选项A
                answerA=an
            elif an.startswith('B'): // 选项B
                answerB=an
            elif an.startswith('C'): // 选项C
                answerC=an
            elif an.startswith('D'): // 选项D
                answerD=an 
            elif an.startswith('E'): // 选项E
                      answerE=an
```
### 试题信息导入数据库
现在，所有题目都在`questions`数组中，可以插入到数据库中了：
```
conn = sqlite3.connect('mydb.db') // 连接数据库
c=conn.cursor()  // 获取游标
i=1 // 计数器，做ID赋值用
for q in questions:
    // 执行插入
    c.execute("insert into question(id,description,answer,A,B,C,D,E,remark) values(%d,'%s','%s','%s','%s','%s','%s','%s','%s')"%(i,q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]))                                                 
    i=i+1
conn.commit() // 提交
```

## 服务端
back为服务端。

## 客户端
frontend为客户端。

## 运行截图

