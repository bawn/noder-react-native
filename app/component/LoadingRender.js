import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';


export default class LoadingRender extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: true
  }

  constructor(props) {
    super(props);
  }

  render(){
    if(this.props.visible) {
      return(
        <ActivityIndicator
          style={[styles.centering]}
          size="small"
        />
      )
    } else {
      return null
    }
  }

}

const styles = {
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
