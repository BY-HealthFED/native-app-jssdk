# Native App JSSDK

汤臣倍健营养家 APP JSSDK

## 安装

推荐使用yarn安装：`yarn add @byhealth/native-app-jssdk`

或使用NPM安装：`npm install @byhealth/native-app-jssdk`

## 使用

```javascript
import { scanQrCode, closeWindow } from '@byhealth/native-app-jssdk';

scanQrCode()
  .then(result => {
    // result 是识别后的结果
  });

closeWindow(); // 关闭当前WebView
```

## API

### 打开摄像头，扫描识别条形码  `scanBarCode(): Promise<string>`

  返回结果:
  > 识别的文本

### 打开摄像头，扫描识别二维码  `scanQrCode(): Promise<string>`

  返回结果:
  > 识别的文本

### 发送短信到手机号  `sendSMS(mobile: string, message: string): Promise<void>`

  参数列表：
  > mobile: 手机号码
  >
  > message: 默认发送消息

  返回结果:
  > 无

### 批量发送短信到手机号列表  `batchSendSMS(mobiles: Array<string>, message: string): Promise<void>`

  参数列表：
  > mobiles: 手机号码数组
  >
  > message: 默认发送消息

  返回结果:
  > 无

### 关闭WebView窗口  `closeWindow(): Promise<void>`

  返回结果:
  > 无

### 返回页面  `goBack(): Promise<void>`

  当前页面有上一级页面时，调用会返回上一页面；
  如果页面没有上一级页面，则关闭当前页面（Android不关闭）。

  返回结果:
  > 无

### 跳转到指定页面  `goToPage(type: any): Promise<void>`

  参数列表：
  > type: 目前只识别参数值“1”，跳转到“中奖明细”页面

  返回结果:
  > 无

### 监听返回按钮事件  `listenBack(cb: Function): Promise<void>`

  参数列表：
  > cb: 点击返回按钮时候的回调

  返回结果:
  > 无

### 取消监听返回按钮事件  `unlistenBack(): Promise<void>`

  返回结果:
  > 无

### 设置WebView的标题  `setTitle(title: string): Promise<void>`

  参数列表：
  > title: 要设置的标题

  返回结果:
  > 无

### 弹出提示消息  `alert(message: string): Promise<void>`

  参数列表：
  > message: 要弹出的消息

  返回结果:
  > 无 (无阻塞)

### 获取用户信息  `userInfo(): Promise<Object>`

  返回结果:
  > 当前登录用户信息

### 调用手机振动  `mobileVibrate(): Promise<void>`

  返回结果:
  > 无

### 调用系统分享功能  `share(info: Object): Promise<void>`

  参数列表：
  > info.title: 分享标题
  >
  > info.content: 分享内容
  >
  > info.image: 分享图片
  >
  > info.url: 分享链接

  返回结果:
  > 无

### 显示右上角导航按钮  `showNavRightButton(text: string, onClick: function): Promise<void>`

  返回结果:
  > 无

### 隐藏已显示的右上角导航按钮  `hiddenNavRightButton(): Promise<void>`

  返回结果:
  > 无

### 开始播放音乐 `playMusic(url: string): Promise<void>`

  返回结果:
  > 无

### 暂停播放音乐 `pauseMusic(): Promise<void>`

  返回结果:
  > 无

### 恢复播放音乐 `resumeMusic(): Promise<void>`

  返回结果:
  > 无

## FAQ

  1. Android的 `scanQrCode` 方法会去掉防伪码前面的url，而iOS不会；
  1. Android和iOS重复调用 `playMusic` 都方法不会重新播放音乐；
  1. iOS端的API不能连续调用，会因为 **document.location.href** 变化太快而调用失败；
