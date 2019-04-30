import React, { Component } from "react";
import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Header, Icon } from "react-native-elements";
import Anchor from "./anchor";
import Login from "./login";
import Register from "./register";
import firebase from 'react-native-firebase';
import { notification, flexStyle, loginStyle, CartStyle, accountStyle } from "../Style/style";
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";
import NetInfo from "@react-native-community/netinfo";
// ------------Notification if not login ----------------------------------------------------------------
class NotLogIn extends Component
{
  static navigationOptions = {
                  header: null
          };
    render()
    {
        return (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                <Image
                    source={require("../Media/icon/bell.png")}
                    style={{width: 100, height: 100, marginBottom: "2%"}}
                 />
                <Text>Have account?</Text>
                <Anchor
                    text="Click here to login"
                    textStyle={{fontWeight: "bold", color: "white"}}
                    wrapperStyle={{ borderRadius: 5, backgroundColor: "gray", marginTop: "3%"}}
                    underlayColor="rgba(0, 0, 0, 0.6)"
                    handleOnPress={ ()=> {this.props.navigation.navigate("Login")} }
                />
          </View>
        );
    }
}

class NotLogInNav extends Component
{
  render()
  {
        const Nav = createAppContainer(createStackNavigator({
              Home: { screen: NotLogIn },
              Login: { screen: Login },
              SignUp: { screen: Register }
          },
          {
              initialRouteName: "Home",
          }));
          return (<Nav />);
  }
}
//--------------- Item -----------------------------------------------------------------------------------
export class NotificationItem extends Component
{
  render()
  {
            const {  title, time, content } = this.props;
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
                                <Text style={ notification.titleText }>{ title }</Text>
                                <Text style={ notification.timeText }>{ time }</Text>
                        </View>
                  </View>
                  <View style={ notification.contentItem }>
                        <Text>{ content }</Text>
                  </View>
              </View>
          );
    }
}

