# Native App JSSDK

��������Ӫ���� APP JSSDK

## ��װ

�Ƽ�ʹ��yarn��װ��`yarn add @byhealth/native-app-jssdk`

��ʹ��NPM��װ��`npm install @byhealth/native-app-jssdk`

## ʹ��

```javascript
import { scanQrCode, closeWindow } from '@byhealth/native-app-jssdk';

scanQrCode()
  .then(result => {
    // result ��ʶ���Ľ��
  });

closeWindow(); // �رյ�ǰWebView
```

## API

### `scanBarCode(): Promise<string>`

  ������ͷ��ɨ��ʶ��������

  > ���ؽ��:
  > * ʶ����ı�

### `scanQrCode(): Promise<string>`

  ������ͷ��ɨ��ʶ���ά��

  > ���ؽ��:
  > * ʶ����ı� (Android��ʶ���Ƿ�α�����ӣ�ֻ�᷵�ض�ά��)

### `sendSMS(mobile: string, message: string): Promise<void>`

  ���Ͷ��ŵ��ֻ���

  > �����б�
  > * mobile: �ֻ�����
  > * message: Ĭ�Ϸ�����Ϣ
  >
  > ���ؽ��:
  > * ��

### `batchSendSMS(mobiles: Array<string>, message: string): Promise<void>`

  �������Ͷ��ŵ��ֻ����б�

  > �����б�
  > * mobiles: �ֻ���������: ['13800138000', '13800138001']
  > * message: Ĭ�Ϸ�����Ϣ
  >
  > ���ؽ��:
  > * ��

### `closeWindow(): Promise<void>`

  �ر�WebView����

  > ���ؽ��:
  > * ��

### `goBack(): Promise<void>`

  ��ǰҳ������һ��ҳ��ʱ�����û᷵����һҳ�棻
  ���ҳ��û����һ��ҳ�棬��رյ�ǰҳ�棨Android���رգ���

  > ���ؽ��:
  > * ��

### `goToPage(type: any): Promise<void>`

  ��ת��ָ��ҳ��

  > �����б�
  > * type: Ŀǰֻʶ�����ֵ��1������ת�����н���ϸ��ҳ��
  >
  > ���ؽ��:
  > * ��

### `listenBack(cb: Function): Promise<void>`

  �������ذ�ť�¼���**ע�⣺ҳ����ת֮ǰҪͨ�� `unlistenBack` ȡ������**

  > �����б�
  > * cb: ������ذ�ťʱ��Ļص�
  >
  > ���ؽ��:
  > * ��

### `unlistenBack(): Promise<void>`

  ȡ���������ذ�ť�¼�

  > ���ؽ��:
  > * ��

### `setTitle(title: string): Promise<void>`

  ����WebView�ı���

  > �����б�
  > * title: Ҫ���õı���
  >
  > ���ؽ��:
  > * ��

### `alert(message: string): Promise<void>`

  ������ʾ��Ϣ

  > �����б�
  > * message: Ҫ��������Ϣ
  >
  > ���ؽ��:
  > * �� (������)

### `userInfo(): Promise<Object>`

  ��ȡ�û���Ϣ

  > ���ؽ��:
  > * ��ǰ��¼�û���Ϣ

### `mobileVibrate(): Promise<void>`

  �����ֻ���

  > ���ؽ��:
  > * ��

### `share(info: Object): Promise<void>`

  ����ϵͳ������

  > �����б�
  > * info.title: �������
  > * info.content: ��������
  > * info.image: ����ͼƬ
  > * info.url: ��������
  >
  > ���ؽ��:
  > * ��

### `showNavRightButton(text: string, onClick: function): Promise<void>`

  ��ʾ���Ͻǵ�����ť

  > ���ؽ��:
  > * ��

### `hiddenNavRightButton(): Promise<void>`

  ��������ʾ�����Ͻǵ�����ť

  > ���ؽ��:
  > * ��

### `playMusic(url: string): Promise<void>`

  ��ʼ��������

  > ���ؽ��:
  > * ��

### `pauseMusic(): Promise<void>`

  ��ͣ��������

  > ���ؽ��:
  > * ��

### `resumeMusic(): Promise<void>`

  �ָ���������

  > ���ؽ��:
  > * ��

## FAQ

  1. Android�� `scanQrCode` ������ȥ����α��ǰ���url����iOS���᣻
  1. Android��iOS�������ظ����� `playMusic` �������֣�
  1. iOS�˵�API�����������ã�����Ϊ **document.location.href** �仯̫�������ʧ�ܣ�
