import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActionSheetIOS
} from 'react-native';

import DetailHeader from '../component/DetailHeader'
import * as Colors from '../other/Colors'
import Api from '../util/Api'
import Store from 'react-native-simple-store'
import { Navigation } from 'react-native-navigation'

let BUTTONS = [
  {
    key: 'share',
    value: '分享',
  },
  {
    key: 'ask',
    value: '问答',
  },
  {
    key: 'job',
    value: '招聘',
  },
  {
    key: 'dev',
    value: '客户端测试',
  },
  {
    key: 'cancel',
    value: '取消',
  }
]

var CANCEL_INDEX = 4

export default class CreatePostRender extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true,
    navBarButtonColor: Colors.blackColor
  }

  static navigatorButtons = {
    leftButtons: [{
        id: 'dismiss',
        title: '取消',
        buttonFontSize: 15
    }],
    rightButtons: [{
        id: 'post',
        title: '发布',
        buttonFontSize: 15
    }],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      sectionText: null,
      tab: "dev",
      title: "",
      content: ""
    };
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'dismiss') {
        Navigation.dismissModal({
          animationType: 'slide-down'
        });
      } else {
        this._postTopics()
      }
    }
  }

  _postTopics() {
    var json = {
      'accesstoken' : "da9456ff-9ac6-4b6b-a04f-690daf66c530",
      'title': this.state.title,
      'tab': this.state.tab,
      'content': this.state.content
    };
    fetch(Api.postTopics, {
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
          if (responseData.success == true) {
            Navigation.dismissModal({
              animationType: 'slide-down'
            });
          }
        }
      })
    .done();
  }

  _sectionButtonAction() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS.map((item) => {return item.value}),
      cancelButtonIndex: CANCEL_INDEX
    },
    (buttonIndex) => {
      if (buttonIndex != CANCEL_INDEX) {
        this.setState({
          sectionText: BUTTONS[buttonIndex].value,
          tab: BUTTONS[buttonIndex].key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <TextInput style={styles.titleInput}
            placeholder="输入标题"
            onChangeText={(title) => this.setState({title})}
            >
          </TextInput>
          <Image
            style={styles.dashLine}
            source={require('../assets/images/iconDashLine.png')}
            resizeMode={Image.resizeMode.cover}
          />
          <View style={styles.section}>
            <TextInput style={styles.sectionInput}
              placeholder="选择版块"
              editable={false}
              value={this.state.sectionText}
              >
            </TextInput>
            <Image
              style={styles.arrowImage}
              source={require('../assets/images/iconDownArrow.png')}
            />
            <TouchableOpacity
              onPress={() => this._sectionButtonAction()}
              style={styles.sectionButton}
            />
          </View>
          <Image
            style={styles.dashLine}
            source={require('../assets/images/iconDashLine.png')}
            resizeMode={Image.resizeMode.cover}
          />
          <TextInput style={styles.contentInput}
            placeholder="输入内容"
            onChangeText={(content) => this.setState({content})}
            multiline={true}
            >
          </TextInput>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentView: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  titleInput: {
    fontSize: 20,
    height: 58,
    color: Colors.blackColor,
  },
  dashLine: {
    height: 1
  },
  section: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.blackColor,
  },
  arrowImage: {
    height: 6,
    width: 12
  },
  sectionButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  contentInput: {
    fontSize: 15,
    height: 400,
    marginTop: 12,
    color: Colors.blackColor,
  },
}
