import React, { Component } from "react";
import { Text, View } from "react-native";
import { SearchBar, Icon } from 'react-native-elements';
import { headerStyle } from "../Style/style.js";


export default class Header extends Component
{
  constructor(props)
  {
      super(props);
      this.state = { search: "" };
  }

  render()
  {
    const { search } = this.state;
    const icon = (this.props.show ? (
       <Icon
          name="arrow-left-circle"
          type="feather"
          color="white"
          underlayColor="transparent"
          onPress={this.props.back}
      />
      )  :  (null));
    return (
      <View style={headerStyle.wrapper} >
          <SearchBar
              placeholder = "Search here..."
              onChangeText = { this.props.onTextChange }
              value = { this.props.searchText }
              inputContainerStyle={{backgroundColor: "#E5E4EA"}}
              inputStyle={{fontSize: 14, padding: 0}}
              round
              containerStyle={{ marginLeft: "2%", width: "65%", backgroundColor: "transparent", position: "relative", borderBottomColor: "transparent", borderTopColor: "transparent"}}
              onFocus={this.props.onFocus}
          />
          <View style={{width: "25%", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "row", marginRight: "5%"}}>
              <Icon
                  name="shopping-cart"
                  type="feather"
                  color="white"
                  underlayColor="transparent"
                  onPress={()=>{}}
              />
              { icon }
          </View>
      </View>
    );
  }
}
