import React, { Component } from "react";
import { Text, View } from "react-native";
import {accountStyle } from "../Style/style";
export default class ListDeliveried extends Component
{
  static navigationOptions = {
                    title: 'List Deliveried',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render(){
    return(
      <Text>This is List Deliveried</Text>
    );
  }
}
