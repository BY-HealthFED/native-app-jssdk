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

### `scanBarCode(): Promise<string>`

  打开摄像头，扫描识别条形码

  > 返回结果:
  > * 识别的文本

### `scanQrCode(): Promise<string>`

  打开摄像头，扫描识别二维码

  > 返回结果:
  > * 识别的文本 (Android端识别到是防伪码链接，只会返回二维码)

### `sendSMS(mobile: string, message: string): Promise<void>`

  发送短信到手机号

  > 参数列表：
  > * mobile: 手机号码
  > * message: 默认发送消息
  >
  > 返回结果:
  > * 无

### `batchSendSMS(mobiles: Array<string>, message: string): Promise<void>`

  批量发送短信到手机号列表

  > 参数列表：
  > * mobiles: 手机号码数组: ['13800138000', '13800138001']
  > * message: 默认发送消息
  >
  > 返回结果:
  > * 无

### `closeWindow(): Promise<void>`

  关闭WebView窗口

  > 返回结果:
  > * 无

### `goBack(): Promise<void>`

  当前页面有上一级页面时，调用会返回上一页面；
  如果页面没有上一级页面，则关闭当前页面（Android不关闭）。

  > 返回结果:
  > * 无

### `goToPage(type: any): Promise<void>`

  跳转到指定页面

  > 参数列表：
  > * type: 目前只识别参数值“1”，跳转到“中奖明细”页面
  >
  > 返回结果:
  > * 无

### `listenBack(cb: Function): Promise<void>`

  监听返回按钮事件，**注意：页面跳转之前要通过 `unlistenBack` 取消监听**

  > 参数列表：
  > * cb: 点击返回按钮时候的回调
  >
  > 返回结果:
  > * 无

### `unlistenBack(): Promise<void>`

  取消监听返回按钮事件

  > 返回结果:
  > * 无

### `setTitle(title: string): Promise<void>`

  设置WebView的标题

  > 参数列表：
  > * title: 要设置的标题
  >
  > 返回结果:
  > * 无

### `alert(message: string): Promise<void>`

  弹出提示消息

  > 参数列表：
  > * message: 要弹出的消息
  >
  > 返回结果:
  > * 无 (无阻塞)

### `userInfo(): Promise<Object>`

  获取用户信息

  > 返回结果:
  > * 用户信息

### `mobileVibrate(): Promise<void>`

  调用手机振动

  > 返回结果:
  > * 无

### `share(info: Object): Promise<void>`

  调用系统分享功能

  > 参数列表：
  > * info.title: 分享标题
  > * info.content: 分享内容
  > * info.image: 分享图片
  > * info.url: 分享链接
  >
  > 返回结果:
  > * 无

### `showNavRightButton(text: string, onClick: function): Promise<void>`

  显示右上角导航按钮

  > 返回结果:
  > * 无

### `hiddenNavRightButton(): Promise<void>`

  隐藏已显示的右上角导航按钮

  > 返回结果:
  > * 无

### `playMusic(url: string): Promise<void>`

  开始播放音乐

  > 返回结果:
  > * 无

### `pauseMusic(): Promise<void>`

  暂停播放音乐

  > 返回结果:
  > * 无

### `resumeMusic(): Promise<void>`

  恢复播放音乐

  > 返回结果:
  > * 无

### `isApp(): Boolean`

  检测是否在App浏览器下运行

## FAQ

  1. Android的 `scanQrCode` 方法会去掉防伪码前面的url，而iOS不会；
  1. Android和iOS不允许重复调用 `playMusic` 播放音乐；
  1. iOS端的API不能连续调用，会因为 **document.location.href** 变化太快而调用失败；
