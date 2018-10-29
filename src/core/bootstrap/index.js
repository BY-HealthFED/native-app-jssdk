/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2017-present By-Health Co Ltd. All rights reserved.
 */
import flexibleRem from './flexibleRem';

export default function bootstrap() {
  return Promise.all([flexibleRem()]);
}
