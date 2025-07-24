---
title: 'CSS'
description: ''
date: 2025-07-19 10:00:00
image: './image/11.jpg'
---
# CSS

## resize:

```css
/*水平方向调整大小 和overflow一起用*/
.box{
            width: 200px;
            height: 200px;
            background-color: royalblue;
            resize: horizontal;
            overflow: hidden;
        }

```

## box-shadow

```css
  .box {
            width: 200px;
            height: 200px;
            background-color: royalblue;
            margin: 0 auto;
      /* 水平位置 垂直位置 模糊程度 外延值 颜色 内外*/
            box-shadow: 10px 10px 5px 3px #888888 inset;
        }
      /* 水平位置 垂直位置 模糊程度  颜色 */
            box-shadow: 10px 10px 5px #888888 ;
```

## opacity（0~1）透明度整个元素增加透明效果

# background

```css
.box{
            background-image: url(../../public/1.gif);
            background-size: cover;					/**/
            background-repeat: no-repeat;           /*是否重复*/
            background-origin: content-box;        /*背景图起点*/
    		background-clip: padding-box;             /*超出padding的内容不呈现*/
}
```

## border

```css
 border-top-left-radius: 30px 20px;      /*椭圆的X半径=30，y半径=20*/
```

## 文本溢出

```css
white-space:nowrap;
text-overflow: ellipsis;
overflow: hidden;
```

## 换行

```css
white-space: pre-wrap;     			pre按照原文显示 		pre-line去掉左右空格
```

```
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(7,94,179,1)"><path d="M9.97308 18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM14 20H10V21H14V20ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992ZM13 10.0048H15.5L11 16.0048V12.0048H8.5L13 6V10.0048Z"></path></svg>');

```

## 变换

### 位移：transform: translate(-50%, -50%);

```css
.outer {
				width: 200px;
				height: 200px;
				border: 2px solid #000;
				margin: 0 auto;
				position: relative;
			}
			.inner {
				width: 200px;
				height: 200px;
				background-color: aquamarine;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);       /*参考自身的宽高*/
			}
```

### 缩放：transform: scale(0.5)

```css
/*修改字体大小*/
span{
				font-size: 20px;
				display: inline-block;
				transform: scale(0.5);
				
}
```

### 旋转：transform: rotateZ(70deg);

## 过渡

```css
.box{
		width: 200px;
		height: 200px;
		background-color: royalblue;
		transition-property: height;    /*颜色、长度、百分比*/
		transition-duration: 0.3s;
    	 transition-delay: 10s;
transition-timing-function: linear; /*ease 慢快慢； linear 匀速 ; ease-in 越来越快* ；ease-out 越来越慢；贝塞尔曲线*/
	}
	.box:hover{
		height: 400px;
	}
```

## 多列布局

```css
column-count: 3;	
column-gap: 100px;  /*列间距*/
column-rule: 10px dashed black;
```



## **伸缩盒模型**

```css
display: flex;              /*父容器开启flex布局*/
display: inline-flex;        

```

```css
主轴方向 →
侧轴↓

flex-direction: column;            /*row水平  column垂直*/

/*主轴换行方式*/
flex-wrap: wrap;

/*主轴的对齐方式*/
justify-content: flex-start;    /*start 从起始位置开始  center 居中 
space-around均匀分布在一行中,项目间距离为2X,边缘项目距离边缘为距离X
space-between均匀分布在一行中,项目间距离相等,边缘项目距离边缘没有距离
space-evenly均匀分布在一行中*/

/*侧轴对齐方式*/
单行 :
align-items: flex-end;       /*center flex-start stretch(默认) baseline*/
多行:
align-content: center;       /*侧轴起始位置对齐  space-between space-evenly space-around  stretch(默认)*/

```

### 居中

```css
	.outer{
				width: 400px;
				height: 400px;
				background-color: royalblue;
				display: flex;
				align-items: center;
				justify-content: center;
			}
```

### 伸缩

```css
flex-grow: 1;   /*比例*/
flex-shrink: 1;    /*收缩比*/
```

