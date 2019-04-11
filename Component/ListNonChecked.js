import React, { Component } from "react";
import { Text, View } from "react-native";
import {accountStyle } from "../Style/style";
export default class ListNonChecked extends Component
{
  static navigationOptions = {
                    title: 'List Non Checked',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render(){
    return(
      <Text>This is List Non Checked</Text>
    );
  }
}
