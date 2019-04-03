import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { homeStyle } from "../Style/style.js";
import Header from "./header";
import PropTypes from 'prop-types';
import MySwiper from './Swiper';
import ListView from "./ListView";
import Search from "./Search";


// Define Home class
export default class HomeCustomer extends Component
{
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
                <View>
                      <MySwiper />
                      <ListView title="Dessert"/>
                </View> );
         }
    return(
      <View style={{flex: 1}} >
          <Header show={this.state.searchShow} onFocus={this.isSearch} back={this.back} onTextChange={this.onTextChange} searchText={this.state.searchText}/>
          { body }
      </View>
    );
  }
}
