
// 最近回复

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as Colors from '../other/Colors'
import Api from '../util/Api'
import moment from 'moment'
import Empty from '../component/EmptyRender'

export default class RecentRepliesRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      viewHeight: 0,
  	}
  }
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true,
  }
  componentDidMount(){
    this.setState({
      dataSource: this.props.data,
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
            ItemSeparatorComponent={() => this.renderSeparator()}
            ListEmptyComponent={() => this._emptyComponent()}
            style={styles.listView}
          />
        </View>
      )
  }

  _emptyComponent() {
    return (
      <Empty
        height={this.state.viewHeight}
        >
      </Empty>
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
    var row = index + 1;
    return(
      <TouchableHighlight style={{flex:1}} onPress={()=>this._rowAction(item)}>
        <View style={styles.cellContent}>
          <Image source={{uri: item.author.avatar_url}} style={styles.avatar}/>
          <View style={styles.textContent}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.create}>{this._relative(item)}</Text>
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
    return moment(item.last_reply_at).fromNow()
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
  cellContent: {
    flex: 1,
    height: 74,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white'
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
  textContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 50,
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.blackColor,
    // flexShrink: 1
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
}
