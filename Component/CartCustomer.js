import React, { Component } from "react";
import { Text, View, ScrollView, Image, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { CartCustomerStyle, accountStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Login from "./login";
import Message from "./Message";
import NetInfo from "@react-native-community/netinfo";



class ShoppingCartItem extends Component
{
  render()
  {
    // ---- Price format ------------------------------------------------------------------------------------------------
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    // -------------------------------------------------------------------------------------------------------------------
    const { imageURL, status, title, nameRES, quantity, totalPrice, time, nameCUS, phoneNumber, address } = this.props;
    let icon, headerStyle;
    if (status == "received")
     {
        icon = <Icon
                  name="checkcircleo"
                  type="antdesign"
                  color="white"
              />;
        headerStyle = CartCustomerStyle.headerY;
      }
      else if (status == "delivery")
      {
          icon = <Icon
                      type="material-community"
                      name="rocket"
                      color="white"
                  />;
          headerStyle = CartCustomerStyle.headerD;
      }
      else
      {
         icon = <Icon
                       type="entypo"
                       name="circle-with-cross"
                       color="white"
                />;
          headerStyle = CartCustomerStyle.headerN;
      }

    return (
      <View style={ CartCustomerStyle.wrapperItem }>
              <View style={ headerStyle }>
                      <View style={ CartCustomerStyle.icon }>
                              { icon }
                      </View>
                      <Text style={ CartCustomerStyle.titleHeader }>{ status.charAt(0).toUpperCase() + status.slice(1) }</Text>
                      <Text style= { CartCustomerStyle.time }>{ time }</Text>
              </View>
              <View style={ CartCustomerStyle.info }>
                    <Image
                            source={imageURL}
                            style={ CartCustomerStyle.image }
                            resizeMode="cover"
                    />
                    <View style={ CartCustomerStyle.textWrapper }>
                          <View style={{width: "100%", borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)", paddingBottom: 5, marginBottom: 5}}>
                                  <Text numberOfLines={1} style={ CartCustomerStyle.title }>{title}</Text>
                                  <Text style={ CartCustomerStyle.nameRes }>{nameRES}</Text>
                          </View>
                          <View style={{width: "100%"}}>
                                  <Text>Quantity: {quantity}</Text>
                                  <Text style={ CartCustomerStyle.price }>Total: { new Intl.NumberFormat('en').format(totalPrice)  + " đ" }</Text>
                          </View>
                    </View>
              </View>
      </View>
    );
  }
}


export default class CartCustomer extends Component
{
  static navigationOptions = {
                    title: "Shopping Cart",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#FF5607",
                    },
  };

  constructor(props)
  {
    super(props);
    //---------------------------------------------------------------------------------------------------------
    this.state = {
      data:
      [
          {key: require("../Media/listView/1.jpg"), title: "Title 1: test for long long long long text", quantity: 10, price: 12000, status: "received"},
          {key: require("../Media/listView/2.jpg"), title: "Title 2", quantity: 5, price: 40000, status: "received"},
          {key: require("../Media/listView/3.jpg"), title: "Title 3", quantity: 3, price: 20000, status: "received"},
          {key: require("../Media/listView/4.jpg"), title: "Title 4", quantity: 7, price: 23000, status: "delivery"},
          {key: require("../Media/listView/5.jpg"), title: "Title 5", quantity: 2, price: 17000, status: "delivery"},
          {key: require("../Media/listView/6.jpg"), title: "Title 6", quantity: 1, price: 6000, status: "discarded"}
      ],
      isEmpty: false,
      isConnected: true
      // Fetch data from database
    };
    //---------------------------------------------------------------------------------------------------------
  }

  componentDidMount()
  {
          NetInfo.addEventListener('connectionChange', (data)=>{
                if (data.type === "unknown" || data.type === "none")
                {
                        this.setState({isConnected: false});
                }
                else {
                        this.setState({isConnected: true});
                }
          });
  }

  render()
  {
    let message = null;
    if (!this.state.isConnected)
    {
         message = <Message
                      text="Something went wrong with internet connection."
                    />
    }

    if (firebase.auth().currentUser)
    {
        if (this.state.isEmpty)
        {
               return (
                 <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                              source={require("../Media/icon/emptyList.jpg")}
                              style={{width: 150, height: 150, marginBottom: 20}}
                        />
                        <Text style={{fontSize: 16}}>You have no shopping cart.</Text>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Feel free to go shopping around.</Text>
                        { message }
                 </View>
               );
        }
        else {
                return(
                  <View style={ CartCustomerStyle.container }>
                        <ScrollView
                              showsVerticalScrollIndicator={false}
                              //contentContainerStyle={{width: "95%", display: "flex", alignItems: 'center'}}
                        >
                                    {
                                      this.state.data.map((item)=>{
                                            return (
                                                  <ShoppingCartItem
                                                        imageURL={item.key}
                                                        status={item.status}
                                                        title={item.title}
                                                        nameRES="Name of restaurant"
                                                        quantity={item.quantity}
                                                        totalPrice={item.price}
                                                        time="29-Apr-2019"
                                                  />
                                            );
                                      })
                                  }
                          </ScrollView>
                          { message }
                  </View>
                );
          }
    }
    else
    {
      return (<Login navigation={this.props.navigation} />)
    }
  }
}
