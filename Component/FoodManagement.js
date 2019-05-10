import React, { Component } from "react";
import {View, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import { FoodManagement, accountStyle, listViewMenuItemStyle} from "../Style/style";

export default class FManagement extends Component
{
    constructor(){
      super();
      this._onPressAdd = this._onPressAdd.bind(this);

    }
    static navigationOptions = ({navigation})=>{
      return{
                      title: 'Food Management',
                      headerTitleStyle: { ...accountStyle.titleStyle, color: "white" },
                      headerStyle:{
                        backgroundColor: "#227100",
                      },
                      headerRight: (
                        <TouchableOpacity style = {listViewMenuItemStyle.button}
                                          onPress = {()=>{navigation.navigate("Addfood")}}
                                          activeOpacity ={0.7}>
                          <View style = {{flexDirection: "column", flex: 1, justifyContent: 'center'} }>
                            <Icon
                              type = "font-awesome"
                              name ="plus"
                              color="white"
                              size ={30}
                              underlayColor="transparent"
                            />
                          </View>
                        </TouchableOpacity>
                      )
            };
    };
    _onPressAdd(){
      this.props.navigation.navigate("Addfood");
    }
    render()
    {
      return (
          <View>
           <ListViewMenu/>
          </View>
       );
   }
}
