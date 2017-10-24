import {
  Platform,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from '../pages';
registerScreens();

const createTabs = () => {
  let tabs = [
    {
      label: '主题',
      screen: 'Noder.HomeRender',
      icon: require('../assets/images/tabbarMeNormal.png'),
      selectedIcon: require('../assets/images/tabbarMeSelected.png'),
      title: '主题'
    },
    {
      label: '我的',
      screen: 'Noder.MeRender',
      icon: require('../assets/images/tabbarMeNormal.png'),
      selectedIcon: require('../assets/images/tabbarMeSelected.png'),
      title: '我的'
    }
  ];
  return tabs;
};
// this will start our app
Navigation.startTabBasedApp({
  tabs: createTabs(),
  tabsStyle: {
    tabBarBackgroundColor: '#ffffff',
    tabBarButtonColor: '#ABABAB',
    tabBarSelectedButtonColor: '#424242'
  }
});
