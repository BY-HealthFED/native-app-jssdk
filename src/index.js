/**
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2017-present By-Health Co Ltd. All rights reserved.
 */
import React, { render } from 'react'; // eslint-disable-line react/no-deprecated
import bootstrap from './core/bootstrap';
import App from './components/App';

let mountPoint;

function renderer() {
  mountPoint = render(<App />, document.getElementById('react-root'), mountPoint);
}

bootstrap().then(renderer);

if (module.hot) {
  module.hot.accept('./components/App', renderer);
}
