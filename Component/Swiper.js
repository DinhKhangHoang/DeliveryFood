import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import SwiperFlatList from "react-native-swiper-flatlist";
import { swiperStyle } from "../Style/style.js";


// Define item in swiper
class SwiperItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false };
        this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress()
  {
    setTimeout( ()=>this.setState( { disabled:false } ), 1000);
    this.props.handleOnPress();
    this.setState( { disabled: true } );
  }


  render()
  {
    return(
      <TouchableOpacity
              style={this.props.containerStyle}
              activeOpacity={0.8}
              onPress={ (!this.state.disabled && this.handleOnPress) }
      >
          <Image resizeMode='cover' source={this.props.imageURL}  style={this.props.imageStyle}  />
          <Text numberOfLines={1} style={swiperStyle.textOnSwiper}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}


// props type specification
SwiperItem.propTypes = {
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  text: PropTypes.string
};


export default class MySwiper extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data: [
      { key: require("../Media/swiper/1.jpg"), title: "One Food Over A Day 123456789", price: 10000, rate: 4.2},
      { key: require("../Media/swiper/2.jpg"), title: "Two", price: 12000, rate: 3.6},
      { key: require("../Media/swiper/3.jpg"), title: "Three", price: 22000, rate: 4.6 }
     ]
    };

    this.renderItemComponent = this.renderItemComponent.bind(this);
  }
  renderItemComponent({ item })
  {
    return (
      <SwiperItem
            imageURL={item.key}
            text={item.title}
            containerStyle={ swiperStyle.swiperItem }
            imageStyle={ swiperStyle.imageOnSwiper }
            handleOnPress={ ()=>this.props.navigation.push( this.props.routename, { data: item } ) }
       />
     );
}
  render()
  {
    return(
      <View style={ swiperStyle.container } >
          <SwiperFlatList
           autoplay
           autoplayDelay={2}
           autoplayLoop
           data={ this.state.data }
           renderItem={ this.renderItemComponent }
           />
    </ View>
    );
  }
}
