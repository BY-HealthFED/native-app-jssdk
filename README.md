## clone and install
> Run with Node.js 7.x
```js
import {
	scanBarCode, // 扫描条形码
	scanQrCode, // 扫描识别二维码
	sendSMS, // 发送短信到手机号
	batchSendSMS, // 批量发送短信到手机号列表
	closeWindow, // 关闭WebView窗口
	setTitle, // 设置WebView的标题
	alert, // 弹出提示消息
	userInfo, // 获取用户信息
	mobileVibrate, // 调用手机振动
	share, // 调用系统分享功能
	showNavRightButton, // 显示右上角导航按钮
	hiddenNavRightButton, // 隐藏已显示的右上角导航按钮
	playMusic,	// 开始播放音乐
	pauseMusic,  // 暂停播放音乐
	resumeMusic,// 恢复播放音乐
	goBack, // 返回页面
	goToPage, // 跳转到指定页面
	listenBack, // 监听返回按钮事件
	unlistenBack, // 取消监听返回按钮事件
} from '@byhealth/native-app-jssdk';
...

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			showModalb: false,
			voiceId: null,
			voiceStatus: '0',
			menmerinfo: null,
			pageTitle: '自定义标题',
		};
	}

	 // 扫描条形码
	scanBarCode() {
		scanBarCode().then((res) => {
			alert(res);
		});
	}
	 // 扫描识别二维码
	scanQrCode() {
		scanQrCode().then((res) => {
			alert(res);
		});
	}
	 // 发送短信到手机号
	sendSMS() {
		sendSMS('13111111111', '单个测试短信')
	}
	 // 批量发送短信到手机号列表
	batchSendSMS() {
		batchSendSMS(['13111111111','13222222222'], '测试短信')
	}
	 // 关闭WebView窗口
	closeWindow() {
		closeWindow();
	}
	 // 设置WebView的标题
	setTitle = () => {
		setTitle(this.state.pageTitle);
	}
	 // 弹出提示消息
	alert() {
		alert(JSON.stringify({
			userAgent: navigator.userAgent,
			isAndroidPlatform: navigator.userAgent.match(/android/ig),
			isApplePlatform: navigator.userAgent.match(/iphone|ipod|ipad/ig),
		}));
	}
	 // 获取用户信息
	userInfo = () => {
		userInfo().then((res) => {
			res.privileges = (res.privileges || []).slice(0, 2);
			this.setState({menmerinfo: JSON.stringify(res, null, 2)})
		})
	}

	changePageTitle = (e) => {
		console.log(e);
		this.setState({pageTitle: e.target.value})
	}

	 // 调用手机振动
	mobileVibrate() {
		mobileVibrate();
	}

	handleClearUserInfo = () => {
		this.setState({menmerinfo: null})
	}

	// 分享
	share = () => {
		share({
			title: '分享标题',
			content: '分享内容',
			image: '分享图片',
			url: '分享链接'
		}).then((res) => {
			alert(res)
		})
	}

	// 显示右上角导航按钮
	showNavRightButton = () =>{
		showNavRightButton('前往', ()=>{
			alert('回调方法');
		})
	}

	// 隐藏已显示的右上角导航按钮
	hiddenNavRightButton = () =>{
		hiddenNavRightButton();
	}

	playMusic = () => {
		playMusic('http://www.170mv.com/kw/other.web.nf01.sycdn.kuwo.cn/resource/n1/60/46/2658593626.mp3')
	}

	pauseMusic = () => {
		pauseMusic();
	}

	resumeMusic = () => {
		resumeMusic();
	}

	goBack = () => {
		goBack();
	}

	goToPage = () => {
		goToPage(1); // 目前只识别参数值“1”，跳转到“中奖明细”页面
	}

	listenBack = () => {
		listenBack(() => {
			alert('点击返回按钮之后的回调');
		}).then(() => {
			window.alert('已注册导航条返回回调');
		});
	}

	unlistenBack = () => {
		unlistenBack()
			.then(() => {
				window.alert('解除导航条返回回调');
			});
	}


	render() {
		return (
			<div className="pdt1">
				<h3 className="al-c pd1">native-jsssdk</h3>
				<div className="w9-5 center">
					<div className={s.block}>
						<button className="btn" onClick={this.scanBarCode}> 扫描条形码</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.scanQrCode}> 扫描二维码</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.sendSMS}> 发送短信到手机</button>
					</div>

					<div className={s.block}>
						<button className="btn" onClick={this.batchSendSMS}> 批量发送短信到手机号列表</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.closeWindow}> 关闭WebView窗口</button>
					</div>
					<div className={s.block}>
						<h3 className="al-c" > 设置WebView的标题</h3>
						<ul className="w6 center clearfix formBox nls pd1">
							<li className="fl w3"><div className="pdt-6 al-r">标题:&nbsp;</div></li>
							<li className="fl w7">
								<input type="text" onChange={this.changePageTitle} value={this.state.pageTitle} />
							</li>
						</ul>
						<button className="btn" onClick={this.setTitle} >修改WebView的标题</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.alert}> 弹出提示消息</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.userInfo}> 获取用户信息</button>
						<pre className="mgt1">
							{this.state.menmerinfo ? <div className="center al-c bg-gray white w5" onClick={this.handleClearUserInfo}>收起</div> : null}

							{this.state.menmerinfo}
						</pre>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.mobileVibrate}> 调用手机振动</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.share}>分享</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.showNavRightButton}>显示右上角导航按钮</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.hiddenNavRightButton}>隐藏已显示的右上角导航按钮</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.playMusic}>播放音乐</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.pauseMusic}>暂停播放</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.resumeMusic}>恢复播放</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.goBack}>返回页面</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.goToPage}>跳转到指定页面</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.listenBack}>监听返回按钮事件</button>
					</div>
					<div className={s.block}>
						<button className="btn" onClick={this.unlistenBack}>取消监听返回按钮事件</button>
					</div>
				</div>
				<Modal
					contentLabel="ModalB"
					isOpen={this.state.showModalb}
					onRequestClose={this.handleCloseModalb}
					shouldCloseOnOverlayClick={true}
				>
					<div className="center w9 pd1 font">
						<h2 className="al-c mgb1" >modalB</h2>
					</div>
				</Modal>

			</div>
		);
	}
}
```
