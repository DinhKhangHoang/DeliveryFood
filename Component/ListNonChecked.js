import React, { Component } from "react";
import { Text, View , FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {accountStyle, notification, flexStyle, listViewMenuItemStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Loader from './loader.js';
import NavigationService from './NavigationService.js';
import OrderItem from './OrderItem';
export default class ListNonChecked extends Component
{
  static navigationOptions = {
                    title: 'Đơn hàng mới',
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
    .where('Status', '==', 'nonchecked')
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
        time: doc.get('TimeOrder')
      });

    });
    this.setState({
      loading: false,
      orders: orders.sort((a,b)=>{
        /*let ax = new Date(a.time),
            bx = new Date(b.time);
        if (ax>bx) return -1
        else if (ax==bx) return 0;
        else return 1;*/
        let ahour = a.time.slice(0,5);
        let aday = a.time.slice(6);
        let adaychange = aday.split('-');
        switch(adaychange[1]){
          case 'Jan': adaychange[1] = '01'; break;
          case 'Feb': adaychange[1] = '02'; break;
          case 'Mar': adaychange[1] = '03'; break;
          case 'Apr': adaychange[1] = '04'; break;
          case 'May': adaychange[1] = '05'; break;
          case 'Jun': adaychange[1] = '06'; break;
          case 'Jul': adaychange[1] = '07'; break;
          case 'Aug': adaychange[1] = '08'; break;
          case 'Sep': adaychange[1] = '09'; break;
          case 'Oct': adaychange[1] = '10'; break;
          case 'Nov': adaychange[1] = '11'; break;
          case 'Dec': adaychange[1] = '12'; break;
        }
        let acompare = adaychange[2]+'-'+adaychange[1]+'-'+adaychange[0]+ahour;
        let bhour = b.time.slice(0,5);
        let bday = b.time.slice(6);
        let bdaychange = bday.split('-');
        switch(bdaychange[1]){
          case 'Jan': bdaychange[1] = '01'; break;
          case 'Feb': bdaychange[1] = '02'; break;
          case 'Mar': bdaychange[1] = '03'; break;
          case 'Apr': bdaychange[1] = '04'; break;
          case 'May': bdaychange[1] = '05'; break;
          case 'Jun': bdaychange[1]= '06'; break;
          case 'Jul': bdaychange[1] = '07'; break;
          case 'Aug': bdaychange[1] = '08'; break;
          case 'Sep': bdaychange[1] = '09'; break;
          case 'Oct': bdaychange[1] = '10'; break;
          case 'Nov': bdaychange[1] = '11'; break;
          case 'Dec': bdaychange[1] = '12'; break;
        }
        let bcompare = bdaychange[2]+'-'+bdaychange[1]+'-'+bdaychange[0]+bhour;
        return (acompare>bcompare);
      }),
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
                        keyExtractor = {(item, index)=>item.time}
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
