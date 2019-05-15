import React, { Component } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, Platform } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewStyle } from "../Style/style.js";
import DetailFood from "./DetailFood";
import ContentLoader from 'rn-content-loader';
import { Rect } from "react-native-svg";
import firebase from "react-native-firebase";

//Define listview item
class ListViewItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false, imgURL: '' };
        this.handleOnPress = this.handleOnPress.bind(this);
  }
  componentDidMount()
  {
      if (this.props.imgURL == '')
      {
          firebase.storage().ref().child("/FoodImage/" + this.props.id + ".jpg").getDownloadURL().then(url=>{
                this.setState({ imgURL: url });
          });
      }
      else
          this.setState({ imgURL: this.props.imgURL });
  }

  handleOnPress()
  {
    if (!this.state.disabled)
    {
          setTimeout( ()=>this.setState( { disabled:false } ), 1000);
          this.props.handleOnPress();
          this.setState( { disabled: true } );
    }
  }

  render()
  {
    const { title = "", rate = 0, price = 0, loading = false} = this.props;
    if (loading)
    {
              return (
                      <View style={{ elevation: 5 }}>
                          <ContentLoader
                                 height={ 200 }
                                 width={ 150 }
                                 speed={2}>
                              <Rect x="0" y="0" rx="10" ry="10" width="90%" height="70%" />
                              <Rect x="0" y="75%" rx="5" ry="5" width="90%" height="5%" />
                              <Rect x="0" y="85%" rx="5" ry="5" width="50%" height="5%" />
                              <Rect x="55%" y="85%" rx="5" ry="5" width="35%" height="5%" />
                          </ContentLoader>
                      </View>
              );
    }
    else
    {
              return (
                    <TouchableOpacity style={ listViewStyle.item } activeOpacity={0.7} onPress={ this.handleOnPress }>
                          <Image
                              source={{uri: this.state.imgURL }}
                              style={ listViewStyle.image }
                              resizeMode='cover'
                          />
                          <Text style={ listViewStyle.text } numberOfLines={1}>{ title }</Text>
                          <View style={ listViewStyle.wrapperRateAndPrice }>
                              <View style={ listViewStyle.rateWrapper }>
                                  <Icon name="star" type="antdesign" color="white" size={15} />
                                  <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ rate }</Text>
                              </View>
                              <View style={ listViewStyle.priceWrapper }>
                                  <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ new Intl.NumberFormat('en').format(price) + " đ"}</Text>
                              </View>
                          </View>
                    </TouchableOpacity>
              );
      }
  }
}

/*
//Define props type for class ListViewItem
ListViewItem.propTypes = {
      imgURL
      title: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired

};
*/


export default class ListView extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { data : [ {key: "1"}, {key: "2"}, {key: "3"}, {key: "4"},{key: "5"},{key: "6"}] };
  }

  render()
  {
    // ------- Make file for number / date format
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    const { title = "", containerStyle, loading, data } = this.props;
    if ( loading || data.length < 4)
    {
          return (
                <View style={ [{width: "100%", backgroundColor: "white"}, containerStyle ]}>
                      <View style={ listViewStyle.wrapper } >
                              <Text style={{fontWeight: "bold", fontSize: 20, width: "65%", padding: 10, marginLeft: 15}} >{ title }</Text>
                              <Anchor
                                      text={"See more"}
                                      wrapperStyle={{width: "30%"}}
                                      handleOnPress={ this.props.handleOnPress }
                                      title=""
                              />
                      </View>
                      <FlatList
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              data={ this.state.data }
                              keyExtractor={(item) => item.key }
                              renderItem={( {item} ) => <ListViewItem
                                                              handleOnPress={ ()=>{} }
                                                              loading={true} /> }
                      />
                </View>
          );
    }
    else
    {
        return (
              <View style={ [{width: "100%", backgroundColor: "white"}, containerStyle ]}>
                <View style={ listViewStyle.wrapper } >
                    <Text style={{fontWeight: "bold", fontSize: 20, width: "65%", padding: 10, marginLeft: 15}} >{ title }</Text>
                    <Anchor
                          text={"See more"}
                          wrapperStyle={{width: "30%"}}
                          handleOnPress={ this.props.handleOnPress }
                          title=""
                    />
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={ data }
                    keyExtractor={(item) => item.key }
                    renderItem={( {item} ) => <ListViewItem
                                                    imgURL={item.key}
                                                    id={item.id}
                                                    title={item.title}
                                                    rate={item.rate}
                                                    price={item.price}
                                                    handleOnPress={ ()=> this.props.navigation.push("Detail", { data: {id: item.id, title: item.title } }) }
                                              />}
                />
              </View>
        );
      }
  }
}
