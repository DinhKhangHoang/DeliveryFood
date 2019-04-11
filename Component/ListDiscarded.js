import React, { Component } from "react";
import { Text, View } from "react-native";
import {accountStyle } from "../Style/style";
export default class ListDiscarded extends Component
{
  static navigationOptions = {
                    title: 'List Discarded',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render(){
    return(
      <Text>This is List Discarded</Text>
    );
  }
}
