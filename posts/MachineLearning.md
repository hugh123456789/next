---
title: 'Machine Learning/Pytorch'
description: ''
date: 2025-07-19 10:00:00

---
# 监督式学习

模型在看到包含正确答案的大量数据后，可以发现产生正确答案的数据元素之间的关联，然后进行预测。这就像学生通过研究包含问题和答案的旧考试来学习新材料。学生在使用足够多的旧版考试进行训练后，就可以做好准备参加新版考试了。这些机器学习系统是“监督式”的，这意味着人类会向机器学习系统提供包含已知正确结果的数据。

监督式学习的两种最常见用例是回归和分类。

## 回归：

可预测数值。例如，用于预测降雨量（以英寸或毫米为单位）的天气模型就是回归模型。

## 分类：

可预测某个对象属于某个类别的可能性。与输出为数字的回归模型不同，分类模型输出的值表示某个对象是否属于特定类别。例如，分类模型用于预测电子邮件是否为垃圾邮件，或照片中是否有猫。

# 非监督式学习

模型通过获得不含任何正确答案的数据来进行预测。非监督式学习模型的目标是找出数据中具有意义的模式。换句话说，模型没有关于如何对每项数据进行分类的提示，而是必须推断自己的规则。

一种常用的非监督式学习模型采用了一种称为聚类的技术。该模型会找到用于划分自然分组的数据点。

## 强化学习

强化学习模型根据在环境中执行的操作获得奖励或惩罚，从而进行预测。强化学习系统会生成政策，定义用于获得最多奖励的最佳策略。

强化学习用于训练机器人执行任务（例如在房间内四处走动）

# 生成式AI

生成式模型最初使用非监督式方法进行训练，在这种方法中，模型会学习模仿其训练数据。有时，系统会使用监督学习或强化学习对与模型可能被要求执行的任务（例如总结文章或编辑照片）相关的特定数据进行进一步训练。

在训练期间，模型会计算可产生最佳结果的权重和偏差 模型。

## 线性回归方程

b：偏差

w：权重

x：变量

![](E:\blog\minor-magnitude\public\images\ML1.png)







# pytorch

Torch是纽约大学在2002年开发的深度学习框架。

# conda（https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/）

https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html

python虚拟环境是为了解决众多的工具包之间版本冲突而设计的一个纯净开发环境，简单地可创建多个虚拟环境，不同的环境中使用不同的工具包，类似docker

```bash
conda create -n test python=3.10

source activate your_env_name

source deactivate

conda remove -n your_env_name –all
```

# 工具： Pycharm、VScode（安装python插件、Python Indent）

安装pytorch：https://pytorch.org/get-started/previous-versions/

```bash
conda install pytorch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0  pytorch-cuda=11.8 -c pytorch -c nvidia
```

pipy配置清华源：https://mirrors.tuna.tsinghua.edu.cn/help/pypi/



------



### conda报错：PS D:\py-project\pyhorch1.2> conda activate base

Invoke-Expression : At line:3 char:846

+ ... lessCommon;"D:\jdk\"\bin;"D:\jdk\"\db\bin;.;C:\WINDOWS;C:\WINDOWS\Sys ...
  -bin\apache-maven-3.8.8\bin;E:\git\Git\cmd;D:\soft;D:\soft\bin;C:\Program Files\Redis;E:\moomallwork\soft\weixin\微信web开发者工具\dll;D:\nvm;D:\node;C:\Program 
  Files\
  dotnet;C:\Program Files\Docker\Docker\resources\bin;C:\Program Files\NVIDIA Corporation\Nsight Compute 2025.1.0;C:\Program Files\NVIDIA Corporation\NVIDIA app\N 
  vDLISR;D:\conda;D:\conda\Library\mingw-w64\bin;D:\conda\Library\usr\bin;D:\conda\Library\bin;D:\conda\Scripts;C:\Users\15398\AppData\Local\Microsoft\WindowsApps 
  ;D:\vscode\Microsoft VS Code\bin;D:\pycharm\PyCharm 2023.3.5\bin;.;E:\download\clion\CLion 2024.1.4\bin;.;D:\nvm;D:\node;C:\Users\15398\AppData\Local\Programs\O 
  llama;%DevEco Studio%;E:\ide\IntelliJ IDEA 2024.2.3\bin;.;D:\software"' in expression or statement.
  At D:\conda\shell\condabin\Conda.psm1:76 char:9

  Invoke-Expression -Command $activateCommand;

+         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ParserError: (:) [Invoke-Expression], ParseException
    + FullyQualifiedErrorId : UnexpectedToken,Microsoft.PowerShell.Commands.InvokeExpressionCommand
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    ### 解决方法：

```
$env:PATH = ""
```

```
$existingPath = $env:PATH 

$newPaths = @(
    "D:\jdk\bin",
    "D:\jdk\db\bin",
    "D:\mysql\mysql-5.7.24-winx64\mysql-5.7.24-winx64\bin",
    "D:\newmaven\apache-maven-3.8.8-bin\apache-maven-3.8.8\bin",
    "E:\git\Git\cmd",
    "D:\soft",
    "D:\soft\bin",
    "C:\Program Files\Redis",
    "E:\moomallwork\soft\weixin\微信web开发者工具\dll",
    "D:\nvm",
    "D:\node",
    "C:\Program Files\dotnet",
    "C:\Program Files\Docker\Docker\resources\bin",
    "C:\Program Files\NVIDIA Corporation\Nsight Compute 2025.1.0",
    "C:\Program Files\NVIDIA Corporation\NVIDIA app\NvDLISR",
    "D:\conda",
    "D:\conda\Library\mingw-w64\bin",
    "D:\conda\Library\usr\bin",
    "D:\conda\Library\bin",
    "D:\conda\Scripts",
    "C:\Users\15398\AppData\Local\Microsoft\WindowsApps",
    "D:\vscode\Microsoft VS Code\bin",
    "D:\pycharm\PyCharm 2023.3.5\bin",
    "E:\download\clion\CLion 2024.1.4\bin",
    "E:\ide\IntelliJ IDEA 2024.2.3\bin",
    # 如果 %DevEco Studio% 是一个变量，确保它在这里之前定义
    "%DevEco Studio%" # 如果这是一个变量，请确保已定义，否则，如果是路径，请加引号，如 "D:\DevEco Studio"
)

$env:PATH = ($newPaths -join ";") + ";" + $existingPath # 追加到现有路径

Write-Host "PATH: $env:PATH" 
```

```
D:\conda\condabin\conda.bat init powershell 
```

```
conda activate <你的环境名称>
```

------

```bash
pip install torch==1.13.1+cu116 torchvision==0.14.1+cu116 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu116
```

## 安装jupyter

```bash
pip install jupyter_contrib_nbextensions jupyter contrib nbextension install --user
```

