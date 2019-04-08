import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewStyle } from "../Style/style.js";



//Define listview item
class ListViewItem extends Component
{
    render()
    {
      const { imgURL, title = "", rate = 0, price } = this.props;
      return (
            <View style={ listViewStyle.item }>
                  <Image
                      source={ imgURL }
                      style={ listViewStyle.image }
                      resizeMode='cover'
                  />
                  <Text style={ listViewStyle.text }>{ title }</Text>
                  <View style={ listViewStyle.wrapperRateAndPrice }>
                      <View style={ listViewStyle.rateWrapper }>
                          <Icon name="star" type="antdesign" color="white" size={15} />
                          <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ rate }</Text>
                      </View>
                      <View style={ listViewStyle.priceWrapper }>
                          <Icon type="font-awesome" name="dollar" color="#227100" size={15} />
                          <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ price }</Text>
                      </View>
                  </View>
            </View>
      );
    }
}

//Define props type for class ListViewItem
ListViewItem.propTypes = {
      /*
      imgURL
      title: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired*/
};



export default class ListView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data:
      [
          {key: require("../Media/listView/1.jpg"), title: "Title 1", rate: 4.5, price: "12.000"},
          {key: require("../Media/listView/2.jpg"), title: "Title 2", rate: 5, price: "40.000"},
          {key: require("../Media/listView/3.jpg"), title: "Title 3", rate: 3, price: "20.000"},
          {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: "23.000"},
          {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: "17.000"},
          {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: "6.000"}
      ]
    };
  }
  render()
  {
    const { title } = this.props;
    return (
          <View style={{width: "100%"}}>
            <View style={ listViewStyle.wrapper } >
                <Text style={{fontWeight: "bold", fontSize: 16, width: "65%", padding: 10, marginLeft: 15}} >{ title }</Text>
                <Anchor
                      text={"See more"}
                      wrapperStyle={{width: "30%"}}
                      handleOnPress={ ()=>{} }
                />
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ this.state.data }
                keyExtractor={(item) => item.title }
                renderItem={( {item} ) => <ListViewItem
                                                imgURL={item.key}
                                                title={item.title}
                                                rate={item.rate}
                                                price={item.price}
                                          />  }
            />
          </View>
    );
  }
}

/*
ListView.propTypes = {
  title: PropTypes.string
};
*/