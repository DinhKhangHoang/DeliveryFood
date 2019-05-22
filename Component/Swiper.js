import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ContentLoader from 'rn-content-loader';
import { Rect } from "react-native-svg";
import PropTypes from 'prop-types';
import SwiperFlatList from "react-native-swiper-flatlist";
import { swiperStyle } from "../Style/style.js";
import firebase from "react-native-firebase";


// Define item in swiper
class SwiperItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false, autoplay: true, imageURL: ' '  };
        this.handleOnPress = this.handleOnPress.bind(this);
  }

      handleOnPress()
      {
        if (!this.state.disabled)
        {
                this.props.handleOnPress();
                setTimeout( ()=>this.setState({ disabled:false }), 1000);
                this.setState( { disabled: true } );
        }
      }

      componentDidMount()
      {
          if (this.props.imageURL == ' ')
          {
              firebase.storage().ref().child("/FoodImage/" + this.props.id + ".jpg").getDownloadURL().then(url=>{
                    this.setState({ imageURL: url });
              });
          }
          else
              this.setState({ imageURL: this.props.imageURL });
      }


  render()
  {
    return(
      <TouchableOpacity
              style={this.props.containerStyle}
              activeOpacity={0.8}
              onPress={ this.handleOnPress }
      >
          <Image resizeMode='cover' source={{uri: this.state.imageURL}}  style={this.props.imageStyle}  />
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
              this.state = { autoplay: true };
              this.renderItemComponent = this.renderItemComponent.bind(this);
              this._isMount = false;
      }


      componentDidMount() {
        this._isMount = true;
        this.setState({ autoplay: true }); 
      }
      componentWillUnmount() { 
        this._isMount = false;
        this.setState({ autoplay: false });
      }

      renderItemComponent({ item })
      {
        return (
          <SwiperItem
                id={item.id}
                imageURL={item.key}
                text={item.data.Name}
                containerStyle={ swiperStyle.swiperItem }
                imageStyle={ swiperStyle.imageOnSwiper }
                handleOnPress={ ()=>this.props.navigation.push( this.props.routename, { data: {id: item.id, title: item.data.Name } }) }
           />
         );
    }

      render()
      {
            const { loading, data } = this.props;
            if ( loading || data.length < 5 )
            {
                          return (
                            <View style={{ elevation: 5, height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator />
                            </View>
                            );
                        }
            else
             {
                          return(
                            <View style={ swiperStyle.container }>
                                <SwiperFlatList
                                       autoplay={ this.state.autoplay }
                                       autoplayDelay={2}
                                       autoplayLoop
                                       data={ data }
                                       renderItem={ this.renderItemComponent }
                                       renderAll={this._isMount}
                                 />
                          </ View>
                      );
             }
          }
    }
