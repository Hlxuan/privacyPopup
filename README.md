# 微信小程序隐私授权弹窗
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/Hlxuan/privacyPopup) ![GitHub issues](https://img.shields.io/github/issues/Hlxuan/privacyPopup) ![GitHub Stars](https://img.shields.io/github/stars/Hlxuan/privacyPopup)



- [微信小程序隐私授权弹窗](#微信小程序隐私授权弹窗)
  - [前言](#前言)
  - [效果预览](#效果预览)
  - [示例](#示例)
  - [环境要求](#环境要求)
  - [调试说明](#调试说明)
  - [使用教程](#使用教程)
    - [npm 方式](#npm-方式)
      - [（一） 项目根目录运行命令安装](#一-项目根目录运行命令安装)
      - [（二）微信开发者工具上方菜单栏 `工具 -> 构建npm` 。](#二微信开发者工具上方菜单栏-工具---构建npm-)
      - [（三）声明组件](#三声明组件)
    - [源码引入](#源码引入)
      - [（一）引入组件](#一引入组件)
      - [（二）声明组件](#二声明组件)
    - [使用组件](#使用组件)
      - [npm引入](#npm引入)
      - [源码引入](#源码引入-1)
        - [属性说明](#属性说明)
        - [Tips](#tips)
  - [问题反馈](#问题反馈)
  - [License](#license)
  - [我的网站](#我的网站)
  - [支持作者](#支持作者)
  - [公众号](#公众号)



## 前言

> 2023年9月14日更新

微信团队于2023年9月14日发布公告[《关于小程序隐私保护指引设置的再次公告》](https://mp.weixin.qq.com/s/5Ud3AE2tXBDhOaWiQRfK_Q)，隐私相关功能启用时间延期至**2023年10月17日**。

自2023年10月17日起，平台提供统一的弹窗设计，无需开发者适配开发，自动向 C 端用户展示。

![](https://images.hlxuan.top/2023/09/9031917d9721eae6.png)


也就是说，开发者可以选择不修改，到时候会有官方的弹窗，开发者适配下报错即可。

需要注意的是，用户可能拒绝官方隐私授权弹窗，为了避免过度弹窗打扰用户，开发者再次调用隐私相关接口时，若距上次用户拒绝不足10秒，将不再触发弹窗，直接给到开发者用户拒绝隐私授权弹窗的报错。


具体可参考文档：[《小程序隐私协议开发指南》](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html#%E5%85%AD%E3%80%81%E5%AE%98%E6%96%B9%E9%9A%90%E7%A7%81%E5%BC%B9%E7%AA%97%E5%8A%9F%E8%83%BD%E8%AF%B4%E6%98%8E)



----


微信团队于2023年8月14日发布公告[《关于小程序隐私保护指引设置的公告》](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11691660367cfUvX&version=&lang=zh_CN&token=)，在小程序内调用与隐私相关的接口或组件，需要先在后台完善和更新《小程序用户隐私保护指引》，完善后还需要开发者在小程序内弹窗获取用户授权，用户授权同意后方可调用隐私相关接口或组件。

我封装了一个隐私授权弹窗（**非官方**），大家可以参考或者直接引入在自己的代码里面使用，部分代码参考了官方Demo。


## 效果预览
![](https://images.hlxuan.top/2023/08/ac737c2946d36e40.PNG)


## 示例 
|场景|页面路径|说明|
|---|---|---|
|首页弹窗|[pages/home/home](pages/home)|在首页的时候进行授权弹窗，用户授权后在有效期内不会再弹窗，相关隐私接口和组件方可正常使用。|
|获取手机号|[pages/phoneNumber/phoneNumber](pages/phoneNumber)|点击“点击获取手机号”按钮后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行获取手机号操作，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限，不会影响下次点击，也不会出现点击频繁的问题。|
|拍摄或从手机相册中选择图片或视频|[pages/chooseMedia/chooseMedia](pages/chooseMedia)|调用`wx.chooseMedia`（这里只是举例，你也可以用其他的API）后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限。|
|头像昵称填写|[pages/userProfile/userProfile](pages/userProfile)|用户点击头像按钮或昵称输入框后，系统会判断是否需要进行隐私授权弹窗，若用户同意则继续执行，在授权有效期内不会再次弹窗；若用户拒绝则直接走fail提示没有权限。|
|使用你的相册（仅写入）权限|[pages/writePhotosAlbum/writePhotosAlbum](pages/writePhotosAlbum)|这里会触发两次弹窗：用户之前未授权`scope.writePhotosAlbum`时会触发一次官方的授权弹窗；若用户未进行隐私授权，开发者自定义的授权弹窗会触发一次。|
|耦合使用|[pages/coupling/coupling](pages/coupling)|**基础库 2.32.3 版本起，**隐私同意按钮支持与手机号快速验证组件、手机号实时验证组件、获取用户信息组件耦合使用。耦合能力是为了满足让用户勾选同意隐私协议后点击登录按钮这种情况设计的。用户同意按钮后，相关的接口可以正常使用。|

持续更新中......


## 环境要求
小程序基础库 **2.32.3** 及以上。

低于 2.32.3 版本的基础库未集成隐私相关功能，也不会拦截隐私接口调用。


## 调试说明
1、在2023年9月15日前，开发者可以在`app.json`文件里面配置`"__usePrivacyCheck__": true`方可启用隐私相关功能。

2、在2023年9月15日之后，不论 `app.json` 文件里面是否有配置` __usePrivacyCheck__`，隐私相关功能都会启用。

更多可参考“小程序隐私协议开发指南”（内含官方DEMO）：[https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)


## 使用教程

### npm 方式

#### （一） 项目根目录运行命令安装
```bash
npm i privacy-popup-miniprogram
```


#### （二）微信开发者工具上方菜单栏 `工具 -> 构建npm` 。
![](https://images.hlxuan.top/2023/09/bd558f376e6a20e0.png)


#### （三）声明组件

1. 全局引入

在`app.json`文件中配置：
```json
"usingComponents": {
  "privacy-popup": "privacy-popup-miniprogram/privacyPopup"
}
```

2. 页面引入

在页面对应的`.json`文件里面配置：
```json
"usingComponents": {
  "privacy-popup": "privacy-popup-miniprogram/privacyPopup"
}
```


### 源码引入

#### （一）引入组件
将项目中的`components`目录下的`privacyPopup`文件夹复制到自己的项目`components`文件夹中。

#### （二）声明组件

1. 全局引入

在`app.json`文件中配置：
```json
"usingComponents": {
  "privacy-popup": "/components/privacyPopup/privacyPopup"
}
```

2. 页面引入

在页面对应的`.json`文件里面配置：
```json
"usingComponents": {
  "privacy-popup": "/components/privacyPopup/privacyPopup"
}
```


### 使用组件

1. 修改小程序名称

#### npm引入

前往 `/node_modules/privacy-popup-miniprogram/components/privacyPopup/privacyPopup.js`文件，修改`data`里面的`miniprogramName`的值为自己的小程序名称。
![](https://images.hlxuan.top/2023/09/9628caa87687da6f.png)

修改后保存，前往微信开发者工具上方菜单栏 `工具 -> 构建npm` 。
![](https://images.hlxuan.top/2023/09/bd558f376e6a20e0.png)


#### 源码引入

前往 `/components/privacyPopup/privacyPopup.js`文件，修改`data`里面的`miniprogramName`的值为自己的小程序名称。
![](https://images.hlxuan.top/2023/09/a827f2c8fdce5bae.png)



2. 页面添加代码

在`.wxml`页面中添加组件代码：

```html
<privacy-popup bind:agree="handleAgreePrivacyAuthorization" bind:disagree="handleDisagree" auto="{{false}}" show="{{showPrivacy}}"></privacy-popup>
```

##### 属性说明
| 属性         | 类型        | 默认值 | 必填 | 说明                                 |
| ------------ | :---------- | :----- | :--- | :----------------------------------- |
| auto         | boolean     | true   | 否   | 当系统检测到到用户没有授权时自动弹窗 |
| show  | boolean     | false  | 否   | 显示弹窗                             |
| bindagree | eventhandle |  | 否 | 用户同意时触发，用户之前已经同意或基础库版本**2.32.3以下**默认触发 |
| binddisagree | eventhandle |  | 否 | 用户拒绝时触发 |

##### Tips
1. 如果开发者想在用户使用隐私相关接口时才唤起弹窗，可将属性`auto`设置为`false`，当用户使用隐私相关接口且未授权时，系统会拦截隐私接口的使用并进行弹窗，用户点击“同意”或“拒绝”后隐私相关接口将会继续执行。
2. 开发者可以通过属性`show`自由显示弹窗，“同意”按钮同样可以告知平台用户已经同意授权了。


## 问题反馈

有任何问题，建议通过 [Github issues](https://github.com/Hlxuan/privacyPopup/issues) 反馈或扫码进入「反馈系统」发起反馈。

| 反馈系统网页端                                              | 反馈系统小程序端                                            |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| ![](https://res.hlxuan.top/opendoc/feedback/web/privacy-popup.png) | ![](https://res.hlxuan.top/opendoc/feedback/miniprogram/privacy-popup.png) |

反馈系统网页端：[https://www.hlxuan.top/feedback](https://www.hlxuan.top/feedback/add?section_id=1039)


## License
[MIT License](LICENSE)


## 我的网站
[hlxuan的树屋](https://www.hlxuan.top)

[Hlxuan的开放文档](https://doc.hlxuan.top)


## 支持作者

如果你觉得本组件对你有帮助，欢迎给我打赏一杯咖啡哈~

If you think this components will help you, you can buy the author a cup of coffee~


| 支付宝<br>Alipay                                             | 微信<br>WeChat                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://res.hlxuan.top/opendoc/support-author/alipay.png) | ![](https://res.hlxuan.top/opendoc/support-author/weixin.png) |


## 公众号
微信搜索「**黄朗轩**」关注我的公众号，我们一起探索～
![](https://res.hlxuan.top/opendoc/gzh-banner.png)