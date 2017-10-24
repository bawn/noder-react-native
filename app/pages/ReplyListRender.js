import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  requireNativeComponent,
  Linking
} from 'react-native';

import {Navigation} from 'react-native-navigation'
import * as Colors from '../other/Colors'
import Api from '../util/Api'
import moment from 'moment'
import HTMLView from 'react-native-htmlview'

export default class DetailRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
  	}
  }
  componentDidMount(){
    this.setState({
      dataSource: this.props.data,
    });
  }
  render(){
      if (this.state.dataSource.length) {
        return(
          <FlatList
            initialListSize={10}
            data={this.state.dataSource}
            renderItem={({item, index}) => this.renderRow(item, index)}
            keyExtractor={item => item.id}
            style={styles.listView}
          />
        )
      }
      else {
        return(
          <View/>
        )
      }
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

  renderRow(item, index){
    var row = index + 1;
    return(
      <View style={styles.cellContent}>
        <TouchableOpacity onPress={() => this._avatarPress(item)}>
          <Image source={{uri: item.author.avatar_url}} style={styles.avatar}/>
        </TouchableOpacity>
        <View style={styles.cellOtherView}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{item.author.loginname}</Text>
            <Text style={styles.indexText}>{row + '楼'}</Text>
          </View>
          <HTMLView
            value={item.content}
            style={styles.htmlView}
            stylesheet={htmlStyles}
            onLinkPress={(url) => this._onLinkPress(url)}
          />
          <Text style={styles.relativeText}>{this._relative(item)}</Text>
        </View>
        <View style={styles.separator}></View>
      </View>
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
  listView: {
    flex: 1,
    backgroundColor: Colors.placeholderColor
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
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
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 12,
    color: Colors.grayColor,
  },
  indexText: {
    fontSize: 12,
    color: Colors.blackColor,
  },
  relativeText: {
    fontSize: 10,
    color: Colors.grayColor
  }
}
