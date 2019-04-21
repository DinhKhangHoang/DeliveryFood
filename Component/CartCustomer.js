import React, { Component } from "react";
import { Text, View } from "react-native";
import { CartCustomerStyle, accountStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Login from "./login";


export default class CartCustomer extends Component
{
  static navigationOptions = {
                    title: "Shopping Cart",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#FF5607",
                    },
  };
  render()
  {
    if (firebase.auth().currentUser)
    {
          return(
            <Text>Cart Customer</Text>
          );
    }
    else
    {
      return (<Login navigation={this.props.navigation} />)
    }
  }
}
