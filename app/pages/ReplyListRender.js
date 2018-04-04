import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  requireNativeComponent,
  Linking,
  TextInput,
  TouchableHighlight
} from 'react-native';

import {Navigation} from 'react-native-navigation'
import * as Colors from '../other/Colors'
import Api from '../util/Api'
import moment from 'moment'
import HTMLView from 'react-native-htmlview'
import Loading from '../component/LoadingRender'
import Empty from '../component/EmptyRender'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default class DetailRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      viewHeight: 0
  	}
  }
  componentDidMount(){
    this.setState({
      dataSource: this.props.data
    });
  }

  _onLayout(event){
    this.setState({
      viewHeight: event.nativeEvent.layout.height
    })
  }

  render(){
    return(
      <View
        style={styles.container}
        onLayout={(event) => this._onLayout(event)}
      >
        <FlatList
          initialListSize={10}
          data={this.state.dataSource}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => this._emptyComponent()}
          ItemSeparatorComponent={() => this.renderSeparator()}
          style={styles.listView}
          keyboardDismissMode={"on-drag"}
        />
        <View style={styles.commentView}>
          <TextInput placeholder={"填写评论…"} style={styles.commentText}/>
          <TouchableHighlight style={styles.publishButton}>
            <Text style={styles.publishText}>{"发布"}</Text>
          </TouchableHighlight>
        </View>
        <KeyboardSpacer/>
      </View>
    )
  }

  _emptyComponent() {
    return (
      <Empty height={this.state.viewHeight}/>
    )
  }

  _onLinkPress(url){
    if (url.startsWith('/user/')) {
      let loginname = url.substr(url.lastIndexOf('/') + 1);
      this.props.navigator.push({
        screen: 'Noder.UserProfileRender',
        title: '',
        backButtonTitle: ' ',
        passProps: {loginname: loginname}
      })
    }
    else {
      Linking.openURL(url).catch();
    }
  }

  _avatarPress(item){
    this.props.navigator.push({
      screen: 'Noder.UserProfileRender',
      title: '',
      backButtonTitle: ' ',
      passProps: {loginname: item.author.loginname}
    })
  }

  renderSeparator(){
    return(
      <View style={styles.separator}/>
    )
  }

  _likeImage(item) {
    if(item.is_uped) {
      return <Image source={require('../assets/images/likeSelected.png')}></Image>
    } else {
      return <Image source={require('../assets/images/likeNormal.png')}></Image>
    }
  }

  renderRow(item, index){
    var row = index + 1;
    return(
      <View style={styles.cellContent}>
        <TouchableOpacity onPress={() => this._avatarPress(item)}>
          <Image source={{uri: item.author.avatar_url}} style={styles.avatar}/>
        </TouchableOpacity>
        <View style={styles.cellOtherView}>
          <Text style={styles.nameText}>{item.author.loginname}</Text>
          <HTMLView
            value={item.content}
            style={styles.htmlView}
            stylesheet={htmlStyles}
            onLinkPress={(url) => this._onLinkPress(url)}
          />
          <View style={styles.bottomView}>
            <Text style={styles.relativeText}>{this._relative(item)}</Text>
            <View style={styles.bottomRightView}>
              <Text style={styles.upText}>{item.ups.length == 0 ? "" : item.ups.length}</Text>
              <TouchableOpacity onPress={() => this._avatarPress(item)} style={{marginRight: 16}}>
                {this._likeImage(item)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._avatarPress(item)}>
                <Image source={require('../assets/images/message.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _relative(item){
    return moment(item.create_at).fromNow()
  }
}

const htmlStyles = {
  a: {
    fontSize: 15,
    color: Colors.blueColor,
  },
  p: {
    fontSize: 15,
    color: Colors.blackColor,
    lineHeight: 20
  }
};

const styles = {
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
    marginLeft: 16
  },
  htmlView: {
    flex: 1,
    marginBottom: -44
  },
  cellContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.placeholderColor
  },
  cellOtherView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  nameText: {
    fontSize: 12,
    color: Colors.grayColor,
    marginBottom: 8
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relativeText: {
    fontSize: 10,
    color: Colors.grayColor
  },
  bottomRightView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upText: {
    fontSize: 12,
    color: Colors.grayColor,
    marginRight: 4,
    marginTop: 2
  },
  commentView: {
    height: 58,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor
  },
  commentText: {
    flex: 1,
    fontSize: 12,
    color: Colors.blackColor,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.placeholderColor,
    paddingLeft: 14
  },
  publishButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54
  },
  publishText: {
    fontSize: 14,
    color: Colors.blackColor
  }
}
