/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2017-present By-Health Co Ltd. All rights reserved.
 */
import { BASE_FONT_SIZE, BASE_SCREEN_WIDTH } from '~/config';

function scaleFontSize() {
  const docEl = document.documentElement;
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  const fontSize = (screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE;
  docEl.style.fontSize = `${fontSize}px`;
}

export default function flexibleRem() {
  scaleFontSize();

  window.addEventListener('resize', scaleFontSize, false);
}
