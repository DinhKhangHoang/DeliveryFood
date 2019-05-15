import React, { Component } from 'react';
import { Text, View, Picker, ImageBackground, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import firebase from 'react-native-firebase';
import { registerStyle, accountStyle } from '../Style/style.js';
import Anchor from './anchor';
import Message from "./Message";
import NetInfo from "@react-native-community/netinfo";
import { SkypeIndicator } from 'react-native-indicators';

export default class Register extends Component
{
  static navigationOptions = {
                  title: "Sign up",
                  headerTitleStyle:  accountStyle.titleStyle
    };

  constructor(props)
  {
      super(props);
      this.state = {
        username: "",
        password: "",
        confirmPass: "",
        email: "",
        phoneNumber: "",
        type: "Customers",
        isShow: false,
        notification: false,
        message: 'You have created account successfully',
        loading: false
      };
      this.createAccount = this.createAccount.bind(this);
  }


  createAccount()
  {
    setTimeout(()=>{
          const { username, password, confirmPass, phoneNumber, email, type } = this.state;
          const validateEmail = new RegExp("[a-zA-Z0-9_.]+(@gmail.com|@yahoo.com)");
          // ---- Test if user haven't fill full form ----------------------------------------------------------
          if (username === "" || password === "" || confirmPass === "" || phoneNumber === "" || email === "")
           {
                 this.setState({ notification: false, loading: false });
                 setTimeout( () => this.setState({
                         notification: true,
                         message: "You must complete form to register"
                 }), 20);
           }
             // ---- Test if password and confirmPass is the same --------------------------------------------------
            else if (password !== confirmPass )
            {
                  this.setState({ notification: false, loading: false });
                  setTimeout( () => this.setState({
                          notification: true,
                          message: "Your confirm pass isn't the same with your password"
                  }), 20);
            }
            else if (password.length < 6)
            {
                  this.setState({ notification: false, loading: false });
                  setTimeout( () => this.setState({
                          notification: true,
                          message: "Your password must be longer"
                  }), 20);
            }
            // Test email is correct format
            else if (validateEmail.test(email) == false)
            {
                  this.setState({ notification: false, loading: false });
                  setTimeout( () => this.setState({
                          notification: true,
                          message: "Your email is incorrect format"
                  }), 20);
            }
            // Test phone number is correct format
            else if (isNaN(phoneNumber) | phoneNumber.length != 10 | phoneNumber[0] !== "0")
            {
                  this.setState({ notification: false, loading: false });
                  setTimeout( () => this.setState({
                          notification: true,
                          message: "Your phone number is incorrect format"
                  }), 20);
            }
            // ---- Dont having something wrong -----------------------------------------------------------------
            else
            {
              firebase.auth().createUserWithEmailAndPassword(email, password).then().then(
                (res)=>{
                    // ---- Create personal information ----------------------------------------------------------
                        let data;
                        if (type == "Customers")
                        {
                                data = {
                                      NameCUS: username,
                                      Email: email,
                                      UID_CUS: res.user.uid,
                                      Address: "",
                                      Birthday: "",
                                      PhoneNumber: phoneNumber,
                                      likedComment: "",
                                      rating: "",
                                      likeFood: "",
                                    };
                         }
                        else {
                                data = {
                                      NameRES: username,
                                      Email: email,
                                      UID_RES: res.user.uid,
                                      Address: "",
                                      FeedBack: 0,
                                      Ordercount: 0,
                                      PhoneNumber: phoneNumber,
                                      Rating: 0,
                                      TimeWork: "",
                                      numberRate: 0,
                                      bookingTablePrice: 0,
                                      likedComment: "",
                                      rating: "",
                                      likeFood: "",
                                  };
                        }
                        firebase.firestore().collection(type).doc( res.user.uid ).set( data );
                    // ------- Display message ---------------------------------------------------------------------
                        global.signUp.username = username;
                        global.signUp.signUp = true;

              }).catch((error)=>{
                    // ----- Test the internet ---------------------------------------------------------------------
                    NetInfo.getConnectionInfo().then( (data)=>{

                          if (data.type === "unknown" || data.type === "none")
                          {
                                  this.setState({ notification: false, loading: false });
                                  setTimeout( () => this.setState({
                                        notification: true,
                                        message: "Please check your internet connection"
                                  }), 20);
                          }
                    // ----- If there is the internet connection --------------------------------------------------
                          else {
                                this.setState({ notification: false, loading: false });
                                setTimeout( () => this.setState({
                                          notification: true,
                                          message: "Your email is used by another account"
                                }), 20);
                          }
                    } );
              });
            }
          // -----------------------------------------------------------------------------------------------------
        }, 700);
        this.setState({ loading: true });
  }

  render()
  {
  const message = (this.state.notification ? <Message text={this.state.message} /> : null);
  const { password, confirmPass, isShow } = this.state;
  const isEqual = (password === confirmPass && password !== "" ? true : false);
  return(
    <View style={ registerStyle.wrapper } >
      <ImageBackground source={ require("../Media/wallpaper/login.png") } style={ registerStyle.imageContentStyle }  imageStyle={{opacity: 0.1 }} >
            <View style={ registerStyle.titleWrapper }>
                    <Text style={registerStyle.text}>Sign Up</Text>
            </View>
           <View style={ registerStyle.form }>
              <Input
                  placeholder="Email"
                  leftIcon={{type: 'material-community', name: 'email', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  onChangeText={(text) => this.setState({ email: text })}
                  autoCapitalize={"none"}
               />
               <Input
                   placeholder="Password"
                   leftIcon={{type: 'font-awesome', name: 'unlock-alt', color:'#014D40', width: 30}}
                   inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                   secureTextEntry={true}
                   onChangeText={(text) => this.setState({ password: text })}
                   value={this.state.password}
                   autoCapitalize={"none"}
                />
               <Input
                   placeholder="Confirm password"
                   leftIcon={{type: 'font-awesome', name: 'lock', color:'#014D40', width: 30}}
                   inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                   secureTextEntry={true}
                   onChangeText={(text) => this.setState({confirmPass: text, isShow: true})}
                   value={this.state.confirmPass}
                   rightIcon={ (isShow ? {type: "font-awesome", name: (isEqual ? "check-circle" : "exclamation-circle" ), color: ( isEqual ? "#1F9F5F" : "#EA4335" ), width: 30 } : null)}
                   autoCapitalize={"none"}
               />
              <Input
                  placeholder="Name"
                  leftIcon={{type: 'font-awesome', name: 'user-plus', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  onChangeText={(text) => this.setState({ username: text })}
                  autoCapitalize={"none"}
              />
              <Input
                  placeholder="Phone number"
                  textContentType="telephoneNumber"
                  keyboardType='numeric'
                  leftIcon={{type: "font-awesome", name: "phone", color:"#014D40", width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  onChangeText={(text) => this.setState({ phoneNumber: text })}
              />
              <View style={registerStyle.picker} >
                        <Text style={{color: "#014D40", width: "40%", height: "100%", textAlignVertical: 'center'}}>Type of account: </Text>
                        <View style={ registerStyle.pickerWrapper }>
                                <Picker
                                      style={{width:150, height: 50, color: "#014D40"}}
                                      selectedValue={(this.state && this.state.type)}
                                      onValueChange={(itemValue) => this.setState({type: itemValue})} >
                                        <Picker.Item label="Customer" value="Customers" />
                                        <Picker.Item label="Restaurant" value="Restaurants" />
                                </Picker>
                        </View>
              </View>
            </View>
            <View style={ registerStyle.buttonWrapper }>
              { (this.state.loading ?  <SkypeIndicator  color="#114B5F" style={{ display: "flex" }} /> :
                  <RoundButtonIcon
                      textColor="white"
                      text="SIGN UP"
                      background="#0A7966"
                      round={5}
                      handleOnPress= { this.createAccount }
                      iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                      style={{ width: '80%', borderColor: "white", borderWidth: 1, height: 55}}
                      underlayColor="#27AB83"
                  /> )}
           </View>
          { message }
      </ImageBackground>
    </View>
     );
   }
}
