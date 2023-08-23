# 微信小程序隐私授权弹窗
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/Hlxuan/privacyPopup) ![GitHub issues](https://img.shields.io/github/issues/Hlxuan/privacyPopup) ![GitHub Stars](https://img.shields.io/github/stars/Hlxuan/privacyPopup)


## 前言
微信团队于2023年8月14日发布公告[《关于小程序隐私保护指引设置的公告》](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11691660367cfUvX&version=&lang=zh_CN&token=)，在小程序内调用与隐私相关的接口或组件，需要先在后台完善和更新《小程序用户隐私保护指引》，完善后还需要开发者在小程序内弹窗获取用户授权，用户授权同意后方可调用相关接口或组件。

我封装了一个隐私授权弹窗，大家可以参考。
![](https://images.hlxuan.top/2023/08/ac737c2946d36e40.PNG)


## 环境要求
小程序基础库 2.32.3 及以上（本组件已经进行了低版本兼容处理）


## 说明
在2023年9月15日前，开发者可以在`app.json`文件里面配置`"__usePrivacyCheck__": true`方可启用隐私相关功能。

小程序隐私协议开发指南（内含官方DEMO）：[https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)

**使用之前需要将项目里的`AppId`换成自己的，目前是只能使用正式号来测试。**


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