import React, { Component } from "react";
import { Text, View, FlatList, TouchableHighlight } from "react-native";
import { CartStyle, accountStyle, anchorIconStyle } from "../Style/style";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import AnchorIcon from './anchorIcon';
import ListAccepted from "./ListAccepted.js"
import ListNonChecked from "./ListNonChecked.js"
import ListDiscarded from "./ListDiscarded.js"
import ListDeliveried from "./ListDeliveried.js"


export default class Cart extends Component
{
      static navigationOptions = {
                        title: 'Shopping Cart',
                        headerTitleStyle:  accountStyle.titleStyle
                };
  render()
  {
    const Nav = createAppContainer(createStackNavigator({
      CartPage: { screen: CartPage },
      ListAccepted: { screen: ListAccepted },
      ListNonChecked: { screen: ListNonChecked },
      ListDiscarded: { screen: ListDiscarded },
      ListDeliveried: {screen: ListDeliveried}
      },
      {
        initialRouteName: "CartPage"
      }
    ));
    return(
      <Nav/>
    );
  }
}
class CartPage extends Component
{
  static navigationOptions = {
                    title: 'Shopping Cart',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  render()
  {
    return(
      <View style={accountStyle.Wrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[
              {key: "List Accepted", handleOnPress: ()=>{ this.props.navigation.navigate("ListAccepted");}},
              {key: "List Non Checked", handleOnPress: ()=>{ this.props.navigation.navigate("ListNonChecked"); }},
              {key: "List Discarded", handleOnPress: ()=>{ this.props.navigation.navigate("ListDiscarded"); }},
              {key: 'List Deliveried', handleOnPress: ()=>{this.props.navigation.navigate("ListDeliveried");}},
            ]}
            renderItem={({item}) =>
                                    <TouchableHighlight onPress={item.handleOnPress} style={anchorIconStyle.wrapper} underlayColor="rgba(0, 0, 0, 0.2)">
                                      <View style={{flex: 1,  flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}}>
                                        <Text style={ [ accountStyle.notLogInText, anchorIconStyle.text] }>{ item.key }</Text>
                                      </View>
                                    </TouchableHighlight>
                        }
          />
        </View>
      );
  }
}
