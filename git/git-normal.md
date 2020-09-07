## 使用Git的常见场景以及应对方式

### 场景一：
##### 当前分支上存在不能短时间完成的任务，同时需要在主分支上紧急修复BUG时
### 应对方式：
##### 第一步： 暂存当前分支上的任务
```git
git stash
```
##### 第二步：新建一个修复问题的临时分支
```git
git switch -c issue-01
```
##### 第三步：完成临时分支上的任务后提交
```git
git add <file>
git commit -m "fix issue-01"
```
##### 第四步：合并提交至主分支
```git
git switch master
git merge --no-ff -m "merge fix issue-01" issus-01
```
##### 第五步：删除临时分支
```git
git branch -d issus-01
```
##### 第六步：回到开发分支，并入修复的版本
```git
git switch dev
// 这里假设刚刚issue-01提交的id是de6de6，需要自己查看自己的
git cherry-pick de6de6
```
##### 第七步：恢复暂存的任务
```git
git stash pop
```
##### 到这里就已经可以继续你之前的开发任务了

### 场景二：
##### 恢复由于误操作stash pop了未被git追踪(Untracked)的更改而导致的更改丢失
### 应对方式：
##### 第一步： 切换到丢失的分支
```git
git switch branch-missing
```
##### 第二步：找出最近一次CommitID(git stash会产生一个CommitID)
```git
// 这里使用如下命令能够清晰的看到最近一次commit的id
git log --graph --oneline $(git fsck | awk '/dangling commit/ {print $3}')

// 当然直接使用如下的命令也可以，一般第一个就是最近的commit
git fsck

// 二选其一即可，然后复制CommitID备用
// CommitID可以是全的也可以是前面一段，只要能让git准确找到对应的commit即可
```
##### 第三步：恢复
```git
git stash apply <CommitID>
```
##### 此时就能发现丢失的未被追踪的更改都找回了
