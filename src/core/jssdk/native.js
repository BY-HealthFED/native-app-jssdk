/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright ? 2016 By-Health Co Ltd. All rights reserved.
 */

const nativeProtocol = 'js-call://';
const nativeMemberJs = window.MemberAppJs || window.memberApp || {};
const isAndroidPlatform = navigator.userAgent.match(/android/ig);
const isApplePlatform = navigator.userAgent.match(/iphone|ipod|ipad/ig);
let callbackIdentity = 0;

/**
 * Proxy callback method
 */
function callbackProxy(cb) {
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
 * Apply native call
 */
function applyNative(api, ...args) {
	if (isApplePlatform) {
		document.location.href = `${nativeProtocol}${api}/${args.map(x => encodeURIComponent(x)).join('/')}`;
	} else if (isAndroidPlatform) {
		nativeMemberJs[api](...args);
	} else {
		throw new Error(`Platform does not support: ${api}`);
	}
}

/**
 * Scan BarCode
 *
 * @returns {Promise}
 */
export function scanBarCode() {
	return new Promise(resolve =>
    applyNative('scanQrBarCode', 2, callbackProxy(resolve))
  );
}

/**
 * Scan QrCode
 *
 * @returns {Promise}
 */
export function scanQrCode() {
	return new Promise(resolve =>
    applyNative('scanQrBarCode', 1, callbackProxy(resolve))
  );
}

/**
 * Send SMS
 */
export function sendSMS(mobile, message) {
	applyNative('sendSmsToMobile', mobile, message);
}

/**
 * Close window
 */
export function closeWindow() {
	if (isApplePlatform) {
		document.location.href = 'js-back://memberApp/memberApp.backToActivityMenu';
	} else if (isAndroidPlatform) {
		nativeMemberJs.backToActivityMenu();
	}
}
