import { h, Component } from 'preact';
import { Router } from 'preact-router';
import './../styles/global.common';
import history from '~/core/history';

import HeaderBar from './HeaderBar';
import Home from '~/containers/Home';
import Detail from '~/containers/Detail';

import Request from '~/core/request';

const url = window.location.href.split('#');

export default class App extends Component {

	render() {
		return (
			<div id="app"  >
				<HeaderBar />
				<Router history={history}>
					<Home path="/" />
					<Detail path="/Detail" />
				</Router>
			</div>
		);
	}
}
