import React, { Component } from "react";
import { Text, View, FlatList, ImageBackground } from "react-native";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import firebase from 'react-native-firebase';
import { Avatar } from "react-native-elements";
import { accountStyle } from '../Style/style';
import RoundButton from './roundButton';
import Login from './login';
import DetailFood from "./DetailFood";
import Register from './register';
import AnchorIcon from './anchorIcon';
import ChangeInfor from "./changeInformation";
import FManagement from "./FoodManagement";
import Cart from "./Cart";
import ListAccepted from "./ListAccepted.js"
import ListNonChecked from "./ListNonChecked.js"
import ListDiscarded from "./ListDiscarded.js"
import ListDeliveried from "./ListDeliveried.js"
import LikedFood from "./LikeFood.js";
import CartCustomer from "./CartCustomer.js";
import Addfood from "./Addfood.js";
import Booking from "./Booking.js";
import BookingTable from "./BookingTable.js";
import RestaurantInfor from "./restaurantInfor.js";
import EditFood from "./EditFood.js";
import OrderInfo from './OrderInfo.js';
import NavigationService from "./NavigationService.js";

// Define a home class for account that haven't logged in yet.
export class HomeNotLogIn extends Component
{
    static navigationOptions = {
                    header: null
            };
  render()
  {
    return (
        <View style={accountStyle.Wrapper}>
        <ImageBackground source={require("../Media/wallpaper/homeNotLogIn.jpg")} style={[{width: "100%", height: "100%"}, accountStyle.Wrapper]} imageStyle={{opacity: 0.2}} >
          <Text style={accountStyle.notLogInHeading}>You have not logged in yet.</Text>
             <View style={{display: "flex", flexDirection: "row", padding: 10}}>
                <RoundButton
                      textColor="white"
                      text="Log in"
                      background="#014D40"
                      round={10}
                      boxStyle={{marginHorizontal: 5, width: "40%"}}
                      handleOnPress={()=>{ this.props.navigation.navigate("LogIn"); }}
                      underlayColor="#014D40"
                 />
                <RoundButton
                        textColor="#014D40"
                        text="Sign up"
                        background="#FFFFFF"
                        boxStyle={{marginHorizontal: 5, borderWidth: 1, borderColor: "black", width: "40%"}}
                        round={10}
                        handleOnPress={()=>{ this.props.navigation.navigate("SignUp"); }}
                        underlayColor="#D9E2EC"
                  />
             </View>
          </ImageBackground>
        </View>
    );
  }
}

//----------------------------------------------------------------------------
class AccountNotLogIn extends Component
{
    // Render functions and make navigation
    render()
    {
        const Nav = createAppContainer(createStackNavigator({
          Home: { screen: HomeNotLogIn },
          LogIn: { screen: Login },
          SignUp: { screen: Register }
        },
        {
          initialRouteName: "Home"
        }
      ));
      return (<Nav />);
    }
}

//----------------------------------------------------------------------------
class HomeLogIn extends Component
{
  // ----- Options for navigation ------------------------------------------------------------
        static navigationOptions = {
                    header: null
            };
    // ----- Constructor ------------------------------------------------------------
        constructor(props)
        {
          super(props);
          this.state = { data: [] };
        }
    // ----- After loading UI ------------------------------------------------------------
        componentDidMount()
        {
          if (global.UserType === "Restaurant")
          {
             const data = [
                     {key: "Restaurant Information", handleOnPress: ()=>{ this.props.navigation.navigate("PersonInfor");}, icon: {name: "persona", type: "zocial", color: "#3D4DB8" }},
                     {key: "Menu Management", handleOnPress: ()=>{ this.props.navigation.navigate("FoodManagement"); }, icon: {name: "food", type: "material-community", color: "#89C440" }},
                     {key: "Orders", handleOnPress: ()=>{ this.props.navigation.navigate("Cart"); }, icon: { name: "shopping-cart", type: "feather", color: "#00A7F7" }},
                     {key: 'Log out', handleOnPress: ()=>{ firebase.auth().signOut(); }, icon: {name: "logout", type: "material-community", color: "#FF5606"} },
             ];
             this.setState({ data: data});
          }
          else
          {
            const data = [
                    {key: "Personal Information", handleOnPress: ()=>{ this.props.navigation.navigate("PersonInfor");}, icon: {name: "persona", type: "zocial", color: "#3D4DB8" }},
                    {key: "Favorite food", handleOnPress: ()=>{ this.props.navigation.navigate("LikedFood"); }, icon: {name: "food", type: "material-community", color: "#89C440" }},
                    {key: "Shopping Cart", handleOnPress: ()=>{ this.props.navigation.navigate("CartCustomer"); }, icon: { name: "shopping-cart", type: "feather", color: "#00A7F7" }},
                    {key: 'Log out', handleOnPress: ()=>{ firebase.auth().signOut(); }, icon: {name: "logout", type: "material-community", color: "#FF5606"} },
                ];
            this.setState({ data: data });
          }
        }
    // ----- Render function ---------------------------------------------------------------
  render()
  {
    return (
      <View style={accountStyle.Wrapper}>
          <View style={accountStyle.title}>
              <View style={ accountStyle.avatarWrapper }>
                      <Avatar
                          icon = {{type: "font-awesome", name: "user", color: "white"}}
                          rounded
                          activeOpacity={0.7}
                          size = "large"
                          showEditButton
                          onPress={ ()=>{} }
                      />
              </View>
              <View style={{}}>
                    <Text style={accountStyle.username} >{  global.info.data.name }</Text>
                    <Text style={ accountStyle.type }>{ global.UserType }</Text>
              </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ this.state.data }
            renderItem={   ({item}) => <AnchorIcon
                                                textStyle={ accountStyle.notLogInText }
                                                text={ item.key }
                                                handleOnPress={ item.handleOnPress }
                                                icon = { item.icon }
                                        />
                        }
          />
        </View>);
   }
}


//----------------------------------------------------------------------------
class AccountLogIn extends Component
{
      // Making navigation
      render()
      {
          const Nav = createAppContainer(createStackNavigator({
            Home: { screen: HomeLogIn },
            PersonInfor: { screen: ChangeInfor },
            FoodManagement: { screen: FManagement },
            Cart: { screen: Cart },
            Detail: { screen: DetailFood},
            LikedFood: { screen: LikedFood },
            CartCustomer: { screen: CartCustomer },
            ListAccepted: { screen: ListAccepted },
            ListNonChecked: { screen: ListNonChecked },
            ListDiscarded: { screen: ListDiscarded },
            ListDeliveried: {screen: ListDeliveried},
            Addfood: {screen: Addfood},
            OrderInfo: {screen: OrderInfo},
            Order: { screen: Booking },
            Infor: { screen: RestaurantInfor },
            bookTable: { screen: BookingTable },
            EditFood: {screen: EditFood}
          },
          {
            initialRouteName: "Home"
          }
        ));
        return (<Nav ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>);
      }
}


//----- Main Class -----------------------------------------------------------------------
export default class AccountPage extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { user: null }
  }


  componentWillMount()
  {
    const { currentUser } = firebase.auth();
    if (currentUser && !global.info)
            global.getUser();
    this.setState({user: currentUser});
  }

  render()
  {
    if (this.state.user) return ( <AccountLogIn /> );
    else  return ( < AccountNotLogIn />);
  }
}
