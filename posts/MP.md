---
title: 'mp'
description: ''
date: 2025-07-19 10:00:00
image: './image/6.jpg'
---

# 微信小程序（https://developers.weixin.qq.com/miniprogram/dev/framework/）

## 项目结构

## WXML

```
div---->view   		span---->text			img---->image		a---->navigator           
```

## WXSS

```
rpx
```

根目录下的wxss作用于所有小程序页面

局部页面的wxss仅对当前页面生效

## JS

App()

Page(）

## 组件

```
可滚动视图：scroll-view
轮播图：swiper-item
```

## Swiper

```
<!--pages/swiper/swiper.wxml-->
<swiper class="outer" indicator-dots indicator-color="royalblue" indicator-active-color="red" autoplay circular interval="1000">
  <swiper-item>
    <view class="item item1">A</view>
  </swiper-item>
  <swiper-item>
    <view class="item item2">B</view>
  </swiper-item>
  <swiper-item>
    <view class="item item3">C</view>
  </swiper-item>
</swiper>


/* pages/swiper/swiper.wxss */
.outer {
  height: 150px;
  border: 1px solid red;
}

.item {
  height: 100px;
  line-height: 150px;
  text-align: center;
}

.item1 {
  background-color: red;
}

.item2 {
  background-color: royalblue;
}

.item3 {
  background-color: rgb(187, 255, 0);
}
```

## Text

```
<!--pages/text/text.wxml-->
<view class="outer">
  <text selectable>18000000000</text>                支持长按选择
</view>
```

