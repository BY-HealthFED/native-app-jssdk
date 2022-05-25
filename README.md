# By-Health Native App Jssdk

汤臣倍健营养家App

### 安装

 * Yarn: `yarn add @byhealth/native-app-jssdk`
 * NPM: `npm install @byhealth/native-app-jssdk --save`

### 使用

```javascript
import { scanQrCode, closeWindow } from '@byhealth/native-app-jssdk';

scanQrCode()
  .then(result => {
    // result 是识别后的结果
    console.log(result);
  });

closeWindow();
```

### 更新

 * 生成 TypeScript 类型定义，使用 VSCode 可获得更佳体验；
 * 无回调或返回的接口，不再返回Promise对象；
 * 重写 iOS 端调用方法，支持连续调用接口（1.x不支持）；

## API 文档

[文档地址](https://by-healthfed.github.io/native-app-jssdk/)

## FAQ
 - Android的 scanQrCode 方法会去掉防伪码前面的url，而iOS不会；
 - Android和iOS不允许重复调用 playMusic 播放音乐；


## Changelog

### `2.6.0`
 - 【新增】 `getDeviceInfo` 获取设备信息接口
 - 【修改】 `createCallback` 添加超时参数

### `2.5.3`
 - 【修改】 更新 `scanQrCode` 和 `scanBarCode` 调用新接口

### `2.5.0`
 - 【新增】 `openMiniProgram` 打开微信小程序JSSDK

### `2.4.1`
 - 【新增】 `minVersion` 判断当前版本是否符合条件
 - 【修改】 `openNativeView` 新增第三个参数，允许传递对象给窗口

### `2.3.0`
 - 【新增】 `saveWebImage` 保存远程文件到相册

### `2.0.1`
 - 修复 NodeJs 服务端找不到 window 的问题；

### `2.0.0`
 - 使用 TypeScript 重写SDK；
 - 支持 ES6 语法导出模块；
 - 支持多个接口连续调用；