// -------- this is discount page ------------------------------------------------------------------------------------------------------
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
      constructor(props)
      {
            super(props);
            this.state = {data:
                            [
                                  {key: "Tile of notification", time: "12 Apr 2019 16:47", content: "[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199."},
                                  {key: "Tile of notification", time: "12 Apr 2019 16:47", content: "[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199."},
                                  {key: "Tile of notification", time: "12 Apr 2019 16:47", content: "[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199."},
                                  {key: "Tile of notification", time: "12 Apr 2019 16:47", content: "[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199."},
                                  {key: "Tile of notification", time: "12 Apr 2019 16:47", content: "[QC] GOI DIEN THOAI GIA RE co ngay 100 phut goi noi mang su dung trong 30 ngay chi voi 29.000d (gia han sau 30 ngay). Dang ky, soan KM29 gui 109. CT ap dung cho TB nhan duoc tin nhan. Chi tiet LH 198 (0d). Tu choi QC, soan TC2 gui 199."},
                            ],
                            isEmpty: false
          };
          // ---- Fetch data from database ---------------------------------------------------------------------------------
          // ---- Must check if database is empty or not -------------------------------------------------------------------
      }
      render() {
        if (this.state.isEmpty)
        {
              return (
                <View style={{flex: 1}}>
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
                          <View style={{ width: "100%", height: "87%", backgroundColor: "white"}}>
                              <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                                    <Image
                                        source={require("../Media/icon/Social_Icon.gif")}
                                        style={{width: 100, height: 100, marginBottom: "2%"}}
                                     />
                                    <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 20}}>You don't have any notification.</Text>
                              </View>
                          </View>
                </View>
              );
        }
        else
        {
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
                                  <FlatList
                                        contentContainerStyle={ [flexStyle.wrapper, {marginVertical: 10}] }
                                        showsVerticalScrollIndicator={false}
                                        data = {this.state.data}
                                        renderItem={ ({item})=>(
                                                <NotificationItem
                                                      title={item.key}
                                                      time={item.time}
                                                      content={item.content}
                                                />
                                        )}
                                    />
                          </View>
                      </View>
                  );
          }
      } // end render
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
  constructor(props)
  {
    super(props);
    this.state = {
            data: [],
            isEmpty: true };
  }


  render() {
    if (this.state.isEmpty)
    {
          return (
            <View style={{flex: 1}}>
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
                      <View style={{ width: "100%", height: "87%", backgroundColor: "white"}}>
                          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                                <Image
                                    source={require("../Media/icon/Social_Icon.gif")}
                                    style={{width: 100, height: 100, marginBottom: "2%"}}
                                 />
                                <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 20}}>You don't have any notification.</Text>
                          </View>
                      </View>
            </View>
          );
    }
    else
    {
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
                              <FlatList
                                    contentContainerStyle={ [flexStyle.wrapper, {marginVertical: 10}] }
                                    showsVerticalScrollIndicator={false}
                                    data = {this.state.data}
                                    renderItem={ ({item})=>(
                                            <NotificationItem
                                                  title={item.key}
                                                  time={item.time}
                                                  content={item.content}
                                            />
                                    )}
                                />
                      </View>
                  </View>
              );
      }
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
  constructor(props)
  {
    super(props);
    this.state = {
            data: [],
            isEmpty: true };
  }

  render() {
    if (this.state.isEmpty)
    {
          return (
            <View style={{flex: 1}}>
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
                            centerComponent={{ text: 'CART', style: notification.headerTitle }}
                            backgroundColor="#5B9642"
                      />
                      <View style={{ width: "100%", height: "87%", backgroundColor: "white"}}>
                          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                                <Image
                                    source={require("../Media/icon/Social_Icon.gif")}
                                    style={{width: 100, height: 100, marginBottom: "2%"}}
                                 />
                                <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 20}}>You don't have any notification.</Text>
                          </View>
                      </View>
            </View>
          );
    }
    else
    {
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
                              centerComponent={{ text: '', style: notification.headerTitle }}
                              backgroundColor="#5B9642"
                        />
                        <View style={{ width: "100%", height: "87%"}}>
                              <FlatList
                                    contentContainerStyle={ [flexStyle.wrapper, {marginVertical: 10}] }
                                    showsVerticalScrollIndicator={false}
                                    data = {this.state.data}
                                    renderItem={ ({item})=>(
                                            <NotificationItem
                                                  title={item.key}
                                                  time={item.time}
                                                  content={item.content}
                                            />
                                    )}
                                />
                      </View>
                  </View>
              );
      }
   }
}

// -------------- Drawer navigation -------------------------------------

const customDrawer = function(props) {
  return (
        <SafeAreaView  style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={ notification.closeButton }>
                        </View>
                        <Text style={ notification.drawerTitle }>N</Text>
                        <Image
                              source={  require("../Media/drawer/1.png") }
                              style={{height: 200}}
                         />
                        <DrawerItems {...props}  />
                </ScrollView>
        </SafeAreaView>
);
}


//--------------------------------------------------------------------------

export default class NotificationPage extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
          isConnected: false,
          user: firebase.auth().currentUser
    };
  }

  componentDidMount()
  {
          NetInfo.addEventListener('connectionChange', (data)=>{
                if (data.type === "unknown" || data.type === "none")
                {
                        this.setState({isConnected: false});
                }
                else {
                        this.setState({isConnected: true});
                }
          });
  }

  render()
  {
    if (this.state.user)
    {
          if (this.state.isConnected)
             {
                  //----------------------------------------------------------------------------------------
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
          else
          {
            return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                  <Image
                      source={require("../Media/icon/noWF.png")}
                      style={{width: 100, height: 100, marginBottom: "2%"}}
                   />
                  <Text style={{fontSize: 16, fontWeight: "bold"}}>Please check your internet connection.</Text>
            </View>
          );
       }
    }
    else return (<NotLogInNav />);
  }
}
