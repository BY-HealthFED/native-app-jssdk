/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import compareVersions from 'compare-versions';
import createCallback from './lib/createCallback';
import nativeBridge, { isAppWebview, isAndroid } from './lib/nativeBridge';
import { ShareInfo, UserInfo, NewUserInfo, DeviceInfo } from './types/MemberAppJs';
import * as NativeView from './nativeView';

function noop() {}

/**
 * 当前是否在App环境
 */
export function isApp() {
  return isAppWebview;
}

/**
 * 获取App当前版本信息
 * @returns {Promise<string>} iOS,4.1.0 或者 Android,4.1.0
 */
export function getVersion() {
  return new Promise<string>((resolve, reject) => {
    nativeBridge('getAPPVersion', createCallback(resolve, reject));
  });
}

/**
 * 判断最低版本
 * @param params.Android Android端 最低版本 例如: 4.1.0
 * @param params.iOS iOS端 最低版本 例如: 4.1.0
 * @returns {Promise<string>} 返回当前版本，iOS,4.1.0 或者 Android,4.1.0
 */
export function minVersion({ Android, iOS }: { Android: string; iOS: string }) {
  if (!Android) {
    // tslint:disable-next-line: no-console
    console.error('未传入Android端版本号。');
  }

  if (!iOS) {
    // tslint:disable-next-line: no-console
    console.error('未传入iOS端版本号。');
  }

  return getVersion().then<string>((currentVersion: string) => {
    const [, current] = currentVersion.split(',');
    const minimum = isAndroid ? Android : iOS;

    if (compareVersions(current, minimum) < 0) {
      return Promise.reject(new RangeError(`当前App版本不支持，请更新App版本到 ${minimum} 以上。`));
    }

    return currentVersion;
  });
}

/**
 * 返回上一级页面，如果没有上一级页面，则关闭当前页面。
 */
export function goBack() {
  nativeBridge('goBack');
}

/**
 * 关闭窗口
 */
export function closeWindow() {
  nativeBridge('backToActivityMenu');
}

/**
 * 打开原生视图窗口
 * @param android Android视图名称
 * @param ios iOS视图名称
 * @param obj 传参对象，JSON序列化后不宜过长
 */
export function openNativeView(android: string, ios: string, obj?: any) {
  let params: string = '';
  if (obj !== undefined) {
    params = JSON.stringify(obj);
  }

  nativeBridge('openAppActivity', isAndroid ? android : ios, params);
}

/**
 * 打开微信小程序
 * @param appId 小程序AppId
 * @param path 小程序内部路径
 */
export function openMiniProgram(appId: string, path?: string) {
  return minVersion({
    Android: '4.3.0',
    iOS: '4.3.0',
  }).then(() => {
    nativeBridge('openMiniProgram', appId, path);
  });
}

/**
 * 设置窗口标题
 * @param title 标题内容
 */
export function setTitle(title: string) {
  if (document) {
    document.title = title;
  }
  nativeBridge('setWebTitle', title);
}

/**
 * 显示右上角导航按钮
 * @param btnText 按钮文字
 * @param onClick 点击触发事件
 */
export function showNavRightButton(btnText: string, onClick: () => void) {
  nativeBridge('showNavRightButton', btnText, createCallback(onClick, noop, false));
}

/**
 * 隐藏右上角导航按钮
 */
export function hiddenNavRightButton() {
  nativeBridge('hiddenNavRightButton');
}

/**
 * 扫描二维码
 */
export function scanQrCode() {
  return new Promise<string>((resolve, reject) => {
    nativeBridge('scanNewQrBarCode', '1', createCallback(resolve, reject));
  });
}

/**
 * 扫描条形码
 */
export function scanBarCode() {
  return new Promise<string>((resolve, reject) => {
    nativeBridge('scanNewQrBarCode', 'other', createCallback(resolve, reject));
  });
}

