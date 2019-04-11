import React, { Component } from "react";
import { Text, View } from "react-native";
import {accountStyle } from "../Style/style";
export default class ListAccepted extends Component
{
  static navigationOptions = {
                    title: 'List Accepted',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render(){
    return(
      <Text>This is List Accepted</Text>
    );
  }
}
