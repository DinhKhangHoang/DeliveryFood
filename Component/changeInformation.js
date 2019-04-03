import React, { Component } from "react";
import { Text, View } from "react-native";
import { PersonalInfor, accountStyle } from "../Style/style";


export default class ChangeInfor extends Component
{
  static navigationOptions = {
                    title: 'Personal Information',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render()
  {
    return(
      <Text>Personal Information</Text>
    );
  }
}
