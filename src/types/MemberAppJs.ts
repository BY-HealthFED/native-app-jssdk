/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export interface UserInfo {
  ruleType: number;
  user: {};
  auth: {};

  store: {};
  storeMember: {};
}

export interface ShareInfo {
  title: string;
  content: string;
  image: string;
  url: string;
}

export default interface MemberAppJs {
  [api: string]: (...args: any) => void;
}
