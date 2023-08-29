# 微信小程序隐私授权弹窗
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/Hlxuan/privacyPopup) ![GitHub issues](https://img.shields.io/github/issues/Hlxuan/privacyPopup) ![GitHub Stars](https://img.shields.io/github/stars/Hlxuan/privacyPopup)


- [微信小程序隐私授权弹窗](#微信小程序隐私授权弹窗)
  - [前言](#前言)
  - [效果预览](#效果预览)
  - [示例](#示例)
  - [环境要求](#环境要求)
  - [调试说明](#调试说明)
  - [使用教程](#使用教程)
    - [（一）引入组件](#一引入组件)
    - [（二）声明组件](#二声明组件)
    - [（三）使用组件](#三使用组件)
      - [属性说明](#属性说明)
      - [Tips](#tips)
  - [我的网站](#我的网站)
  - [License](#license)
  - [支持作者](#支持作者)
  - [公众号](#公众号)


## 前言

微信团队于2023年8月14日发布公告[《关于小程序隐私保护指引设置的公告》](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11691660367cfUvX&version=&lang=zh_CN&token=)，在小程序内调用与隐私相关的接口或组件，需要先在后台完善和更新《小程序用户隐私保护指引》，完善后还需要开发者在小程序内弹窗获取用户授权，用户授权同意后方可调用相关接口或组件。

我封装了一个隐私授权弹窗，大家可以参考（**非官方**）。


## 效果预览
![](https://images.hlxuan.top/2023/08/ac737c2946d36e40.PNG)


## 示例 
|场景|页面路径|说明|
|---|---|---|
|首页弹窗|[pages/home/home](pages/home)|在首页的时候进行授权弹窗，用户授权后在有效期内不会再弹窗，相关隐私接口和组件方可正常使用。|
|获取手机号|[pages/phoneNumber/phoneNumber](pages/phoneNumber)|点击“点击获取手机号”按钮后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行获取手机号操作，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限，不会影响下次点击，也不会出现点击频繁的问题。|
|拍摄或从手机相册中选择图片或视频|[pages/chooseMedia/chooseMedia](pages/chooseMedia)|调用`wx.chooseMedia`（这里只是举例，你也可以用其他的API）后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限。|
|头像昵称填写|[pages/userProfile/userProfile](pages/userProfile)|用户点击头像按钮或昵称输入框后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限。|

持续更新中......


## 环境要求
小程序基础库 **2.32.3** 及以上（本组件已经进行了低版本兼容处理）


## 调试说明
1、在2023年9月15日前，开发者可以在`app.json`文件里面配置`"__usePrivacyCheck__": true`方可启用隐私相关功能。

2、在2023年9月15日之后，不论 app.json 中是否有配置` __usePrivacyCheck__`，隐私相关功能都会启用。

更多可参考“小程序隐私协议开发指南”（内含官方DEMO）：[https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)


## 使用教程
> 使用之前需要将项目里的`AppId`换成自己的，目前是只能使用正式号来测试，需要先在小程序后台配置《小程序用户隐私保护指引》，只有在《小程序用户隐私保护指引》里面声明的相关接口才能使用。

### （一）引入组件
将项目中的`component`目录下的`privacyPopup`文件夹复制到自己的项目`component`文件夹中。

### （二）声明组件
1. 全局引入

在`app.json`文件中配置：
```json
"usingComponents": {
  "privacy-popup": "/component/privacyPopup/privacyPopup"
}
```

2. 页面引入
在页面对应的`.json`文件里面配置：
```json
"usingComponents": {
  "privacy-popup": "/component/privacyPopup/privacyPopup"
}
```

### （三）使用组件
在`.wxml`页面中添加组件代码：
```html
<privacy-popup bind:agree="handleAgreePrivacyAuthorization" bind:disagree="handleDisagree" auto="{{false}}" showPrivacy="{{showPrivacy}}"></privacy-popup>
```

#### 属性说明
| 属性         | 类型        | 默认值 | 必填 | 说明                                 |
| ------------ | :---------- | :----- | :--- | :----------------------------------- |
| bindagree    | eventhandle |       | 否   | 用户点击“同意”按钮时触发             |
| binddisagree | eventhandle |       | 否   | 用户点击“拒绝”按钮时触发             |
| auto         | boolean     | true   | 否   | 当系统检测到到用户没有授权时自动弹窗 |
| showPrivacy  | boolean     | false  | 否   | 显示弹窗                             |

#### Tips
1. 如果开发者想在用户使用隐私相关接口时才唤起弹窗，可将属性`auto`设置为`false`，当用户使用隐私相关接口且未授权时，系统会拦截隐私接口的使用并进行弹窗，用户点击“同意”或“拒绝”后隐私相关接口将会继续执行。
2. 开发者可以通过属性`showPrivacy`自由显示弹窗，“同意”按钮同样可以告知平台用户已经同意授权了。


## 我的网站
[hlxuan的树屋](https://www.hlxuan.top)

[Hlxuan的开放文档](https://doc.hlxuan.top)


## License
[MIT License](LICENSE)


## 支持作者

如果你觉得本组件对你有帮助，欢迎给我打赏一杯咖啡哈~

If you think this document will help you, you can buy the author a cup of coffee~


| 支付宝<br>Alipay                                           | 微信<br>WeChat                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| ![](https://res.hlxuan.top/opendoc/support-author/alipay.png) | ![](https://res.hlxuan.top/opendoc/support-author/weixin.png) |


## 公众号
微信搜索「**黄朗轩**」关注我的公众号，我们一起探索～
![](https://res.hlxuan.top/opendoc/gzh-banner.png)