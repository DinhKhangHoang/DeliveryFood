import React, { Component } from "react";
import { Text, View, Image, SectionList,Button,Alert,TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewMenuItemStyle, modalViewInfoStyle } from "../Style/style.js";
import ModalViewInfo from "./ModalViewInfo.js"

class ListViewMenuItem extends Component
{
    constructor(props)
    {
      super(props);
      this._onPressProperty = this._onPressProperty.bind(this);
    }
    _onPressProperty(){
      key ='';
      Alert.alert(
        this.props.title,
        'Select one',
        [
          {text: 'Delete', onPress: () => {key = 'Delete';}},
          {
            text: 'View Information',
            onPress: () => <ModalViewInfo imgURL= {this.props.imgURL} title ={this.props.title} rate = {this.props.rate} price = {this.props.price}/>,
            style: 'cancel',
          },
          {text: 'Edit', onPress: () => {key = 'Edit'}},
        ],
        {cancelable: false},
      );
    }
    render()
    {
      const { imgURL, title = "", rate = 0, price } = this.props;
      key ="";
      return (
            <View style={ listViewMenuItemStyle.item }>
                  <Image
                      source={ imgURL }
                      style={ listViewMenuItemStyle.image }
                      resizeMode='cover'
                  />
                  <View style = {{flex:1, flexDirection:"column"}}>
                    <Text style={ listViewMenuItemStyle.text }>{ title }</Text>
                    <View style={ listViewMenuItemStyle.wrapperRateAndPrice }>
                        <View style={ listViewMenuItemStyle.rateWrapper }>
                            <Icon name="star" type="antdesign" color="white" size={15} />
                            <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ rate }</Text>
                        </View>
                        <View style={ listViewMenuItemStyle.priceWrapper }>
                            <Icon type="font-awesome" name="dollar" color="#227100" size={15} />
                            <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ price }</Text>
                        </View>
                    </View>
                  </View>
                  <View style = {listViewMenuItemStyle.button}>
                    <Icon type = "font-awesome" name ="ellipsis-v" color="#227100" size ={35} onPress= {this._onPressProperty}/>
                  </View>
            </View>
      );
    }
}
export default class ListViewMenu extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      sections:
      [
        {title: "Dessert",
          data :
          [
            {key: require("../Media/listView/1.jpg"), title: "Title 1", rate: 4.5, price: "12.000"},
            {key: require("../Media/listView/2.jpg"), title: "Title 2", rate: 5, price: "40.000"},
            {key: require("../Media/listView/3.jpg"), title: "Title 3", rate: 3, price: "20.000"},
            {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: "23.000"},
            {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: "17.000"},
            {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: "6.000"}
          ]
        },
        {title: "Main Course",
          data :
          [
            {key: require("../Media/listView/1.jpg"), title: "Title 7", rate: 4.5, price: "12.000"},
            {key: require("../Media/listView/2.jpg"), title: "Title 8", rate: 5, price: "40.000"},
            {key: require("../Media/listView/3.jpg"), title: "Title 9", rate: 3, price: "20.000"},
            {key: require("../Media/listView/4.jpg"), title: "Title 10", rate: 4.5, price: "23.000"},
            {key: require("../Media/listView/5.jpg"), title: "Title 11", rate: 4.5, price: "17.000"},
            {key: require("../Media/listView/6.jpg"), title: "Title 12", rate: 4.5, price: "6.000"}
          ]
        }
      ]
    };
  }
  render()
  {
    //const { title } = this.props;
    return (
          <View style={{width: "100%"}}>
            <SectionList
                sections={ this.state.sections }
                showsVerticalScrollIndicator = {false}
                //keyExtractor={(item) => item.title }
                renderSectionHeader={({section}) => <Text
                                                        style={listViewMenuItemStyle.text}>{section.title}</Text>}
                renderItem={( {item} ) => <ListViewMenuItem
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
