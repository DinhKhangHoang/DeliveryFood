import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Icon } from 'react-native-elements';
import { headerStyle } from "../Style/style.js";
import firebase from 'react-native-firebase';



export default class Header extends Component
{
  constructor(props)
  {
      super(props);
      this.state = { search: "" };
  }


  render()
  {
    const { search } = this.state;
    return (
      <View style={headerStyle.wrapper} >
          <Image
                source={ require("../Media/icon/logo.png") }
                style={{ width: "60%"}}
                resizeMode="cover"
          />
          <View style={{paddingLeft: "3%", width: "30%", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "row", marginRight: "5%"}}>
              <View style={ headerStyle.iconWrapper}>
                  <Icon
                         name="search"
                         type="evilicons"
                         color="white"
                         underlayColor="transparent"
                         onPress={()=>{this.props.navigation.push("Search")}}
                 />
             </View>
             <View style={ headerStyle.iconWrapper }>
                    <Icon
                        name="shopping-cart"
                        type="feather"
                        color="white"
                        underlayColor="transparent"
                        onPress={ ()=>this.props.navigation.push( (global.UserType == "Restaurant" ? "Cart" : "CartCustomer")) }
                    />
            </View>
          </View>
      </View>
    );
  }
}
