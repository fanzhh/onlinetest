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

create_db.py

### 从txt文件中提取试题信息，导入数据库

import_db.py

## 服务端
back为服务端。

## 客户端
frontend为客户端。

## 演示地址
点击[这儿](https://onlietestfrontend.herokuapp.com/)查看在`heroku`上的演示。

