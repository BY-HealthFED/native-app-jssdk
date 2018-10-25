/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import MemberAppJs from '../types/MemberAppJs';

/**
 * @ignore
 */
declare global {
  interface Window {
    MemberAppJs?: MemberAppJs;
    memberApp?: MemberAppJs;
  }
}

/**
 * 全局对象
 * @ignore
 */
const global = window || {};

/**
 * 自定义协议
 * @ignore
 */
const nativeProtocol = 'js-call://';
/**
 * 自定义注入对象
 * @ignore
 */
const nativeJSBridge = global.MemberAppJs || global.memberApp || {};
/**
 * 是否App的Webview
 * @ignore
 */
const isAppWebview = Boolean(
  global.navigator && global.navigator.userAgent && global.navigator.userAgent.match(/byhealth/gi),
);

/**
 * Call the app native interface.
 * @ignore
 */
function nativeBridge(api: string, ...args: any) {
  if (!isAppWebview) {
    return;
  }

  if (typeof nativeJSBridge[api] === 'function') {
    nativeJSBridge[api](...args);
  } else {
    const frame = document.createElement('iframe');
    frame.src = `${nativeProtocol}${api}/${args.map((x: any) => encodeURIComponent(x)).join('/')}`;
    frame.style.position = 'absolute';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    frame.style.opacity = '0';
    frame.onload = () => {
      setTimeout(() => {
        document.body.removeChild(frame);
      }, 1000);
    };
    document.body.appendChild(frame);
  }
}

export { isAppWebview };
export default nativeBridge;
