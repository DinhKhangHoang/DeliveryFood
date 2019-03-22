import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import Anchor from './anchor';
import { loginStyle } from '../Style/style.js';


export default class Login extends Component
{
  constructor(props)
  {
    // Father constructor
    super(props);
    // Calculator the Dimensions of screen;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    // State of Login Component
    this.state = { isShow: false, error: false, width: width, height: height, orientation: "portrait" };
    this.togglePassword = this.togglePassword.bind(this);
    this.validate = this.validate.bind(this);
  }

  // Show or hide password
  togglePassword() { this.setState({ ...this.state, isShow: !this.state.isShow}) }

  // Validate user when login
  validate()
  {
    this.setState({ ...this.state, error: !this.state.error });
  }

  // Calculate screen size
   getOrientation = () => {
    if( this.refs.rootView )
    {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) { this.setState({ ...this.state, orientation: 'portrait' }); }
        else { this.setState({ ...this.state, orientation: 'landscape' }); }
    }
  }

  componentDidMount()
  {
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => {   this.getOrientation();  });
  }

  render()
  {
    return(
        <ScrollView ref = "rootView" showsVerticalScrollIndicator={false} contentContainerStyle={[ loginStyle.wrapper, (this.state.orientation === "portrait" ? { width: this.state.width, height: this.state.height } : { width: this.state.height, height: this.state.width, flexDirection: "row"} ) ]} >
            <Avatar
                rounded
                size={160}
                icon={{type: 'font-awesome', name: 'user'}}
                containerStyle={{borderWidth: 4, borderColor: (this.state.orientation === "portrait" ? "white" : "transparent"), marginTop: 20, display: (this.state.orientation === "portrait" ? "flex" : "none")}}
                overlayContainerStyle={{backgroundColor: 'transparent'}}
            />
            <View style={{width: '90%', marginTop: 25, flex: 1 }}>
              <Input
                  placeholder="Username"
                  leftIcon={{type: 'font-awesome', name: 'user', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20, textDecorationLine: 'none'}}
               />
              <Input
                  placeholder="Password"
                  leftIcon={{ type: 'font-awesome', name: 'lock', color:'white', width: 30 }}
                  inputStyle={{ fontSize: 14, color: 'white', paddingLeft: 20 }}
                  secureTextEntry={!this.state.isShow}
                  errorMessage={ this.state.error ? "Username or password is incorrect!" : ""}
                  errorStyle={{color: "white", fontSize: 15, borderRadius: 10, backgroundColor: "#F93D5C", padding: 8}}
                />
                <TouchableOpacity style={{width: "40%", marginLeft: "55%"}} onPress={this.togglePassword}>
                    <Text style={loginStyle.text}> {this.state.isShow ? "HIDE PASSWORD" : "SHOW PASSWORD"} </Text>
                </TouchableOpacity>
                <RoundButtonIcon
                      textColor="white"
                      text="LOGIN"
                      background="#3FBB64"
                      round={10}
                      handleOnPress= { this.validate }
                      iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                      style={{marginLeft: "20%", marginTop: 20, width: '60%', marginBottom: (this.state.orientation === "portrait" ? 20 : 0), borderColor: "#3FBB64", borderWidth: 1}}
                      underlayColor="#27AB83"
                />
              </View>

              <View  style={{flex: 1, width: "100%"}}>
              <Text
                style={{fontSize: 16, color: "white", width: "100%", textAlign: "center"}}>
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
                  textStyle={{color: "white", fontSize: 14}}
                  handleOnPress={()=>{}}
              />
              <Anchor
                  text="Don't have an acount?"
                  textStyle={{color: "white", fontSize: 14}}
                  handleOnPress={()=>{}}
              />
              </View>
        </ScrollView>
    );
  }
}
