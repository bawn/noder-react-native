import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Dimensions,
  SectionList,
  Linking,
  ActionSheetIOS
} from 'react-native';

let TableViewHeight = 56 * 4 + 12 * 2 + 12

let section1 = [{
  image: require('../assets/images/iconPlacehold.png'),
  text: "清理缓存",
},
{
  image: require('../assets/images/iconPlacehold.png'),
  text: "个人博客",
},
{
  image: require('../assets/images/iconPlacehold.png'),
  text: "Github",
}]

let section2 = [{
  image: require('../assets/images/iconPlacehold.png'),
  text: "退出登录",
}]

let BUTTONS = [
  '退出登录',
  '取消'
]

import {Navigation} from 'react-native-navigation';
import * as Colors from '../other/Colors'
import Styles from '../other/Styles'

export default class SettingRender extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true
  }

  constructor(props) {
    super(props);
    this.state = {
      viewHeight: 0
  	}
  }

  render() {
    return (
      <View style={styles.container} onLayout={(event) => this._onLayout(event)}>
        <SectionList
          scrollEnabled={false}
          sections={[
            { data: section1, key: "1"},
            { data: section2, key: "2"}
          ]}
          keyExtractor={item => item.text}
          renderItem={({item, index}) => this.renderRow(item, index)}
          SectionSeparatorComponent={() => this.sectionSeparator()}
          ItemSeparatorComponent={() => this.renderSeparator()}
          style={styles.listView}
        />
        <View style={[styles.bottomView, {height: this.state.viewHeight}]}>
          <Image source={require('../assets/images/iconLogo.png')}/>
          <Text style={styles.versionText}>{'1.0.0'}</Text>
        </View>
      </View>
    )
  }

  sectionSeparator(){
    return(
      <View style={styles.sectionSeparator}/>
    )
  }

  renderSeparator(){
    return(
      <View style={styles.separator}/>
    )
  }

  _onLayout(event){
    this.setState({
      viewHeight: event.nativeEvent.layout.height - TableViewHeight
    })
  }
  _rowAction(item, index){
    switch (index) {
      case 0:
          if (item.text == "清理缓存") {

          } else {
            ActionSheetIOS.showActionSheetWithOptions({
              title: "是否退出登录？",
              options: BUTTONS,
              destructiveButtonIndex: 0,
              cancelButtonIndex: 1
            },
            (buttonIndex) => {

            })
          }
          break;
      case 1:
          Linking.openURL("https://bawn.github.io/")
          break;
      case 2:
          Linking.openURL("https://github.com/bawn")
          break;
      default:
    }
  }

  renderRow(item, index) {
    return (
      <TouchableHighlight onPress={() => {this._rowAction(item,index)}}>
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
}


const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  listView: {
    height: TableViewHeight
  },
  bottomView: {
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
  cellView: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16
  },
  separatorView: {
    height: 16,
    backgroundColor: Colors.placeholderColor
  },
  cellTtile: {
    fontSize: 16,
    color: Colors.blackColor,
    marginLeft: 16
  },
  sectionSeparator: {
    height: 12,
    backgroundColor: Colors.placeholderColor
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separatorColor,
  },
}
