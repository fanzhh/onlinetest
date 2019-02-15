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
