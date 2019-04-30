import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { homeStyle } from "../Style/style.js";
import Header from "./header";
import PropTypes from 'prop-types';
import MySwiper from './Swiper';
import ListView from "./ListView";
import Search from "./Search";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DetailFood from "./DetailFood";
import RestaurantInfor from "./restaurantInfor";
import Booking from "./Booking.js";
import BookingTable from "./BookingTable";
import Cart from "./Cart";
import GridView from "./GridView";
import ListAccepted from "./ListAccepted.js"
import ListNonChecked from "./ListNonChecked.js"
import ListDiscarded from "./ListDiscarded.js"
import ListDeliveried from "./ListDeliveried.js"
import Login from './login';
import Register from './register';
import Message from "./Message";
import LikedFood from "./LikeFood.js";
import CartCustomer from "./CartCustomer.js";



import firebase from "react-native-firebase";

// Define Home class
class HomeCustomer_Main extends Component
{
  static navigationOptions = {  header: null  };
  constructor(props)
  {
    super(props);
    this.state = {
                      searchShow: false,
                      searchText: "",
                      isShowNotification: false,
                      signUpSuccess: false
                 };

    this.isSearch = this.isSearch.bind(this);
    this.back = this.back.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  isSearch()
  {
        if (this.state.searchShow === false)  {  this.setState({ searchShow: true });  }
  }
  back()
  {
        this.setState({  searchShow: false, searchText: ""});
  }
  onTextChange(text)
  {
      if (this.state.searchShow === false) { this.setState({ searchShow: true, searchText: text }); }
      else { this.setState({ searchText: text }); }
  }

  componentDidMount()
  {
    // ---- Test the internet ----------------------------------------------------------------------------------------------------------------------------------
    NetInfo.addEventListener("connectionChange", data=>{
          if (data.type === "unknown" || data.type === "none")
          { this.setState({isShowNotification: true}); }
          else { this.setState({isShowNotification: false}); }
    });
    //---- Message handler display after sign up ----------------------------------------------------------------------------------------------------------------
   const mess =  ()=>this.setState({ signUpSuccess: true });
   global.signUp = {
          set signUp(val) {
                    this._signUp = val;
                    mess();
          },
          username: undefined,
          _signUp: false
    };
  }

  render()
  {
    // ----- Notification about internet connection-----------------------------------------------------------------------------------------------------------
    let myNotification = null;
    if (this.state.isShowNotification)
    {
        myNotification = <Message text="Something went wrong with internet connection." />
    }
    if (this.state.signUpSuccess)
    {
          myNotification = <Message
                                      text={ "Welcome " + global.signUp.username }
                                      round={5}
                                      backgroundColor="white"
                                      color="gray"
                                      textStyle={{ fontSize: 17, lineHeight: 20, fontWeight: "bold"}}
                                      secondText={
                                            <Text style={{color: "gray", paddingBottom: 10, paddingLeft: 20}}>You sign up successfully.</Text>
                                          }
                                      top="12%"
                                      icon={{color: "#00BFA5", name: "checkcircle", type: "antdesign", onPress: null}}
                                />;
    }
    // ---- Test for if user is searching or not -------------------------------------------------------------------------------------------------------------
    let body;
    if (this.state.searchShow) {  body = <Search />;  }
    else {   body = (
                <ScrollView
                      showsVerticalScrollIndicator={false}
                >
                      <MySwiper
                            navigation={this.props.navigation}
                            routename="Detail"
                      />
                      <ListView
                              title="Dessert"
                              containerStyle={{ elevation: 3 }}
                              navigation={this.props.navigation}
                              routename="Detail"
                              handleOnPress={ ()=>firebase.auth().signOut() }
                      />
                      <GridView
                              title="What today ?"
                              navigation={this.props.navigation}
                              routename="Detail"
                      />
                </ScrollView> );
         }
   // ----- return part -------------------------------------------------------
    return(
      <View style={{flex: 1}} >
          <Header
                  show={this.state.searchShow}
                  onFocus={this.isSearch} back={this.back}
                  onTextChange={this.onTextChange}
                  searchText={this.state.searchText}
                  navigation={ this.props.navigation }
           />
          { body }
          { myNotification }
      </View>
    );
  }
}


export default class HomeCustomer extends Component
{

  render()
  {
    const Nav = createAppContainer(createStackNavigator({
      Home: { screen: HomeCustomer_Main },
      Detail: { screen: DetailFood },
      Order: { screen: Booking },
      Infor: { screen: RestaurantInfor },
      bookTable: { screen: BookingTable },
      Cart: { screen: Cart },
      ListAccepted: { screen: ListAccepted },
      ListNonChecked: { screen: ListNonChecked },
      ListDiscarded: { screen: ListDiscarded },
      ListDeliveried: {screen: ListDeliveried},
      LogIn: { screen: Login },
      SignUp: { screen: Register },
      LikedFood: { screen: LikedFood },
      CartCustomer: { screen: CartCustomer },
    },
    {
      initialRouteName: "Home",
    }
  ));
  return (<Nav />);
  }
}
