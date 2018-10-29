/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-2017 By-Health Co Ltd. All rights reserved.
 */
import { API_BASE } from '~/config';
import Request from './request';
import * as middlewares from './middleware';

export { Request };
export { middlewares };
export default new Request(
  {
    baseUrl: API_BASE,
    type: 'json',
    credentials: 'same-origin',
    mode: 'same-origin',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.form],
);
