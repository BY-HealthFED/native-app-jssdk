import { h, Component } from 'preact';
import s from './HeaderBar.scss';
import logo from '~/assets/logo.png';
import svglogo from '~/assets/logo.svg';

class HeaderBar extends Component {

	render() {
		return (
      <header>
        <div className={`${s.heardbar} clearfix`}>
          <div className="center w3 pr">
            <img
              ref={(ref) => { this.logoRef = ref; }}
              src={svglogo}
              onError={() => { this.logoRef.src = logo; }}
              className={s.svglogo}
            />
          </div>
        </div>
      </header>
		);
	}
}

export default HeaderBar;
