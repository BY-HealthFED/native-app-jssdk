import React from 'react';
import './App.scss';
import * as jssdk from '@byhealth/native-app-jssdk';
import s from './SdkDemo.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sdkArr: [
        { title: '弹出原生消息提示框', btn: 'alert' },
        { title: '获取App版本', btn: 'getVersion' },
        { title: '发送短信给指定手机', btn: 'sendSMS' },
        { title: '批量发送短信给手机', btn: 'batchSendSMS' },
        { title: '关闭窗口', btn: 'closeWindow' },
        { title: '获取用户信息', btn: 'getUserInfo' },
        { title: '获取用户信息（新）', btn: 'getNewUserInfo' },
        { title: '返回上一级页面，如果没有上一级页面，则关闭当前页面（Android不关闭）', btn: 'goBack' },
        { title: '显示右上角导航按钮', btn: 'showNavRightButton' },
        { title: '隐藏右上角导航按钮', btn: 'hiddenNavRightButton' },
        { title: '当前是否在App环境', btn: 'isApp' },
        { title: '开始播放音乐', btn: 'playMusic' },
        { title: '暂停播放', btn: 'pauseMusic' },
        { title: '恢复播放', btn: 'resumeMusic' },
        { title: '扫描条形码', btn: 'scanBarCode' },
        { title: '扫描二维码', btn: 'scanQrCode' },
        { title: '设置窗口标题', btn: 'setTitle' },
        { title: '调用系统分享功能', btn: 'share' },
        { title: '调用手机振动', btn: 'vibrate' },
        { title: '监听返回按钮事件', btn: 'listenBack' },
        { title: '取消监听返回按钮事件', btn: 'unlistenBack' },
      ],
    };
  }

  handleClick = btn => () => {
    switch (btn) {
      case 'alert':
        jssdk.alert('测试alert');
        break;
      case 'getVersion':
        jssdk
          .getVersion()
          .then(version => jssdk.alert(version))
          .catch(() => {
            jssdk.alert('当前app版本不支持获取版本号');
          });
        break;
      case 'sendSMS':
        jssdk.sendSMS('13750004660', '短信测试sendSMS');
        break;
      case 'batchSendSMS':
        jssdk.batchSendSMS(['13750004660', '13750004661'], '短信测试batchSendSMS');
        break;
      case 'closeWindow':
        jssdk.closeWindow();
        break;
      case 'getUserInfo':
        jssdk.getUserInfo().then(result => {
          alert(JSON.stringify(result)); // eslint-disable-line
        });
        break;
      case 'getNewUserInfo':
        jssdk.getUserInfo().then(result => {
          alert(JSON.stringify(result)); // eslint-disable-line
        });
        break;
      case 'goBack':
        jssdk.goBack();
        break;
      case 'showNavRightButton':
        jssdk.showNavRightButton(`新按钮${Math.random().toFixed(2)}`, this.rightBtn);
        break;
      case 'hiddenNavRightButton':
        jssdk.hiddenNavRightButton();
        break;
      case 'isApp':
        jssdk.alert(jssdk.isApp());
        break;
      case 'pauseMusic':
        jssdk.pauseMusic();
        break;
      case 'playMusic':
        jssdk.playMusic('http://wx-test.by-health.com/web/jssdk-2/shao.mp3');
        break;
      case 'resumeMusic':
        jssdk.resumeMusic();
        break;
      case 'scanBarCode':
        jssdk.scanBarCode();
        break;
      case 'scanQrCode':
        jssdk.scanQrCode();
        break;
      case 'setTitle':
        jssdk.setTitle(`设置窗口新标题${Math.random().toFixed(2)}`);
        break;
      case 'vibrate':
        jssdk.vibrate();
        break;
      case 'share':
        jssdk.share({
          content: '我是被分享的描述',
          image: 'http://by-health-portal.oss-cn-shenzhen.aliyuncs.com/product/album/AA010102/AA010102.jpg',
          title: '我是被分享的标题',
          url: 'http://www.by-health.com/',
        });
        break;
      case 'listenBack':
        jssdk.listenBack(() => {
          jssdk.alert('监听返回按钮事件');
        });
        break;
      case 'unlistenBack':
        jssdk.unlistenBack();
        break;
      default:
        break;
    }
  };

  rightBtn = () => {
    jssdk.alert('被点击了');
  };

  render() {
    const { sdkArr } = this.state;
    return (
      <div className={s.vessel}>
        {sdkArr.map(item => (
          <div key={item.btn}>
            <p className={s.title}>{item.title}：</p>
            <button type="button" className={s.btn} onClick={this.handleClick(item.btn)}>
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
