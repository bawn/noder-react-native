
// 已读消息
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import * as Colors from '../other/Colors'
import Api from '../util/Api'
import moment from 'moment'
import Loading from '../component/LoadingRender'
import Empty from '../component/EmptyRender'
import Store from 'react-native-simple-store'
import HTMLView from 'react-native-htmlview'
import Markdown from 'react-native-simple-markdown'

export default class ReadMessagesRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      viewHeight: 0,
      visible: true
    }
  }
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true
  }

  componentDidMount() {
    Store.get('user').then((res) => { this._updateData(res.accessToken) }
    )
  }

  _onLayout(event) {
    this.setState({
      viewHeight: event.nativeEvent.layout.height
    })
  }

  _emptyComponent() {
    return (
      <Empty
        hidden={this.state.visible}
        height={this.state.viewHeight}
      >
      </Empty>
    )
  }

  _updateData(token) {
    fetch(Api.messages + "?accesstoken=" + token + "&mdrender=false")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            visible: false,
            dataSource: responseData.data.has_read_messages,
          });
        }
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}
        onLayout={(event) => this._onLayout(event)}
      >
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => this.renderSeparator()}
          ListEmptyComponent={() => this._emptyComponent()}
          style={styles.listView}
        />
        <Loading visible={this.state.visible} />
      </View>
    )
  }
  _rowAction(item) {
    this.props.navigator.push({
      screen: 'Noder.DetailRender',
      title: '帖子详情',
      backButtonTitle: ' ',
      passProps: { data: item.topic },
    })
  }
  renderRow(item, index) {
    var row = index + 1;
    return (
      <TouchableHighlight style={{ flex: 1 }} onPress={() => this._rowAction(item)}>
        <View style={styles.cellContent}>
          <Image source={{ uri: item.author.avatar_url }} style={styles.avatar} />
          <View style={styles.textContent}>
            <View style={styles.nicknameView}>
              <Text style={styles.nickname} numberOfLines={1}>
                {item.author.loginname}
              </Text>
              <Text style={styles.create}>{this._relative(item)}</Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>
              {item.topic.title}
            </Text>
            <View style={styles.htmlView}>
              {/* Markdown 会导致一个 waring*/}
              <Markdown
                styles={markdownStyles}
              >
                {item.reply.content}
              </Markdown>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator() {
    return (
      <View style={styles.separator} />
    )
  }
  _relative(item) {
    return moment(item.create_at).fromNow()
  }

  _onLinkPress(url) {
    if (url.startsWith('/user/')) {
      let loginname = url.substr(url.lastIndexOf('/') + 1);
      this.props.navigator.push({
        screen: 'Noder.UserProfileRender',
        title: '',
        backButtonTitle: ' ',
        passProps: { loginname: loginname }
      })
    }
    else {
      Linking.openURL(url).catch();
    }
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
}

const markdownStyles = {
  heading1: {
    fontSize: 20,
    color: Colors.blackColor,
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    fontSize: 14,
    color: Colors.blackColor,
    lineHeight: 20
  },
}


const styles = {
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  cellContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'white'
  },
  htmlView: {
    // flex: 1,
    marginTop: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 26,
    marginRight: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.placeholderColor
  },
  nicknameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nickname: {
    fontSize: 14,
    color: Colors.blackColor
  },
  textContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexShrink: 1
  },
  title: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.blackColor,
    marginTop: 8,
    marginBottom: 8
  },
  create: {
    fontSize: 10,
    fontWeight: '200',
    color: Colors.blackColor,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
  },
  line: {
    position: 'absolute',
    left: 50 + 16 + 16,
    right: 0,
    top: 68,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
  },
  reply: {
    fontSize: 14,
    color: Colors.blackColor,
  },
  centering: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
