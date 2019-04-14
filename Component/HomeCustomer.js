import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
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

// Define Home class
class HomeCustomer_Main extends Component
{
  static navigationOptions = {  header: null  };
  constructor(props)
  {
    super(props);
    this.state = { searchShow: false, searchText: "" };
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

  render()
  {
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
                              navigation={this.props.navigation}
                              routename="Detail"
                      />

                </ScrollView> );
         }
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
      Cart: { screen: Cart }
    },
    {
      initialRouteName: "Home",
    }
  ));
  return (<Nav />);
  }
}
