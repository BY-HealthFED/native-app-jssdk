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

`sendSMS(mobile: string, message: string): void`

### 批量发送短信到手机号列表

`batchSendSMS(mobiles: Array<string>, message: string): void`

### 关闭WebView窗口

`closeWindow(): void`

### 设置WebView的标题

`setTitle(title: string): void`

### 弹出提示消息

`alert(message: string): void`

### 获取用户信息

`userInfo(): Promise<Object>`

### 调用手机振动

`mobileVibrate(): void`
