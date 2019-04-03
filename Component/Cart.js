import React, { Component } from "react";
import { Text, View } from "react-native";
import { CartStyle, accountStyle } from "../Style/style";


export default class Cart extends Component
{
      static navigationOptions = {
                        title: 'Shopping Cart',
                        headerTitleStyle:  accountStyle.titleStyle
                };
  render()
  {
    return(
      <Text>Shopping Cart</Text>
    );
  }
}
