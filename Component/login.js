import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Icon, Input, Avatar, SocialIcon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RoundButtonIcon from './roundButtonIcon';
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
    // Calculator the Dimensions of screen;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    // State of Login Component
    this.state = { isShow: false, error: false, width: width, height: height, orientation: "portrait", name: "", password: "", errorMessage: "" };
    this.togglePassword = this.togglePassword.bind(this);
    this.validate = this.validate.bind(this);
  }


  componentDidMount() { firebase.auth().onAuthStateChanged(); }
  // Show or hide password
  togglePassword() { this.setState({ ...this.state, isShow: !this.state.isShow}) }

  // Validate user when login
  validate()
  {
    const { name, password } = this.state;
    let error;
    if (!name || !password) {  this.setState({ ...this.state, error: true, errorMessage: "Username or password is incorrect" });  }
    else
    {
      firebase.auth().signInWithEmailAndPassword( this.state.name, this.state.password )
        .then(function(){
                error = false;
        }).catch(function(error) {
              // Error
              error = true;
        });
        this.setState({...this.state, error: error});
    }
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
      <View ref = "rootView" style={[ loginStyle.wrapper, (this.state.orientation === "portrait" ? { width: this.state.width, height: this.state.height - 30 } : { width: this.state.height, height: this.state.width, flexDirection: "row"} ) ] }>
        <ImageBackground source={ require("../Media/wallpaper/login.png") } style={{width: "100%", height: "100%", position: 'absolute'}}  imageStyle={{opacity: 0.1 }} >
         <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
            <Text
                style={{flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#014D40",
                        fontSize: 40,
                        fontWeight: "bold",
                        marginTop: 30,
                        display: (this.state.orientation === "portrait" ? "flex" : "none") }}>
                      Food Delivery
              </Text>
            <View style={{width: '90%', flex: 3 }}>
              <Input
                  placeholder="Username"
                  autoCapitalize={"none"}
                  leftIcon={{type: 'font-awesome', name: 'user', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20, textDecorationLine: 'none'}}
                  onChangeText={(text) => this.setState({ ...this.state, name: text})}
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
                  onChangeText={ (pass) => this.setState({ ...this.state, password: pass}) }
                  value={this.state.password}
                />

                <TouchableOpacity style={{width: "40%", marginLeft: "55%"}} onPress={this.togglePassword}>
                    <Text style={loginStyle.text}> {this.state.isShow ? "HIDE PASSWORD" : "SHOW PASSWORD"} </Text>
                </TouchableOpacity>
                <RoundButtonIcon
                      textColor="white"
                      text="LOGIN"
                      background="#0A7966"
                      round={5}
                      handleOnPress= { this.validate }
                      iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                      style={{ marginLeft: "20%", marginTop: 20, width: '60%', marginBottom: (this.state.orientation === "portrait" ? 20 : 0), borderColor: "#014D40", borderWidth: 1}}
                      underlayColor="#0A7966"
                />
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
                  handleOnPress={()=>{}}
              />
              </View>
          </ScrollView>
        </ImageBackground>
    </View>
    );
  }
}
