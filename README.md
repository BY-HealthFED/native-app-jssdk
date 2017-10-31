# Native App JSSDK

汤臣倍健营养家 APP JSSDK

## 安装

推荐使用yarn安装：`yarn add @byhealth/native-jssdk`

或使用NPM安装：`npm install @byhealth/native-jssdk`

## 使用

```javascript
import { scanQrCode, closeWindow } from '@byhealth/native-jssdk';

scanQrCode()
  .then(result => {
    // result 是识别后的结果
  });

closeWindow(); // 关闭当前WebView
```

## API

### 打开摄像头，扫描识别条形码

`scanBarCode(): Promise<string>`

### 打开摄像头，扫描识别二维码

`scanQrCode(): Promise<string>`

### 发送短信到手机号

`sendSMS(mobile: string, message: string): Promise<void>`

### 批量发送短信到手机号列表

`batchSendSMS(mobiles: Array<string>, message: string): Promise<void>`

### 关闭WebView窗口

`closeWindow(): Promise<void>`

### 设置WebView的标题

`setTitle(title: string): Promise<void>`

### 弹出提示消息

`alert(message: string): Promise<void>`

### 获取用户信息

`userInfo(): Promise<Object>`

### 调用手机振动

`mobileVibrate(): Promise<void>`

### 调用系统分享功能

`share(info: Object): Promise<void>`

  > info.title: 分享标题
  >
  > info.content: 分享内容
  >
  > info.image: 分享图片
  >
  > info.url: 分享链接

### 显示右上角导航按钮

`showNavRightButton(text: string, onClick: function): Promise<void>`

### 隐藏已显示的右上角导航按钮

`hiddenNavRightButton(): Promise<void>`
