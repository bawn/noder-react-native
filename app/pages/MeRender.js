import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import * as Colors from '../other/Colors'
import Styles from '../other/Styles'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Api from '../util/Api'
import Store from 'react-native-simple-store'


let DataSource = [
  {
    image: require('../assets/images/iconPlacehold.png'),
    text: "最近发布",
  },
  {
    image: require('../assets/images/iconPlacehold.png'),
    text: "最近回复",
  },
  {
    image: require('../assets/images/iconPlacehold.png'),
    text: "最近收藏",
  },
  {
    image: require('../assets/images/iconPlacehold.png'),
    text: "未读消息",
  },
  {
    image: require('../assets/images/iconPlacehold.png'),
    text: "已读消息",
  }
]

export default class MeRender extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    navBarButtonColor: 'black'
  };

  static navigatorButtons = {
    rightButtons: [{
        icon: require('../assets/images/iconSetting.png'),
        id: 'setting'
      }]
  };

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      listener: null,
      userInfo: null
    };
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'setting') {
        this.props.navigator.push({
          screen: 'Noder.SettingRender',
          title: '设置',
          backButtonTitle: ' ',
        })
      }
    }
  }


  _loginAction(){
    this.props.navigator.showModal({
      screen: 'Noder.QRScanRender',
      title: "二维码",
      passProps: {},
      animationType: 'slide-up'
    });
  }
  componentDidMount(){
    // this.listener = RCTDeviceEventEmitter.addListener('NoderGetToken', (token)=>{
    //   this._login(token).then((info) => {
    //     this._getUserInfo(info)
    //   });
    // });
    this._getUserInfo({loginname: "bawn"})

    Store.save('user', {
    	accessToken: 'da9456ff-9ac6-4b6b-a04f-690daf66c530'
    })

  }
  componentWillUnmount(){
    this.listener.remove();
  }
  // 获取用户信息
  _getUserInfo(info){
    let userName = info.loginname;
    fetch(Api.userInfo + userName)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            userInfo: responseData.data,
          });
        }
      })
    .done();
  }
  // 登录
  _login(token){
    let json = {
      "accesstoken" : token,
    };
    return new Promise((resolve, reject) => {
      fetch(Api.login, {
        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(json)
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData) {
            resolve(responseData);
          }
        })
      .done();
    });
  }
  // 最近发布
  _recentTopics(){
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.RecentTopicsRender',
        title: '最近发布',
        backButtonTitle: ' ',
        passProps: {data: userInfo.recent_topics}
      })
    }
    else {
      this._loginAction();
    }
  }
  // 最近回复
  _recentReplies(){
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.RecentRepliesRender',
        title: '最近回复',
        backButtonTitle: ' ',
        passProps: {data: userInfo.recent_replies}
      })
    }
    else {
      this._loginAction();
    }
  }
  // 收藏
  _topicCollect(){
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.TopicCollectRender',
        title: '收藏',
        backButtonTitle: ' ',
        passProps: {loginname: userInfo.loginname}
      })
    }
    else {
      this._loginAction();
    }
  }

  _unreadMessages() {
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.UnrenderMessagesRender',
        title: '未读消息',
        backButtonTitle: ' '
      })
    }
    else {
      this._loginAction();
    }
  }

  // 已读消息
  _readMessages() {
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.ReadMessagesRender',
        title: '已读消息',
        backButtonTitle: ' '
      })
    }
    else {
      this._loginAction();
    }
  }

  _headerView(){
    var userInfo = this.state.userInfo;
    if (userInfo) {
      let subText = userInfo.githubUsername + ' | ' + userInfo.score
      return(
        <View style={styles.headerView}>
          <Image
            style={styles.avatar}
            source={{uri: userInfo.avatar_url}}
          />
          <View style={styles.headerTextView}>
            <Text style={styles.loginname}>{userInfo.loginname}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      )
    }
    else {
      return(
        <TouchableHighlight onPress={() => this._loginAction()}>
          <View style={styles.scanView}>
            <Text style={styles.scanText}>{'扫码登录'}</Text>
            <Image source={require('../assets/images/iconDisclosureIndicator.png')}/>
          </View>
        </TouchableHighlight>
      )
    }
  }

  renderSeparator(){
    return(
      <View style={styles.separator}/>
    )
  }

  _rowAction(index){
    switch (index) {
      case 0:
          this._recentTopics()
          break;
      case 1:
          this._recentReplies()
          break;
      case 2:
          this._topicCollect()
          break;
      case 3:
          this._unreadMessages()
          break;
      case 4:
          this._readMessages()
          break;
      default:
    }
  }

  renderRow(item, index) {
    return (
      <TouchableHighlight onPress={() => {this._rowAction(index)}}>
        <View style={styles.cellView}>
          <View style={Styles.horizontalView}>
            <Image source={require('../assets/images/iconPlacehold.png')}/>
            <Text style={styles.cellTtile}>{item.text}</Text>
          </View>
          <Image source={require('../assets/images/iconDisclosureIndicator.png')}/>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        {this._headerView()}
        <View style={styles.separatorView}/>
        <FlatList
          scrollEnabled={false}
          data={DataSource}
          keyExtractor={item => item.text}
          renderItem={({item, index}) => this.renderRow(item, index)}
          ItemSeparatorComponent={this.renderSeparator.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.placeholderColor,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  separatorView: {
    height: 16,
    backgroundColor: Colors.placeholderColor
  },
  headerView: {
    height: 110,
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTextView: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 56
  },
  scanView: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor,
  },
  scanText: {
    fontSize: 22,
    color: Colors.blackColor
  },
  cellView: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor
  },
  listView: {

  },
  cellTtile: {
    fontSize: 16,
    color: Colors.blackColor,
    marginLeft: 16
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.placeholderColor,
  },
  versionText: {
    position: 'absolute',
    fontSize: 13,
    color: Colors.grayColor,
    bottom: 16,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.placeholderColor
  },
  loginname: {
    fontWeight: '500',
    color: Colors.blackColor,
    fontSize: 18,
  },
  subText: {
    fontWeight: '200',
    color: Colors.blackColor,
    fontSize: 13,
  }
}
