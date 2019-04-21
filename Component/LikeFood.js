import React, { Component } from "react";
import { Text, View } from "react-native";
import { LikeFoodStyle, accountStyle } from "../Style/style";


export default class LikedFood extends Component
{
  static navigationOptions = {
                    title: "Liked Food List",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#89C440",
                    },
  };
  render()
  {
    return(
      <Text>Liked Food</Text>
    );
  }
}
