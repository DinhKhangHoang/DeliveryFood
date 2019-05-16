import React, { Component } from "react";
import { Text, View , FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {accountStyle, notification, flexStyle, listViewMenuItemStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Loader from './loader.js';
import NavigationService from './NavigationService.js';
import OrderItem from './OrderItem';
export default class ListDeliveried extends Component
{
  static navigationOptions = {
                    title: 'Đã giao hàng',
                    headerTitleStyle:  accountStyle.titleStyle
            };
            /*render(){
              return(
                <Text> this is non checked list.</Text>
              );
            }*/
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('ListOrders');
    this.unsubscribe = null;
    this.state = {
      loading: true,
      orders: [],

    };
  }
  componentDidMount(){
    this.unsubscribe = this.ref.where('RES_ID', '==', firebase.auth().currentUser.uid)
    .where('Status', '==', 'deliveried')
    .onSnapshot(this.onCollectionUpdate);
  }
  /*componentWillUnmount(){
    this.unsubscribe();
  }*/
  onCollectionUpdate = (querySnapshot)=>{
    const orders =[];
    querySnapshot.forEach((doc)=>{
      orders.push({
        key: doc.get('OrderID'),
      });

    });
    this.setState({
      loading: false,
      orders: orders,
    });
  }
  render(){
    if(this.state.loading)
    return(<Loader/>);
    else if(this.state.orders.length== 0)
    return(
      <Text>This is an empty list.</Text>
    );
    else
    return(
            <View style={{ width: "100%", height: "87%"}}>
                  <FlatList
                        contentContainerStyle={ [flexStyle.wrapper, {marginVertical: 10}] }
                        showsVerticalScrollIndicator={false}
                        data = {this.state.orders}
                        renderItem={ ({item})=>(
                                <OrderItem
                                      orderid = {item.key}
                                />
                        )}
                    />
          </View>
    );
  }
}
