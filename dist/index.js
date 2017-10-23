(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['byhealth-native-jssdk'] = {})));
}(this, (function (exports) { 'use strict';

/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016 By-Health Co Ltd. All rights reserved.
 */
var nativeProtocol = 'js-call://';
var nativeJSBridge = window.MemberAppJs || window.memberApp || {};
var isAndroidPlatform = navigator.userAgent.match(/android/ig);
var isApplePlatform = navigator.userAgent.match(/iphone|ipod|ipad/ig);
var callbackIdentity = 0;

/**
 * 调用Native接口
 * @param {String} api
 * @param {Array} args
 */
function applyNative(api) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isAndroidPlatform) {
    nativeJSBridge[api].apply(nativeJSBridge, args);
  } else if (isApplePlatform) {
    document.location.href = '' + nativeProtocol + api + '/' + args.map(function (x) {
      return encodeURIComponent(x);
    }).join('/');
  } else {
    throw new Error('Platform does not support: ' + api);
  }
}

/**
 * 创建一次性代理回调方法
 */
function createProxyCallback(cb) {
  var methodName = '__native_cb_' + callbackIdentity++; // eslint-disable-line no-plusplus
  window[methodName] = function (args) {
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
function scanBarCode() {
  return new Promise(function (resolve) {
    return applyNative('scanQrBarCode', 2, createProxyCallback(resolve));
  });
}

/**
 * 打开摄像头，扫描识别二维码
 *
 * @returns {Promise}
 */
function scanQrCode() {
  return new Promise(function (resolve) {
    return applyNative('scanQrBarCode', 1, createProxyCallback(resolve));
  });
}

/**
 * 发送短信到手机号
 * @param {String} mobile
 * @param {String} message
 */
function sendSMS(mobile, message) {
  applyNative('sendSmsToMobile', mobile, message);
}

/**
 * 批量发送短信到手机号列表
 * @param {Array} mobiles
 * @param {String} message
 */
function batchSendSMS(mobiles, message) {
  applyNative('sendSmsToMobile', mobiles.join(';'), message);
}

/**
 * 关闭WebView窗口
 */
function closeWindow() {
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
function setTitle(title) {
  applyNative('setWebTitle', title);
}

/**
 * 弹出提示消息
 * @param {String} message
 */
function alert(message) {
  applyNative('alert', message);
}

/**
 * 获取用户信息
 */
function userInfo() {
  return new Promise(function (resolve) {
    return applyNative('getUserInfo', createProxyCallback(resolve));
  });
}

/**
 * 调用手机振动
 */
function mobileVibrate() {
  applyNative('mobileVibrate');
}

exports.scanBarCode = scanBarCode;
exports.scanQrCode = scanQrCode;
exports.sendSMS = sendSMS;
exports.batchSendSMS = batchSendSMS;
exports.closeWindow = closeWindow;
exports.setTitle = setTitle;
exports.alert = alert;
exports.userInfo = userInfo;
exports.mobileVibrate = mobileVibrate;

Object.defineProperty(exports, '__esModule', { value: true });

})));
