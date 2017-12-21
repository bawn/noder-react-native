import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import * as Colors from '../other/Colors'

export default class EmptyRender extends Component {
  static propTypes = {
    text: PropTypes.string,// 内容文本
    hidden: PropTypes.bool,// 是否隐藏
    height: PropTypes.number// 视图的高度
  }

  static defaultProps = {
    text: "暂无内容",
    visible: false,
    height: 0
  }

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View
        style={[
          styles.emptyView,
          {height: this.props.height},
          {opacity: this.props.hidden ? 0 : 1}
        ]}
      >
        <Text style={styles.emptyText}>{this.props.text}</Text>
      </View>
    )
  }

}

const styles = {
  emptyView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  emptyText: {
    fontSize: 17,
    color: Colors.lightGrayColor
  }
}
