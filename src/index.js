/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016 By-Health Co Ltd. All rights reserved.
 */
const nativeProtocol = 'js-call://';
const nativeJSBridge = window.MemberAppJs || window.memberApp || {};
const isAndroidPlatform = navigator.userAgent.match(/android/ig);
const isApplePlatform = navigator.userAgent.match(/iphone|ipod|ipad/ig);
let callbackIdentity = 0;

/**
 * 调用Native接口
 * @param {String} api
 * @param {Array} args
 */
function applyNative(api, ...args) {
  if (isAndroidPlatform) {
    nativeJSBridge[api](...args);
  } else if (isApplePlatform) {
    document.location.href = `${nativeProtocol}${api}/${args.map(x => encodeURIComponent(x)).join('/')}`;
  } else {
    throw new Error(`Platform does not support: ${api}`);
  }
}

/**
 * 创建一次性代理回调方法
 */
function createProxyCallback(cb) {
  const methodName = `__native_cb_${callbackIdentity++}`; // eslint-disable-line no-plusplus
  window[methodName] = (args) => {
    try {
      cb(args);
    } finally {
      delete window[methodName];
    }
  };
  return methodName;
}

/**
 * 打开摄像头，扫描识别条形码
 *
 * @returns {Promise}
 */
export function scanBarCode() {
  return new Promise(resolve =>
    applyNative('scanQrBarCode', 2, createProxyCallback(resolve))
  );
}

/**
 * 打开摄像头，扫描识别二维码
 *
 * @returns {Promise}
 */
export function scanQrCode() {
  return new Promise(resolve =>
    applyNative('scanQrBarCode', 1, createProxyCallback(resolve))
  );
}

/**
 * 发送短信到手机号
 * @param {String} mobile
 * @param {String} message
 */
export function sendSMS(mobile, message) {
  applyNative('sendSmsToMobile', mobile, message);
}

/**
 * 批量发送短信到手机号列表
 * @param {Array} mobiles
 * @param {String} message
 */
export function batchSendSMS(mobiles, message) {
  applyNative('sendSmsToMobile', mobiles.join(';'), message);
}

/**
 * 关闭WebView窗口
 */
export function closeWindow() {
  if (isApplePlatform) {
    document.location.href = 'js-back://memberApp/memberApp.backToActivityMenu';
  } else if (isAndroidPlatform) {
    nativeMemberJs.backToActivityMenu();
  }
}

/**
 * 设置WebView的标题
 * @param {String} title
 */
export function setTitle(title) {
  applyNative('setWebTitle', title);
}

/**
 * 弹出提示消息
 * @param {String} message
 */
export function alert(message) {
  applyNative('alert', message);
}

/**
 * 获取用户信息
 */
export function userInfo() {
  return new Promise(resolve =>
    applyNative('getUserInfo', createProxyCallback(resolve))
  );
}

/**
 * 调用手机振动
 */
export function mobileVibrate() {
  applyNative('mobileVibrate');
}
