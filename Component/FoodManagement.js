import React, { Component } from "react";
import { Text, View } from "react-native";
import { FoodManagement, accountStyle } from "../Style/style";

export default class FManagement extends Component
{
    static navigationOptions = {
                      title: 'Food Management',
                      headerTitleStyle:  accountStyle.titleStyle
              };
    render()
    {
      return (
           <Text>Food Management</Text>
       );
   }
}
