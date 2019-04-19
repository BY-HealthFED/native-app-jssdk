/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-2017 By-Health Co Ltd. All rights reserved.
 */
import { stringify } from 'query-string';
import TimeoutError from './timeoutError';

export function form(ctx, next) {
  if (ctx.method === 'POST' || ctx.method === 'PUT') {
    switch (ctx.type) {
      case 'form':
        ctx.body = stringify(ctx.body);
        ctx.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        break;
      case 'json':
        ctx.body = JSON.stringify(ctx.body);
        ctx.headers['Content-Type'] = 'application/json;charset=utf-8';
        break;
      default:
        break;
    }
  }

  return next();
}

export function http(ctx, next) {
  return Promise.resolve()
    .then(next)
    .then(response => (response.status >= 200 && response.status <= 299 ? response : Promise.reject(response)));
}

export function json(ctx, next) {
  return Promise.resolve()
    .then(next)
    .then(response => response.text())
    .then(responseText => {
      try {
        return JSON.parse(responseText);
      } catch (__unused) {
        return responseText;
      }
    })
    .catch(error => {
      if (error instanceof Response) {
        return error.text().then(responseText => {
          let responseObj;

          try {
            responseObj = JSON.parse(responseText);
          } catch (__unused) {
            responseObj = responseText;
          }

          return Promise.reject(responseObj);
        });
      }

      return Promise.reject(error);
    });
}

export function timeout(ctx, next) {
  if (typeof ctx.timeout === 'number') {
    if (ctx.timeout > 0 && ctx.timeout !== Infinity) {
      const milliseconds = ctx.timeout;
      delete ctx.timeout;
      return Promise.race([
        next(),
        new Promise((resolve, reject) => setTimeout(() => reject(new TimeoutError()), milliseconds)),
      ]);
    }
  }

  return next();
}
