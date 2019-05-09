import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { gridStyle } from "../Style/style";


class GridItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false };
        this.handleOnPress = this.handleOnPress.bind(this);
  }
  // ================================================================================
  handleOnPress()
  {
    setTimeout( ()=>this.setState( { disabled:false } ), 1000);
    this.props.handleOnPress();
    this.setState( { disabled: true } );
  }
 // ==================================================================================

  render()
  {
    const { imgURL, title, price } = this.props;

    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    return(
      <TouchableOpacity  onPress={ (!this.state.disabled && this.handleOnPress) } activeOpacity={0.7} style={ gridStyle.wrapperItem }>
            <Image
                    source={ imgURL }
                    style={ gridStyle.image }
                    resizeMode='cover'
            />
            <View style={ gridStyle.inforItem }>
                  <Text numberOfLines={1} style={ gridStyle.titleItem }>{ title }</Text>
                  <Text style={ gridStyle.priceItem }>{ new Intl.NumberFormat('en').format( price )  + " đ"}</Text>
            </View>
      </TouchableOpacity>
    );
  }
}




export default class GridView extends Component
{
  //====== Constructor =========================================================================================
  constructor(props)
  {
    super(props);
    this.state = {
      data:
      [
          {key: require("../Media/listView/1.jpg"), title: "Title 1: test for long long text", rate: 4.5, price: 12000},
          {key: require("../Media/listView/2.jpg"), title: "Title 2", rate: 5, price: 40000},
          {key: require("../Media/listView/3.jpg"), title: "Title 3", rate: 3, price: 20000},
          {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: 23000},
          {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: 17000},
          {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: 6000}
      ]
      // Fetch data from database
    };
  }
  //====== Render function =========================================================================================
  render()
  {
    return(
      <View style={ gridStyle.container }>
            <View style={ gridStyle.wrapper }>
                <View style={ gridStyle.titleWrapper }>
                      <Text style={ gridStyle.title }>{ this.props.title }</Text>
                </View>
                <View style={ gridStyle.listWrapper }>
                      {
                        this.state.data.map(  (item) => { return (
                              <GridItem
                                    imgURL={item.key}
                                    title={item.title}
                                    price={item.price}
                                    handleOnPress={ ()=>{ this.props.navigation.push( this.props.routename, {data: item} ) }}
                              />
                         )} )
                    }
                </View>
            </View>
      </View>
    );
  }
}
