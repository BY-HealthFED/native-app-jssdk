/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import createCallback from './lib/createCallback';
import nativeBridge, { isAppWebview, isAndroid } from './lib/nativeBridge';
import { ShareInfo, UserInfo, NewUserInfo } from './types/MemberAppJs';
import * as NativeView from './nativeView';

/**
 * 当前是否在App环境
 */
export function isApp() {
  return isAppWebview;
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
 */
export function openNativeView(android: string, ios: string) {
  nativeBridge('openAppActivity', isAndroid ? android : ios);
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
  nativeBridge('showNavRightButton', btnText, createCallback(onClick, false));
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
  return new Promise<string>(resolve => {
    nativeBridge('scanQrBarCode', 1, createCallback(resolve));
  });
}

/**
 * 扫描条形码
 */
export function scanBarCode() {
  return new Promise<string>(resolve => {
    nativeBridge('scanQrBarCode', 2, createCallback(resolve));
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
  return new Promise<UserInfo>(resolve => {
    nativeBridge('getUserInfo', createCallback(resolve));
  });
}

export function getNewUserInfo() {
  return new Promise<NewUserInfo>(resolve => {
    nativeBridge('getNewUserInfo', createCallback(resolve));
  });
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
  return new Promise<void>(resolve => {
    nativeBridge('share', title, content, image, url, createCallback(resolve));
  });
}

/**
 * 监听返回按钮事件
 * @param fn 回调事件
 */
export function listenBack(fn: () => void) {
  nativeBridge('setBack', 0, createCallback(fn, false));
}

/**
 * 取消监听返回按钮事件
 */
export function unlistenBack() {
  nativeBridge('setBack', 1, createCallback(() => {}));
}

/**
 * 监听关闭按钮事件（iOS有效）
 * @param fn 回调事件
 */
export function listenClose(fn: () => void) {
  nativeBridge('setCloseCallBack', 0, createCallback(fn, false));
}

/**
 * 取消监听关闭按钮事件（iOS有效）
 */
export function unlistenClose() {
  nativeBridge('setCloseCallBack', 1, createCallback(() => {}));
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
