import React, { Component } from 'react';
import { Text, View, Picker, ImageBackground, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import { registerStyle, accountStyle } from '../Style/style.js';
import Anchor from './anchor';

export default class Register extends Component
{
  static navigationOptions = {
                  title: "Sign up",
                  headerTitleStyle:  accountStyle.titleStyle
    };

  constructor(props)
  {
      super(props);
      this.state = { password: "", confirmPass: "", isShow: false, notification: false };
      this.createAccount = this.createAccount.bind(this);
  }


  createAccount()
  {
    // Doing something

     this.setState({ notification: true});
  }

  render()
  {
  const { password, confirmPass, isShow } = this.state;
  const isEqual = (password === confirmPass && password !== "" ? true : false);
  return(
    <View style={ registerStyle.wrapper } >
      <ImageBackground source={ require("../Media/wallpaper/login.png") } style={ registerStyle.imageContentStyle }  imageStyle={{opacity: 0.1 }} >
            <View style={ registerStyle.titleWrapper }>
                    <Text style={registerStyle.text}>Registration</Text>
            </View>
           <View style={ registerStyle.form }>
              <Input
                  placeholder="Username"
                  leftIcon={{type: 'font-awesome', name: 'user', color: '#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
               />
              <Input
                  placeholder="Name"
                  leftIcon={{type: 'font-awesome', name: 'user-plus', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
              />
              <Input
                  placeholder="Password"
                  leftIcon={{type: 'font-awesome', name: 'unlock-alt', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
               />
              <Input
                  placeholder="Confirm password"
                  leftIcon={{type: 'font-awesome', name: 'lock', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({confirmPass: text, isShow: true})}
                  value={this.state.confirmPass}
                  rightIcon={ (isShow ? {type: "font-awesome", name: (isEqual ? "check-circle" : "exclamation-circle" ), color: ( isEqual ? "#1F9F5F" : "#EA4335" ), width: 30 } : null)}
              />
              <Input
                  placeholder="Email"
                  leftIcon={{type: 'material-community', name: 'email', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
              />
              <View style={registerStyle.picker} >
                        <Text style={{color: "#014D40", width: "40%"}}>Type of account: </Text>
                        <View style={ registerStyle.pickerWrapper }>
                                <Picker
                                      style={{width:150, height: 50, color: "#014D40"}}
                                      selectedValue={(this.state && this.state.type)}
                                      onValueChange={(itemValue) => this.setState({type: itemValue})} >
                                        <Picker.Item label="Customer" value="customer" />
                                        <Picker.Item label="Restaurant" value="restaurant" />
                                </Picker>
                        </View>
              </View>
            </View>
            <View style={ registerStyle.buttonWrapper }>
              <RoundButtonIcon
                  textColor="white"
                  text="SIGN IN"
                  background="#0A7966"
                  round={5}
                  handleOnPress= { this.createAccount }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{ width: '80%', borderColor: "white", borderWidth: 1, height: "35%"}}
                  underlayColor="#27AB83"
              />
              <View style={ [registerStyle.bottomWrapper, { display: (this.state.notification ? "flex" : 'none') }]}>
                    <Text style={ registerStyle.notification }>You have created account successful</Text>
                    <Anchor
                          text="Click here to log in"
                          textStyle={{ color: "#014D40", fontWeight: "bold" }}
                          handleOnPress={ () => this.props.navigation.navigate("LogIn") }
                    />
              </View>
           </View>
      </ImageBackground>
    </View>
     );
   }
}
