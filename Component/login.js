import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RoundButtonIcon from './roundButtonIcon';
import { SkypeIndicator } from 'react-native-indicators';
import Anchor from './anchor';
import { loginStyle, accountStyle } from '../Style/style.js';


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
    this.state = { isShow: false, error: false, name: "", password: "", errorMessage: "", disabled: false };
    this.togglePassword = this.togglePassword.bind(this);
    this.validate = this.validate.bind(this);
    this.disable = this.disable.bind(this);
  }


  componentDidMount() { firebase.auth().onAuthStateChanged(); }
  // Show or hide password
  togglePassword() { this.setState({ isShow: !this.state.isShow }) }

  // Validate user when login
  disable()
  {
      this.setState( { disabled: true, error: false} );
      setTimeout( this.validate, 1500);
  }


  validate()
  {
    const { name, password } = this.state;
    if (!name || !password) {  this.setState({  error: true, errorMessage: "Username or password is incorrect", disabled: false});  }
    else
    {
      /*
      firebase.auth().signInWithEmailAndPassword( name, password )
        .then(function(){
                this.setState({ error: false, errorMessage: "Username or password is incorrect", disabled: true});
        }).catch(function(error) {
              // Error
              this.setState({ error: true, errorMessage: "Username or password is incorrect", disabled: false});
        });
        */
    }
  }



  render()
  {
    return(
      <View style={ loginStyle.wrapper }>
        <ImageBackground source={ require("../Media/wallpaper/login.png") } style={{width: "100%", height: "100%", position: 'absolute'}}  imageStyle={{opacity: 0.1 }} >
         <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
            <Text style={ loginStyle.title }>Food Delivery</Text>
            <View style={{width: '90%', flex: 3 }}>
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
                  errorMessage={ this.state.error ? this.state.errorMessage : ""}
                  errorStyle={{color: "white", fontSize: 15, borderRadius: 10, backgroundColor: "#F93D5C", padding: 8}}
                  onChangeText={ (pass) => this.setState({  password: pass}) }
                  value={this.state.password}
                />

                <TouchableOpacity style={{width: "40%", marginLeft: "55%"}} onPress={this.togglePassword}>
                    <Text style={loginStyle.text}> {this.state.isShow ? "HIDE PASSWORD" : "SHOW PASSWORD"} </Text>
                </TouchableOpacity>
                <RoundButtonIcon
                      textColor="white"
                      text="LOGIN"
                      background={ ( this.state.disabled ? "#B1D1A7" : "#0A7966") }
                      round={5}
                      handleOnPress= { (!this.state.disabled && this.disable) }
                      iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                      style={{ marginLeft: "20%", marginTop: 20, width: '60%', borderColor: ( this.state.disabled ? "#B1D1A7" : "#0A7966"), borderWidth: 1}}
                      underlayColor={ ( this.state.disabled ? "#B1D1A7" : "#0A7966") }
                      activeOpacity={ 0.5 }
                />
                <View style={{
                                  display: ( this.state.disabled ? "flex" : "none"),
                                  marginTop: 40
                            }}>
                    <SkypeIndicator
                        color="#114B5F"
                    />
                </View>
              </View>
              <View  style={{flex: 3, width: "100%"}}>
              <Text
                style={{fontSize: 16, color: "#014D40", width: "100%", textAlign: "center"}}>
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
                  textStyle={{color: "#014D40", fontSize: 14}}
                  handleOnPress={()=>{}}
              />
              <Anchor
                  text="Don't have an acount?"
                  textStyle={{color: "#014D40", fontSize: 14}}
                  handleOnPress={()=>{ this.props.navigation.navigate("SignUp"); }}
              />
              </View>
          </ScrollView>
        </ImageBackground>
    </View>
    );
  }
}
