import React, { Component } from "react";
import { Text, View , FlatList, ActivityIndicator, TouchableOpacity, Image} from "react-native";
import {Icon} from "react-native-elements";
import {accountStyle, notification, flexStyle, listViewMenuItemStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Loader from './loader.js';
import NavigationService from './NavigationService.js';
import OrderItem from './OrderItem';
export default class ListAccepted extends Component
{
  static navigationOptions = {
                    title: 'Đã tiếp nhận',
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
    .where('Status', '==', 'accepted')
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
      orders: orders.sort((a,b)=>{
        let ax = new Date(a.time),
            bx = new Date(b.time);
        //if (ax>bx) return -1
        //else if (ax==bx) return 0;
        //else return 1;
        return (ax < bx);
      }),
    });
  }
  render(){
    if(this.state.loading)
    return(<Loader/>);
    else if(this.state.orders.length == 0)
    return(
      <View style ={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Image source = {require('../Media/icon/empty.jpg')} style ={{width:70, height: 70}}/>
        <Text style = {{paddingTop: 20, fontSize: 15, }}>This is an empty list.</Text>
      </View>
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
