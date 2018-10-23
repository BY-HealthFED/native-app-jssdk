# By-Health Native App Jssdk

汤臣倍健营养家App

### 安装

 * Yarn: `yarn add @byhealth/native-app-jssdk@next`
 * NPM: `npm install @byhealth/native-app-jssdk@next --save`

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

## API 文档

[文档地址](https://by-healthfed.github.io/native-app-jssdk/globals.html#alert)
