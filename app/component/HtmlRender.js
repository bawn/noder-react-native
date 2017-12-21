import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  NativeModules,
  requireNativeComponent
} from 'react-native';

var RCTHtmlView = requireNativeComponent('RCTHtmlView', null);


export default class HtmlRender extends Component {
  static propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func,
    onClickUserLink: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <RCTHtmlView
        {...this.props}
        style={[styles.container, this.props.style]}
        onChange={this._onChange.bind(this)}
        onClickUserLink={this._onClickUserLink.bind(this)}
      >
      </RCTHtmlView>
    )
  }

  _onChange(event){
    this.props.onChange(event.nativeEvent);
  }
  _onClickUserLink(event){
    this.props.onClickUserLink(event.nativeEvent);
  }
}

const styles = {
  container: {
    flex: 1,
  },
}
