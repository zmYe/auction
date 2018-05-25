1、在github上创建项目

2、使用git clone https://github.com/xxxxxxx/xxxxx.git克隆到本地

3、编辑项目

4、git add . （将改动添加到暂存区）

5、git commit -m "提交说明"

6、git push origin master 将本地更改推送到远程master分支。


★★★★★★★☆☆☆☆☆☆☆☆☆☆☆★★★★★★★

如果在github的remote上已经有了文件而且多人開發，本地版本不是最新，會出现错误。此时应当先pull一下（更新代碼），即：

git pull origin master  //同步项目 

然后再进行：

git push origin master


★★★★★★★☆☆☆☆☆☆☆☆☆☆☆★★★★★★★

上传本地项目 

git init  初始化项目

git remote add origin https://自己的仓库url地址   关联到自已创库

push -u origin master 第一次提交加 U参数

★★★★★★★☆☆☆☆☆☆☆☆☆☆☆★★★★★★★

查看git设置

git config --list

git config --global --list

git config --global user.email abc@163.com  //设置 user.mail

git config --global https.proxy http://127.0.0.1:1080  //设置代理

config --global --unset http.proxy  取消设置

git config --global --get http.proxy  查看对应设置



 


