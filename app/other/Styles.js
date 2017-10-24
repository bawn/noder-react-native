
import React, {
  Component,
} from 'react'

import {
  Platform,
  StyleSheet
} from 'react-native'
// DCDCDC
import * as Colors from './Colors'

export default {
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor : Colors.separatorColor
  },
  topLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor : Colors.separatorColor
  },
  topBottomLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separatorColor,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
}
