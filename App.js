import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './Component/splashScreen';
import Login from './Component/login';
import Register from './Component/register';
import { MainScreen } from "./Component/mainScreen";


export default class App extends Component {
render() {
    const Main = createAppContainer(MainScreen);
    return(
      <Register />
    );
  }
}
