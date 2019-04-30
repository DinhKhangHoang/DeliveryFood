import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RoundButtonIcon from './roundButtonIcon';
import { SkypeIndicator } from 'react-native-indicators';
import Anchor from './anchor';
import { loginStyle, accountStyle } from '../Style/style.js';
import NetInfo from "@react-native-community/netinfo";
import Message from "./Message";

export default class Login extends Component
{
  static navigationOptions = {
                    title: 'Log in',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  constructor(props)
  {
    // Father constructor
    super(props);
    // State of Login Component
    this.state = { isShow: false, error: false, name: "", password: "",  errorMessage: "Username or password is incorrect", disabled: false };
    this.togglePassword = this.togglePassword.bind(this);
    this.validate = this.validate.bind(this);
    this.disable = this.disable.bind(this);
  }
  // Show or hide password
  togglePassword() { this.setState({ isShow: !this.state.isShow }) }

  // Validate user when login
  disable()
  {
    if (this.state.disabled === false)
    {
      this.setState( { disabled: true, error: false} );
      setTimeout( this.validate, 200);
    }
  }


  validate()
  {
    Keyboard.dismiss();
    const { name, password } = this.state;
    if (!name || !password) {  this.setState({  error: true, disabled: false});  }
    else
    {
      firebase.auth().signInWithEmailAndPassword( name, password )
        .then(()=>{
          // ----- Success login -------------------------------------------------------------------------------------
                        this.setState({ error: false, disabled: true});
          //-----------------------------------------------------------------------------------------------------------
      }).catch(()=>{
        // -------- Error catching ------------------------------------------------------------------------------------
                      NetInfo.getConnectionInfo().then( (data)=>{
                            if (data.type === "unknown" || data.type === "none")
                                  this.setState( {errorMessage: "Please check your internet connecttion."} );
                            else {
                              this.setState( {errorMessage: "Username or password is incorrect."} );
                            }
                      } );
                      this.setState({ error: true, disabled: false });
                }
          // ----------------------------------------------------------------------------------------------------------
        );
    }
    // ----------- End if ---------------------------------------------------------------------------------------------
  }



  render()
  {
    const message = (this.state.error ? <Message text={this.state.errorMessage} /> : null);
    const { showRes = true } = this.props;
    return(
      <TouchableWithoutFeedback style={ loginStyle.wrapper } onPress={ ()=>Keyboard.dismiss() }>
        <ImageBackground source={ require("../Media/wallpaper/login.png") } style={ loginStyle.scrollView } imageStyle={{opacity: 0.1 }} >
            <View style={ loginStyle.titleWrapper }>
                  <Text style={ loginStyle.title }>Log In</Text>
            </View>
            <View style={{width: '90%', height: "50%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <View style={{width: "100%", height: "56%"}}>
                      <Input
                          placeholder="Username"
                          autoCapitalize={"none"}
                          leftIcon={{type: 'font-awesome', name: 'user', color:'#014D40', width: 30}}
                          inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20, textDecorationLine: 'none'}}
                          onChangeText={(text) => this.setState({ name: text })}
                          value={this.state.name}
                       />

                      <Input
                          placeholder="Password"
                          autoCapitalize={"none"}
                          leftIcon={{ type: 'font-awesome', name: 'lock', color:'#014D40', width: 30 }}
                          inputStyle={{ fontSize: 14, color: '#014D40', paddingLeft: 20 }}
                          secureTextEntry={!this.state.isShow}
                          /* errorMessage={ this.state.error ? this.state.errorMessage : ""}
                          errorStyle={{color: "white", fontSize: 15, borderRadius: 10, backgroundColor: "#F93D5C", padding: 8}} */
                          onChangeText={ (pass) => this.setState({  password: pass}) }
                          value={this.state.password}
                        />

                        <TouchableOpacity style={{width: "40%", marginLeft: "55%"}} onPress={this.togglePassword}>
                              <Text style={loginStyle.text}> {this.state.isShow ? "HIDE PASSWORD" : "SHOW PASSWORD"} </Text>
                        </TouchableOpacity>
              </View>
              <View style={ loginStyle.buttonWrapper }>
                      <RoundButtonIcon
                              textColor="white"
                              text="LOGIN"
                              background={ ( this.state.disabled ? "#95D195"  : "#0A7966") }
                              round={5}
                              handleOnPress= { this.disable }
                              iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                              style={{ width: '60%'}}
                              underlayColor={  "#0A7966" }
                              activeOpacity={ 0.5 }
                              disabled={this.state.disabled}
                        />
                        <SkypeIndicator  color="#114B5F" style={{ display: (this.state.disabled ? "flex" : "none") }} />
                </View>
          </View>
          <View  style={{width: "100%", height: "30%"}}>
                    <Text style={{fontSize: 16, color: "#014D40", width: "100%", textAlign: "center"}}>
                            Or connect with
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
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
                          textStyle={{color: "#014D40", fontSize: 14}}
                          handleOnPress={()=>{}}
                    />
                    {
                      showRes ?
                    <Anchor
                          text="Don't have an acount?"
                          textStyle={{color: "#014D40", fontSize: 14}}
                          handleOnPress={()=>{ this.props.navigation.navigate("SignUp"); }}
                    /> : null
                  }
          </View>
          { message }
        </ImageBackground>
    </TouchableWithoutFeedback>
    );
  }
}
