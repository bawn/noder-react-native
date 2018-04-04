import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  requireNativeComponent,
  StatusBar,
  Easing
} from 'react-native';

import DetailHeader from '../component/DetailHeader'
import HtmlRender from '../component/HtmlRender'
import * as Colors from '../other/Colors'
import Api from '../util/Api'
import Store from 'react-native-simple-store'
import Modal from 'react-native-modalbox'

export default class DetailRender extends Component {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true // 隐藏导航栏
  }
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      htmlHeight: 0
    };
  }
  componentDidMount(){
    Store.get('user').then((res) =>
        {this._updateData(res.accessToken)}
    )
  }
  _updateData(token){
    fetch(Api.topicDetail + this.props.data.id + '?accesstoken=' + token)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            detail: responseData.data,
          });
        }
      })
    .done();
  }
  _replyAction(){
    this.props.navigator.push({
      screen: 'Noder.ReplyListRender',
      title: '回复',
      backButtonTitle: ' ',
      passProps: {data: this.state.detail.replies}
    })
  }
  _layoutDidFinish(value){
    this.setState({
      htmlHeight: value.height
    });
  }

  _shareButtonAction() {
    this.refs.shareView.open()
  }

  _backButtonAction() {
    this.props.navigator.pop({
      animated: true
    })
  }

  _likeButtonAction(item) {
    Store.get('user').then((res) =>{
        let json = {
          "accesstoken" : res.accessToken,
          "topic_id" : this.state.detail.id
        }
        let api = this.state.detail.is_collect == true ? Api.deCollect : Api.collect
        fetch(api, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(json)
        })
          .then((response) => response.json())
          .then((responseData) => {
            let is_collect = !this.state.detail.is_collect
            let detail = this.state.detail
            detail.is_collect = is_collect
            this.setState({
              detail: detail
            })

          })
        .done();
      }
    )
  }

  _jumpToUserRender(author){
    this.props.navigator.push({
      screen: 'Noder.UserProfileRender',
      title: author.loginname,
      backButtonTitle: ' ',
      passProps: {loginname: author.loginname}
    })
  }


  _likeImageView(){
    if (this.state.detail.is_collect == true) {
      return <Image source={require('../assets/images/iconLikeSelected.png')}></Image>
    }
    else {
      return <Image source={require('../assets/images/iconLikeNormal.png')}></Image>
    }
  }

  _shareView() {
    return (
      <View>
        <View style={styles.platformView}>
          <TouchableOpacity style={styles.platformButton}>
            <Image source={require('../assets/images/iconShareWeChat.png')}/>
            <Text style={styles.platformTitle}>{"微信好友"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.platformButton}>
            <Image source={require('../assets/images/iconShareTimeline.png')}/>
            <Text style={styles.platformTitle}>{"朋友圈"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.platformButton}>
            <Image source={require('../assets/images/iconShareWeibo.png')}/>
            <Text style={styles.platformTitle}>{"微博"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.platformButton}>
            <Image source={require('../assets/images/iconShareWeChat.png')}/>
            <Text style={styles.platformTitle}>{"复制链接"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight style={styles.canelButton}>
          <Text style={styles.canelText}>{"取消"}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render(){
    if (this.state.detail == null) {
      return <View/>
    }
    return(
      <View style={styles.container}>
        <ScrollView style={{marginTop: 20}}>
          <HtmlRender
            content={this.state.detail.content}
            onChange={(value) => this._layoutDidFinish(value)}
            onClickUserLink={this._jumpToUserRender.bind(this)}
            style={[styles.content, {height: this.state.htmlHeight}]}
          />
        </ScrollView>

        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={()=>this._backButtonAction()}>
            <Image source={require('../assets/images/iconBottomBack.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonView}
            onPress={()=>this._replyAction()}>
            <Image source={require('../assets/images/messageBig.png')}></Image>
            <Text style={styles.messageCount}>{this.state.detail.reply_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={()=>this._likeButtonAction()}>
            {this._likeImageView()}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonView}
            onPress={()=>this._jumpToUserRender(this.state.detail.author)}>
            <Image 
              source={{uri: this.state.detail.author.avatar_url}} 
              style={styles.avatar}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={()=>this._shareButtonAction()}>
            <Image source={require('../assets/images/share.png')}>
            </Image>
          </TouchableOpacity>
        </View>
        <Modal
            style={{height: 208}}
            position={"bottom"}
            ref={"shareView"}
            easing={Easing.inOut(Easing.quad)}
            animationDuration={200}
          >
            {this._shareView()}
          </Modal>
      </View>

    )
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  bottomView: {
    height: 49,
    borderTopColor: Colors.separatorColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonView: {
    width: 50,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  avatar: {
    height: 22, 
    width: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    borderRadius: 12
  },
  messageCount: {
    fontSize: 15,
    color: Colors.grayColor,
    marginLeft: 10
  },
  platformView: {
    height: 159,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32
  },
  platformButton: {
    height: 84,
    width: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  platformTitle: {
    fontSize: 12,
    color: Colors.blackColor,
    marginTop: 16
  },
  canelText: {
    fontSize: 15,
    color: Colors.blackColor
  },
  canelButton: {
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor
  }
}
