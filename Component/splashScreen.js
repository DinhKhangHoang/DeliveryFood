import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { splashStyle } from '../Style/style';

export default class SplashScreen extends Component
{
    render()
    {
      return (
        <View style={{flex:1}}>
          <View style={splashStyle.wrapper}>
              <Image source={require('../Media/icon/Icon.png')} style={splashStyle.icon} />
              <Text style={splashStyle.text}>Food Delivery</Text>
          </View>
          <View style={splashStyle.loading}>
            <DotIndicator  size={10} color={"#014D40"}/>
          </View>
          <View style={splashStyle.copyright}>
              <Text style={splashStyle.textCopyright}>Powered by React Native</Text>
          </View>
        </View>
      );
    }
}
