import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import { accountStyle } from "../Style/style";

export default class FManagement extends Component
{
    static navigationOptions = {
                      title: 'Food Management',
                      headerTitleStyle: { ...accountStyle.titleStyle, color: "white" },
                      headerStyle:{
                        backgroundColor: "#227100",
                      },
                      headerRight: (
                        <View style = {{paddingRight:10} }>
                          <Icon
                            onPress = {()=>{}}
                            type = "font-awesome"
                            name ="plus"
                            color="white"
                            size ={30}
                            underlayColor="transparent"
                          />
                        </View>
                      ),
              };
    render()
    {
      return (

           <ListViewMenu/>
       );
   }
}
