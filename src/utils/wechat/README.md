### wechat Usage

```jsx
    ...
    import wechat, { share } from './../../utils/wechat';
    ...
    export class example extends React.Component {
        ...
		componentDidMount() {
			wechat({
				// 微信config
				debug: false,
				appId:'wx2f99533...',
				timestamp:'1489029986',
				nonceStr:'a360855d-eb0e-44ee-9ea6-456d672badb8',
				signature:'ce8715c4d5980383d3628f59f5222be8b0b3b369',
				jsApiList:['showMenuItems', 'hideMenuItems', 'onMenuShareTimeline'...]
			}).then(() => {
				share(
					title, //分享标题
					link, //分享链接
					imgUrl, //分享图标
					desc //分享描述
				);

			});
		}
        ...
    }
    export default example;
```
### wechat Method
- wechat(config)    
微信设置，config: 微信config信息，
- share(title, link, imgUrl, desc)  
微信分享，     
title: 分享标题     
link: 分享链接      
imgUrl: 分享图标	  	
desc: 分享描述     
