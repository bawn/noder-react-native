import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import * as Colors from '../other/Colors'
import Styles from '../other/Styles'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Api from '../util/Api'

export default class UserProfileRender extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    navBarButtonColor: 'black'
  };
  constructor(props){
    super(props);
    this.state = {
      userInfo: null
    };
  }
  componentDidMount(){
    this._getUserInfo({loginname: this.props.loginname})
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
  // 最近发布
  _recentTopics(){
    var userInfo = this.state.userInfo;
    if (userInfo) {
      this.props.navigator.push({
        screen: 'Noder.RecentRepliesRender',
        title: '最近发布',
        backButtonTitle: ' ',
        passProps: {data: userInfo.recent_topics}
      })
    }
  }
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
  }
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
  }
  _headerView(){
    var userInfo = this.state.userInfo;
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
  render(){
    if (this.state.userInfo) {
      return (
        <View style={styles.container}>
          {this._headerView()}
          <View style={styles.separatorView}/>
          <TouchableHighlight onPress={() => this._recentTopics()}>
            <View style={styles.cellView}>
              <View style={Styles.horizontalView}>
                <Image source={require('../assets/images/iconPlacehold.png')}/>
                <Text style={styles.cellTtile}>{'最近发布'}</Text>
              </View>
              <Image source={require('../assets/images/iconDisclosureIndicator.png')}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._recentReplies()}>
            <View style={styles.cellView}>
              <View style={Styles.horizontalView}>
                <Image source={require('../assets/images/iconPlacehold.png')}/>
                <Text style={styles.cellTtile}>{'最近回复'}</Text>
              </View>
              <Image source={require('../assets/images/iconDisclosureIndicator.png')}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._topicCollect()}>
            <View style={styles.cellView}>
              <View style={Styles.horizontalView}>
                <Image source={require('../assets/images/iconPlacehold.png')}/>
                <Text style={styles.cellTtile}>{'TA的收藏'}</Text>
              </View>
              <Image source={require('../assets/images/iconDisclosureIndicator.png')}/>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
    else {
      return <View></View>
    }
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
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor
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
