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
import ListAccepted from "./ListAccepted.js";
import ListNonChecked from "./ListNonChecked.js";
import ListDiscarded from "./ListDiscarded.js";
import ListDeliveried from "./ListDeliveried.js";
import Addfood from "./Addfood.js";
import Login from './login';
import Register from './register';
import Message from "./Message";


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
                      isShowNotification: false
                 };

    this.isSearch = this.isSearch.bind(this);
    this.back = this.back.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  isSearch()
  {
        if (this.state.searchShow === false)  {  this.setState({...this.state, searchShow: true});  }
  }
  back()
  {
        this.setState({...this.state, searchShow: false, searchText: ""});
  }
  onTextChange(text)
  {
      if (this.state.searchShow === false) { this.setState({...this.state, searchShow: true, searchText: text }); }
      else { this.setState({...this.state, searchText: text }); }
  }
  componentDidMount()
  {
    NetInfo.addEventListener("connectionChange", data=>{
          if (data.type === "unknown" || data.type === "none")
          { this.setState({isShowNotification: true}); }
          else { this.setState({isShowNotification: false}); }
    });
  }

  render()
  {
    // ----- Notification about internet connection---------------------------
    let myNotification = null;
    if (this.state.isShowNotification)
    {
        myNotification = <Message text="Something went wrong with internet connection." />
    }
    // ---- Test for if user is searching or not
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
      Addfood: {screen: Addfood}
    },
    {
      initialRouteName: "Home",
    }
  ));
  return (<Nav />);
  }
}
