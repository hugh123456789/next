---
title: 'Git'
description: ''
date: 2025-07-19 10:00:00

---
# Git

## **一、Git 基础概念**

- **工作区 (Workspace)：** 你在本地文件系统中看到的目录和文件。
- **暂存区 (Staging Area / Index)：** 用于临时存放要提交的更改。
- **本地仓库 (Local Repository)：** 存储提交历史的本地数据库。
- **远程仓库 (Remote Repository)：** 托管在服务器上的仓库，用于团队协作和备份。

## **二、Git 常用命令**

### **1. 初始化与克隆**

- `git init`：在当前目录初始化一个新的 Git 仓库。
- `git clone <远程仓库URL>`：克隆一个远程仓库到本地。

### **2. 提交与修改**

- `git status`：查看工作区和暂存区的状态。

- ```
  git add <文件>
  ```

  ：将文件添加到暂存区。

  - `git add .`：添加所有更改。
  - `git add -p`：交互式地添加更改。

- ```
  git commit -m "<提交信息>"
  ```

  ：提交暂存区的更改到本地仓库。

  - `git commit -am "<提交信息>"`：将 `add` 和 `commit` 合并为一步。
  - `git commit --amend`：修改上一次提交。

- ```
  git rm <文件>
  ```

  ：从工作区和暂存区删除文件。

  - `git rm --cached <文件>`：只从暂存区删除文件，保留工作区文件。

- `git mv <原文件名> <新文件名>`：移动或重命名文件。

- `git diff`：比较工作区和暂存区的差异。

- `git diff --cached`：比较暂存区和上次提交的差异。

- `git diff HEAD`：比较工作区和上次提交的差异。

### **3. 分支管理**

- `git branch`：列出所有本地分支。

- `git branch -a`：列出所有本地和远程分支。

- `git branch <分支名>`：创建一个新的本地分支。

- ```
  git checkout <分支名>
  ```

  ：切换到指定分支。

  - `git checkout -b <分支名>`：创建并切换到新的分支。

- `git merge <分支名>`：将指定分支合并到当前分支。

- `git branch -d <分支名>`：删除本地分支。

- `git push origin <分支名>`：将本地分支推送到远程仓库。

- `git push origin -d <分支名>`：删除远程分支。

### **4. 远程仓库操作**

- `git remote add origin <远程仓库URL>`：添加一个远程仓库。
- `git remote -v`：查看远程仓库的详细信息。
- `git fetch`：从远程仓库获取最新的提交，但不合并到本地分支。
- `git pull`：从远程仓库获取最新的提交并合并到本地分支。
- `git push`：将本地提交推送到远程仓库。

### **5. 版本回退**

- `git log`：查看提交历史。

- ```
  git reset --hard <commit ID>
  ```

  ：回退到指定的提交。

  - `git reset --hard HEAD^`：回退到上一次提交。

- `git revert <commit ID>`：创建一个新的提交，撤销指定提交的更改。

### **6. 储藏 (Stashing)**

- `git stash`：储藏当前的更改。
- `git stash list`：列出所有储藏。
- `git stash apply`：应用最近一次储藏。
- `git stash pop`：应用最近一次储藏并从储藏列表中删除。
- `git stash drop`：删除指定的储藏。

### **7. 标签 (Tagging)**

- `git tag`：列出所有标签。
- `git tag <标签名>`：创建一个新的标签。
- `git tag -a <标签名> -m "<标签信息>"`：创建一个带注释的标签。
- `git push --tags`：推送所有标签到远程仓库。

## **三、Git 工作流程**

一个典型的工作流程如下：

1. 克隆远程仓库：`git clone <远程仓库URL>`
2. 创建新的分支：`git checkout -b <分支名>`
3. 进行代码修改。
4. 将更改添加到暂存区：`git add .`
5. 提交更改：`git commit -m "<提交信息>"`
6. 推送分支到远程仓库：`git push origin <分支名>`
7. 在远程仓库发起 Pull Request (PR)。
8. 代码审查和合并。
9. 更新本地主分支：`git checkout main`，`git pull origin main`



## 四、常用 Git 命令速查**

| 命令           | 描述               |
| -------------- | ------------------ |
| `git init`     | 初始化本地仓库     |
| `git clone`    | 克隆远程仓库       |
| `git status`   | 查看状态           |
| `git add`      | 添加到暂存区       |
| `git commit`   | 提交更改           |
| `git branch`   | 管理分支           |
| `git checkout` | 切换分支           |
| `git merge`    | 合并分支           |
| `git pull`     | 拉取远程更新并合并 |
| `git push`     | 推送本地提交       |
| `git log`      | 查看提交历史       |
| `git reset`    | 版本回退           |
| `git revert`   | 撤销提交           |
| `git remote`   | 管理远程仓库       |
| `git stash`    | 储藏更改           |
| `git tag`      | 管理标签           |