import React, { Component } from "react";
import { Text, View, FlatList, ImageBackground } from "react-native";
import firebase from 'react-native-firebase';
import { CartStyle, accountStyle, anchorIconStyle } from "../Style/style";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login  from "./login";
import AnchorIcon from "./anchorIcon";

export default class Cart extends Component
{
  static navigationOptions = {
                    title: 'Orders List',
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#FF9900",
                    },
            };
  constructor(props)
  {
        super(props);
        this.state = { user: firebase.auth().currentUser, selectedIndex: 1 };
        this.updateIndex = this.updateIndex.bind(this);
  }


  updateIndex (selectedIndex) {  this.setState({selectedIndex});  }
  render()
  {
    if (this.state.user)
    {
            return(
              <View style={accountStyle.Wrapper}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[
                      {key: "List Accepted", handleOnPress: ()=>{ this.props.navigation.navigate("ListAccepted");}, icon: {name: "checkcircle", type: "antdesign", color: "#00B972"} },
                      {key: "List Non Checked", handleOnPress: ()=>{ this.props.navigation.navigate("ListNonChecked"); }, icon: {name: "truck-delivery", type: "material-community", color: "#6733B9"} },
                      {key: "List Discarded", handleOnPress: ()=>{ this.props.navigation.navigate("ListDiscarded"); }, icon: {name: "circle-with-cross", type: "entypo", color: "red"} },
                      {key: 'List Deliveried', handleOnPress: ()=>{this.props.navigation.navigate("ListDeliveried");}, icon: {name: "truck-check", type: "material-community", color: "#00A7F7"} },
                    ]}
                    renderItem={({item}) =>
                                            <AnchorIcon
                                                    textStyle={ accountStyle.notLogInText }
                                                    text={ item.key }
                                                    handleOnPress={ item.handleOnPress }
                                                    icon = { item.icon }
                                            />
                                }
                  />
                </View>
              );
      }
      else  { return ( <Login navigation={this.props.navigation} /> ); }
  }
}
