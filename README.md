# noder-react-native

这是一个基于 [react-native](https://github.com/facebook/react-native) 的 [cnodejs](https://cnodejs.org/) 客户端，只支持 iOS 平台，目前还在完善中。



## Install
1. 进入根目录执行 `npm install`
2. 安装 [react-native-navigation](https://github.com/wix/react-native-navigation)：[文档](http://wix.github.io/react-native-navigation/#/installation-ios)
3. 安装 [react-native-qrcode-scanner](https://github.com/moaazsidat/react-native-qrcode-scanner)：[文档](https://github.com/moaazsidat/react-native-qrcode-scanner)
4. 进入 ios 目录，执行`pod install`(事先安装[CocoaPods](https://cocoapods.org/))

## 技术
原生第三方库
1. [HTMLKit](https://github.com/iabudiab/HTMLKit) HTML 的解析
2. [AsyncDisplayKit](https://github.com/facebook/AsyncDisplayKit) 渲染图文混排的页面（HtmlRender）

react-native 第三方库
1. [react-native-navigation](https://github.com/wix/react-native-navigation) 用于页面管理和跳转
2. [react-native-qrcode-scanner](https://github.com/moaazsidat/react-native-qrcode-scanner) 用于扫描二维码
3. [react-native-htmlview](https://github.com/jsdf/react-native-htmlview) 显示回复内容
4. [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view) 首页的滚动视图管理

## 设计

部分设计照搬了锤子论坛安卓客户端。项目中包含了设计的源文件，请用 Sketch 43.0 以上版本打开根目录的 Noder 文件。

![image](Preview.png)

## License
[MIT](http://mit-license.org/)