/**
 * 发送短信给指定手机
 * @param mobile 手机号
 * @param message 短信内容
 */
export function sendSMS(mobile: string, message: string) {
  nativeBridge('sendSmsToMobile', mobile, message);
}

/**
 * 批量发送短信给手机
 * @param mobiles 手机号列表
 * @param message 短信内容
 */
export function batchSendSMS(mobiles: string[], message: string) {
  nativeBridge('sendSmsToMobile', mobiles.join(';'), message);
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return new Promise<UserInfo>((resolve, reject) => {
    nativeBridge('getUserInfo', createCallback(resolve, reject));
  });
}

/**
 * 获取用户信息(新)
 */
export function getNewUserInfo() {
  return new Promise<NewUserInfo>((resolve, reject) => {
    nativeBridge('getNewUserInfo', createCallback(resolve, reject));
  });
}

/**
 * 获取设备信息
 */
export function getDeviceInfo() {
  return minVersion({
    Android: '5.2.61',
    iOS: '5.2.61',
  }).then(
    () =>
      new Promise<DeviceInfo>((resolve, reject) => {
        nativeBridge('getDeviceInfo', createCallback(resolve, reject));
      }),
  );
}

/**
 * 弹出原生消息提示框
 * @param message 消息内容
 */
export function alert(message: string) {
  nativeBridge('alert', message);
}

/**
 * 调用系统分享功能
 * @param title 分享标题
 * @param content 分享描述
 * @param image 分享图片地址
 * @param url 分享链接
 */
export function share({ title, content, image, url }: ShareInfo) {
  return new Promise<void>((resolve, reject) => {
    nativeBridge('share', title, content, image, url, createCallback(resolve, reject));
  });
}

/**
 * 监听返回按钮事件
 * @param fn 回调事件
 */
export function listenBack(fn: () => void) {
  nativeBridge('setBack', 0, createCallback(fn, noop, false));
}

/**
 * 取消监听返回按钮事件
 */
export function unlistenBack() {
  nativeBridge('setBack', 1, createCallback(noop, noop));
}

/**
 * 监听关闭按钮事件（iOS有效）
 * @param fn 回调事件
 */
export function listenClose(fn: () => void) {
  nativeBridge('setCloseCallBack', 0, createCallback(fn, noop, false));
}

/**
 * 取消监听关闭按钮事件（iOS有效）
 */
export function unlistenClose() {
  nativeBridge('setCloseCallBack', 1, createCallback(noop, noop));
}

/**
 * 调用手机振动
 */
export function mobileVibrate() {
  nativeBridge('mobileVibrate');
}

/**
 * 开始播放音乐
 * @param url 音乐链接
 */
export function playMusic(url: string) {
  // type：参数值“1”为可控制的播放器，调用stopMusic和resumeMusic生效，
  //       参数值为其它，则一直播放，调用stopMusic和resumeMusic不生效
  nativeBridge('playMusic', url, /* type */ 1);
}

/**
 * 暂停播放
 */
export function pauseMusic() {
  nativeBridge('stopMusic');
}

/**
 * 恢复播放
 */
export function resumeMusic() {
  nativeBridge('resumeMusic');
}

/**
 * 调用手机振动
 * @deprecated
 */
export function vibrate() {
  deprecated('vibrate', 'mobileVibrate');
  return mobileVibrate();
}

/**
 * 获取用户信息
 * @deprecated
 */
export function userInfo() {
  deprecated('userInfo', 'getUserInfo');
  return getUserInfo();
}

/**
 * 保存网络图片到本地相册
 * @param url 图片URL地址
 */
export function saveWebImage(url: string) {
  nativeBridge('saveWebImage', url);
}

/**
 * 提示接口过时
 * @param before
 * @param after
 * @ignore
 */
function deprecated(before: string, after: string) {
  // tslint:disable-next-line
  console.error(`'${before}' has been deprecated, please replace it with '${after}'.`);
}

export { NativeView };
