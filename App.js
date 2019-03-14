import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from './Component/splashScreen';
import Login from './Component/login'
import Register from './Component/register'

export default class App extends Component {
    render()
    {
      return (
          <Register />
        );
    }
}
