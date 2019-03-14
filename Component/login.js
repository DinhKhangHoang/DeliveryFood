import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import Anchor from './anchor';
import { loginStyle } from '../Style/style.js';


export default class Login extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { isShow: false, error: false };
    this.togglePassword = this.togglePassword.bind(this);
    this.validate = this.validate.bind(this);
  }

  togglePassword() { this.setState({isShow: !this.state.isShow, error: this.state.error}) }
  validate() {
    this.setState({isShow: this.state.isShow, error: !this.state.error});
  }
  render()
  {
    return(
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={loginStyle.wrapper}>
            <Avatar
                rounded
                size={160}
                icon={{type: 'font-awesome', name: 'user'}}
                containerStyle={{borderWidth: 4, borderColor: 'white', marginTop: 10}}
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
                  secureTextEntry={!this.state.isShow}
                  errorMessage={ this.state.error ? "ERROR: Username or password is incorrect!" : ""}
                  errorStyle={{color: "white", fontSize: 15, borderRadius: 10, backgroundColor: "#F93D5C", padding: 8}}
                />
                <TouchableOpacity style={{width: "40%", marginLeft: "55%"}} onPress={this.togglePassword}>
                    <Text style={loginStyle.text}> {this.state.isShow ? "HIDE PASSWORD" : "SHOW PASSWORD"} </Text>
                </TouchableOpacity>
              </View>
              <RoundButtonIcon
                  textColor="white"
                  text="LOGIN"
                  background="#3FBB64"
                  round={10}
                  handleOnPress= { this.validate }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{marginTop: 20, width: '60%', marginBottom: 20, borderColor: "#3FBB64", borderWidth: 1}}
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
        </ScrollView>
    );
  }
}
