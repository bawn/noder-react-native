import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Colors from '../other/Colors'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

export default class QRScanRender extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {

  	}
  }
  static navigatorButtons = {
    leftButtons: [{
      title: '取消',
      id: 'close',
    }]
  }
  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }
  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    tabBarHidden: true,
    navBarTextColor: Colors.blackColor,
    navBarButtonColor: Colors.blackColor,
  }
  componentDidMount(){

    // RCTDeviceEventEmitter.emit('NoderGetToken', '');
    // this.props.navigator.dismissModal();
  }

  _topContent(){
    return(
      <View style={{height:0}}></View>
    )
  }
  _bottomContent(){
    return(
      <View style={{height:0}}></View>
    )
  }
  _onRead(object){
    var token = object.data;
  }
  render(){
    return(
      <View style={styles.container}>
        <QRCodeScanner
          style={{flex:1}}
          cameraStyle = {styles.cameraContainer}
          topContent={this._topContent()}
          bottomContent={this._bottomContent()}
          onRead={(object) => this._onRead(object)}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  cameraContainer: {
     height: Dimensions.get('window').height,
  },
}
