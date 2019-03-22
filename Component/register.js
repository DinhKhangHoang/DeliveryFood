import React, { Component } from 'react';
import { Text, View, Picker, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import RoundButtonIcon from './roundButtonIcon';
import { registerStyle } from '../Style/style.js';
import Anchor from './anchor';

export default class Register extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: "portrait" };
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
  return(
    <View style={ [registerStyle.wrapper, (this.state.orientation === "portrait" ? { width: this.state.width, height: this.state.height } : { width: this.state.height, height: this.state.width, flexDirection: "row"} ) ]} ref = "rootView">
           <Text style={[registerStyle.text, {display: (this.state.orientation === "portrait" ? "flex" : "none")}]}>Registration</Text>
           <View style={[{width: '80%'}, registerStyle.form]}>
              <Input
                  placeholder="Username"
                  leftIcon={{type: 'font-awesome', name: 'user', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20}}
               />
              <Input
                  placeholder="Name"
                  leftIcon={{type: 'font-awesome', name: 'user-plus', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20}}
              />
              <Input
                  placeholder="Password"
                  leftIcon={{type: 'font-awesome', name: 'unlock-alt', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20}}
                  secureTextEntry={true}
               />
              <Input
                  placeholder="Confirm password"
                  leftIcon={{type: 'font-awesome', name: 'lock', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20}}
                  secureTextEntry={true}
              />
              <Input
                  placeholder="Email"
                  leftIcon={{type: 'material-community', name: 'email', color:'white', width: 30}}
                  inputStyle={{fontSize: 14, color: 'white', paddingLeft: 20}}
              />
              <View style={registerStyle.picker} >
                <Text style={{color: "white", marginRight: 10}}>Type of account: </Text>
                <Picker
                  style={{width:150, height: 50, color: "white", borderWidth: 1, borderColor: "white"}}
                  selectedValue={(this.state && this.state.type)}
                  onValueChange={(itemValue) => this.setState({type: itemValue})}>
                    <Picker.Item label="Customer" value="customer" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                </Picker>
              </View>
            </View>
            <View style={{flex: 1, width: "90%"}}>
              <RoundButtonIcon
                  textColor="white"
                  text="SIGN IN"
                  background="transparent"
                  round={30}
                  handleOnPress= { () => {} }
                  iconStyle={{name:"chevron-circle-right", type: "font-awesome", color: "white"}}
                  style={{marginLeft: "10%", marginTop: 50, width: '80%', marginBottom: 30, borderColor: "white", borderWidth: 3}}
                  underlayColor="#27AB83"
              />
              <Anchor
                  text="Cancel"
                  textStyle={{color: "white", fontSize: 16}}
                  handleOnPress={()=>{}}
              />
          </View>
          </View>
     );
   }
}
