import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { homeStyle } from "../Style/style.js";
import Header from "./header";
import PropTypes from 'prop-types';
import MySwiper from './Swiper';
import ListView from "./ListView";



// Define Home class
export default class HomeCustomer extends Component
{
  render()
  {
    return(
      <View style={{flex: 1}} >
          <Header />
          <MySwiper />
          <ListView title={"Dessert"}/>

      </View>
    );
  }
}
