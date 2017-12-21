import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import * as Colors from '../other/Colors'
import Api from '../util/Api'
import moment from 'moment'
import Loading from '../component/LoadingRender'
import Empty from '../component/EmptyRender'

export default class TopicCollectRender extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true,
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      viewHeight: 0,
      visible: true
  	}
  }
  componentDidMount(){
    fetch(Api.topicCollect + this.props.loginname)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            visible: false,
            dataSource: responseData.data,
          });
        }
      })
    .done();
  }
  _onLayout(event){
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

  render(){
    return(
      <View style={styles.container}
        onLayout={(event) => this._onLayout(event)}
        >
        <FlatList
          initialListSize={10}
          data={this.state.dataSource}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => this.renderSeparator()}
          ListEmptyComponent={() => this._emptyComponent()}
          style={styles.listView}
        />
        <Loading visible={this.state.visible}/>
      </View>
    )
  }
  _rowAction(item){
    this.props.navigator.push({
      screen: 'Noder.DetailRender',
      title: '帖子详情',
      backButtonTitle: ' ',
      passProps: {data: item},
    })
  }
  renderRow(item, index){
    let markIcon = null;
    if (item.good) {
      markIcon = require('../assets/images/iconStar.png')
    }
    else {
      markIcon = require('../assets/images/iconTop.png')
    }
    return(
      <TouchableHighlight style={{flex:1}} onPress={()=>this._rowAction(item)}>
        <View style={styles.cell}>
          <Image source={{uri: item.author.avatar_url}} style={styles.avatar}/>
          <View style={styles.content}>
            <View style={styles.topContent}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Image source={markIcon} opacity={item.top || item.good}
              />
            </View>
            <View style={styles.bottomContent}>
              <Text style={styles.create}>{this._relative(item)}</Text>
              <View style={styles.reply}>
                <Image
                  source={require('../assets/images/iconEye.png')}
                  style={styles.eyeImage}
                />
                <Text style={styles.replyText}>{item.visit_count}</Text>
                <Image
                  source={require('../assets/images/iconMessae.png')}
                  style={styles.messageImage}
                />
                <Text style={styles.replyText}>{item.reply_count}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator(){
    return(
      <View style={styles.separator}/>
    )
  }
  _relative(item){
    return moment(item.create_at).fromNow()
  }
}


const styles = {
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  cell: {
    height: 76,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.placeholderColor
  },
  topContent: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContent: {
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.blackColor,
    flexShrink: 1
  },
  create: {
    fontSize: 10,
    fontWeight: '200',
    color: Colors.blackColor
  },
  reply: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  replyText: {
    fontSize: 10,
    fontWeight: '200',
    color: Colors.blackColor
  },
  eyeImage: {
    marginRight: 5
  },
  messageImage: {
    marginLeft: 10,
    marginRight: 5
  }
}
