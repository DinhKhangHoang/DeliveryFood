import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import { registerStyle } from '../Style/style.js';
import Anchor from './anchor';

export default class Register extends Component
{
  render()
  {
  return(
    <View style={registerStyle.wrapper}>
        <Text style={registerStyle.text}>Registration</Text>
           <View style={[{width: '80%'}, registerStyle.form]}>
              <Input
                  placeholder="Username"
                  leftIcon={{type: 'font-awesome', name: 'user', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
               />
              <Input
                  placeholder="Name"
                  leftIcon={{type: 'font-awesome', name: 'user-plus', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
              />
              <Input
                  placeholder="Password"
                  leftIcon={{type: 'font-awesome', name: 'unlock-alt', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
                  secureTextEntry={true}
               />
              <Input
                  placeholder="Confirm password"
                  leftIcon={{type: 'font-awesome', name: 'lock', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
                  secureTextEntry={true}
              />
              <Input
                  placeholder="Email"
                  leftIcon={{type: 'material-community', name: 'email', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
              />
              <RoundButtonIcon
                  textColor="white"
                  text="SIGN IN"
                  background="transparent"
                  round={40}
                  handleOnPress= { () => {} }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{marginTop: 50, width: '80%', marginBottom: 50, borderColor: "white", borderWidth: 5}}
                  underlayColor="#27AB83"
              />
            </View>
              <Anchor
                  text="Cancel"
                  textStyle={{color: "white", fontSize: 20}}
                  handleOnPress={()=>{}}
              />
         </View>
     );
   }
}
