import React, { Component } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import { listViewStyle } from "../Style/style.js";
import firebase from "react-native-firebase";

//Define listview item
class ListViewItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false, imgURL: ' ' };
        this.handleOnPress = this.handleOnPress.bind(this);
  }

  componentDidMount()
  {
      if (this.props.imgURL == ' ')
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
          this.props.handleOnPress();
          setTimeout( ()=>this.setState( { disabled: false } ), 1000);
          this.setState( { disabled: true } );
    }
  }

  render()
  {
    const { title = "", rate = 0, price = 0, loading = false} = this.props;
    if (loading)
    {
              return (
                    <View style={ [listViewStyle.item, {display: "flex", justifyContent: "center", alignItems: "center"}] }>
                        <ActivityIndicator />
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



export default class ListView extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { data : [ {key: "1"}, {key: "2"}, {key: "3"}, {key: "4"}, {key: "5"}, {key: "6"}] };
  }

  render()
  {
    // ------- Make file for number / date format
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    const { title = "", containerStyle, loading, data } = this.props;
    if ( loading || data.length < 4 )
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
                              keyExtractor={(item, index) => item.key + index }
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
                    keyExtractor={(item, index) => item.key + index }
                    renderItem={( {item} ) => <ListViewItem
                                                    imgURL={item.key}
                                                    id={item.id}
                                                    title={item.data.Name}
                                                    rate={item.data.rating}
                                                    price={item.data.Price}
                                                    loading={false}
                                                    handleOnPress={ ()=> this.props.navigation.push("Detail", { data: {id: item.id, title: item.data.Name } }) }
                                              />}
                />
              </View>
        );
      }
  }
}
