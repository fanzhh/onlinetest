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

// 倒入数据库
conn = sqlite3.connect('mydb.db') // 连接数据库
c=conn.cursor()  // 获取游标
i=1 // 计数器，做ID赋值用
for q in questions:
    // 执行插入
    c.execute("insert into question(id,description,answer,A,B,C,D,E,remark) values(%d,'%s','%s','%s','%s','%s','%s','%s','%s')"%(i,q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]))                                                 
    i=i+1
conn.commit() // 提交   
