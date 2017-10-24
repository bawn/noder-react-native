import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  requireNativeComponent
} from 'react-native';

import DetailHeader from '../component/DetailHeader'
import HtmlRender from '../component/HtmlRender'
import * as Colors from '../other/Colors'
import Api from '../util/Api'
import Store from 'react-native-simple-store'

export default class DetailRender extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true,
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
  _clickUserLink(value){
    this.props.navigator.push({
      screen: 'Noder.UserProfileRender',
      title: '',
      backButtonTitle: ' ',
      passProps: {loginname: value.loginname}
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

  _avatarPress(){
    this.props.navigator.push({
      screen: 'Noder.UserProfileRender',
      title: '',
      backButtonTitle: ' ',
      passProps: {loginname: this.state.detail.author.loginname}
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
  render(){
    if (this.state.detail == null) {
      return <View/>
    }
    return(
      <View style={styles.container}>
        <ScrollView>
          <DetailHeader
            data={this.state.detail}
            avatarPress={()=>this._avatarPress()}
          />
          <HtmlRender
            content={this.state.detail.content}
            onChange={(value) => this._layoutDidFinish(value)}
            onClickUserLink={this._clickUserLink.bind(this)}
            style={[styles.content, {height: this.state.htmlHeight}]}
          />
        </ScrollView>

        <View style={styles.bottomView}>
          <TouchableOpacity
            style={{marginLeft: 16}}
            onPress={()=>this._likeButtonAction()}>
            {this._likeImageView()}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this._replyAction()}>
            <Image source={require('../assets/images/iconReply.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 16, backgroundColor: 'white'}}
            onPress={()=>this._updateData()}>
            <Image source={require('../assets/images/iconRefresh.png')}></Image>
          </TouchableOpacity>
        </View>
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
  titleView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 25,
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.blackColor,
    lineHeight: 24
  },
  content: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  bottomView: {
    height: 56,
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
  img: {
    width: 240,
    height: 240
  }
}
