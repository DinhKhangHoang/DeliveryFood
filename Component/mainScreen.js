import React, { Component } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from "react-native-elements";
import HomeCustomer from "./HomeCustomer";
import NotificationPage from "./Notification";
import AccountPage from "./Account";

export const MainScreen = createBottomTabNavigator(
  {
    Home: HomeCustomer,
    Notification: NotificationPage,
    "My account": AccountPage
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === "Home")
          {
            iconName = "home";
            return < Icon type="font-awesome" name={iconName} size={25} color={tintColor} />
          }
          else if (routeName === "Notification")
          {
                iconName = "notifications" + (focused ? "" : "-none");
                return < Icon type="material" name={iconName} size={25} color={tintColor} />
          }
          else if (routeName === "My account")
          {
               iconName="account-circle" + (focused ? "" : "-outline");
               return < Icon type="material-community" name={iconName} size={25} color={tintColor} />
          }
      }
    }),
    tabBarOptions: {
			activeTintColor: "green",
			inactiveTintColor: "gray"
		}
  }
);
