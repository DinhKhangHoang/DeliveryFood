import React, { Component } from "react";
import { Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import { notification, flexStyle } from "../Style/style";
import { createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";


class Discount extends Component
{
      static navigationOptions = {
              drawerLabel: 'Discount',
              drawerIcon: ({ tintColor }) => (
                    <Icon
                          type="antdesign"
                          name="tag"
                          color={tintColor}
                    />
                ),
      };

      render() {
          return (
            <View>
                  <Header
                        leftComponent={
                              <Icon
                                    name="menu"
                                    type="entypo"
                                    color="white"
                                    underlayColor="transparent"
                                    size={34}
                                    onPress={ ()=> this.props.navigation.toggleDrawer() }
                              />
                        }
                        centerComponent={{ text: 'DISCOUNT', style: notification.headerTitle }}
                        backgroundColor="#0078D7"
                  />
                  <View   style={ flexStyle.wrapper }>
                          <Text style={{textAlign: "center"}}>
                                  This is the information about discount
                          </Text>
                  </View>
            </View>
           );
    }
}


class Activity extends Component
{
  static navigationOptions = {
          drawerLabel: 'Activity',
          drawerIcon: ({ tintColor }) => (
                <Icon
                      type="feather"
                      name="activity"
                      color={tintColor}
                />
            ),
  };

  render() {
      return (
        <View>
              <Header
                    leftComponent={
                          <Icon
                                name="menu"
                                type="entypo"
                                color="white"
                                underlayColor="transparent"
                                size={34}
                                onPress={ ()=> this.props.navigation.toggleDrawer() }
                          />
                    }
                    centerComponent={{ text: 'ACTIVITY', style: notification.headerTitle }}
                    backgroundColor="#0078D7"
              />
              <Text>222222222222222222</Text>
        </View>
       );
   }
}


class ShoppingCart extends Component
{
  static navigationOptions = {
          drawerLabel: 'Cart Status',
          drawerIcon: ({ tintColor }) => (
                <Icon
                      type="entypo"
                      name="shopping-bag"
                      color={tintColor}
                />
            ),
  };

  render() {
      return (
        <View>
              <Header
                    leftComponent={
                          <Icon
                                name="menu"
                                type="entypo"
                                color="white"
                                underlayColor="transparent"
                                size={34}
                                onPress={ ()=> this.props.navigation.toggleDrawer() }
                          />
                    }
                    centerComponent={{ text: 'CART STATUS', style: notification.headerTitle }}
                    backgroundColor="#0078D7"
              />
              <Text>3</Text>
        </View>
       );
   }
}


// -------------- Drawer navigation -------------------------------------

const customDrawer = (props) => (
        <SafeAreaView  style={{flex: 1}}>
                <ScrollView>
                        <Text style={ notification.drawerTitle }>N</Text>
                        <Image
                              source={  require("../Media/drawer/1.png") }
                              style={{height: 200}}
                         />
                        <DrawerItems {...props}  />
                </ScrollView>
        </SafeAreaView>
);

//--------------------------------------------------------------------------

export default class NotificationPage extends Component
{
  render()
  {

    const MyDrawerNavigator = createAppContainer(createDrawerNavigator(
        {
            Discount: { screen: Discount },
            Activity: { screen: Activity },
            ShoppingCart: { screen: ShoppingCart }
        },
        {
            initialRouteName: 'Discount',
            drawerPosition: 'left',
            contentComponent: customDrawer,
            contentOptions: {   activeTintColor: '#0078D7'   },
            order: ["Discount", "Activity", "ShoppingCart"],
        }));
    return(
          <MyDrawerNavigator />
    );
  }
}
