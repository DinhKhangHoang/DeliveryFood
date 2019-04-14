import React, { Component } from "react";
import { Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import { notification, flexStyle } from "../Style/style";
import { createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";


export class NotificationItem extends Component
{
  render()
  {
    return (
      <View style={ notification.itemContainer }>
          <View style={ notification.titleItemWrapper }>
                <Icon
                      type="material-community"
                      name="android-messages"
                      color="#0078D7"
                      size={30}
                      style={{width:"20%"}}
                />
                <View style={{width: "75%", marginLeft: "5%"}}>
                        <Text style={ notification.titleText }>Title of notification</Text>
                        <Text style={ notification.timeText }>12 Apr 2019 16:47</Text>
                </View>
          </View>
          <View style={ notification.contentItem }>
                <Text>[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199.</Text>
          </View>
      </View>
    );
  }
}


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
                        backgroundColor="#5B9642"
                  />
                  <View style={{ width: "100%", height: "87%"}}>
                        <ScrollView
                              contentContainerStyle={ [flexStyle.wrapper, {marginVertical: 10}] }
                              showsVerticalScrollIndicator={false}>
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                        </ScrollView>
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
                    backgroundColor="#5B9642"
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
                    backgroundColor="#5B9642"
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
            contentOptions: {   activeTintColor: 'green'   },
            order: ["Discount", "Activity", "ShoppingCart"],
        }));
    return(
          <MyDrawerNavigator />
    );
  }
}
