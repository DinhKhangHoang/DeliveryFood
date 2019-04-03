import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import SwiperFlatList from "react-native-swiper-flatlist";
import { swiperStyle } from "../Style/style.js";


// Define item in swiper
class SwiperItem extends Component
{
  render()
  {
    return(
      <TouchableOpacity style={this.props.containerStyle} activeOpacity={0.8}>
          <Image resizeMode='cover' source={this.props.imageURL}  style={this.props.imageStyle}  />
          <Text style={swiperStyle.textOnSwiper}>{this.props.text}</Text>
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
      { image: require("../Media/swiper/1.jpg"), text: "One Food Over A Day" },
      { image: require("../Media/swiper/2.jpg"), text: "Two" },
      { image: require("../Media/swiper/3.jpg"), text: "Three" }
     ]
    };

    this.renderItemComponent = this.renderItemComponent.bind(this);
  }
  renderItemComponent({ item })
  {
    return (
      <SwiperItem
            imageURL={item.image}
            text={item.text}
            containerStyle={ swiperStyle.swiperItem }
            imageStyle={ swiperStyle.imageOnSwiper }
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
