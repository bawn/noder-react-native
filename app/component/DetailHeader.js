import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as Colors from '../other/Colors'
import moment from 'moment'

export default class DetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static propTypes = {
    avatarPress: PropTypes.func
  };

  _relative(item){
    return moment(item.create_at).fromNow()
  }

  render(){
    let item = this.props.data
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.avatarPress}>
          <Image source={{uri: item.author.avatar_url}} style={styles.avatar}/>
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <Text style={styles.title} numberOfLines={1}>{item.author.loginname}</Text>
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
    )
  }
}

const styles = {
  container: {
    height: 74,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separatorColor
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
    justifyContent: 'flex-start',
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
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackColor,
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
    marginRight: 5,
    marginTop: 1
  },
  messageImage: {
    marginLeft: 10,
    marginRight: 5
  }
}
