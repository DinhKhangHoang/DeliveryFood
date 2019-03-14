import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import Anchor from './anchor';
import { loginStyle } from '../Style/style.js';


export default class Login extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { isShow: false };
  }

  render()
  {
    return(
        <View style={loginStyle.wrapper}>
            <Avatar
                rounded
                size={160}
                icon={{type: 'font-awesome', name: 'user'}}
                containerStyle={{borderWidth: 4, borderColor: 'white'}}
                overlayContainerStyle={{backgroundColor: 'transparent'}}
            />
            <View style={{width: '90%', marginTop: 25}}>
              <Input
                  placeholder="Username"
                  leftIcon={{type: 'font-awesome', name: 'user', color:'white', width: 30}}
                  inputStyle={{fontSize: 16, color: 'white', paddingLeft: 20}}
               />
              <Input
                  placeholder="Password"
                  leftIcon={{ type: 'font-awesome', name: 'lock', color:'white', width: 30 }}
                  inputStyle={{ fontSize: 16, color: 'white', paddingLeft: 20 }}
                  secureTextEntry={true}
                />
              </View>

              <RoundButtonIcon
                  textColor="white"
                  text="LOGIN"
                  background="#3FBB64"
                  round={10}
                  handleOnPress= { () => {} }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{marginTop: 50, width: '60%', marginBottom: 50, borderColor: "#3FBB64", borderWidth: 1}}
                  underlayColor="#27AB83"
              />
              <Text
                style={{fontSize: 20, color: "white", width: "100%", textAlign: "center"}}>
                Or connect with
              </Text>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',marginTop: 10}}>
                <SocialIcon
                    type='facebook'
                    onPress={ ()=>{}}
                    underlayColor='#003E6B'
                    />
                <SocialIcon
                    type='google'
                    onPress={()=>{}}
                    style={{backgroundColor: '#EA4335', marginLeft: 15}}
                    underlayColor='#D64545'
                    />
                </View>
              <Anchor
                  text="Forgot password?"
                  textStyle={{color: "white", fontSize: 16}}
                  handleOnPress={()=>{}}
              />
              <Anchor
                  text="Don't have an acount?"
                  textStyle={{color: "white", fontSize: 16}}
                  handleOnPress={()=>{}}
              />
        </View>
    );
  }
}
