import React, { Component } from 'react';
import { Text, View, Picker, Dimensions, ImageBackground, ScrollView } from 'react-native';
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
      this.state = {width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: "portrait", password: "", confirmPass: "", isShow: false };
  }

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
  const { password, confirmPass, isShow } = this.state;
  return(
    <View style={ [registerStyle.wrapper, (this.state.orientation === "portrait" ? { width: this.state.width, height: this.state.height - 20 } : { width: this.state.height, height: this.state.width, flexDirection: "row"} ) ]} ref = "rootView">
      <ImageBackground source={ require("../Media/wallpaper/login.png") } style={{width: "100%", height: "100%"}}  imageStyle={{opacity: 0.1 }} >
           <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
           <Text style={[registerStyle.text, {fontWeight: "bold", display: (this.state.orientation === "portrait" ? "flex" : "none")}]}>Registration</Text>
           <View style={[{width: '80%'}, registerStyle.form]}>
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
                  onChangeText={(text) => this.setState({ ...this.state, password: text})}
                  value={this.state.password}
               />
              <Input
                  placeholder="Confirm password"
                  leftIcon={{type: 'font-awesome', name: 'lock', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ ...this.state, confirmPass: text, isShow: true})}
                  value={this.state.confirmPass}
                  rightIcon={ (isShow ? {type: "font-awesome", name: ( password === confirmPass ? "check-circle" : "exclamation-circle" ), color: ( password === confirmPass ? "#1F9F5F" : "#EA4335" ), width: 30 } : null)}
              />
              <Input
                  placeholder="Email"
                  leftIcon={{type: 'material-community', name: 'email', color:'#014D40', width: 30}}
                  inputStyle={{fontSize: 14, color: '#014D40', paddingLeft: 20}}
              />
              <View style={registerStyle.picker} >
                <Text style={{color: "#014D40", marginRight: 10}}>Type of account: </Text>
                <Picker
                  style={{width:150, height: 50, color: "#014D40", borderWidth: 1, borderColor: "#014D40"}}
                  selectedValue={(this.state && this.state.type)}
                  onValueChange={(itemValue) => this.setState({type: itemValue})} >
                    <Picker.Item label="Customer" value="customer" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                </Picker>
              </View>
            </View>
            <View style={{flex: 1, width: "90%"}}>
              <RoundButtonIcon
                  textColor="white"
                  text="SIGN IN"
                  background="#0A7966"
                  round={5}
                  handleOnPress= { () => {} }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{marginLeft: "10%", marginTop: 20, width: '80%', marginBottom: 30, borderColor: "white", borderWidth: 1}}
                  underlayColor="#27AB83"
              />
           </View>
        </ScrollView>
      </ImageBackground>
    </View>
     );
   }
}
