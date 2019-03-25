import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './Component/splashScreen';
import Login from './Component/login';
import Register from './Component/register';
import { MainScreen } from "./Component/mainScreen";


export default class App extends Component {
constructor(props)
{
  super(props);
  this.state = {
      isAuth: false,
      isLoaded: false
  };
}
render() {
   if ( this.state.isLoaded === false)
   {
     // Load data from database


     //Pseudo time-consuming function
     setTimeout( ()=>{this.setState({ ...this.state, isLoaded: true});},3000);
     // this.setState({ ...this.state, isLoaded: true});
     return ( <SplashScreen/> );
   }
    const Main = createAppContainer(MainScreen);
    return(
      <Main />
    );
  }
}
