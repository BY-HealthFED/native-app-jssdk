/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016 By-Health Co Ltd. All rights reserved.
 */
const nativeProtocol = 'js-call://';
const nativeJSBridge = window.MemberAppJs || window.memberApp || {};
const isAndroidPlatform = !!navigator.userAgent.match(/android/ig);
const isApplePlatform = !!navigator.userAgent.match(/iphone|ipod|ipad/ig);
let callbackIdentity = 0;
const __DEBUG__ = false;

/**
 * 调用Native接口
 * @param {String} api
 * @param {Array} args
 */
function applyNative(api, ...args) {

  if (isAndroidPlatform) {
    if (__DEBUG__) {
      window.alert(`JSAPI: '${api}'`);
    }

    nativeJSBridge[api](...args);
  } else if (isApplePlatform) {
    if (__DEBUG__) {
      window.alert(`Protocol: ${nativeProtocol}${api}/${args.map(x => encodeURIComponent(x)).join('/')}`)
    }

    document.location.href = `${nativeProtocol}${api}/${args.map(x => encodeURIComponent(x)).join('/')}`;
  } else {
    throw new Error(`Platform does not support: ${api}`);
  }
}

/**
 * 创建一次性代理回调方法
 */
function createProxyCallback(cb, once) {
  const methodName = `__native_cb_${callbackIdentity++}`; // eslint-disable-line no-plusplus
  window[methodName] = (args) => {
    try {
      cb(args);
    } finally {
      if (once !== false) {
        delete window[methodName];
      }
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
  return new Promise(resolve => {
    applyNative('scanQrBarCode', 2, createProxyCallback(resolve))
  });
}

/**
 * 打开摄像头，扫描识别二维码
 *
 * @returns {Promise}
 */
export function scanQrCode() {
  return new Promise(resolve => {
    applyNative('scanQrBarCode', 1, createProxyCallback(resolve))
  });
}

/**
 * 发送短信到手机号
 * @param {String} mobile
 * @param {String} message
 */
export function sendSMS(mobile, message) {
  return new Promise(resolve => {
    applyNative('sendSmsToMobile', mobile, message);
    resolve();
  });
}

/**
 * 批量发送短信到手机号列表
 * @param {Array} mobiles
 * @param {String} message
 */
export function batchSendSMS(mobiles, message) {
  return new Promise(resolve => {
    applyNative('sendSmsToMobile', mobiles.join(';'), message);
    resolve();
  });
}

/**
 * 关闭WebView窗口
 */
export function closeWindow() {
  return new Promise(resolve => {
    applyNative('backToActivityMenu');
    resolve();
  });
}

/**
 * 当前页面有上一级页面时，调用会返回上一页面；
 * 如果页面没有上一级页面，则关闭当前页面（Android不关闭）。
 */
export function goBack() {
  return new Promise(resolve => {
    applyNative('goBack');
    resolve();
  });
}

/**
 * 跳转到指定页面
 * @param {any} type 目前只识别参数值“1”，跳转到“中奖明细”页面
 */
export function goToPage(type) {
  return new Promise(resolve => {
    applyNative('goToPage', type);
    resolve();
  });
}

/**
 * 监听返回按钮事件
 * @param {Function} cb
 */
export function listenBack(cb) {
  return new Promise(resolve => {
    applyNative('setBack', 0, createProxyCallback(cb, false));
    resolve();
  });
}

/**
 * 取消监听返回按钮事件
 */
export function unlistenBack() {
  return new Promise(resolve => {
    applyNative('setBack', 1, createProxyCallback(() => {}));
    resolve();
  });
}

/**
 * 设置WebView的标题
 * @param {String} title
 */
export function setTitle(title) {
  return new Promise((resolve) => {
    applyNative('setWebTitle', title);
    resolve();
  });
}

/**
 * 弹出提示消息
 * @param {String} message
 */
export function alert(message) {
  return new Promise((resolve) => {
    applyNative('alert', message);
    resolve();
  });
}

/**
 * 获取用户信息
 */
export function userInfo() {
  return new Promise(resolve => {
    applyNative('getUserInfo', createProxyCallback(resolve))
  });
}

/**
 * 调用手机振动
 */
export function mobileVibrate() {
  return new Promise((resolve) => {
    applyNative('mobileVibrate');
    resolve();
  });
}

/**
 * 调用系统分享功能
 * @param {Object} msg
 * @param {string} msg.title
 * @param {string} msg.content
 * @param {string} msg.image
 * @param {string} msg.url
 * @returns {Promise}
 */
export function share({ title, content, image, url } = {}) {
  return new Promise((resolve) => {
    applyNative('share', title, content, image, url, createProxyCallback(resolve));
  });
}

/**
 * 显示右上角导航按钮
 * @param {string} text 按钮文字
 * @param {Function} onClick 点击触发事件
 *
 * @returns {Promise}
 */
export function showNavRightButton(text, onClick) {
  return new Promise((resolve) => {
    applyNative('showNavRightButton', text, createProxyCallback(onClick, false));
    resolve();
  });
}

/**
 * 隐藏已显示的右上角导航按钮
 */
export function hiddenNavRightButton() {
  return new Promise((resolve) => {
    applyNative('hiddenNavRightButton');
    resolve();
  });
}

/**
 * 开始播放音乐
 * @param {string} url
 */
export function playMusic(url) {
  return new Promise((resolve) => {
    // type：参数值“1”为可控制的播放器，调用stopMusic和resumeMusic生效，
    //       参数值为其它，则一直播放，调用stopMusic和resumeMusic不生效
    applyNative('playMusic', url, /* type */1);
    resolve();
  });
}

/**
 * 暂停播放音乐
 */
export function pauseMusic() {
  return new Promise((resolve) => {
    applyNative('stopMusic');
    resolve();
  });
}

/**
 * 恢复播放音乐
 */
export function resumeMusic() {
  return new Promise((resolve) => {
    applyNative('resumeMusic');
    resolve();
  });
}
