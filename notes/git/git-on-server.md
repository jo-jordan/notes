# 如何在ubuntu 18.04.2 LTS中搭建git仓库
以下内容大部分来自git官方[教程][0]。默认使用SSH协议进行操作。

## 服务器端操作步骤
### 第一步 创建服务器的git管理账号
这一步是可选的，因为linux的任何用户都可以建立局域网内的git代码仓库。这里是更好的分用户方便管理。

新建用户，用户名就叫git：
```shell
$ sudo adduser git # 创建用户 git
$ su git # 将终端用户切换到git 会要求输入对应密码
```
至此已经有一个当前为git用户的终端在运行了。

### 第二步 创建代码仓库
直接上命令：
```shell
$ sudo mkdir /opt/git && cd /opt/git # 创建/opt/git目录，并进入该目录，并将该目录作为项目总仓库
$ sudo git init --bare project.git # 初始化任意的项目文件夹，这里的项目名称就叫project，而且是初始化为裸仓库，成功后会出现以下文字
Initialized empty Git repository in /opt/git/project.git/
$ sudo chgrp -R git project.git # 调整文件夹的所属用户组为git
$ sudo chown -R git project.git # 调整文件夹的所属用户为git，如果不执行这两个命令可能在开发者端提交代码时报出 `remote unpack failed: unable to create temporary object directory` 错误
```
以上命令完成之后git仓库就建立好了。以后如果需要新增项目，只需要在/opt/git目录下继续初始化其他裸项目即可。

### 第三步 在服务器端添加开发者的公钥
1. 为刚刚新建的用户新建.ssh文件夹，备用：
```shell
$ cd /home/git
$ sudo mkdir .ssh && sudo chmod 700 .ssh # 创建.ssh文件夹，用于存放SSH keys，并赋予相应的权限
$ sudo touch .ssh/authorized_keys && sudo chmod 600 .ssh/authorized_keys # 确保文件存在，并赋予相应权限
$ sudo chown git:git .ssh # 确保该文件夹是属于git:git的
$ sudo chown git:git .ssh/authorized_keys # 确保该文件是属于git:git的
```

2. 将开发者提供的公钥内容添加到/home/git/.ssh/authorized_keys文件中
> 假设开发者的公钥已经存放在/tmp/id_rsa.developer.pub中了。

```shell
$ cat /tmp/id_rsa.developer.pub >> /home/git/.ssh/authorized_keys # 将开发者的公钥内容复制到authorized_keys文件中
```
到这里，开发者已经可以免密码维护git仓库了

3. 以后添加开发者重复上一步就行了。


## 开发者端操作步骤
### 第一步 创建SSH keys
该步骤可完全参照GitHub提供的[教程][1]，但是我这里依然会介绍在ubuntu中生成SSH keys的方法。

1. 首先确认是否已经存在公钥（id_dsa或者id_isa）和私钥（id_dsa.pub或者id_isa.pub），如果存在可以跳过下一步。

2. 生成SSH keys。

```shell
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
Created directory '/home/schacon/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/schacon/.ssh/id_rsa.
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```
> 注意：首先 *ssh-keygen* 会确认密钥的存储位置（默认是 *.ssh/id_rsa*），然后它会要求你输入两次密钥口令。如果你不想在使用密钥时输入口令，将其留空即可。

3. 现在，进行了上述操作的用户需要将各自的公钥发送给任意一个 Git 服务器管理员。以下是复制命令，运行完成后可将内容以一种安全的形式发送给 Git 服务器管理员。
可以用下面的方式获取公钥文件内容到粘贴板：
```shell
$ pbcopy < ~/.ssh/id_rsa.pub 
```
也可以直接使用scp命令传输：
```shell
$ scp ~/.ssh/id_rsa.pub git@192.168.1.5:/tmp/id_rsa.developer.pub # 若该命令提示无权限，可以使用其他管理员用户传输
```

### 第二步 设置git全局邮箱和用户名
如果设置过的可以跳过。
这一步的目的是让本机git有一个开发者的身份备注信息：
```shell
$ git config --global user.name "Your Name"
$ git config --global user.email yourname@example.com
```

### 第三步 从服务器中拉取项目
这一步的前提是服务器端的仓库已经存在。
以下是命令：
```shell
$ cd ~ # 这里可以进入到你想进入的目录，只要保证这个目录下没有和项目名称重合的文件夹即可
$ git clone git@192.168.1.5:/opt/git/project.git # 这里就是最常见的git拉取命令
Cloning into 'project'...
warning: You appear to have cloned an empty repository.
```

### 第四步 提交更改到服务器
这一步已经是很平常的步骤了，相信已经很简单了：
```shell
$ cd ~/project
$ echo '# Hello World!' > README.md
$ git add .
$ git commit -m 'This is the first commit.'
$ git push origin master
```







[0]:[https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E5%8D%8F%E8%AE%AE]
[1]:[https://help.github.com/en/articles/connecting-to-github-with-ssh]